import { Link } from "react-router-dom";
import { FaRocket, FaGithub } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-50 border-t border-stone-200 py-2 ">
      <p className="text-[11px] text-stone-400 font-mono tracking-tight text-center">
        &copy; {currentYear} DevSphere. Built by <a
            href="https://github.com/theezedaniel"
            target="_blank"
            rel="noopener noreferrer"
          className="rounded-lg italic underline underline-offset-2 text-stone-600"
            aria-label="GitHub Repository"
          >
          Eze Daniel
        </a>
      </p>
    </footer>
  );
}

export default Footer;
