export interface Project {
  id: string;
  number: string;
  title: string;
  pitch: string;
  category: "All" | "Backend" | "GenAI & Agents" | "Robotics";
  statusType: "shipped" | "repo";
  tags: string[];
  bullets: string[];
  liveUrl?: string | null;
  githubUrl: string;
  hasArchitectureDiagram?: boolean;
  architecture?: {
    summary: string;
    steps: { step: string; label: string; detail: string }[];
  };
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

export interface SkillCategory {
  category: string;
  code: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  event: string;
  institution: string;
  year?: string;
  type: "patent" | "certification" | "hackathon" | "award";
}

export interface BuildLogEntry {
  slug: string;
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
    tagline: "I build agents that ship. Systems that don't fall over.",
    description:
      "Portfolio of Raghvender Tyagi. AI systems & distributed backend engineer specializing in LangGraph multi-agent architectures, sandboxed Docker compute, and secure Text-to-SQL pipelines.",
    location: "Ghaziabad / Delhi NCR, India",
    statusBadge: "Previously AI Research Intern @ Lightning Leap Analytics",
    availability: "Open to High-Impact Roles",
    timeZone: "Asia/Kolkata",
    timeZoneLabel: "IST",
  },

  hero: {
    headline: {
      line1: "I build agents that ship.",
      line2: "Systems that don't fall over.",
    },
    subCopy:
      "AI systems & distributed backend engineer. LangGraph agents, sandboxed compute, secure Text-to-SQL. B.Tech CSE (AI), KIET '27.",
    ctas: [
      { label: "See the work", href: "#work", primary: true },
      { label: "Get in touch", href: "mailto:raghvendertyagi@gmail.com", primary: false },
    ],
  },

  now: {
    title: "NOW // ACTIVE_FOCUS",
    text: "Exploring sandboxed microVM runtimes for agent code execution and building deterministic evaluation harnesses for LangGraph multi-turn agents.",
    status: "R&D // FALL 2026",
  },

  stats: [
    {
      value: "01",
      label: "Patent Filed",
      detail: "AI robotic guidance system for visually impaired (2024)",
    },
    {
      value: "65%",
      label: "Latency Reduction",
      detail: "Parallelized LLM workers in Paperly AI via ThreadPoolExecutor",
    },
    {
      value: "AWS",
      label: "AI Practitioner",
      detail: "Certified in cloud AI services & ML infrastructure",
    },
    {
      value: "05",
      label: "Competition Honors",
      detail: "INNOTECH winner, OpenAI State & Techno-Business finalist",
    },
  ],

