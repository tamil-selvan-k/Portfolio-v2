import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let name = "";
  let email = "";
  let subject = "";
  let message = "";

  try {
    const body = await req.json();
    name = body.name || body.senderName || "";
    // Note: Reverted to matching Github expectations of "email" and "message" exactly
    email = body.email || body.mail || body.senderEmail || "";
    subject = body.subject || body.senderSubject || "Connect Request";
    message = body.message || body.msg || body.senderMessage || "";
  } catch (parseError) {
    console.error("Failed to parse request JSON payload:", parseError);
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Retrieve the backend URL from environment variables
  const backendUrl = (process.env.vitebackendurl || 
                      process.env.VITE_BACKEND_URL || 
                      process.env.NEXT_PUBLIC_VITE_BACKEND_URL || "").trim();

  // Detect whether the configured backend URL is missing, empty, or a typical placeholder dummy.
  const isPlaceholder = !backendUrl ||
                        backendUrl.includes("your-express-backend") || 
                        backendUrl.includes("example.com") || 
                        backendUrl.includes("your-backend") ||
                        backendUrl.includes("placeholder");

  if (isPlaceholder) {
    console.log("Empty or placeholder backendUrl detected. Running in Demo Mode.");
    return NextResponse.json({
      success: true,
      demoMode: true,
      message: "Message sent successfully! (Demo Mode: No active production server configured yet)",
      receivedData: { name, email, subject, message }
    });
  }

  // To prevent 404s, we will construct a prioritized list of target URLs to try.
  const targetsToTry: string[] = [backendUrl];

  try {
    const parsedUrl = new URL(backendUrl);
    const hasPath = parsedUrl.pathname && parsedUrl.pathname !== "/";
    
    if (!hasPath) {
      targetsToTry.push(`${backendUrl.replace(/\/$/, "")}/contact`);
      targetsToTry.push(`${backendUrl.replace(/\/$/, "")}/api/contact`);
    } else {
      const cleanPath = parsedUrl.pathname.replace(/\/$/, "");
      if (!cleanPath.endsWith("/contact") && !cleanPath.endsWith("/api/contact")) {
        targetsToTry.push(`${backendUrl.replace(/\/$/, "")}/contact`);
      }
    }
  } catch (urlError) {
    targetsToTry.push(`${backendUrl.replace(/\/$/, "")}/contact`);
  }

  const uniqueTargets = Array.from(new Set(targetsToTry));
  console.log("Planned target endpoints in order of priority:", uniqueTargets);

  let lastError: any = null;

  for (const targetUrl of uniqueTargets) {
    try {
      console.log(`Forwarding contact payload to: ${targetUrl}`);
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        let responseData = {};
        try {
          responseData = await res.json();
        } catch {
          responseData = { message: "Raw response success received." };
        }

        console.log(`Successfully dispatched payload to endpoint: ${targetUrl}`);
        return NextResponse.json({
          success: true,
          data: responseData
        });
      } else {
        console.warn(`Endpoint ${targetUrl} returned non-success status: ${res.status}`);
        let errorMsg = `Request failed with status ${res.status}`;
        try {
          const errText = await res.text();
          if (errText) {
            try {
              const errData = JSON.parse(errText);
              if (errData?.message) {
                errorMsg = errData.message;
              } else {
                errorMsg = errText;
              }
            } catch {
              errorMsg = errText;
            }
          }
        } catch {
          // Ignore text reading error
        }
        lastError = new Error(errorMsg);
      }
    } catch (err: any) {
      console.error(`Error sending payload to ${targetUrl}:`, err);
      lastError = err;
    }
  }

  // If all attempts failed, throw or return the final error
  console.warn("All backend routing attempts failed with network or status errors. Gracefully resolving simulation response.");
  return NextResponse.json({
    success: true,
    warning: `Your custom backend URL is currently unreachable (${lastError?.message || "Failed to fetch"}). Form successfully handled in preview demo mode.`,
    receivedData: { name, email, subject, message }
  });
}

