"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Swords,
  Map,
  MessageSquare,
  Trophy,
  Github,
  Linkedin,
  ChevronRight,
  ChevronLeft,
  X,
  Code2,
  Server,
  Database,
  CloudLightning,
  MonitorSmartphone,
  Cpu,
  TerminalSquare,
  Gamepad2,
  Play,
  Volume2,
  VolumeX,
  ShoppingBag,
  Coins,
  Sparkles,
  Coffee,
  Keyboard,
  ShieldAlert,
  Award,
  Heart,
  Zap,
  RefreshCw,
  Send,
  CheckCircle,
  MapPin,
  Mail,
} from "lucide-react";

// --- PURITY AND STATISTICS ROLL HELPER (TOP-LEVEL DECLARED) ---
const rollDice = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- CUSTOM RETRO AUDIO SYNTHESIS ENGINE ---
class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  public playBleep(frequency = 440, type: OscillatorType = "sine", duration = 0.08, volume = 0.03) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fails gracefully
    }
  }

  public playSelect() {
    this.playBleep(587.33, "triangle", 0.05, 0.04); // D5
    setTimeout(() => this.playBleep(880, "triangle", 0.08, 0.04), 50); // A5
  }

  public playQuestUnlock() {
    this.playBleep(523.25, "sine", 0.08, 0.05); // C5
    setTimeout(() => this.playBleep(659.25, "sine", 0.08, 0.05), 80); // E5
    setTimeout(() => this.playBleep(783.99, "sine", 0.08, 0.05), 160); // G5
    setTimeout(() => this.playBleep(1046.50, "sine", 0.2, 0.05), 240); // C6
  }

  public playPurchase() {
    this.playBleep(392, "sine", 0.05, 0.05); // G4
    setTimeout(() => this.playBleep(587.33, "sine", 0.05, 0.05), 60); // D5
    setTimeout(() => this.playBleep(880, "sine", 0.15, 0.05), 120); // A5
  }

  public playDamage() {
    this.playBleep(120, "sawtooth", 0.2, 0.06);
    setTimeout(() => this.playBleep(80, "sawtooth", 0.2, 0.06), 60);
  }

  public playHeal() {
    this.playBleep(659.25, "triangle", 0.1, 0.05);
    setTimeout(() => this.playBleep(880, "triangle", 0.1, 0.05), 80);
    setTimeout(() => this.playBleep(1318.51, "sine", 0.2, 0.05), 160);
  }

  public playVictory() {
    this.playBleep(523.25, "square", 0.1, 0.04);
    setTimeout(() => this.playBleep(659.25, "square", 0.1, 0.04), 100);
    setTimeout(() => this.playBleep(783.99, "square", 0.1, 0.04), 200);
    setTimeout(() => this.playBleep(1046.50, "square", 0.3, 0.05), 300);
  }
}

const soundEngine = new RetroAudioEngine();

// --- DATA PRESETS ---
const CLASS_PROFILES = {
  SORCERER: {
    id: "SORCERER",
    name: "Full Stack Sorcerer",
    hp: 90,
    maxHp: 90,
    mana: 130,
    maxMana: 130,
    attack: "React Render Spark",
    special: "State Synthesis Burst",
    perk: "High MPPool & 15% bonus to magic attack damage.",
    motto: "Dominate with high-fidelity React interfaces and elegant full-stack states.",
    archetype: "Frontend Specialist & Full Stack Mage",
    powerClass: "text-purple-400 border-purple-950 bg-purple-950/20",
    powerBorderColor: "border-purple-500",
    powerProgressColor: "bg-purple-500",
    statOffense: 95,
    statDefense: 50,
    statMana: 90,
    statSpeed: 85,
    roleDescription: "Tamil Selvan's primary mastery class. Features peak efficiency in virtual DOM manipulation, interactive Tailwind grid templates, and client-side system architecture, supported by a solid modular backend implementation.",
  },
};

const SKILL_NODES = [
  {
    id: "s1",
    name: "React.js Spells",
    level: 5,
    maxLevel: 5,
    tech: "Frontend",
    desc: "Bends the virtual DOM. Summons snappy client-side rendering.",
    cost: 150,
  },
  {
    id: "s2",
    name: "Tailwind Alchemy",
    level: 4,
    maxLevel: 5,
    tech: "Frontend",
    desc: "Blazing fast pixel configuration using atomic grids.",
    cost: 100,
  },
  {
    id: "s3",
    name: "TypeScript Runes",
    level: 4,
    maxLevel: 5,
    tech: "Frontend",
    desc: "Shields vectors with compilation guard-rails. Eliminates Undefined issues.",
    cost: 200,
  },
  {
    id: "s4",
    name: "Node.js Core",
    level: 5,
    maxLevel: 5,
    tech: "Backend",
    desc: "Infinite non-blocking loop handling, executing server-side spells fast.",
    cost: 180,
  },
  {
    id: "s5",
    name: "Express.js Telemetry",
    level: 4,
    maxLevel: 5,
    tech: "Backend",
    desc: "Deploys strategic routing paths and middleware portals safely.",
    cost: 150,
  },
  {
    id: "s6",
    name: "MongoDB Bastion",
    level: 4,
    maxLevel: 5,
    tech: "Backend",
    desc: "NoSQL document storage with query indexes to summon datasets instantly.",
    cost: 140,
  },
  {
    id: "s7",
    name: "Docker Capsules",
    level: 3,
    maxLevel: 5,
    tech: "DevOps",
    desc: "Containers containing hermetic isolated environment libraries.",
    cost: 220,
  },
  {
    id: "s8",
    name: "GCP/AWS Portals",
    level: 3,
    maxLevel: 5,
    tech: "DevOps",
    desc: "Coordinates sub-nodes over high-performance cloud networks.",
    cost: 250,
  },
];