  projects: [
    {
      id: "takemycompute",
      number: "01",
      title: "TakeMyCompute",
      pitch:
        "Distributed P2P compute marketplace where hardware providers monetize idle GPUs/CPUs and renters run untrusted workloads in sandboxed Docker.",
      category: "Backend",
      statusType: "shipped",
      tags: [
        "Django",
        "Channels",
        "Redis",
        "Docker",
        "cgroups",
        "PostgreSQL",
        "Celery",
        "WebSockets",
      ],
      bullets: [
        "Constructed containerized sandbox isolation via docker-py, enforcing hard cgroup CPU/RAM caps and isolated bridge networks for untrusted execution.",
        "Engineered real-time system health and telemetry monitoring streaming psutil metrics over WebSockets to provider and renter dashboards.",
        "Architected fault-tolerant Redis Pub/Sub log streaming pipeline with automatic client reconnection and fallback REST endpoints.",
      ],
      liveUrl: "https://takemycompute.onrender.com",
      githubUrl: "https://github.com/raghvender-tyagi",
      hasArchitectureDiagram: true,
      architecture: {
        summary:
          "Distributed broker connecting browser clients, WebSocket coordinators, Celery worker nodes, and sandboxed Docker runtimes.",
        steps: [
          {
            step: "01",
            label: "Auth & Negotiation",
            detail: "Providers register specs; renters submit job specs via REST/WebSocket channel.",
          },
          {
            step: "02",
            label: "Broker Dispatch",
            detail: "Django Channels matches request to host; Celery schedules container spawn.",
          },
          {
            step: "03",
            label: "Sandbox Isolation",
            detail: "Docker container spins up with strict cgroup limits (CPU/RAM) & isolated veth bridge.",
          },
          {
            step: "04",
            label: "Live Pub/Sub Stream",
            detail: "psutil heartbeat and container stdout multiplexed via Redis Pub/Sub back to browser.",
          },
        ],
      },
    },
    {
      id: "paperly-ai",
      number: "02",
      title: "Paperly AI",
      pitch:
        "Autonomous AI research engine orchestrating multi-agent LangGraph workflows to synthesize literature and generate academic papers.",
      category: "GenAI & Agents",
      statusType: "shipped",
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
        "Architected a multi-agent LangGraph topology with parallel LLM workers via ThreadPoolExecutor, cutting end-to-end paper generation latency by 65%.",
        "Constructed an asynchronous Django + Celery + Redis processing pipeline, completely preventing HTTP timeouts on heavy multi-turn agent graphs.",
        "Integrated the arXiv API for automated literature extraction, prior-art gap discovery, and heuristic novelty validation scoring.",
      ],
      liveUrl: "https://paperly-ai.onrender.com/",
      githubUrl: "https://github.com/raghvender-tyagi",
      hasArchitectureDiagram: true,
      architecture: {
        summary:
          "Graph-based state machine with supervisor, parallel literature research workers, and iterative writer/critic loops.",
        steps: [
          {
            step: "01",
            label: "Topic Planning",
            detail: "Planner agent parses brief, outlines hypothesis, and generates arXiv search queries.",
          },
          {
            step: "02",
            label: "Parallel Retrieval",
            detail: "ThreadPoolExecutor queries arXiv API in parallel for semantic literature and citations.",
          },
          {
            step: "03",
            label: "Synthesis & Critique",
            detail: "Drafting agents synthesize sections with a cyclic critic agent evaluating coherence.",
          },
          {
            step: "04",
            label: "Async Compile",
            detail: "Celery task packages markdown, citations, and metadata for instant export.",
          },
        ],
      },
    },
    {
      id: "campex",
      number: "03",
      title: "CampEx",
      pitch:
        "Campus peer-to-peer exchange and student marketplace with verified college email authentication and contextual buyer-seller messaging.",
      category: "Backend",
      statusType: "repo",
      tags: [
        "Django",
        "PostgreSQL",
        "Cloudinary",
        "Gunicorn",
        "WhiteNoise",
        "Bootstrap 5",
      ],
      bullets: [
        "Constructed custom multi-tenant student auth resolving college email domains to institution profiles with automated UserProfile signal generation.",
        "Engineered peer-to-peer campus marketplace supporting 4 transaction modes (Sell, Rent, Exchange, Free), condition grading, and relational wishlist indexing.",
        "Implemented listing-linked asynchronous messaging channels with unread badge counters and real-time event notifications for transactions and saved items.",
      ],
      liveUrl: null, // TODO: Add live URL once deployed
      githubUrl: "https://github.com/raghvender-tyagi/CampEx",
    },
    {
      id: "gh-impact-analyzer",
      number: "04",
      title: "GitHub Change Impact Analyzer",
      pitch:
        "Pull request static intelligence engine analyzing AST diff trees and module dependency graphs to predict downstream blast radius and risk.",
      category: "Backend",
      statusType: "repo",
      tags: [
        "Python",
        "Static Analysis",
        "AST",
        "Dependency Graphs",
        "Machine Learning",
        "CI/CD",
      ],
      bullets: [
        "Constructed module dependency graphs and AST differential trees to pinpoint indirect blast radius across repository micro-services.",
        "Trained lightweight risk-scoring heuristics to classify pull request fragility and alert reviewers to high-volatility code paths.",
        "Integrated automated check-run status reporting and markdown PR comment generation for continuous integration triage.",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
    },
    {
      id: "netra-mitra",
      number: "05",
      title: "NETRA MITRA",
      pitch:
        "AI robotic guidance system enabling safe autonomous navigation, obstacle avoidance, and audio scene perception for visually impaired people.",
      category: "Robotics",
      statusType: "repo",
      tags: [
        "Raspberry Pi",
        "ESP32-CAM",
        "Ultrasonic Sensors",
        "Decision Trees",
        "Embedded Python",
        "Audio Scene Synthesis",
      ],
      bullets: [
        "Designed a spatial sensory unit pairing 8 ultrasonic sensors with a decision-tree navigation model for instant obstacle avoidance.",
        "Coupled an ESP32-CAM and Raspberry Pi edge compute module for real-time scene capture, object detection, and synthesized audio navigation cues.",
        "Patent application filed in 2024: AI-Powered Robotic Guidance System for Visually Impaired Individuals.",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
    },
    {
      id: "smart-pesticide",
      number: "06",
      title: "Smart Pesticide",
      pitch:
        "Edge-optimized PyTorch computer vision system for real-time crop disease detection and targeted precision chemical dispensing.",
      category: "Robotics",
      statusType: "repo",
      tags: ["PyTorch", "Computer Vision", "Edge AI", "Raspberry Pi", "Agritech"],
      bullets: [
        "Trained convolutional vision models to identify crop diseases in real-time under variable outdoor field lighting.",
        "Designed targeted actuation protocol to enable spot spraying on affected foliage rather than blanket field dispersion.",
        "Testbed prototype evaluated for reduction in chemical volume (pending user-verified field telemetry confirmation).",
      ],
      githubUrl: "https://github.com/raghvender-tyagi",
      note: "30% chemical reduction claim pending confirmation.",
    },
  ] as Project[],

  experience: [
    {
      company: "Lightning Leap Analytics",
      role: "AI Research Intern",
      type: "Remote",
      period: "Jan 2026 – May 2026",
      platform: "Tequity (AI-Driven Enterprise Analytics Platform)",
      bullets: [
        "Engineered natural-language query retrieval pipelines and semantic metadata indexing to ground enterprise questions in relational schema context.",
        "Developed an agentic multi-agent workflow in LangGraph featuring state persistence, custom domain tools, and dynamic query routing between specialized sub-agents.",
        "Constructed a hybrid Text-to-SQL engine on PostgreSQL (pgvector) with a dual-layer AST and regex validator (validate_sql_access) enforcing strict RBAC and preventing raw data exposure.",
      ],
    },
  ] as ExperienceItem[],

  skills: [
    {
      category: "Languages",
      code: "LANG",
      skills: ["Java", "Python", "SQL"],
    },
    {
      category: "Backend",
      code: "BACKEND",
      skills: ["Django", "FastAPI", "PostgreSQL", "Redis", "Celery", "REST"],
    },
    {
      category: "GenAI & Agents",
      code: "GENAI",
      skills: ["LangGraph", "LangChain", "RAG", "MCP", "AI Agents"],
    },
    {
      category: "Distributed",
      code: "DISTRIB",
      skills: [
        "Docker",
        "WebSockets (Channels)",
        "Redis Pub/Sub",
        "System Monitoring (psutil)",
      ],
    },
    {
      category: "CS Fundamentals",
      code: "CORE",
      skills: ["DSA", "OOP", "OS", "DBMS", "Computer Networks"],
    },
  ] as SkillCategory[],

  patentAndCerts: {
    patent: {
      title:
        "AI-Powered Robotic Guidance System for Visually Impaired Individuals",
      status: "Patent Application Filed",
      year: "2024",
      institution: "Indian Patent Office",
      description:
        "Autonomous wearable/robotic guidance system utilizing decision-tree obstacle avoidance, multi-sensor ultrasonic arrays, and edge computer vision audio feedback.",
    },
    certifications: [
      {
        name: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services (AWS)",
        badge: "AWS-AIP",
      },
      {
        name: "LangGraph - LangChain Academy",
        issuer: "LangChain Academy",
        badge: "LANG-ACAD",
      },
    ],
  },

  achievements: [
    {
      title: "Winner",
      event: "INNOTECH",
      institution: "KIET Group of Institutions",
      year: "2024",
      type: "hackathon",
    },
    {
      title: "Finalist",
      event: "OpenAI State Finals",
      institution: "Noida International University",
      year: "2024",
      type: "hackathon",
    },
    {
      title: "Finalist",
      event: "Techno-Business Finals",
      institution: "Jaipuria Institute of Management",
      year: "2024",
      type: "hackathon",
    },
    {
      title: "Winner",
      event: "Innovation Project Award",
      institution: "Smart Irrigation System",
      year: "2023",
      type: "award",
    },
    {
      title: "1st Rank (Department Teams)",
      event: "Smart India Hackathon",
      institution: "Institute-level Selection",
      year: "2023",
      type: "hackathon",
    },
  ] as Achievement[],

  education: {
    institution: "KIET Group of Institutions",
    location: "Ghaziabad, UP, India",
    degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
    period: "Oct 2023 – 2027",
    cgpa: "7.6",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Object-Oriented Programming",
      "Artificial Intelligence & Machine Learning",
    ],
  },

