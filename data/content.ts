export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  pitch: string;
  category: "All" | "Backend" | "GenAI & Agents" | "Robotics";
  tags: string[];
  bullets: string[];
  liveUrl?: string | null;
  githubUrl: string;
  image?: string;
  note?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  platform: string;
  bullets: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  institution: string;
  year?: string;
  icon: "trophy" | "patent" | "cert" | "folder";
}

export interface BuildLogEntry {
  filename: string;
  title: string;
  date: string;
  tag: string;
  readTime: string;
  summary: string;
}

export const portfolioContent = {
  meta: {
    name: "Raghvender Tyagi",
    role: "AI Systems & Distributed Backend Engineer",
    shortRole: "AI Systems Engineer",
    siteUrl: "https://raghvender.vercel.app",
    tagline: "I build agents that ship, and systems that don't fall over.",
    description:
      "Retro Mac System 7 portfolio of Raghvender Tyagi. AI systems & distributed backend engineer specializing in LangGraph multi-agent architectures, sandboxed Docker compute, and secure Text-to-SQL pipelines.",
    location: "Ghaziabad / Delhi NCR, India",
    statusBadge: "Previously AI Research Intern @ Lightning Leap Analytics",
    availability: "OPEN TO ROLES",
  },

  hero: {
    greeting: "Hello. I'm Raghvender.",
    subline:
      "I build agents that ship, and systems that don't fall over. AI systems & distributed backend engineer. B.Tech CSE (AI), KIET '27.",
    statusLine: "Previously AI Research Intern @ Lightning Leap Analytics",
  },

  quickLinks: [
    { label: "Projects", href: "#projects", icon: "↗" },
    { label: "Experience", href: "#experience", icon: "↗" },
    { label: "About", href: "#about", icon: "↗" },
    { label: "Contact", href: "#contact", icon: "↗" },
  ],

  projects: [
    {
      id: "takemycompute",
      slug: "takemycompute",
      number: "01",
      title: "TakeMyCompute",
      pitch:
        "Distributed P2P compute marketplace where hardware providers monetize idle GPUs/CPUs and renters run untrusted workloads in sandboxed Docker.",
      category: "Backend",
      tags: ["Django", "Channels", "Redis", "Docker", "PostgreSQL", "Celery"],
      bullets: [
        "Providers monetize idle hardware; renters' workloads run in sandboxed Docker (docker-py with cgroup CPU/RAM caps and isolated bridge networks).",
        "psutil provider agent sends live CPU/RAM/Disk heartbeats over WebSockets.",
        "Django Channels + Redis Pub/Sub for low-latency log streaming with auto-reconnect and REST fallback.",
      ],
      liveUrl: "https://takemycompute.onrender.com",
      githubUrl: "https://github.com/raghvender-tyagi",
      image: "/paperly_ai.png",
    },
    {
      id: "paperly-ai",
      slug: "paperly-ai",
      number: "02",
      title: "Paperly AI",
      pitch:
        "Autonomous AI research engine orchestrating multi-agent graph workflows to synthesize literature and generate academic papers.",
      category: "GenAI & Agents",
      tags: [
        "LangGraph",
        "Python",
        "ThreadPoolExecutor",
        "Django",
        "Celery",
        "Redis",
        "arXiv API",
      ],
      bullets: [
        "LangGraph pipeline with parallel LLM workers (ThreadPoolExecutor), achieving 65% faster end-to-end generation.",
        "Django + Celery + Redis asynchronous processing pipeline preventing request timeouts on multi-stage agent workflows.",
        "arXiv API integration for automated literature analysis, prior-art gap discovery, and novelty scoring.",
      ],
      liveUrl: "https://paperly-ai.onrender.com/",
      githubUrl: "https://github.com/raghvender-tyagi",
      image: "/paperly_ai.png",
    },
    {
      id: "campex",
      slug: "campex",
      number: "03",
      title: "CampEx",
      pitch:
        "Campus peer-to-peer exchange and student marketplace with verified college email authentication and contextual buyer-seller messaging.",
      category: "Backend",
      tags: [
        "Django",
        "PostgreSQL",
        "Cloudinary",
        "Gunicorn",
        "WhiteNoise",
        "Bootstrap 5",
      ],
      bullets: [
        "Custom multi-tenant student auth resolving college email domains to institution profiles with automated UserProfile signal generation.",
        "Peer-to-peer campus marketplace supporting 4 transaction modes (Sell, Rent, Exchange, Free), condition grading, and relational wishlist indexing.",
        "Listing-linked asynchronous messaging channels with unread badge counters and real-time event notifications for transactions and saved items.",
      ],
      liveUrl: null, // TODO: Add live URL once deployed
      githubUrl: "https://github.com/raghvender-tyagi/CampEx",
      image: "/netra.jpeg",
    },
    {
      id: "gh-impact-analyzer",
      slug: "change-impact",
      number: "04",
      title: "GitHub Change Impact Analyzer",
      pitch:
        "Pull request static intelligence engine analyzing AST diff trees and module dependency graphs to predict downstream blast radius and risk.",
      category: "Backend",
      tags: [
        "Python",
        "Static Analysis",
        "AST",
        "Dependency Graphs",
        "Machine Learning",
      ],
      bullets: [
        "Analyzes PRs using dependency graphs, static analysis, and ML to flag risky changes and affected modules.",
        "Constructs module dependency graphs and AST differential trees to pinpoint indirect blast radius across repository microservices.",
        "Speeds up code review by providing automated risk scoring and check-run triage on incoming pull requests.",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
    },
    {
      id: "netra-mitra",
      slug: "netra-mitra",
      number: "05",
      title: "NETRA MITRA",
      pitch:
        "AI robotic guidance system enabling safe autonomous navigation, obstacle avoidance, and audio scene perception for visually impaired people.",
      category: "Robotics",
      tags: [
        "Raspberry Pi",
        "ESP32-CAM",
        "Ultrasonic Sensors",
        "Decision Trees",
        "Embedded Python",
      ],
      bullets: [
        "Spatial sensory array integrating 8 ultrasonic sensors with a decision-tree obstacle avoidance engine for instant path planning.",
        "ESP32-CAM and Raspberry Pi edge compute module for real-time environment perception and synthesized audio scene description.",
        "Patent application filed in 2024: AI-Powered Robotic Guidance System for Visually Impaired Individuals.",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
      image: "/netra.jpeg",
    },
    {
      id: "smart-pesticide",
      slug: "smart-pesticide",
      number: "06",
      title: "Smart Pesticide",
      pitch:
        "Edge-optimized PyTorch computer vision system for real-time crop disease detection and targeted precision chemical dispensing.",
      category: "Robotics",
      tags: ["PyTorch", "Computer Vision", "Edge AI", "Raspberry Pi", "Agritech"],
      bullets: [
        "Trained convolutional vision models to identify crop diseases in real-time under variable outdoor field lighting.",
        "Precision spraying mechanism spot-applying treatment only to affected foliage rather than broad-spectrum field dispersion.",
        "Testbed prototype evaluated for chemical volume reduction (pending confirmed field telemetry).",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
      note: "30% chemical reduction claim pending confirmation.",
    },
  ] as Project[],

  experience: {
    filename: "experience.txt",
    company: "Lightning Leap Analytics",
    role: "AI Research Intern",
    type: "Remote",
    period: "Jan 2026 – May 2026",
    platform: "Tequity (AI-driven enterprise analytics platform)",
    bullets: [
      "Natural-language query retrieval and semantic metadata indexing to ground enterprise questions in relational schema context.",
      "LangGraph multi-agent workflow with state persistence, custom tool execution, and dynamic query routing between specialized sub-agents.",
      "Hybrid Text-to-SQL engine on PostgreSQL (pgvector) with a dual-layer AST and regex validator (validate_sql_access) enforcing RBAC and blocking raw-data exposure.",
    ],
  },

  about: {
    filename: "readme.txt",
    bio: [
      "I am an AI systems and distributed backend engineer focused on autonomous multi-agent orchestration, sandboxed compute runtimes, and secure Text-to-SQL execution.",
      "I believe in building software that doesn't fall over when pushed into production—grounding probabilistic AI models with deterministic constraints, hard cgroup resource caps, and AST-level query validation.",
      "Currently in my final phase of B.Tech CSE (AI) at KIET Group of Institutions ('27), I pair research-grade agentic architectures with reliable distributed backend infrastructure.",
    ],
    education: {
      institution: "KIET Group of Institutions, Ghaziabad",
      degree: "B.Tech Computer Science & Engineering (Artificial Intelligence)",
      period: "Oct 2023 – 2027",
      cgpa: "7.6 / 10.0",
    },
  },

  skills: {
    filename: "system_info",
    groups: [
      {
        group: "Languages",
        items: ["Java", "Python", "SQL"],
      },
      {
        group: "Backend",
        items: [
          "Django",
          "FastAPI",
          "PostgreSQL",
          "Redis",
          "Celery",
          "REST APIs",
        ],
      },
      {
        group: "GenAI & Agents",
        items: ["LangGraph", "LangChain", "RAG", "MCP", "AI Agents"],
      },
      {
        group: "Distributed Systems",
        items: [
          "Docker (cgroups)",
          "WebSockets / Channels",
          "Redis Pub/Sub",
          "System Monitoring (psutil)",
        ],
      },
      {
        group: "CS Fundamentals",
        items: [
          "Data Structures & Algorithms",
          "OOP",
          "Operating Systems",
          "DBMS",
          "Computer Networks",
        ],
      },
    ] as SkillGroup[],
  },

  achievements: {
    filename: "achievements.finder",
    items: [
      {
        id: "patent-2024",
        title: "Patent Application Filed (2024)",
        event: "AI-Powered Robotic Guidance System for Visually Impaired",
        institution: "Indian Patent Office",
        icon: "patent",
      },
      {
        id: "aws-ai",
        title: "AWS Certified AI Practitioner",
        event: "Cloud Machine Learning & AI Services",
        institution: "Amazon Web Services",
        icon: "cert",
      },
      {
        id: "langgraph-acad",
        title: "LangGraph - LangChain Academy",
        event: "Advanced Agentic Multi-Agent Orchestration",
        institution: "LangChain Academy",
        icon: "cert",
      },
      {
        id: "innotech-win",
        title: "INNOTECH Winner",
        event: "Annual Technical Innovation Summit",
        institution: "KIET Group of Institutions",
        icon: "trophy",
      },
      {
        id: "openai-finals",
        title: "OpenAI State Finals",
        event: "State-level Generative AI Hackathon",
        institution: "Noida International University",
        icon: "trophy",
      },
      {
        id: "techno-biz",
        title: "Techno-Business Finals",
        event: "Business & Technological Innovation",
        institution: "Jaipuria Institute of Management",
        icon: "trophy",
      },
      {
        id: "smart-irrigation",
        title: "Innovation Project Award",
        event: "IoT Precision Smart Irrigation System",
        institution: "Department Innovation Award",
        icon: "folder",
      },
      {
        id: "sih-rank-1",
        title: "1st Rank (Department Teams)",
        event: "Smart India Hackathon",
        institution: "Institute-level Selection",
        icon: "trophy",
      },
    ] as AchievementItem[],
  },

  buildLog: [
    {
      filename: "2026-04-12-safe-sql.md",
      title: "Architecting Safe Text-to-SQL: Why Regex Isn't Enough and AST Parsing Saved Our Schema",
      date: "APR 2026",
      tag: "SECURITY",
      readTime: "4 MIN",
      summary:
        "Building validate_sql_access at Lightning Leap: handling nested subqueries, CTEs, and schema introspection bypasses without degrading query latency.",
    },
    {
      filename: "2026-03-01-agent-concurrency.md",
      title: "Benchmarking Celery vs ThreadPoolExecutor for Multi-Agent LLM Graph Workflows",
      date: "MAR 2026",
      tag: "PERFORMANCE",
      readTime: "5 MIN",
      summary:
        "Why our LangGraph paper generation hit a wall with pure async tasks, and how hybrid ThreadPoolExecutor concurrency cut end-to-end execution by 65%.",
    },
    {
      filename: "2026-01-15-sandboxed-docker.md",
      title: "Enforcing Hard cgroup Limits and Isolated Bridge Networks in P2P Compute",
      date: "JAN 2026",
      tag: "SYSTEMS",
      readTime: "6 MIN",
      summary:
        "Sandboxing untrusted tenant workloads on consumer host machines using docker-py, cgroups v2 resource capping, and isolated virtual network namespaces.",
    },
  ] as BuildLogEntry[],

  contact: {
    filename: "mail.app",
    heading: "Say hello.",
    subheading:
      "Available for high-impact roles in AI systems engineering, distributed backend architectures, and agentic infrastructure.",
    email: "raghvendertyagi@gmail.com",
    phone: "+91 7253020660",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/raghvender-tyagi",
        display: "github.com/raghvender-tyagi",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/raghvender-tyagi-05a881247",
        display: "linkedin.com/in/raghvender-tyagi",
      },
      {
        label: "LeetCode",
        href: "https://leetcode.com/u/raghvendertyagi",
        display: "leetcode.com/u/raghvendertyagi",
      },
    ],
  },
};
