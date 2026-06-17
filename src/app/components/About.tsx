import type { ReactNode } from "react";

function Emphasis({ children }: { children: ReactNode }) {
  return (
    <span className="underline underline-offset-4 decoration-cyan-400 decoration-2">
      {children}
    </span>
  );
}

const skillGroups = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate"],
  },
  {
    title: "Database / Cache",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Python & Deep Learning",
    items: ["Python", "OpenCV", "YOLOv8", "TensorFlow"],
  },
  {
    title: "DevOps / Docs",
    items: ["AWS", "Docker", "Render", "Swagger"],
  },
];

export function About() {
  return (
    <section className="about-section p-8 border-b border-zinc-700">
      <h2
        className="text-cyan-400 mb-4 pb-2 border-b border-zinc-700"
        style={{ fontSize: "1.125rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
      >
        About Me
      </h2>

      <div className="space-y-5 text-zinc-300" style={{ lineHeight: "1.85" }}>
        <p className="space-y-1" style={{ fontSize: "1.125rem" }}>
          <span className="block text-cyan-400 font-semibold">
            책임감을 가지고 끝까지 수행하는 개발자가 되고자 합니다.
          </span>
          <span className="block">
            팀장, 대표처럼 조직을 이끄는 역할도 피하지 않고 맡아왔습니다.
          </span>
          <span className="block">
            학습한 내용을 GitHub에 꾸준히 기록하고, 다양한 알고리즘 문제를 해결하며{" "}
            <Emphasis>1000+개 Commit</Emphasis>을 쌓았습니다.
          </span>
        </p>

        <p className="space-y-1" style={{ fontSize: "1rem" }}>
          <span className="block text-cyan-400 font-semibold">
            사용자의 불편함을 기술로 개선하는 경험을 중요하게 생각합니다.
          </span>
          <span className="block">
            기존의 <Emphasis>채혈을 통한 백혈구 측정을 개선</Emphasis>하기 위해 비침습 백혈구 측정 연구를 진행했습니다.
          </span>
          <span className="block">
            12개의 알고리즘과 관련 논문을 분석·적용하며, <Emphasis>93%의 정확도</Emphasis>로 백혈구를 Detecting했습니다.
          </span>
        </p>

        <p className="space-y-1" style={{ fontSize: "0.9375rem" }}>
          <span className="block text-cyan-400 font-semibold">
            작은 기능에서도 사용자가 느끼는 디테일을 놓치지 않으려 합니다.
          </span>
          <span className="block">
            기상청 공공 API를 활용해 자외선 지수를 확인할 수 있는 UV Manager 앱을 만들었습니다.
          </span>
          <span className="block">
            <Emphasis>Swagger를 통해 API 문서화</Emphasis>를 진행했고,{" "}
            <Emphasis>Redis를 통한 캐싱</Emphasis>으로 앱 데이터 응답 속도를 개선했습니다.
          </span>
        </p>
      </div>

      <div className="mt-7">
        <h3
          className="text-cyan-400 mb-3"
          style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.04em" }}
        >
          Core Skills
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-zinc-700 bg-zinc-800/40 p-4">
              <h4 className="text-zinc-100 mb-2" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                {group.title}
              </h4>

              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-700 bg-zinc-900/70 px-2 py-1 text-zinc-300"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}