  buildLog: [
    {
      slug: "ast-validator-text-to-sql",
      title: "Architecting Safe Text-to-SQL: Why Regex Isn't Enough and AST Parsing Saved Our Schema",
      date: "APR 2026",
      tag: "SECURITY // SQL",
      readTime: "4 MIN",
      summary:
        "Building validate_sql_access at Lightning Leap: handling nested subqueries, CTEs, and schema introspection bypasses without degrading query latency.",
    },
    {
      slug: "celery-vs-threadpool-langgraph",
      title: "Benchmarking Celery vs ThreadPoolExecutor for Multi-Agent LLM Graph Workflows",
      date: "MAR 2026",
      tag: "PERF // AGENTS",
      readTime: "5 MIN",
      summary:
        "Why our LangGraph paper generation hit a wall with pure async tasks, and how hybrid ThreadPoolExecutor concurrency cut end-to-end execution by 65%.",
    },
  ] as BuildLogEntry[],

  contact: {
    heading: "Let's build reliable systems.",
    subheading:
      "Available for high-leverage roles in AI systems engineering, distributed backend architectures, and agentic infrastructure.",
    email: "raghvendertyagi@gmail.com",
    phone: "+91 7253020660",
    socials: [
      {
        label: "GitHub",
        code: "GH",
        href: "https://github.com/raghvender-tyagi",
        display: "github.com/raghvender-tyagi",
      },
      {
        label: "LinkedIn",
        code: "IN",
        href: "https://linkedin.com/in/raghvender-tyagi-05a881247",
        display: "linkedin.com/in/raghvender-tyagi",
      },
      {
        label: "LeetCode",
        code: "LC",
        href: "https://leetcode.com/u/raghvendertyagi",
        display: "leetcode.com/u/raghvendertyagi",
      },
      {
        label: "Resume",
        code: "PDF",
        href: "/Raghvender_Tyagi_Resume.pdf",
        display: "Download Resume [PDF]",
      },
    ],
  },
};

