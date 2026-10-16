from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import os

pdf_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'Raghvender_Tyagi_Resume.pdf')
doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
styles = getSampleStyleSheet()

title_style = ParagraphStyle('Title', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#161616'))
subtitle_style = ParagraphStyle('Subtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=colors.HexColor('#3B4BFF'))
contact_style = ParagraphStyle('Contact', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#333333'))
h1_style = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=colors.HexColor('#161616'), spaceBefore=8, spaceAfter=2)
body_bold = ParagraphStyle('BodyBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor('#161616'))
body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#222222'))
bullet_style = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8.2, leading=11, leftIndent=10, textColor=colors.HexColor('#222222'))

story = []

# Header
story.append(Paragraph('RAGHVENDER TYAGI', title_style))
story.append(Paragraph('AI Systems & Distributed Backend Engineer | B.Tech CSE (AI), KIET \'27', subtitle_style))
story.append(Paragraph('Email: raghvendertyagi@gmail.com | Phone: +91 7253020660 | Delhi NCR, India<br/>LinkedIn: linkedin.com/in/raghvender-tyagi-05a881247 | GitHub: github.com/raghvender-tyagi | LeetCode: leetcode.com/u/raghvendertyagi', contact_style))
story.append(Spacer(1, 6))
story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#161616'), spaceAfter=6))

# Experience
story.append(Paragraph('EXPERIENCE', h1_style))
story.append(Paragraph('<b>Lightning Leap Analytics</b> — AI Research Intern (Remote) <font color="#666666">| Jan 2026 – May 2026</font>', body_bold))
story.append(Paragraph('<i>Contributions to Tequity (Enterprise AI Analytics Platform):</i>', body_style))
story.append(Paragraph('&bull; Engineered natural-language query retrieval pipelines and semantic metadata indexing to ground enterprise questions in schema context.', bullet_style))
story.append(Paragraph('&bull; Developed an agentic multi-agent workflow in LangGraph featuring state persistence, custom domain tools, and dynamic query routing between specialized sub-agents.', bullet_style))
story.append(Paragraph('&bull; Constructed hybrid Text-to-SQL engine on PostgreSQL (pgvector) with dual-layer AST and regex validator (validate_sql_access) enforcing strict RBAC and preventing raw data exposure.', bullet_style))
story.append(Spacer(1, 4))

# Projects
story.append(Paragraph('SELECTED PROJECTS', h1_style))
story.append(Paragraph('<b>TakeMyCompute</b> | <i>Django, Channels, Redis, Docker, PostgreSQL, Celery, WebSockets</i>', body_bold))
story.append(Paragraph('&bull; Distributed P2P compute marketplace allowing hardware providers to monetize idle compute and renters to run untrusted code.', bullet_style))
story.append(Paragraph('&bull; Enforced containerized isolation with docker-py, applying hard cgroup CPU/RAM limits and an isolated bridge network namespace.', bullet_style))
story.append(Paragraph('&bull; Implemented real-time system telemetry via psutil over WebSockets and Redis Pub/Sub log streaming with REST fallback.', bullet_style))
story.append(Spacer(1, 3))

story.append(Paragraph('<b>Paperly AI</b> | <i>LangGraph, Python, ThreadPoolExecutor, Django, Celery, Redis, arXiv API</i>', body_bold))
story.append(Paragraph('&bull; Autonomous multi-agent research engine orchestrating literature synthesis and academic paper generation.', bullet_style))
story.append(Paragraph('&bull; Parallelized LLM workers via ThreadPoolExecutor inside LangGraph, slashing end-to-end synthesis latency by 65%.', bullet_style))
story.append(Paragraph('&bull; Built async Django + Celery + Redis pipeline preventing HTTP timeouts; integrated arXiv API for literature and novelty scoring.', bullet_style))
story.append(Spacer(1, 3))

story.append(Paragraph('<b>NETRA MITRA</b> | <i>Raspberry Pi, ESP32-CAM, Ultrasonic Sensors, Decision Tree, Embedded Python</i>', body_bold))
story.append(Paragraph('&bull; AI robotic guidance system for visually impaired people with 8 ultrasonic sensors and decision-tree obstacle avoidance.', bullet_style))
story.append(Paragraph('&bull; Dual-processor edge pipeline coupling ESP32-CAM video capture with Raspberry Pi scene description and audio cues. Patent filed (2024).', bullet_style))
story.append(Spacer(1, 3))

story.append(Paragraph('<b>GitHub Change Impact Analyzer</b> | <i>Python, Static Analysis, AST, Dependency Graphs, ML</i>', body_bold))
story.append(Paragraph('&bull; Pull request intelligence tool analyzing code changes, dependency graphs, and static ASTs to detect downstream blast radius and risk.', bullet_style))
story.append(Spacer(1, 4))

# Technical Skills
story.append(Paragraph('TECHNICAL SKILLS', h1_style))
story.append(Paragraph('<b>Languages:</b> Java, Python, SQL<br/><b>Backend:</b> Django, FastAPI, PostgreSQL, Redis, Celery, REST APIs<br/><b>GenAI & Agents:</b> LangGraph, LangChain, RAG, MCP, Multi-Agent Architectures<br/><b>Distributed Systems:</b> Docker (cgroups, namespaces), WebSockets (Channels), Redis Pub/Sub, System Monitoring<br/><b>CS Fundamentals:</b> Data Structures & Algorithms, OOP, Operating Systems, DBMS, Computer Networks', body_style))
story.append(Spacer(1, 4))

# Patent & Certifications
story.append(Paragraph('PATENT & CERTIFICATIONS', h1_style))
story.append(Paragraph('&bull; <b>Patent Application Filed (2024):</b> AI-Powered Robotic Guidance System for Visually Impaired Individuals', bullet_style))
story.append(Paragraph('&bull; <b>AWS Certified AI Practitioner</b> — Amazon Web Services', bullet_style))
story.append(Paragraph('&bull; <b>LangGraph</b> — LangChain Academy', bullet_style))
story.append(Spacer(1, 4))

# Achievements
story.append(Paragraph('ACHIEVEMENTS & HACKATHONS', h1_style))
story.append(Paragraph('&bull; Winner, INNOTECH (KIET Group of Institutions)', bullet_style))
story.append(Paragraph('&bull; Finalist, OpenAI State Finals (Noida International University)', bullet_style))
story.append(Paragraph('&bull; Finalist, Techno-Business Finals (Jaipuria Institute of Management)', bullet_style))
story.append(Paragraph('&bull; Winner, Innovation Project Award (Smart Irrigation System)', bullet_style))
story.append(Paragraph('&bull; 1st Rank (Department Teams), Smart India Hackathon (Institute-level Selection)', bullet_style))
story.append(Spacer(1, 4))

# Education
story.append(Paragraph('EDUCATION', h1_style))
story.append(Paragraph('<b>KIET Group of Institutions, Ghaziabad</b> — B.Tech in CSE (Artificial Intelligence) <font color="#666666">| Oct 2023 – 2027</font>', body_bold))
story.append(Paragraph('CGPA: 7.6 / 10.0', body_style))

doc.build(story)
print("PDF created at:", pdf_path)

