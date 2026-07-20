import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDocker, FaCodeBranch, FaAws, FaArrowRight, FaDownload, FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa';
import Toast from './Toast';
import ResumePreviewModal from './ResumePreviewModal';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const words = [
    'AWS Cloud',
    'Docker',
    'CI/CD',
    'Linux',
    'GitHub Actions',
    'DevOps',
    'Cloud Engineering',
    'Software Development'
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownloadResume = (triggerModal = true) => {
    const link = document.createElement('a');
    link.href = 'resume/Gaurav_Kumar_Singh_Resume.pdf';
    link.download = 'Gaurav_Kumar_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastVisible(true);

    if (triggerModal) {
      setModalOpen(true);
    }
  };

  // Typewriter Effect
  useEffect(() => {
    const currentWord = words[wordIdx];
    let timer: number;

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setTypedText(currentWord.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 50);
    } else {
      timer = window.setTimeout(() => {
        setTypedText(currentWord.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 100);
    }

    // Word switching thresholds
    if (!isDeleting && charIdx === currentWord.length) {
      timer = window.setTimeout(() => setIsDeleting(true), 2000); // Wait at end
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx]);

  // Interactive Server Nodes Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes properties
    const particlesCount = Math.min(60, Math.floor((width * height) / 20000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
      });
    }

    // Mouse interactive dimensions
    const mouse = { x: -1000, y: -1000, radius: 180 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update node particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse connection attraction push-pull
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.fill();

        // Connect nodes to neighboring nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distx = p.x - p2.x;
          const disty = p.y - p2.y;
          const d = Math.sqrt(distx * distx + disty * disty);

          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(13, 183, 237, ${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-slate-950"
    >
      {/* Interactive canvas backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Glow shapes */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-docker-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center w-full">
        {/* Text Area */}
        <div className="md:col-span-7 flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Deploy Ready Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-4"
          >
            Gaurav Kumar Singh
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-bold text-blue-400 tracking-wide mb-3"
          >
            DevOps & Cloud Engineering Student
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg max-w-lg mb-8 leading-relaxed font-sans"
          >
            I specialize in{' '}
            <span className="text-white font-semibold underline decoration-blue-500 decoration-2 underline-offset-4">
              {typedText}
            </span>
            <span className="inline-block w-1.5 h-5 bg-blue-500 ml-1 typewriter-cursor align-middle" />
            <br />
            Building scalable cloud applications using AWS, Docker, Linux, GitHub Actions and modern DevOps practices.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all group scale-100 active:scale-95"
            >
              <span>View Projects</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center flex-wrap gap-3">
                <button
                  onClick={() => handleDownloadResume(true)}
                  className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 hover:border-blue-500/30 text-slate-300 hover:text-white px-6 py-3 rounded-lg backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <FaFilePdf className="text-red-500 text-sm animate-pulse" />
                  <span>Download Resume</span>
                  <FaDownload className="text-xs opacity-60" />
                </button>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                  <span>ATS Resume</span>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/Gaurav000018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/30 rounded-lg transition-all active:scale-95 shadow-md flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="text-base" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gaurav-singh-a86175325/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/30 rounded-lg transition-all active:scale-95 shadow-md flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="text-base" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Graphic Representation */}
        <div className="md:col-span-5 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal Window Card (Docker & Pipeline Theme) */}
            <div className="w-full glass-panel rounded-xl overflow-hidden shadow-2xl glow-blue">
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-900">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-500">pipeline-cd.yaml</span>
              </div>
              <div className="p-5 font-mono text-xs text-left leading-relaxed text-slate-300">
                <p className="text-blue-400"># GitHub Actions Workflow</p>
                <p><span className="text-pink-500">name:</span> Cloud-Resume-CD</p>
                <p><span className="text-pink-500">on:</span> [push]</p>
                <p><span className="text-pink-500">jobs:</span></p>
                <p className="pl-4"><span className="text-pink-500">deploy:</span></p>
                <p className="pl-8"><span className="text-pink-500">runs-on:</span> ubuntu-latest</p>
                <p className="pl-8"><span className="text-pink-500">steps:</span></p>
                <p className="pl-12"><span className="text-yellow-500">- name:</span> Docker Build & Push</p>
                <p className="pl-12"><span className="text-yellow-500">- name:</span> Deploy to EC2</p>
                <p className="pl-12"><span className="text-yellow-500">- name:</span> Invalidate S3 Cache</p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-green-400 flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span>Success: Deploy execution finished (2.4s)</span>
                </div>
              </div>
            </div>

            {/* floating symbols around the card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 shadow-xl"
            >
              <FaAws className="text-3xl" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-docker-blue shadow-xl"
            >
              <FaDocker className="text-3xl" />
            </motion.div>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -bottom-8 right-12 p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-500 shadow-xl"
            >
              <FaCodeBranch className="text-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Toast
        message="Resume Download Started"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
      <ResumePreviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDownload={() => handleDownloadResume(false)}
      />
    </section>
  );
}
