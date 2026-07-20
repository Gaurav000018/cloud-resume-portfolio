import { FaGithub, FaLinkedin, FaEnvelope, FaServer } from 'react-icons/fa';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
        {/* Logo and Copyright */}
        <div className="text-center md:text-left space-y-2">
          <a
            href="#home"
            className="font-outfit text-lg font-extrabold text-blue-500 tracking-wider hover:text-blue-400 transition-colors"
          >
            &lt;Gaurav.DevOps /&gt;
          </a>
          <p className="text-xs text-slate-500 font-sans">
            &copy; {new Date().getFullYear()} Gaurav Kumar Singh. All rights reserved.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-500">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social and cloud status details */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <div className="flex space-x-4">
            <a
              href="https://github.com/Gaurav000018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-base" />
            </a>
            <a
              href="https://www.linkedin.com/in/gaurav-singh-a86175325/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-base" />
            </a>
            <a
              href="mailto:heygaurav33@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="text-base" />
            </a>
          </div>

          {/* Cloud deployment tags */}
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-600 bg-slate-900/40 border border-slate-900/60 px-2 py-1 rounded">
            <FaServer className="text-green-500 text-[8px] animate-pulse" />
            <span>S3 Assets | EC2 | CloudWatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
