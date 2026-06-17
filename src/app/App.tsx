import { Header } from "./components/Header";
import { About } from "./components/About";
import { ProjectCard, type Project } from "./components/ProjectCard";

import type { ReactNode } from "react";

import wbcPreprocessing1 from "../assets/wbc-preprocessing-1.png";
import wbcPreprocessing2 from "../assets/wbc-preprocessing-2.png";
import wbcPreprocessing3 from "../assets/wbc-preprocessing-3.png";
import wbcPreprocessing4 from "../assets/wbc-preprocessing-4.png";

import uvmanagerHome from "../assets/uvmanager-home.jpg";
import uvmanagerSetting from "../assets/uvmanager-setting.jpg";
import uvmanagerSwagger from "../assets/uvmanager-swagger.png";
import uvmanagerDocker from "../assets/uvmanager-docker.png";

function Emphasis({ children }: { children: ReactNode }) {
  return (
    <span className="underline underline-offset-4 decoration-cyan-400 decoration-2">
      {children}
    </span>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="mx-0.5 rounded bg-gray-500/10 px-1.5 py-0.5 text-red-400">
      <span style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
        {children}
      </span>
    </code>
  );
}

const projects: Project[] = [
  {
    title: "WBC Counting Project",
    contributionTitle: "내가 기여한 부분",
    imageTitle: "전처리 과정",
    githubUrl: "https://github.com/mintWaterMelon/wbc-counting-project",
    notionUrl: "https://app.notion.com/p/Note-WBC-Counting-Project-35fa085df4c280418bc9f215f549ee2e",
    resultVideoUrl:
      "https://youtube.com/watch?v=1tA9RENpWu8&time_continue=49&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fwww.notion.so%2F",
    period: "2024.02 ~ 2024.11",
    summary:
      "손톱 모세혈관 영산 기반 비침습 백혈구 수치 측정 시스템",
    contributionSections: [
      {
        title: "촬영 데이터 전처리",
        items: [
          <>
            <strong>CLAHE</strong>(RGB 히스토그램 기반)를 적용하여 이미지 전반의 명암비와 밝기 불균형 보정
          </>,
          <>
            <strong>OpenCV</strong> 기반으로 RGB 이미지를 LAB 색상 공간으로 변환한 뒤, L(밝기) 채널에만 CLAHE를 독립적으로 적용하여 색상 왜곡 없이 혈관과 배경 간의 명암비 극대화
          </>,
          <>
            촬영 환경의 빛 번짐, 흔들림 등 변수 제거
          </>,
        ],
      },
      {
        title: "경량 딥러닝 모델 기반 윤곽선(Edge) 추출 최적화",
        items: [
          <>
            기존 무거운 에지 검출 모델(DexiNed, 파라미터 약 3,500만개) 대비 모델 크기를 약 <Emphasis>98%</Emphasis> 축소(약 67만 개)한 경량
          </>,
          <>
            <strong>LDC</strong>(Lightweight Dense CNN) 모델 도입
          </>,
          <>
            불필요한 배경 노이즈를 억제하고 모세혈관의 미세한 윤곽선을 가늘고 선명하게 추출하여 연산 비용 절감 및 저사양 환경에서의 <Emphasis>실시간 처리</Emphasis> 속도 확보
          </>,
          <>
            최종 백혈구 탐지 및 계수 정확도(Accuracy)를 기존 대비 <Emphasis>30+%</Emphasis> 향상
          </>,
        ],
      },
      {
        title: "백혈구 Counting 알고리즘 개발",
        items: [
          <>
            <strong>YOLOv8</strong>의 객체 추적(Object Tracking) 기능을 연동하여 프레임 간 백혈구의 고유 ID(Track ID)를 유지하고 이동 동선(Trajectory Trail)을 시각화
          </>,
          <>
            미세 혈관 내 특정 단면(260x346 해상도 타겟 ROI 영역)을 통과하는 백혈구를 검출하기 위해 <strong>Shapely</strong> 라이브러리 기반의 다각형 관심 영역(Polygon ROI Area) 기하 연산 구현
          </>,
          <>
            객체의 현재 중심점과 이전 프레임 위치 간의 벡터 연산을 통해 혈관 진입/이탈(IN/OUT) 방향성을 판별하는 계수(Counting) 시스템 구축
          </>,
        ],
      },
    ],
    techStack: [
      "Python",
      "DVS(Dynamic Vision Sensor)",
      "OpenCV",
      "CLAHE(Contrast Limited Adaptive Histogram Equalization)",
      "LDC(Lightweight Dense CNN for Edge Detection)",
      "YOLOv8",
    ],
    images: [
      {
        src: wbcPreprocessing1,
        alt: "원본 촬영 영상",
        caption: "1. 원본 촬영 영상",
        variant: "wide",
      },
      {
        src: wbcPreprocessing2,
        alt: "CLAHE RGB 히스토그램 밝기 보정",
        caption: "2. CLAHE(RGB Histogram) 밝기 보정",
        variant: "wide",
      },
      {
        src: wbcPreprocessing3,
        alt: "LDC 에지 검출",
        caption: "3. LDC(Edge Detection)",
        variant: "wide",
      },
      {
        src: wbcPreprocessing4,
        alt: "색상 반전 및 혈관 분할",
        caption: "4. 색상 반전 및 혈관 분할",
        variant: "wide",
      },
    ],
    troubleShooting: [
      {
        title: "백혈구 중복 카운팅 및 누락 문제",
        problem: [
          <>
            복원 영상 내에서 백혈구가 매우 빠르게 이동하거나, 밀집된 영역에서 객체 간 겹침이 발생할 때 고유 ID(Track ID)가 풀리거나 새로 부여되어 동일 개체를 중복 카운팅하거나 계수가 누락되는 현상 발생.
          </>,
        ],
        solution: [
          <>
            YOLOv8의 추적 옵션<InlineCode>persist=True</InlineCode>을 활성화하고, 단순 매칭 대신 칼만 필터(Kalman Filter)를 통해 객체의 가속도와 모션 힌트를 예측하는 추적 파이프라인(ByteTrack/BoT-SORT)을 결합.
          </>,
          <>
            이미 카운팅 영역을 통과하여 <InlineCode>count_ids</InlineCode> 리스트에 등록된 고유 ID는 재카운팅에서 원천 배제되도록 예외 처리 코드를 설계하고, Shapely 기하 연산 기반의 시간 차 벡터 판별 알고리즘을 구현하여 진입(IN)과 이탈(OUT)을 명확히 정의.
          </>,
        ],
      },
      {
        title: "이미지 대비 보정 중 발생하는 노이즈 증폭 및 색상 왜곡",
        problem: [
          <>
            모세혈관 영상의 조명 불균형을 해결하기 위해 영상 전반에 히스토그램 평활화(Histogram Equalization)를 적용했으나, 배경에 숨어있던 미세 노이즈까지 함께 증폭되거나 혈관 조직 고유의 색상이 튀는 왜곡 현상 발생.
          </>,
          <>
            원본 RGB 채널 전체에 일괄적으로 대비 보정을 가하면서, 각 색상 채널(R, G, B)의 고유 비율이 깨져 색상 왜곡이 일어났고, 전체 프레임 기준 연산으로 인해 국소적인 명암 차이를 잡지 못함.
          </>,
        ],
        solution: [
          <>
            이미지의 색상 정보와 밝기 정보를 완전히 분리하기 위해 RGB 영상을 LAB 색상 공간으로 변환.
          </>,
          <>
            인간의 눈이 인지하는 명도 정보만을 가진 L(Lightness) 채널에만 국소적 대비 보정 알고리즘인 CLAHE를 독립적으로 적용(<InlineCode>clipLimit=2.0</InlineCode>, <InlineCode>tileGridSize=(8,8)</InlineCode>)한 후, 다시 BGR 공간으로 환원하는 파이프라인 구축.
          </>,
        ],
      },
    ],
  },
  {
    title: "UV Manager App",
    contributionTitle: "구현 내용",
    imageTitle: "앱 화면 및 배포 환경",
    githubUrl: "https://github.com/mintWaterMelon/uvmanager",
    swaggerUrl: "https://uvmanager.onrender.com/swagger-ui/index.html",
    period: "2025.09 ~ 2026.01(Render 서버 배포), 2026.04 ~ 진행중",
    summary:
      "공공 기상 데이터 기반 자외선 지수 확인 및 선크림 알림 앱",
    contributionSections: [
      {
        title: "자외선 지수 대시보드 개발",
        items: [
          <>
            자외선 지수 정보를 <strong>3시간 간격</strong>으로 표시하여 하루 동안의 자외선 변화를 쉽게 비교할 수 있도록 구성
          </>,
          <>
            <strong>오늘 / 내일 / 모레</strong> 선택 기능을 구현하여 사용자가 미리 자외선 예보를 확인하도록 구성
          </>,
          <>
            자외선 지수, 날씨 상태, 강수 확률, 기온 정보를 하나의 화면에서 확인할 수 있는 대시보드 구조 설계
          </>,
        ],
      },
      {
        title: "Spring Boot 기반 백엔드 API 개발",
        items: [
          <>
            기상청 공공 API인 생활기상지수 API와 단기예보 API 연동하여, 홈 대시보드, 자외선 지수 조회, 날씨 예보 조회, 사용자 알림 설정을 위한 REST API 구현
          </>,
          <>
            프론트엔드에서 별도의 복잡한 가공 없이 바로 화면에 렌더링할 수 있도록 모바일 화면에 최적화된 응답 DTO 설계
          </>,
          <>
            선택한 시간대의 예보 데이터가 없을 경우, 사용 가능한 기준 시간 데이터를 활용하도록 보정 로직을 설계
          </>,
        ],
      },
      {
        title: "React Native와 Expo 기반 모바일 앱 개발",
        items: [
          <>
            위치 설정이나 알림 설정 변경 후 사용자가 올바른 화면으로 돌아갈 수 있도록 화면 이동 흐름 개선
          </>,
          <>
            Android 기기에서 시스템 내비게이션 바와 앱 UI가 겹치지 않도록 safe-area 처리 적용
          </>,
        ],
      },
    ],
    techStack: [
      "Java 17",
      "Spring Boot 3",
      "Spring Data JPA / Hibernate",
      "PostgreSQL",
      "Redis",
      "Swagger",
      "Expo",
      "React Native",
      "TypeScript",
      "AWS",
    ],
    images: [
      {
        src: uvmanagerHome,
        alt: "UV Manager 홈 화면",
        caption: "1. 홈 화면",
        variant: "phone",
      },
      {
        src: uvmanagerSetting,
        alt: "UV Manager 설정 화면",
        caption: "2. 설정 화면",
        variant: "phone",
      },
      {
        src: uvmanagerSwagger,
        alt: "Swagger API 문서",
        caption: "3. Swagger API 문서",
        variant: "wide",
      },
      {
        src: uvmanagerDocker,
        alt: "Docker 실행 화면",
        caption: "4. Docker 실행 화면(백엔드, DB)",
        variant: "wide",
      },
    ],
    troubleShooting: [
      {
        title: "기상청 API의 시간 단위 데이터 불일치",
        problem: [
          <>
            자외선 지수와 단기예보 데이터는 제공 기준 시간이 다르고, 내일·모레 화면에서도 현재 시점 기준으로 바로 사용할 수 없는 값이 존재 함
          </>,
          <>
            이로 인해 대시보드가 실패하거나 자외선 값이 비어 보이는 문제 발생
          </>,
        ],
        solution: [
          <>
            선택 날짜를 그대로 기준 시간으로 요청하는 방식 대신, 백엔드에서 먼저 사용 가능한 최신 기준 시간으로 데이터를 요청하도록 변경
          </>,
          <>
            반환된 시간별 예보 값을 기반으로 필요한 예보 범위를 계산하는 로직 구현
          </>,
          <>
            현재 기준 시간 데이터가 없을 경우 00:00 기준 시간 데이터를 사용할 수 있도록 fallback 처리 추가
          </>,
          <>
            일부 예보 데이터가 누락되어도 전체 대시보드 응답이 실패하지 않도록 안정성 개선
          </>,
        ],
      },
      {
        title: "날짜 전환 시 반복 요청으로 인한 느린 로딩",
        problem: [
          <>
            홈 화면에서 오늘, 내일, 모레 버튼을 전환할 때마다 여러 API 요청이 반복되어 앱 화면 전환이 느려짐
          </>,
        ],
        solution: [
          <>
            이미 불러온 대시보드 데이터를 재사용할 수 있도록 클라이언트 측 캐싱 도입
          </>,
          <>
            모바일 앱에서 불필요하게 중복 API 요청이 발생하지 않도록 개선
          </>,
          <>
            캐싱으로 실시간 시계 표시가 잘못 나타나는 문제가 발생하여, 선택 날짜 상태와 실시간 시계 표시를 분리
          </>,
          <>
            이전 데이터를 재사용하면서 필요한 경우에만 새 데이터를 요청하도록 하여 체감 성능 개선
          </>,
        ],
      },
    ],
  },
];

