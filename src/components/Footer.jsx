import { Link } from "react-router-dom";
import { FaRocket, FaGithub } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-50 border-t border-stone-200 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* ── Brand / Identity Section ────────────────────────────────── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900 tracking-tight text-lg">
            <img src="../default-monochrome-black.svg" alt="DevSphere Logo" className="w-[90px] md:w-[100px]" cross-origin="anonymous" />
          </Link>
          <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
            A collaborative writing space for builders to share code milestones, tech decisions, and bug-fixing journeys.
          </p>
        </div>

        {/* ── Quick Links Navigation ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium text-stone-600">
          <Link to="/posts" className="hover:text-indigo-600 transition-colors">
            Explore Articles
          </Link>
          <Link to="/stories" className="hover:text-indigo-600 transition-colors">
            My Dashboard
          </Link>
          <Link to="/stories/write" className="hover:text-indigo-600 transition-colors font-semibold">
            Write a Story
          </Link>
        </div>

      </div>

      <div className="flex flex-col items-center gap-2 text-center md:text-right">
          <a
            href="https://github.com/theezedaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:shadow-sm transition-all"
            aria-label="GitHub Repository"
          >
            <FaGithub className="text-lg" />
          </a>
          <p className="text-[11px] text-stone-400 font-mono tracking-tight">
            &copy; {currentYear} DevSphere. Built for developers.
          </p>
      </div>
    </footer>
  );
}

export default Footer;
