import { portfolioContent } from "@/data/content";

export interface VirtualFile {
  name: string;
  type: "file" | "dir";
  content?: string;
  children?: Record<string, VirtualFile>;
}

export function buildVirtualFileSystem(): Record<string, VirtualFile> {
  const root: Record<string, VirtualFile> = {};

  // 1. /projects directory
  const projectsDir: Record<string, VirtualFile> = {};
  portfolioContent.projects.forEach((p) => {
    projectsDir[p.slug] = {
      name: p.slug,
      type: "file",
      content: `PROJECT: ${p.title} (#${p.number})
CATEGORY: ${p.category}
PITCH: ${p.pitch}

KEY ARCHITECTURAL HIGHLIGHTS:
${p.bullets.map((b) => `  - ${b}`).join("\n")}

TECH STACK: ${p.tags.join(", ")}
${p.note ? `NOTE: ${p.note}\n` : ""}GITHUB: ${p.githubUrl}${p.liveUrl ? `\nLIVE URL: ${p.liveUrl}` : ""}`,
    };
  });

  root["projects"] = {
    name: "projects",
    type: "dir",
    children: projectsDir,
  };

  // 2. /experience.txt
  const exp = portfolioContent.experience;
  root["experience.txt"] = {
    name: "experience.txt",
    type: "file",
    content: `COMPANY: ${exp.company} (${exp.type})
ROLE: ${exp.role}
PERIOD: ${exp.period}
PLATFORM: ${exp.platform}

DELIVERABLES & CONTRIBUTIONS:
${exp.bullets.map((b, i) => `  [0${i + 1}] ${b}`).join("\n")}`,
  };

  // 3. /about.txt
  const ab = portfolioContent.about;
  root["about.txt"] = {
    name: "about.txt",
    type: "file",
    content: `RAGHVENDER TYAGI - ${portfolioContent.meta.role}
Location: ${portfolioContent.meta.location}
Status: ${portfolioContent.meta.statusBadge}

BIO:
${ab.bio.join("\n\n")}

EDUCATION:
Institution: ${ab.education.institution}
Degree: ${ab.education.degree}
Period: ${ab.education.period}
CGPA: ${ab.education.cgpa}`,
  };

  // 4. /skills.txt
  const sk = portfolioContent.skills;
  root["skills.txt"] = {
    name: "skills.txt",
    type: "file",
    content: `TECHNICAL SKILLS & RUNTIME ARCHITECTURES:
${sk.groups.map((g) => `  [${g.group.toUpperCase()}]\n    ${g.items.join(" • ")}`).join("\n\n")}`,
  };

  // 5. /achievements directory
  const achDir: Record<string, VirtualFile> = {};
  portfolioContent.achievements.items.forEach((a) => {
    achDir[`${a.id}.txt`] = {
      name: `${a.id}.txt`,
      type: "file",
      content: `TITLE: ${a.title}
EVENT: ${a.event}
INSTITUTION: ${a.institution}
TYPE: ${a.icon.toUpperCase()}`,
    };
  });
  root["achievements"] = {
    name: "achievements",
    type: "dir",
    children: achDir,
  };

  // 6. /contact.txt
  const ct = portfolioContent.contact;
  root["contact.txt"] = {
    name: "contact.txt",
    type: "file",
    content: `EMAIL: ${ct.email}
PHONE: ${ct.phone}
LOCATION: ${portfolioContent.meta.location}

PROFILES:
${ct.socials.map((s) => `  ${s.label}: ${s.href}`).join("\n")}`,
  };

  // 7. /resume.pdf
  root["resume.pdf"] = {
    name: "resume.pdf",
    type: "file",
    content: `[BINARY PDF FILE] Use command: 'open resume' to view or download.`,
  };

  return root;
}