export default function App() {
  return (
    <div className="dark min-h-screen bg-zinc-900">
      <div
        className="mx-auto"
        style={{ maxWidth: "960px", fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}
      >
        <div className="bg-zinc-900 text-zinc-100 shadow-2xl" style={{ minHeight: "100vh" }}>
          <Header />
          <About />

          <section className="project-section p-8">
            <h2
              className="text-cyan-400 mb-6 pb-2 border-b border-zinc-700"
              style={{ fontSize: "1.125rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Projects
            </h2>

            <div className="space-y-10">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={index > 0 ? "pt-10 border-t border-zinc-700" : ""}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </section>

          <div className="h-8" />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-900 rounded-lg shadow-lg transition-colors"
          style={{ fontSize: "0.875rem", fontWeight: 600 }}
        >
          🖨️ PDF로 저장
        </button>
      </div>

      <style>{`
        @media print {
        html,
          body {
            background: #18181b !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .header-section {
            padding-top: 3rem !important;
          }

          .project-section {
            page-break-before: always;
            break-before: page;
            padding-top: 14mm !important;
          }

          .project-overview {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .troubleshooting-section {
            page-break-before: always;
            break-before: page;
            min-height: auto;
            padding-bottom: 0 !important;
          }

          .troubleshooting-card {
            page-break-inside: auto;
            break-inside: auto;
          }

          .print-bottom-space {
            display: none !important;
          }
        }

        @page {
          margin: 12mm;
        }
      `}</style>
    </div>
  );
}