import { motion } from 'framer-motion';
import { FaGraduationCap, FaCloud, FaServer, FaCogs, FaAws, FaLinux, FaBuffer } from 'react-icons/fa';
import avatarImg from '../assets/avatar.png';

export default function About() {
  const interests = [
    { name: 'Cloud Computing', icon: <FaCloud className="text-blue-400" /> },
    { name: 'DevOps', icon: <FaBuffer className="text-teal-400" /> },
    { name: 'Automation', icon: <FaCogs className="text-orange-400" /> },
    { name: 'Linux', icon: <FaLinux className="text-yellow-500" /> },
    { name: 'Infrastructure', icon: <FaServer className="text-purple-400" /> },
    { name: 'AWS', icon: <FaAws className="text-orange-500" /> },
  ];

  const timelineEvents = [
    {
      year: '2024 – Present',
      title: 'B.Tech in Computer Science Engineering',
      institution: 'Lovely Professional University (LPU)',
      description: 'Bachelor of Technology in Computer Science Engineering.\n\nFocused on Data Structures & Algorithms, Operating Systems, Cloud Computing, DevOps, Linux and Full Stack Development while building production-ready cloud applications.',
    },
    {
      year: '2024',
      title: 'Certified Cloud Practitioner Exploration',
      institution: 'AWS Academy',
      description: 'Gained thorough expertise in core AWS services, secure IAM practices, VPC networking setup, S3 bucket storage, and billing/alarms.',
    },
    {
      year: '2025',
      title: 'Containerization & Orchestration Deep Dive',
      institution: 'Independent Projects / Labs',
      description: 'Built complex Dockerized multi-container ecosystems. Implemented localized networks, health tests, and docker-compose configurations.',
    },
    {
      year: '2026',
      title: 'CI/CD and GitOps Integration',
      institution: 'Open Source Contribution & Portfolios',
      description: 'Designed fully automated pipeline workflows via GitHub Actions. Deployed services to EC2 with monitoring configurations.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm max-w-lg mx-auto">
            A look into my background, academic path, and professional DevOps ambitions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Avatar Area */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-docker-blue rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={avatarImg}
                  alt="Gaurav Kumar Singh"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Biography and Interests */}
          <div className="lg:col-span-7 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Designing Clean Code and Resilient Architectures
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6 font-sans">
              Hi, I'm Gaurav Kumar Singh, a Computer Science Engineering student at Lovely Professional University.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6 font-sans">
              I enjoy building scalable cloud applications and automating deployments using modern DevOps practices. My primary interests include Cloud Computing, Docker, Linux, AWS, GitHub Actions, CI/CD pipelines and Backend Development.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6 font-sans">
              Alongside DevOps, I continuously improve my Data Structures & Algorithms skills through regular LeetCode practice while building real-world projects.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6 font-sans">
              My goal is to become a Software Development Engineer or Cloud/DevOps Engineer capable of designing scalable and reliable infrastructure.
            </p>

            {/* Interest badges */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Focus Areas & Interests:
              </h4>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <div
                    key={interest.name}
                    className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 shadow-sm hover:border-blue-500/20 transition-all hover:bg-slate-900/80"
                  >
                    {interest.icon}
                    <span>{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline (Education & Milestones) */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="font-outfit text-2xl font-bold text-white text-center mb-12 flex items-center justify-center space-x-2">
            <FaGraduationCap className="text-blue-400 text-3xl" />
            <span>Academic Journey & Milestones</span>
          </h3>

          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 py-4">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="mb-10 last:mb-0 relative pl-6 md:pl-8"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950 shadow-md ring-2 ring-blue-500/30" />

                {/* Left Margin Date Tag for larger screens */}
                <div className="hidden md:block absolute left-[-160px] top-1 text-right w-32 font-outfit text-sm font-bold text-blue-400">
                  {event.year}
                </div>

                {/* Event Card Content */}
                <div className="glass-panel glass-panel-hover p-6 rounded-xl text-left">
                  <span className="inline-block md:hidden text-xs font-bold text-blue-400 mb-2">
                    {event.year}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-tight">
                    {event.title}
                  </h4>
                  <h5 className="text-sm font-semibold text-slate-400 mt-1">
                    {event.institution}
                  </h5>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed font-sans" style={{ whiteSpace: 'pre-line' }}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
