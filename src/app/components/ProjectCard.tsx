import type { ReactNode } from "react";
import { Github, ExternalLink, Calendar, PlayCircle } from "lucide-react";

interface TroubleShooting {
  title: string;
  problem: ReactNode | ReactNode[];
  solution: ReactNode[];
}

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  variant?: "wide" | "phone";
}

interface ContributionSection {
  title: string;
  items: ReactNode[];
}

interface Project {
  title: string;
  githubUrl: string;
  notionUrl?: string;
  swaggerUrl?: string;
  resultVideoUrl?: string;
  period: string;
  summary: string;
  contributionTitle?: string;
  imageTitle?: string;
  contributions?: string[];
  contributionSections?: ContributionSection[];
  techStack: string[];
  images: ProjectImage[];
  troubleShooting: TroubleShooting[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function renderParagraphs(content: ReactNode | ReactNode[]) {
  const paragraphs = Array.isArray(content) ? content : [content];

  return paragraphs.map((paragraph, index) => (
    <p
      key={index}
      className="text-zinc-400 mt-1"
      style={{ fontSize: "0.8125rem", lineHeight: "1.7" }}
    >
      {paragraph}
    </p>
  ));
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const hasPhoneImage = project.images.some((image) => image.variant === "phone");

  return (
    <div className="project-card border border-zinc-700 rounded-xl overflow-hidden">
      <div className="project-overview flex min-h-64">
        <div className="flex-1 p-6 border-r border-zinc-700" style={{ minWidth: 0 }}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
            <h3 className="text-zinc-100" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
              {index + 1}. {project.title}
            </h3>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                style={{ fontSize: "0.75rem" }}
              >
                <Github size={12} />
                GitHub
              </a>

              {project.notionUrl && (
                <a
                  href={project.notionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-zinc-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                  style={{ fontSize: "0.75rem" }}
                >
                  <ExternalLink size={12} />
                  Notion
                </a>
              )}

              {project.swaggerUrl && (
                <a
                  href={project.swaggerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-zinc-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                  style={{ fontSize: "0.75rem" }}
                >
                  <ExternalLink size={12} />
                  Server Swagger
                </a>
              )}

              {project.resultVideoUrl && (
                <a
                  href={project.resultVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                  style={{ fontSize: "0.75rem" }}
                >
                  <PlayCircle size={12} />
                  Result Video
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-zinc-500 mb-3">
            <Calendar size={12} />
            <span style={{ fontSize: "0.8125rem" }}>{project.period}</span>
          </div>

          <p
            className="text-zinc-400 mb-4 pb-4 border-b border-zinc-700/60"
            style={{ fontSize: "0.875rem", lineHeight: "1.6" }}
          >
            {project.summary}
          </p>

          <div className="mb-4">
            <h4
              className="text-cyan-400 mb-2"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {project.contributionTitle ?? "구현 내용"}
            </h4>

            {project.contributionSections ? (
              <div className="space-y-3">
                {project.contributionSections.map((section) => (
                  <div key={section.title}>
                    <p className="text-zinc-100 mb-1" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                      {section.title}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-300" style={{ fontSize: "0.875rem", lineHeight: "1.65" }}>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-1 text-zinc-300" style={{ fontSize: "0.875rem", lineHeight: "1.65" }}>
                {(project.contributions ?? []).map((contribution, i) => (
                  <li key={i}>{contribution}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4
              className="text-cyan-400 mb-2"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              핵심 기술
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-zinc-700 text-cyan-300 border border-zinc-600"
                  style={{ fontSize: "0.75rem" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3" style={{ width: hasPhoneImage ? "330px" : "300px", flexShrink: 0 }}>
          <h4
            className="text-cyan-400 mb-1"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {project.imageTitle ?? "프로젝트 이미지"}
          </h4>

          <div className="grid grid-cols-2 gap-2 flex-1">
            {project.images.map((img, i) => (
              <figure
                key={i}
                className={`bg-zinc-700 rounded-lg overflow-hidden border border-zinc-600 ${img.variant === "wide" ? "col-span-2" : ""
                  }`}
              >
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block w-full object-cover"
                    style={{ aspectRatio: img.variant === "phone" ? "9/18" : "16/9" }}
                  />
                ) : (
                  <div className="text-center text-zinc-500 p-2">
                    <div className="text-xs">스크린샷 {i + 1}</div>
                  </div>
                )}

                {img.caption && (
                  <figcaption
                    className="px-2 py-1.5 bg-zinc-900/90 text-zinc-300 border-t border-zinc-700"
                    style={{ fontSize: "0.68rem", lineHeight: "1.35" }}
                  >
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>

      <section className="troubleshooting-section border-t border-zinc-700 p-6 bg-zinc-800/50">
        <h4
          className="text-cyan-400 mb-4"
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          트러블슈팅
        </h4>

        <div className="grid gap-5">
          {project.troubleShooting.map((ts, i) => (
            <div key={i} className="troubleshooting-card bg-zinc-800 rounded-lg p-5 border border-zinc-700/60">
              <p className="text-zinc-100 mb-3" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                {i + 1}. {ts.title}
              </p>

              <div className="space-y-4">
                <div>
                  <span
                    className="text-zinc-500"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    문제 배경
                  </span>
                  <div className="space-y-2">{renderParagraphs(ts.problem)}</div>
                </div>

                <div>
                  <span
                    className="text-cyan-500"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    해결 방법
                  </span>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 mt-1" style={{ fontSize: "0.8125rem", lineHeight: "1.7" }}>
                    {ts.solution.map((solution, i) => (
                      <li key={i}>{solution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export type { Project };
