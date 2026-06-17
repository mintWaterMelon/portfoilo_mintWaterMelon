import { Github, Mail, BookOpen, Phone } from "lucide-react";
import profileImage from "../../assets/profile.jpg";

export function Header() {
  return (
    <section className="header-section flex gap-8 items-start p-8 border-b border-zinc-700">
      <div className="flex-shrink-0">
        <div className="w-32 h-40 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
          <img
            src={profileImage}
            alt="이영준 프로필 사진"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-zinc-100 mb-4" style={{ fontSize: "2rem", fontWeight: 700 }}>
          이영준
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-zinc-300">
            <Phone size={14} className="text-cyan-400 flex-shrink-0" />
            <span style={{ fontSize: "0.875rem" }}>010-3342-1084</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Mail size={14} className="text-cyan-400 flex-shrink-0" />
            <span style={{ fontSize: "0.875rem" }}>lee990324@naver.com</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Github size={14} className="text-cyan-400 flex-shrink-0" />
            <a
              href="https://github.com/mintWaterMelon"
              className="hover:text-cyan-400 transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              github.com/mintWaterMelon
            </a>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <BookOpen size={14} className="text-cyan-400 flex-shrink-0" />
            <span style={{ fontSize: "0.875rem" }}>광운대학교 컴퓨터정보공학부(졸업예정)</span>
          </div>
        </div>
      </div>
    </section>
  );
}