const QUEST_DUNGEONS = [
  {
    id: "q1",
    title: "Operation: ThereYouGo",
    type: "Main Quest",
    difficulty: "Hard",
    description:
      "A complete productivity ecosystem mapping elegant collaboration workspaces. Leverages a solid MERN backend with responsive, high-fidelity viewport panels for team velocity.",
    rewards: ["+100 Credits", "MERN Core Emblem"],
    tech: ["React.js", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/tamil-selvan-k/ThereYouGo",
    coords: { x: 25, y: 35 },
  },
  {
    id: "q2",
    title: "ShadowTraceAI Protocol",
    type: "AI Side Quest",
    difficulty: "Extreme",
    description:
      "Telemetry tracing protocol embedded with cognitive pattern recognition layers. Maps complex transaction vectors across cloud infrastructure pipelines in beautiful real-time layouts.",
    rewards: ["+150 Credits", "Aether Core Badge"],
    tech: ["MERN Stack", "Gemini API", "Tailwind CSS", "Data Streams"],
    githubUrl: "https://github.com/tamil-selvan-k/ShadowTraceAI",
    coords: { x: 55, y: 65 },
  },
  {
    id: "q3",
    title: "WhatsApp Realtime Raid",
    type: "Main Quest",
    difficulty: "Medium",
    description:
      "Instantaneous socket-based transmission engine mimicking modern text layers. Handles concurrency through high-throughput Event Emitters and persistent state sockets.",
    rewards: ["+120 Credits", "Socket Catalyst Gem"],
    tech: ["React", "Socket.io", "Node.js", "Express", "Mongoose"],
    githubUrl: "https://github.com/tamil-selvan-k/whatsapp-clone",
    coords: { x: 75, y: 30 },
  },
  {
    id: "q4",
    title: "Trial of Quizz",
    type: "Mini Game Quest",
    difficulty: "Easy",
    description:
      "A lightweight, gamified quiz controller packed with score algorithms, response timers, and micro-interactivity to test user aptitude.",
    rewards: ["+80 Credits", "Parchment of Intellect"],
    tech: ["React", "CSS Grid", "Firebase", "State Hooks"],
    githubUrl: "https://github.com/tamil-selvan-k/Quizz",
    coords: { x: 80, y: 80 },
  },
];

const SHOP_INVENTORY_PRESETS = [
  {
    id: "item1",
    name: "Quantum Matcha Tea",
    icon: <Coffee className="w-5 h-5 text-emerald-400" />,
    desc: "Restores +45 HP and unlocks +20 Spell Defense. Instant intake.",
    cost: 150,
    hpHeal: 45,
    mpGain: 0,
    equipped: false,
  },
  {
    id: "item2",
    name: "120Hz RGB Keyboard",
    icon: <Keyboard className="w-5 h-5 text-indigo-400" />,
    desc: "Increases Critical Rate by +15% and standard attack speed.",
    cost: 300,
    hpHeal: 0,
    mpGain: 25,
    equipped: false,
  },
  {
    id: "item3",
    name: "Superconductor Cape",
    icon: <CloudLightning className="w-5 h-5 text-amber-400" />,
    desc: "DevOps mitigation. Cuts incoming Bug damages by 25%.",
    cost: 400,
    hpHeal: 0,
    mpGain: 0,
    equipped: false,
  },
  {
    id: "item4",
    name: "MERN Mana Potion",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    desc: "Instantly recharges +60 Mana (MP) for spell attacks.",
    cost: 100,
    hpHeal: 0,
    mpGain: 60,
    equipped: false,
  },
];

const ACHIEVEMENT_LIST = [
  {
    id: "ach1",
    title: "Start Character Selection",
    desc: "Recruiter successfully chosen their starting specialization class.",
    unlocked: true,
  },
  {
    id: "ach2",
    title: "Database Siphon",
    desc: "Examined Tamil Selvan K's main quest dossiers.",
    unlocked: false,
  },
  {
    id: "ach3",
    title: "Production Purified",
    desc: "Fought and fully vanquished the Bug-Lord in the Boss Battle Arena.",
    unlocked: false,
  },
  {
    id: "ach4",
    title: "Oracle Channel Engaged",
    desc: "Drafted an encrypted transmission to invite the developer to interview.",
    unlocked: false,
  },
];

// --- TYPEWRITER INTERACTION COMPONENT ---
const Typewriter = ({ text, delay = 25 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let active = true;
    let index = 0;

    const initTimer = setTimeout(() => {
      if (active) setCurrentText("");
    }, 0);

    const interval = setInterval(() => {
      if (active) {
        if (index < text.length) {
          setCurrentText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }
    }, delay);

    return () => {
      active = false;
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{currentText}</span>;
};

// --- MAIN PORTFOLIO ROOT CONTAINER ---
export default function GamifiedPortfolio() {
  const [screen, setScreen] = useState<
    "boot" | "title" | "menu" | "stats" | "map" | "battle" | "shop" | "achievements" | "contact"
  >("boot");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [backendUrlState, setBackendUrlState] = useState(process.env.vitebackendurl || "");

  // Load dynamic absolute backend URL at runtime (resolves build vs run discrepancy)
  useEffect(() => {
    async function loadBackendUrl() {
      try {
        const response = await fetch("/api/config");
        if (response.ok) {
          const data = await response.json();
          if (data && data.vitebackendurl) {
            setBackendUrlState(data.vitebackendurl);
          }
        }
      } catch (err) {
        console.warn("Dynamic backend URL lookup omitted, using build default.", err);
      }
    }
    loadBackendUrl();
  }, []);

  // Auto-transition from boot to title screen
  useEffect(() => {
    if (screen === "boot") {
      const timer = setTimeout(() => {
        setScreen("title");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Character Class Configuration
  const [activeClass, setActiveClass] = useState<keyof typeof CLASS_PROFILES>("SORCERER");
  const [playerHp, setPlayerHp] = useState(CLASS_PROFILES.SORCERER.hp);
  const [playerMp, setPlayerMp] = useState(CLASS_PROFILES.SORCERER.mana);

  // Stats Progression Ledger
  const [coins, setCoins] = useState(500);
  const [xp, setXp] = useState(90000);
  const [level, setLevel] = useState(99);
  const [skillPoints, setSkillPoints] = useState(3);
  const [userSkills, setUserSkills] = useState(SKILL_NODES);
  const [activeQuest, setActiveQuest] = useState<(typeof QUEST_DUNGEONS)[0] | null>(null);

  // Item Inventory Storage arrays
  const [ownedItems, setOwnedItems] = useState<Array<typeof SHOP_INVENTORY_PRESETS[0]>>([]);
  const [shopPreset] = useState(SHOP_INVENTORY_PRESETS);

  // Achievements Ledger array
  const [achievements, setAchievements] = useState(ACHIEVEMENT_LIST);

  // Turn-Based Combat configurations
  const [bossHp, setBossHp] = useState(250);
  const maxBossHp = 250;
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [bossActionEffect, setBossActionEffect] = useState<string | null>(null);
  const [combatState, setCombatState] = useState<"not_started" | "fighting" | "victory" | "game_over">("not_started");

  // Secure Transmission Fields
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderSubject, setSenderSubject] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((ach) => (ach.id === id ? { ...ach, unlocked: true } : ach))
    );
  };

  const handleSelectClass = (classKey: keyof typeof CLASS_PROFILES) => {
    setActiveClass(classKey);
    setPlayerHp(CLASS_PROFILES[classKey].hp);
    setPlayerMp(CLASS_PROFILES[classKey].mana);

    unlockAchievement("ach1");
    soundEngine.playSelect();
  };

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    soundEngine.enabled = nextState;
    if (nextState) {
      soundEngine.playQuestUnlock();
    }
  };

  const changeScreen = (newScreen: typeof screen) => {
    soundEngine.playSelect();
    if (newScreen === "contact") {
      window.location.href = "https://tamil-selvan-k.vercel.app/#contact";
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(newScreen);
      setIsTransitioning(false);
    }, 600);
  };

  // Consume Inventories Action item
  const handleUseItem = (item: typeof SHOP_INVENTORY_PRESETS[0]) => {
    const classRules = CLASS_PROFILES[activeClass];
    let didUse = false;

    if (item.hpHeal > 0 && playerHp < classRules.maxHp) {
      setPlayerHp((prev) => Math.min(prev + item.hpHeal, classRules.maxHp));
      didUse = true;
    }
    if (item.mpGain > 0 && playerMp < classRules.maxMana) {
      setPlayerMp((prev) => Math.min(prev + item.mpGain, classRules.maxMana));
      didUse = true;
    }

    if (didUse) {
      setOwnedItems((prev) => prev.filter((i) => i.id !== item.id));
      soundEngine.playHeal();
    } else {
      soundEngine.playDamage();
    }
  };

  // Equipment Merchant Shop
  const buyShopItem = (item: typeof SHOP_INVENTORY_PRESETS[0]) => {
    if (coins >= item.cost) {
      setCoins((prev) => prev - item.cost);
      setOwnedItems((prev) => [...prev, item]);
      soundEngine.playPurchase();
    } else {
      soundEngine.playDamage();
    }
  };

  // Spent points inside Character Tree sheets
  const upgradeSkill = (id: string) => {
    if (skillPoints > 0) {
      const target = userSkills.find((s) => s.id === id);
      if (target && target.level < target.maxLevel) {
        setUserSkills((prev) =>
          prev.map((s) => (s.id === id ? { ...s, level: s.level + 1 } : s))
        );
        setSkillPoints((prev) => prev - 1);
        soundEngine.playQuestUnlock();
      }
    } else {
      soundEngine.playDamage();
    }
  };

  // Dungeon World map inspection trigger
  const viewQuest = (quest: typeof QUEST_DUNGEONS[0]) => {
    setActiveQuest(quest);
    setCoins((prev) => prev + 50);
    setXp((prev) => Math.min(prev + 1000, 100000));
    soundEngine.playQuestUnlock();
    unlockAchievement("ach2");
  };

  // --- CLEAN ASYNC EVENT-DRIVEN COMBAT ENGINE (NO SYNC EFFECTS IN RENDER) ---
  const handleVictory = () => {
    setCombatState("victory");
    setLevel(100);
    setCoins((prev) => prev + 500);
    setXp(100000);
    setBattleLogs((prev) => [
      ...prev,
      "🏆 VICTORY! Bug-Lord's production crash has been mitigated completely.",
      "🏆 Tamil Selvan K leveled up to Level 100 [Archmage of Code]!",
      "🏆 Unlocked +500 Gold Coins and the Legendary Job Offer Scroll!",
    ]);
    unlockAchievement("ach3");
    soundEngine.playVictory();
  };

  const executeBossTurn = (currentPlayerHp: number) => {
    if (bossHp <= 0) return;

    const bossMoves = [
      { name: "Memory Leak", dmg: 16, desc: "Drain CPU memory leaks." },
      { name: "Uncaught ReferenceError", dmg: 22, desc: "Null variable trace on rendering." },
      { name: "Merge Conflict", dmg: 12, desc: "Conflicts in index branches." },
      { name: "AWS Invoice Shock", dmg: 26, desc: "Spike load billing rates." },
    ];

    const rolledMove = bossMoves[rollDice(0, bossMoves.length - 1)];

    // Mitigations passives Check
    const hasCape = ownedItems.some((i) => i.id === "item3");
    const defensePercent = hasCape ? 0.75 : 1.0;
    const computedDmg = Math.floor(rolledMove.dmg * defensePercent);

    setBossActionEffect(rolledMove.name);
    soundEngine.playDamage();

    const nextPlayerHp = Math.max(0, currentPlayerHp - computedDmg);
    setPlayerHp(nextPlayerHp);

    if (nextPlayerHp <= 0) {
      setCombatState("game_over");
      setBattleLogs((prev) => [
        ...prev,
        `💀 DEFEAT! Bug-Lord casts [${rolledMove.name}] and dealt ${computedDmg} pure damage. Thread blocked!`,
      ]);
    } else {
      setBattleLogs((prev) => [
        ...prev,
        `👾 Bug-Lord casts [${rolledMove.name}]! (${rolledMove.desc}) dealt ${computedDmg} damage.`,
      ]);
      // Return controller to target player
      setIsPlayerTurn(true);
    }

    setTimeout(() => {
      setBossActionEffect(null);
    }, 800);
  };

  const startCombat = () => {
    const classRules = CLASS_PROFILES[activeClass];
    setBossHp(250);
    setPlayerHp(classRules.hp);
    setPlayerMp(classRules.mana);
    setBattleLogs([
      "🛡️ Battle Arena initialized! Welcome, traveler.",
      `🛡️ Target Overlord: Bug-Lord (HP: 250). Clear variables to inflict damage.`,
    ]);
    setIsPlayerTurn(true);
    setCombatState("fighting");
    soundEngine.playSelect();
  };

  const executeCombatAction = (action: "normal" | "special" | "heal") => {
    if (!isPlayerTurn || combatState !== "fighting") return;

    soundEngine.playSelect();
    const classRules = CLASS_PROFILES[activeClass];
    let damage = 0;
    let logMsg = "";

    const hasKeyboard = ownedItems.some((i) => i.id === "item2");
    const bonusMulti = hasKeyboard ? 1.25 : 1.0;

    let targetBossHp = bossHp;
    let targetPlayerHp = playerHp;

    if (action === "normal") {
      damage = Math.floor(rollDice(15, 25) * bonusMulti);
      logMsg = `⚔️ You cast [${classRules.attack}]! Inflict ${damage} code-damage.`;
      
      const nextBossHp = Math.max(0, bossHp - damage);
      setBossHp(nextBossHp);
      targetBossHp = nextBossHp;

      setPlayerMp((prev) => Math.min(prev + 10, classRules.maxMana));
      setBattleLogs((prev) => [...prev, logMsg]);

    } else if (action === "special") {
      const manaCost = 35;
      if (playerMp >= manaCost) {
        damage = Math.floor(rollDice(35, 55) * bonusMulti);
        setPlayerMp((prev) => prev - manaCost);
        logMsg = `⚡ CRITICAL DEPLOYMENT! You summon [${classRules.special}]! Deals ${damage} huge damage.`;

        const nextBossHp = Math.max(0, bossHp - damage);
        setBossHp(nextBossHp);
        targetBossHp = nextBossHp;

        setBattleLogs((prev) => [...prev, logMsg]);
      } else {
        setBattleLogs((prev) => [...prev, "❌ Insufficient Mana (MP) for ultimate casts!"]);
        soundEngine.playDamage();
        return;
      }
    } else if (action === "heal") {
      const hAmt = 45;
      const nextPlayerHp = Math.min(playerHp + hAmt, classRules.maxHp);
      setPlayerHp(nextPlayerHp);
      targetPlayerHp = nextPlayerHp;

      logMsg = `🧪 Refactor recovery! Patched health pools back up by +${hAmt} points.`;
      setBattleLogs((prev) => [...prev, logMsg]);
      soundEngine.playHeal();
    }

    // Evaluate Victory Condition
    if (targetBossHp <= 0) {
      handleVictory();
    } else {
      setIsPlayerTurn(false);
      setTimeout(() => {
        executeBossTurn(targetPlayerHp);
      }, 1000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderSubject || !senderMessage) return;

    setIsSubmittingForm(true);
    setFormError(null);

    try {
      soundEngine.playHeal(); // Play immediate interaction sound
      
      let resolvedBackendUrl = (backendUrlState || process.env.vitebackendurl || "").trim();
      if (resolvedBackendUrl === "undefined" || resolvedBackendUrl === "null") {
        resolvedBackendUrl = "";
      }

      // Check if URL is unconfigured or a dummy placeholder
      const isPlaceholder = !resolvedBackendUrl || 
                            resolvedBackendUrl.includes("your-express-backend") || 
                            resolvedBackendUrl.includes("example.com") ||
                            resolvedBackendUrl.includes("your-backend") ||
                            resolvedBackendUrl.includes("placeholder");

      if (isPlaceholder) {
        throw new Error(
          `Backend URL is not configured. Please set 'vitebackendurl' to your real absolute Express server endpoint in the Secrets panel in AI Studio Settings. (Currently resolved to: "${resolvedBackendUrl || "empty"}")`
        );
      }

      // Build clean absolute URL without trailing slash duplication
      const baseApiUrl = resolvedBackendUrl.replace(/\/$/, "");
      const fetchUrl = `${baseApiUrl}/contact`;

      console.log(`[Form Transmission] Dispatching packet to absolute endpoint: ${fetchUrl}`);

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: senderSubject,
          message: senderMessage,
        }),
      });

      let resData: any = {};
      try {
        const resText = await response.text();
        if (resText) {
          try {
            resData = JSON.parse(resText);
          } catch {
            // Non-JSON plaintext response from server/proxy
            resData = { success: response.ok, error: resText.substring(0, 250) };
          }
        } else {
          resData = { success: response.ok };
        }
      } catch (err) {
        resData = { success: response.ok, error: `Could not parse response stream: ${err}` };
      }

      if (!response.ok || resData.success === false) {
        const errorDetail = resData.error || resData.message || `HTTP Status Code ${response.status}`;
        throw new Error(`Server Response Error: ${errorDetail} (Target Endpoint: ${fetchUrl})`);
      }

      soundEngine.playQuestUnlock(); // Play triumph sound
      setFormSubmitted(true);
      unlockAchievement("ach4");
    } catch (err: any) {
      console.error("[Form Submit Error Details]:", err);
      // Give extremely precise advice regarding typical absolute URL/CORS/DNS issues
      let friendlyError = err.message || "Unknown socket connection disruption.";
      if (friendlyError.includes("Failed to fetch") || friendlyError.includes("NetworkError")) {
        friendlyError = `Network / CORS Connection Blocked. Ensure your Express backend at "${backendUrlState || "unspecified URL"}" is running, has CORS enabled (allowing the Applet's origin), and accepts POST requests on the "/contact" endpoint.`;
      }
      setFormError(friendlyError);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* GRID VECTOR OVERLAYS */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* CORE HUD WRAPPER */}
      {screen !== "boot" && screen !== "title" && (
        <header className="sticky top-0 left-0 right-0 z-40 bg-black/90 border-b-2 border-emerald-950 px-4 py-3 font-mono">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Player block ID */}
            <div className="flex items-center space-x-3 self-start md:self-auto">
              <div className="w-10 h-10 bg-slate-900 border-2 border-emerald-500 flex items-center justify-center rounded-sm">
                <User className="text-emerald-400 w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-white font-black text-sm uppercase tracking-wide flex items-center space-x-2">
                  <span>TAMIL_SELVAN</span>
                  <span className="text-[10px] bg-emerald-500 text-black font-extrabold px-1 rounded">
                    LVL {level}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  {CLASS_PROFILES[activeClass].name}
                </div>
              </div>
            </div>

            {/* Vital Status Indicators */}
            <div className="w-full md:max-w-xs flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-red-500 uppercase w-6">HP</span>
                <div className="flex-1 h-2 bg-slate-950 border border-slate-800 rounded-sm overflow-hidden">
                  <motion.div
                    className="h-full bg-red-600"
                    animate={{ width: `${(playerHp / CLASS_PROFILES[activeClass].maxHp) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80 }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-bold w-12 text-right">
                  {playerHp}/{CLASS_PROFILES[activeClass].maxHp}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase w-6">MP</span>
                <div className="flex-1 h-2 bg-slate-950 border border-slate-800 rounded-sm overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    animate={{ width: `${(playerMp / CLASS_PROFILES[activeClass].maxMana) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80 }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-bold w-12 text-right">
                  {playerMp}/{CLASS_PROFILES[activeClass].maxMana}
                </span>
              </div>
            </div>

            {/* Score Indicators and Toggle controls */}
            <div className="flex items-center space-x-5 text-sm self-end md:self-auto uppercase tracking-wider">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <Coins className="w-4 h-4" />
                <span className="font-mono">{coins}G</span>
              </div>

              <div className="text-right flex items-center space-x-2">
                <div className="text-[10px] text-slate-500">EXP</div>
                <div className="text-slate-200 font-bold font-mono">
                  {xp.toLocaleString()}/100,000
                </div>
              </div>

              <button
                onClick={toggleAudio}
                className={`p-2.5 bg-slate-950 border-2 rounded ${
                  audioEnabled ? "border-emerald-500 text-emerald-400" : "border-slate-800 text-slate-500"
                } hover:opacity-90 transition-all cursor-pointer`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* STAGE TRANSITIONAL SCENIC ANGER */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-emerald-500"
          >
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="w-12 h-12 animate-spin text-emerald-400" />
              <p className="tracking-widest uppercase text-xs animate-pulse font-bold">Transmitting_Core_Slices...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full flex flex-col select-none">
        <AnimatePresence mode="wait">
          {/* BOOT COMPONENT */}
          {screen === "boot" && (
            <div className="min-h-screen bg-black text-emerald-500 font-mono flex flex-col items-center justify-center p-6 select-none">
              <div className="relative mb-6">
                <Gamepad2 className="w-16 h-16 animate-pulse text-emerald-400" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              </div>

              <div className="text-center font-mono">
                <p className="text-sm tracking-[0.2em] font-bold uppercase mb-2">
                  <Typewriter text="INITIALIZING_RECRUITER_ADVENTURE.EXE" delay={25} />
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-sm mb-4">
                  Connection path: CERTIFICATE_SECURE // Node child cluster live.
                </p>
              </div>

              <div className="w-64 h-3 bg-zinc-950 border border-emerald-900 mt-4 rounded-sm overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}

          {/* RETRO TITLE SCREEN */}
          {screen === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:30px_30px] [transform:perspective(500px)_rotateX(55deg)] origin-bottom z-0 opacity-40 select-none" />

              <div className="relative z-10 text-center space-y-8 max-w-3xl w-full">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded text-emerald-400 font-mono text-xs uppercase tracking-widest leading-none">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Guild Hub: Tamil Selvan K</span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-extrabold text-white italic tracking-tighter drop-shadow-[0_0_20px_rgba(16,185,129,0.6)] uppercase">
                    TAMIL <span className="text-emerald-400">SELVAN</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-400 font-mono tracking-widest uppercase">
                    Full-Stack Sorcerer Portfolio Game
                  </p>
                </div>

                {/* Class Dossier & Selector Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left max-w-3xl mx-auto w-full">
                  
                  {/* Left Column: Specialization Dossier Status */}
                  <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                    <div className="bg-slate-900/95 border-2 border-slate-800 p-4 rounded shadow-2xl">
                      <h3 className="text-white font-mono text-xs uppercase tracking-widest text-center mb-3 text-emerald-400 font-bold">
                        Specialization Setup:
                      </h3>
                      <div className="flex flex-col gap-2">
                        <div
                          className="p-3 rounded border text-[12px] font-mono font-black uppercase tracking-wide text-left bg-purple-950/40 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] flex items-center justify-between"
                        >
                          <span>Full Stack Sorcerer</span>
                          <span className="text-[10px] bg-purple-500 text-black px-1.5 py-0.5 rounded font-black">ACTIVE</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Character Role Motivation summary */}
                    <div className="bg-slate-950/90 border border-slate-900 p-4 rounded font-mono text-[11px] text-slate-500 space-y-2">
                      <div className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-950 pb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span>CLASS OBJECTIVES</span>
                      </div>
                      <p className="leading-relaxed">
                        Sets your starting HP/MP attributes and custom spell book attacks used to fight the Bug-Lord in the Boss Arena!
                      </p>
                    </div>
                  </div>
                  
                  {/* Right Column: Detailed Real-Time Stat Preview File */}
                  <div className="md:col-span-8 bg-slate-900/95 border-2 border-slate-800 p-5 rounded shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      {/* Class Badge and ID Banner */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                        <div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">
                            Active Specification Profile
                          </div>
                          <h4 className="text-lg font-black text-white uppercase tracking-wider font-mono">
                            {CLASS_PROFILES[activeClass].name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold font-mono tracking-wide uppercase px-2.5 py-1 rounded border text-purple-400 border-purple-900 bg-purple-950/40">
                          {CLASS_PROFILES[activeClass].archetype}
                        </span>
                      </div>
                      
                      {/* Class Motto */}
                      <p className="text-[12px] italic text-emerald-400 font-mono mb-3 leading-relaxed">
                        &ldquo;{CLASS_PROFILES[activeClass].motto}&rdquo;
                      </p>
                      
                      {/* Character Description detail */}
                      <p className="text-[11.5px] leading-relaxed text-slate-400 mb-4 font-mono">
                        {CLASS_PROFILES[activeClass].roleDescription}
                      </p>
                      
                      {/* Realtimer Status bar ratings */}
                      <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 font-mono text-[11px] mb-4">
                        {/* Offense Stat */}
                        <div>
                          <div className="flex justify-between mb-1 font-bold text-slate-400">
                            <span>ATTACK POWER</span>
                            <span>{CLASS_PROFILES[activeClass].statOffense}%</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                            <motion.div
                              className="h-full rounded-full bg-purple-500"
                              animate={{ width: `${CLASS_PROFILES[activeClass].statOffense}%` }}
                              transition={{ type: "spring", stiffness: 60 }}
                            />
                          </div>
                        </div>

                        {/* Defense Stat */}
                        <div>
                          <div className="flex justify-between mb-1 font-bold text-slate-400">
                            <span>DAMAGE RESIST</span>
                            <span>{CLASS_PROFILES[activeClass].statDefense}%</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                            <motion.div
                              className="h-full rounded-full bg-purple-500"
                              animate={{ width: `${CLASS_PROFILES[activeClass].statDefense}%` }}
                              transition={{ type: "spring", stiffness: 60 }}
                            />
                          </div>
                        </div>

                        {/* Mana Stat */}
                        <div>
                          <div className="flex justify-between mb-1 font-bold text-slate-400">
                            <span>MANA RESERVES</span>
                            <span>{CLASS_PROFILES[activeClass].statMana}%</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                            <motion.div
                              className="h-full rounded-full bg-purple-500"
                              animate={{ width: `${CLASS_PROFILES[activeClass].statMana}%` }}
                              transition={{ type: "spring", stiffness: 60 }}
                            />
                          </div>
                        </div>

                        {/* Speed Stat */}
                        <div>
                          <div className="flex justify-between mb-1 font-bold text-slate-400">
                            <span>EXECUTION SPEED</span>
                            <span>{CLASS_PROFILES[activeClass].statSpeed}%</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                            <motion.div
                              className="h-full rounded-full bg-purple-500"
                              animate={{ width: `${CLASS_PROFILES[activeClass].statSpeed}%` }}
                              transition={{ type: "spring", stiffness: 60 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Combat Toolkit Details */}
                    <div className="bg-black/80 border border-slate-800 p-3 rounded font-mono text-[11px] space-y-2">
                      <div className="flex items-center justify-between text-white font-extrabold pb-1.5 border-b border-slate-900">
                        <span className="text-amber-400 tracking-wider">COMBAT DECK STATS:</span>
                        <span className="text-slate-400">HP: <strong className="text-red-500 font-black">{CLASS_PROFILES[activeClass].hp}</strong> / MP: <strong className="text-cyan-400 font-black">{CLASS_PROFILES[activeClass].mana}</strong></span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-slate-400">
                        <div>
                          <span className="text-slate-500 block text-[9.5px] uppercase font-bold">Basic attack</span>
                          <span className="text-white font-bold flex items-center">
                            <Swords className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
                            {CLASS_PROFILES[activeClass].attack}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9.5px] uppercase font-bold">Ultimate cast</span>
                          <span className="text-cyan-400 font-bold flex items-center">
                            <Zap className="w-3.5 h-3.5 text-cyan-400 mr-1 shrink-0" />
                            {CLASS_PROFILES[activeClass].special}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[10px] text-slate-300">
                          <strong className="text-emerald-400">Buff:</strong> {CLASS_PROFILES[activeClass].perk}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => changeScreen("menu")}
                    className="relative group inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-emerald-600 border-[3px] border-emerald-400 uppercase tracking-widest hover:bg-emerald-500 transition-all font-mono shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
                  >
                    <Play className="w-5 h-5 mr-3 animate-pulse group-hover:scale-125 transition-transform" />
                    Enter Game Deck
                  </button>
                </div>

                <div className="text-[11px] text-slate-600 font-mono">
                  COMPILER: TS COMPLIANT // PLATFORM: CLOUD RUN CORES // VERSEL_WEB: STABLE
                </div>
              </div>
            </motion.div>
          )}

          {/* MAIN MENU */}
          {screen === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 0.99, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl w-full mx-auto px-4 py-8 select-none"
            >
              {/* Introduction card */}
              <div className="bg-slate-950 border-2 border-emerald-950 p-6 rounded mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-2 uppercase">
                    Welcome to the Chennai Command Core!
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Tamil Selvan K is a <strong className="text-emerald-400">MERN full stack wizard</strong> who constructs ultra-scalable integrations. Explore the dashboard below to examine his spells, test your credentials in the boss arena, or send him an encrypted mail.
                  </p>
                </div>
                <div className="flex space-x-2 shrink-0">
                  <a
                    href="https://github.com/tamil-selvan-k"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded transition-colors text-slate-400"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/tamilselvan2007"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded transition-colors text-slate-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      soundEngine.playQuestUnlock();
                      window.open("https://tamil-selvan-k.vercel.app", "_blank");
                    }}
                    className="flex items-center space-x-1 p-3 bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 rounded font-bold font-mono text-xs uppercase cursor-pointer"
                  >
                    <span>Inspect CV Scroll</span>
                  </button>
                </div>
              </div>

              {/* Grid Bento Deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Character Stats Tab Card */}
                <button
                  onClick={() => changeScreen("stats")}
                  className="group bg-slate-900/80 border-2 border-slate-800 hover:border-emerald-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <User className="text-emerald-500 w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-emerald-500">TAB_01</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">Character stats</h3>
                  <p className="text-slate-400 text-xs">Examine skill points tree and passive developer qualities.</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-semibold">
                    <span>Manage Attributes</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* World Projects Map Tab Card */}
                <button
                  onClick={() => changeScreen("map")}
                  className="group bg-slate-900/80 border-2 border-slate-800 hover:border-emerald-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Map className="text-cyan-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-cyan-400">TAB_02</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">Quest Map</h3>
                  <p className="text-slate-400 text-xs text-slate-400">A modular landscape representing actual open-source projects.</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-cyan-400 font-mono font-semibold">
                    <span>Explore Quests</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Boss Arena Fight Tab Card */}
                <button
                  onClick={() => {
                    startCombat();
                    changeScreen("battle");
                  }}
                  className="group bg-slate-950/80 border-2 border-red-950 hover:border-red-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Swords className="text-red-500 w-8 h-8 group-hover:animate-bounce" />
                    <span className="text-[10px] font-mono text-red-950 group-hover:text-red-400">BOSS_CHALLENGE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">FIGHT BOSS</h3>
                  <p className="text-slate-400 text-xs">Face the terrifying server Bug-Lord. Refactor code and gain rewards!</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-red-400 font-mono font-semibold">
                    <span>Enter Arena</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Merchant Shop / Inventory */}
                <button
                  onClick={() => changeScreen("shop")}
                  className="group bg-slate-900/80 border-2 border-slate-800 hover:border-amber-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <ShoppingBag className="text-amber-500 w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-amber-500">TAB_04</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">Item Merchant</h3>
                  <p className="text-slate-400 text-xs">Unlock dynamic developer gear to buff up boss defensive capabilities.</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-amber-500 font-mono font-semibold">
                    <span>Equip Armor</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Achievements Record Screen */}
                <button
                  onClick={() => changeScreen("achievements")}
                  className="group bg-slate-900/80 border-2 border-slate-800 hover:border-yellow-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Award className="text-yellow-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-yellow-400">TAB_05</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">Achievements</h3>
                  <p className="text-slate-400 text-xs animate-none">Observe recruiter profile tokens earned during interaction.</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-yellow-400 font-mono font-semibold">
                    <span>View Trophy Cabinet</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Contact Oracle Screen */}
                <button
                  onClick={() => changeScreen("contact")}
                  className="group bg-slate-900/80 border-2 border-slate-800 hover:border-emerald-500 hover:bg-slate-900 p-6 text-left relative overflow-hidden rounded transition-all shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <MessageSquare className="text-emerald-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-emerald-500">TAB_06</span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase mb-1">Contact Oracle</h3>
                  <p className="text-slate-400 text-xs">Reach out directly to schedule a portal raid (interview contract).</p>
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-semibold">
                    <span>Begin Transmission</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: CHARACTER SHEET */}
          {screen === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-6xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => changeScreen("menu")}
                    className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider font-mono">
                    Character sheet
                  </h2>
                </div>
                <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded text-emerald-400 font-mono text-xs shadow">
                  <span>UNALLOCATED SKILL POINTS:</span>
                  <span className="font-black text-sm text-yellow-400">{skillPoints}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="bg-slate-950 border-2 border-emerald-950 p-6 rounded relative overflow-hidden flex flex-col items-center shadow-lg">
                  <div className="absolute top-2 right-2 text-6xl font-black text-slate-900/50 select-none">L99</div>

                  <div className="w-40 h-40 bg-slate-900 border-4 border-slate-800 rounded-full mb-6 z-10 flex items-center justify-center relative shadow">
                    <User className="w-20 h-20 text-emerald-500 animate-pulse" />
                    <div className="absolute -bottom-2 bg-emerald-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded uppercase font-mono shadow">
                      {CLASS_PROFILES[activeClass].id}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white uppercase tracking-wide z-10 mb-2">
                    TAMIL SELVAN K
                  </h3>
                  <div className="px-3 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold uppercase tracking-wider text-xs rounded mb-5 z-10">
                    {CLASS_PROFILES[activeClass].name}
                  </div>

                  <div className="w-full space-y-4 font-mono text-xs text-slate-400 border-t border-slate-900/60 pt-4">
                    <p className="leading-relaxed text-center italic text-[11px]">
                      &ldquo;A computer engineer crafting responsive full-stack modules based in Chennai. Specializes in solving runtime bottlenecks and streamlining database caches.&rdquo;
                    </p>
                    <div className="bg-slate-900/70 p-3 rounded space-y-1.5 font-bold">
                      <div className="flex justify-between">
                        <span>Class Attack:</span>
                        <span className="text-red-500 uppercase">{CLASS_PROFILES[activeClass].attack}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Class Ultimate:</span>
                        <span className="text-cyan-400 uppercase">{CLASS_PROFILES[activeClass].special}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded shadow-xl">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-5 flex items-center border-b border-slate-800 pb-3">
                    <Swords className="w-5 h-5 mr-2.5 text-emerald-500" />
                    Specialization Skill Tree
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {userSkills.map((skill) => {
                      const isMaxed = skill.level >= skill.maxLevel;
                      return (
                        <div key={skill.id} className="bg-slate-950 border border-slate-800 p-4 rounded flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                                {skill.name}
                              </span>
                              <span className="text-xs bg-emerald-950 text-emerald-400 font-mono px-1.5 py-0.5 rounded font-extrabold max-w-max">
                                Lvl {skill.level}/{skill.maxLevel}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                              {skill.tech} Spell Path
                            </span>
                            <p className="text-slate-400 text-xs my-2 leading-relaxed font-mono">
                              {skill.desc}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-slate-900/50 pt-3">
                            <span className="text-[10px] text-yellow-400 font-bold font-mono">
                              {!isMaxed && `Alloc Gained`}
                            </span>
                            <button
                              disabled={isMaxed || skillPoints <= 0}
                              onClick={() => upgradeSkill(skill.id)}
                              className={`px-3 py-1.5 rounded font-mono text-[11px] font-bold uppercase transition-all cursor-pointer ${
                                isMaxed
                                  ? "bg-slate-900 text-slate-600 border border-transparent cursor-not-allowed"
                                  : skillPoints > 0
                                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                                  : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700 cursor-not-allowed"
                              }`}
                            >
                              {isMaxed ? "[MAXED OUT]" : `Upgrade (+1 pt)`}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: QUEST DUNGEON LOG */}
          {screen === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-6xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => changeScreen("menu")}
                    className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider font-mono">
                    Quest World Map
                  </h2>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase bg-slate-900 border border-slate-800 px-3 py-1 rounded">
                  Double tap a node to launch live code
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div className="lg:col-span-2 bg-slate-950 border-2 border-slate-800 rounded relative overflow-hidden h-[450px] flex flex-col shadow-2xl">
                  <div
                    className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#10b981_2px,transparent_2px),linear-gradient(90deg,#10b981_2px,transparent_2px)] bg-[size:40px_40px] pointer-events-none"
                  />

                  <div className="relative w-full h-full flex flex-col md:block p-4 overflow-y-auto md:overflow-hidden select-none">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block">
                      <path
                        d="M 25% 35% C 40% 45%, 45% 55%, 55% 65% C 65% 50%, 70% 40%, 75% 30% C 78% 50%, 78% 70%, 80% 80%"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="8 6"
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>

                    {QUEST_DUNGEONS.map((quest) => {
                      const isActive = activeQuest?.id === quest.id;
                      return (
                        <button
                          key={quest.id}
                          onClick={() => viewQuest(quest)}
                          className={`flex items-center md:absolute w-full md:w-auto p-3.5 md:p-0 my-2 md:my-0 bg-slate-950 md:bg-transparent border md:border-none rounded md:rounded-none text-left select-none outline-none group cursor-pointer transition-all ${
                            isActive
                              ? "border-emerald-500 font-bold"
                              : "border-slate-800 hover:border-slate-600"
                          }`}
                          style={{
                            left: `${quest.coords.x}%`,
                            top: `${quest.coords.y}%`,
                          }}
                        >
                          <div className="relative flex items-center justify-center shrink-0">
                            <div
                              className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all ${
                                isActive
                                  ? "border-emerald-400 bg-emerald-950 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.7)] scale-110"
                                  : "border-slate-700 bg-slate-900 text-slate-500 hover:border-emerald-500 hover:text-emerald-400"
                              }`}
                            >
                              <TerminalSquare className="w-5 h-5" />
                            </div>
                            <span className="absolute -top-1 -right-1 text-[8px] bg-emerald-600 text-black px-1.5 py-0.2 rounded-full font-black text-center">
                              {quest.difficulty.charAt(0)}
                            </span>
                          </div>

                          <div className="ml-3 md:absolute md:top-14 md:ml-0 md:bg-black/95 md:border md:border-slate-800 md:px-2 md:py-1 md:rounded md:shadow-lg w-max md:opacity-90 group-hover:opacity-100 transition-opacity">
                            <div className="text-white text-xs font-bold leading-tight uppercase font-mono group-hover:text-emerald-400">
                              {quest.title}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase font-mono">
                              DIFFICULTY: {quest.difficulty}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-950 border-2 border-slate-800 rounded p-6 flex flex-col justify-between shadow-2xl">
                  {activeQuest ? (
                    <div className="space-y-6 flex-1 flex flex-col justify-between font-mono">
                      <div>
                        <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-3">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">
                              {activeQuest.type} Dossier
                            </span>
                            <h3 className="text-2xl font-black text-white uppercase tracking-wide">
                              {activeQuest.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => setActiveQuest(null)}
                            className="p-1.5 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-white rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] rounded text-emerald-400 font-bold mb-4 animate-pulse">
                          <span>Difficulty:</span>
                          <span className="text-red-500 uppercase">{activeQuest.difficulty}</span>
                        </div>

                        <div className="space-y-4 text-xs text-slate-300">
                          <div>
                            <strong className="text-slate-400 uppercase text-[10px] block mb-1">
                              Mission Objective
                            </strong>
                            <p className="leading-relaxed text-slate-400">
                              {activeQuest.description}
                            </p>
                          </div>

                          <div>
                            <strong className="text-slate-400 uppercase text-[10px] block mb-1">
                              System Tech Stack
                            </strong>
                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                              {activeQuest.tech.map((t) => (
                                <span
                                  key={t}
                                  className="text-[9px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-cyan-400 font-bold"
                                >
                                  [{t}]
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <strong className="text-yellow-400 uppercase text-[10px] block mb-1 flex items-center">
                              <Trophy className="w-3.5 h-3.5 mr-1" /> XP / Credits Gained
                            </strong>
                            <ul className="space-y-0.5 text-slate-400">
                              {activeQuest.rewards.map((r) => (
                                <li key={r} className="text-amber-400 text-[11px] font-bold">
                                  + {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-900 mt-6">
                        <a
                          href={activeQuest.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-3.5 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase text-xs tracking-wider flex items-center justify-center space-x-2 group transition-all"
                        >
                          <Github className="w-4 h-4 group-hover:scale-110 animate-pulse" />
                          <span>Inspect Source Artifact</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 font-mono py-12">
                      <Gamepad2 className="w-12 h-12 mb-3 text-slate-700 animate-bounce" />
                      <p className="text-xs uppercase">Select a node target from the Quest Map panel to view full technical dossier files.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: TURN-BASED BOSS FIGHT */}
          {screen === "battle" && (
            <motion.div
              key="battle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setCombatState("not_started");
                      changeScreen("menu");
                    }}
                    className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded transition-colors whitespace-nowrap"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider font-mono">
                    Boss Battle Arena
                  </h2>
                </div>
                <div className="text-[10px] font-mono text-rose-500 uppercase bg-rose-950/20 border border-rose-900 px-3 py-1 rounded">
                  Status: Red Alert
                </div>
              </div>

              {combatState === "not_started" && (
                <div className="bg-slate-950 border-4 border-red-950/50 p-8 rounded text-center max-w-xl mx-auto shadow-2xl">
                  <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-white italic mb-1 uppercase">
                    LEGACY CODE DRAGON ENCOUNTER
                  </h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed max-w-sm mx-auto mb-6">
                    A terrifying server crash loop is preventing production deployment. Refactor dependencies and launch serverless scripts to defeat the Bug-Lord!
                  </p>
                  <button
                    onClick={startCombat}
                    className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-mono font-black uppercase tracking-widest text-sm rounded cursor-pointer"
                  >
                    🚀 Lock Deploy Targets
                  </button>
                </div>
              )}

              {combatState === "fighting" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="bg-slate-950 border-2 border-emerald-990 p-4 rounded relative overflow-hidden">
                      <div className="flex justify-between items-center mb-2 font-mono text-xs">
                        <span className="text-white font-bold uppercase">{CLASS_PROFILES[activeClass].name}</span>
                        <span className="text-emerald-500 font-bold">RECRUITER RANGER</span>
                      </div>
                      <div className="h-4 bg-slate-900 rounded-sm overflow-hidden border border-slate-800 p-0.5">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${(playerHp / CLASS_PROFILES[activeClass].maxHp) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-1">
                        <span>HP: {playerHp}/{CLASS_PROFILES[activeClass].maxHp}</span>
                        <span>MP: {playerMp}/{CLASS_PROFILES[activeClass].maxMana}</span>
                      </div>
                    </div>

                    <div className={`bg-slate-950 border-2 border-red-900 p-4 rounded relative overflow-hidden transition-all duration-200 ${bossActionEffect ? "bg-red-950/40 border-red-500 scale-[1.02]" : ""}`}>
                      <div className="flex justify-between items-center mb-2 font-mono text-xs">
                        <span className="text-rose-500 font-extrabold uppercase">👾 Lvl 999 BUG-LORD OVERLORD</span>
                        <span className="text-red-400 font-extrabold animate-pulse">ANGER INDEX: HIGH</span>
                      </div>
                      <div className="h-4 bg-slate-900 rounded-sm overflow-hidden border border-slate-800 p-0.5">
                        <div
                          className="h-full bg-red-600 transition-all duration-300"
                          style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-1">
                        <span>Weakness: Refactoring algorithms</span>
                        <span>HEALTH: {bossHp}/{maxBossHp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/85 border-4 border-slate-800 h-64 relative rounded flex flex-col md:flex-row items-center justify-around overflow-hidden shadow-2xl py-6 px-12">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <motion.div
                      animate={isPlayerTurn ? { x: [0, 8, -8, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center z-10"
                    >
                      <User className="w-16 h-16 text-emerald-400 mb-2 drop-shadow-[0_0_10px_#10b981]" />
                      <div className="text-[10px] font-mono bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded text-white italic">
                        REFACTORING STRIKER
                      </div>
                    </motion.div>

                    <div className="relative flex items-center justify-center">
                      <Swords className="w-12 h-12 text-slate-600 animate-spin-slow rotate-45" />
                      <div className="absolute font-black text-rose-500 font-mono text-xs animate-pulse">VS</div>
                    </div>

                    <motion.div
                      animate={!isPlayerTurn ? { x: [0, -8, 8, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center z-10"
                    >
                      <TerminalSquare className={`w-16 h-16 text-red-500 mb-2 ${bossActionEffect ? "scale-110 text-red-400 rotate-12" : ""} transition-all`} />
                      <div className="text-[10px] font-mono bg-red-950 border border-red-900 px-2 py-0.5 rounded text-white italic">
                        {bossActionEffect ? `CASTING [${bossActionEffect}]` : "MONOLITH DRAGON"}
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start font-mono">
                    <div className="bg-slate-950 border-2 border-slate-800 p-5 rounded space-y-3.5">
                      <h4 className="text-white text-xs font-black uppercase text-center border-b border-slate-800 pb-2">COMMAND CARD:</h4>

                      <button
                        disabled={!isPlayerTurn}
                        onClick={() => executeCombatAction("normal")}
                        className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] transition-all text-black font-extrabold uppercase text-xs flex items-center justify-center space-x-1 border-[2px] border-emerald-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Swords className="w-4 h-4" />
                        <span>Slash Refactor</span>
                      </button>

                      <button
                        disabled={!isPlayerTurn || playerMp < 35}
                        onClick={() => executeCombatAction("special")}
                        className="w-full py-3 rounded bg-cyan-600 hover:bg-cyan-500 hover:scale-[1.01] transition-all text-white font-extrabold uppercase text-xs flex items-center justify-center space-x-1 border-[2px] border-cyan-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Ultimate Deploy (-35 MP)</span>
                      </button>

                      <button
                        disabled={!isPlayerTurn}
                        onClick={() => executeCombatAction("heal")}
                        className="w-full py-3 rounded bg-black hover:bg-slate-900 border-2 border-slate-800 text-slate-300 font-extrabold uppercase text-xs flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-40"
                      >
                        <Coffee className="w-4 h-4" />
                        <span>Hotfix Quick Patch</span>
                      </button>
                    </div>

                    <div className="md:col-span-2 bg-slate-950 border-2 border-slate-900 p-5 rounded h-56 overflow-y-auto flex flex-col justify-end space-y-2 select-text">
                      {battleLogs.map((log, i) => (
                        <div key={i} className="text-xs text-slate-400 font-mono tracking-wide">
                          <span className="text-slate-600 mr-2">[{i + 1}]</span>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {combatState === "game_over" && (
                <div className="bg-slate-950 border-4 border-red-950 p-8 rounded text-center max-w-xl mx-auto shadow-2xl">
                  <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-rose-500 mb-2 uppercase">Your thread is blocked!</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed max-w-sm mx-auto mb-6">
                    The Overlord managed to overload the deploy container. Standard refactoring protocols failed, recompile index caches and re-run container tests!
                  </p>
                  <button
                    onClick={startCombat}
                    className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-black uppercase text-xs rounded transition-all cursor-pointer"
                  >
                    🔄 Recompile Container (Attemp fight)
                  </button>
                </div>
              )}

              {combatState === "victory" && (
                <div className="bg-slate-950 border-4 border-emerald-950 p-8 rounded text-center max-w-xl mx-auto shadow-2xl font-mono">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 text-yellow-400 mx-auto mb-4 bg-yellow-950/20 border border-yellow-800 rounded-full flex items-center justify-center"
                  >
                    <Trophy className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-3xl font-extrabold text-white uppercase italic tracking-tight mb-2">
                    BUG MONOLITH SANITIZED!
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto mb-6 bg-slate-900 border border-slate-800 p-4 rounded">
                    Recruiter achieved legendary status! Tamil Selvan K has leveled up to Level 100 [Archmage of Code] and loaded all project assets.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => changeScreen("contact")}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold uppercase text-xs rounded shadow transition-all cursor-pointer font-bold"
                    >
                      📝 Hire Lvl 100 Dev
                    </button>
                    <button
                      onClick={() => {
                        setCombatState("not_started");
                        changeScreen("menu");
                      }}
                      className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 font-extrabold uppercase text-xs rounded transition-all cursor-pointer font-bold"
                    >
                      🔙 Return To Core Deck
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN: EQUIPMENT MERCHANT SHOP */}
          {screen === "shop" && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-6xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => changeScreen("menu")}
                    className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider font-mono">
                    Equipment Merchant
                  </h2>
                </div>
                <div className="font-mono text-xs text-amber-400 font-bold bg-slate-900/60 px-3 py-1.5 border border-slate-800 rounded flex items-center space-x-1.5">
                  <Coins className="w-4 h-4" />
                  <span>PREMIUM COINS: {coins}G</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 p-6 rounded shadow-lg">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center border-b border-slate-800 pb-2.5">
                    <ShoppingBag className="w-4 h-4 mr-2 text-amber-500 animate-pulse" />
                    Stocks available
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shopPreset.map((item) => {
                      const isAffordable = coins >= item.cost;
                      return (
                        <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded flex flex-col justify-between">
                          <div>
                            <div className="flex items-center space-x-2.5 mb-2">
                              <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-[13px] font-bold text-white uppercase font-mono tracking-wide">
                                  {item.name}
                                </h4>
                                <span className="text-[10px] text-amber-400 font-bold font-mono">
                                  Price: {item.cost} Gold Coins
                                </span>
                              </div>
                            </div>
                            <p className="text-slate-400 text-xs font-mono mb-4 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          <button
                            disabled={!isAffordable}
                            onClick={() => buyShopItem(item)}
                            className={`w-full py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isAffordable
                                ? "bg-amber-600 hover:bg-amber-500 text-white"
                                : "bg-slate-900 text-slate-600 border border-transparent cursor-not-allowed"
                            }`}
                          >
                            {isAffordable ? "Buy Pack item" : "[INSUFFICIENT FUNDS]"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-950 border-2 border-slate-800 p-6 rounded shadow-2xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 border-b border-slate-900 pb-2.5">
                    🎒 Recruiter tactical Bag
                  </h3>

                  {ownedItems.length > 0 ? (
                    <div className="space-y-3">
                      {ownedItems.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="bg-slate-900 border border-slate-800 p-3 rounded flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 bg-black rounded">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-xs text-white uppercase font-mono font-bold leading-tight">{item.name}</div>
                              <span className="text-[9px] text-emerald-400 font-mono">Consumable Buff</span>
                            </div>
                          </div>

                          {(item.hpHeal > 0 || item.mpGain > 0) ? (
                            <button
                              onClick={() => handleUseItem(item)}
                              className="px-2.5 py-1.5 bg-slate-950 hover:bg-emerald-950 border border-slate-800 hover:border-emerald-500 text-emerald-400 font-bold text-[10px] uppercase font-mono rounded cursor-pointer"
                            >
                              Eat / Drink
                            </button>
                          ) : (
                            <span className="text-[9px] bg-slate-950 border border-slate-800 text-slate-500 font-mono font-bold px-2 py-0.5 rounded uppercase">
                              Passive
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center font-mono text-slate-600">
                      <ShoppingBag className="w-10 h-10 mb-3 text-slate-800 animate-pulse" />
                      <p className="text-xs uppercase leading-relaxed">Your tactical bag ledger is currently empty. Buy health or MP potions from the Merchant to survive the Bug battles.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: ACHIEVEMENTS TROPHY RECORD CABINET */}
          {screen === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-6 flex items-center space-x-3">
                <button
                  onClick={() => changeScreen("menu")}
                  className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider font-mono">
                  Trophy Records Cabinet
                </h2>
              </div>

              <div className="bg-slate-950 border-2 border-slate-800 p-6 rounded space-y-4 shadow-2xl">
                {achievements.map((ach) => {
                  return (
                    <div
                      key={ach.id}
                      className={`flex items-start p-4 rounded border transition-all ${
                        ach.unlocked
                          ? "bg-slate-900/60 border-emerald-950 shadow"
                          : "bg-black/50 border-slate-900 opacity-60"
                      }`}
                    >
                      <div className="mr-4 mt-0.5">
                        <Award
                          className={`w-8 h-8 ${
                            ach.unlocked ? "text-yellow-400 animate-pulse" : "text-slate-700"
                          }`}
                        />
                      </div>

                      <div className="font-mono">
                        <div className="flex items-center space-x-2.5 mb-1.5">
                          <h4
                            className={`text-sm font-extrabold uppercase ${
                              ach.unlocked ? "text-white" : "text-slate-500"
                            }`}
                          >
                            {ach.title}
                          </h4>
                          {ach.unlocked ? (
                            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-extrabold px-1.5 py-0.2 rounded uppercase">
                              Unlocked
                            </span>
                          ) : (
                            <span className="text-[10px] bg-zinc-950 text-slate-600 font-bold px-1.5 py-0.2 rounded uppercase">
                              Locked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN: CONTACT ME */}
          {screen === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl w-full mx-auto px-4 py-8 select-none"
            >
              <div className="mb-8 flex items-center space-x-4">
                <button
                  onClick={() => changeScreen("menu")}
                  className="p-2.5 bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-400 hover:text-purple-400 rounded transition-colors whitespace-nowrap cursor-pointer"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="text-[10px] text-purple-400 uppercase font-mono tracking-widest font-bold">
                    GET IN TOUCH
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-wider font-mono">
                    Let&apos;s Connect
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">
                {/* Left Side: Contact details of Tamil Selvan K */}
                <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-6 md:p-8 shadow-2xl flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-mono font-bold text-lg leading-tight">
                      Let&apos;s design something great together.
                    </h3>
                    
                    <p className="text-slate-400 text-xs leading-relaxed font-sans">
                      I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-900 font-mono text-[11px]">
                    {/* Location Info Element */}
                    <div className="flex items-start space-x-3 text-slate-300">
                      <div className="p-2 bg-purple-950/40 border border-purple-900/50 rounded-lg text-purple-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                          LOCATION
                        </div>
                        <div className="text-white text-[11.5px] font-bold">
                          Chennai, Tamil Nadu, India
                        </div>
                      </div>
                    </div>

                    {/* Email Info Element */}
                    <div className="flex items-start space-x-3 text-slate-300">
                      <div className="p-2 bg-purple-950/40 border border-purple-900/50 rounded-lg text-purple-400 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                          EMAIL ADDRESS
                        </div>
                        <a 
                          href="mailto:tamilselvan.k.dev@gmail.com" 
                          className="text-purple-400 hover:text-purple-300 text-[11.5px] font-bold underline transition-colors"
                        >
                          tamilselvan.k.dev@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Channels Connect */}
                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">
                      SOCIAL LINKS:
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href="https://github.com/tamil-selvan-k"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-500 rounded-lg transition-all"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 rounded-lg transition-all"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Redirect Panel */}
                <div className="md:col-span-3 bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-xl shadow-2xl relative flex flex-col justify-center items-center text-center space-y-6">
                  <div className="p-4 bg-purple-950/20 border border-purple-900 rounded-full text-purple-400">
                    <MessageSquare className="w-10 h-10 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-white uppercase tracking-wider font-mono">
                      Visit Main Portfolio
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      The internal contact channels have been redirected. Please visit my official portfolio portal to connect, schedule a meeting, or send direct inquiries.
                    </p>
                  </div>
                  <a
                    href="https://tamil-selvan-k.vercel.app/#contact"
                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 hover:scale-[1.01] active:scale-[0.99] text-white font-extrabold uppercase text-xs rounded-lg tracking-widest flex items-center justify-center space-x-2.5 cursor-pointer shadow-lg border border-purple-400 transition-all font-mono"
                  >
                    <span>Connect At Vercel Portal</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
