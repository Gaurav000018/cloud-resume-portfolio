import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';
import project3Img from '../assets/project3.png';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'devops' | 'cloud'>('all');

  const projects = [
    {
      id: 'cloud-resume',
      title: 'Cloud Resume Website with CI/CD',
      category: 'devops',
      image: project1Img,
      description: 'A fully containerized personal portfolio website representing a cloud engineer profile. Integrated automated build/deploy workflows and centralized resource hosting.',
      details: [
        'Built a fully responsive cloud portfolio.',
        'Containerized using Docker.',
        'Hosted on AWS EC2.',
        'Automated deployment using GitHub Actions.',
        'Stored static assets on Amazon S3.',
        'Configured CloudWatch monitoring.',
        'Used Git for version control.'
      ],
      badges: ['Docker', 'AWS EC2', 'AWS S3', 'CloudWatch', 'GitHub Actions', 'Linux', 'Git'],
      github: 'https://github.com/Gaurav000018',
      demo: '#',
      featured: true
    },
    {
      id: 'cloudscale',
      title: 'CloudScale Infrastructure',
      category: 'cloud',
      image: project2Img,
      description: 'Auto-scaling cluster architecture deployed on AWS EKS using Terraform. Features automated self-healing nodes and integrated Prometheus/Grafana alerts.',
      details: [
        'Wrote modular Infrastructure as Code using Terraform.',
        'Deployed an AWS Elastic Kubernetes Service (EKS) cluster.',
        'Configured auto-scaling groups and horizontal pod autoscalers.',
        'Monitored node usage with Prometheus and visualized metrics on Grafana dashboards.'
      ],
      badges: ['AWS EKS', 'Terraform', 'Kubernetes', 'Grafana', 'Helm'],
      github: 'https://github.com/Gaurav000018',
      demo: '#',
      featured: false
    },
    {
      id: 'gitdeploy',
      title: 'GitDeploy Runner',
      category: 'devops',
      image: project3Img,
      description: 'A lightweight self-hosted CI/CD engine built in Go. Listens to GitHub Webhooks, builds microservices in parallel containers, and logs statuses.',
      details: [
        'Written in Go to execute commands concurrently with Goroutines.',
        'Communicates with Docker Socket API to orchestrate containers.',
        'Verifies checksums of incoming webhook payloads for authentication.'
      ],
      badges: ['Go', 'Docker API', 'Webhooks', 'Slack API', 'Concurrency'],
      github: 'https://github.com/Gaurav000018',
      demo: '#',
      featured: false
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm max-w-lg mx-auto">
            A showcase of systems engineering, automated infrastructure pipelines, and cloud architectures.
          </p>
        </div>

        {/* Categories Tab Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'devops', 'cloud'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border capitalize transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'all' ? 'Show All' : tab}
            </button>
          ))}
        </div>

        {/* Featured Project Details (Main) */}
        {filteredProjects.find(p => p.featured) && (
          <div className="mb-16">
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 text-left">
              / Featured Pipeline Case Study
            </h3>
            
            <div className="glass-panel rounded-2xl overflow-hidden grid lg:grid-cols-12 gap-0 border-slate-800/80 glow-blue">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 p-8 sm:p-12 text-left flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md">
                      DevOps Case Study
                    </span>
                  </div>
                  <h4 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    Cloud Resume Website with CI/CD
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Designed and deployed a highly optimized personal portfolio representing a modern cloud engineer resume. Structured the build chain to compile static React files, package them inside a lightweight Docker container, and serve them securely with Nginx config headers.
                  </p>
                  
                  {/* Detailed features bullet list */}
                  <ul className="space-y-2 mb-8 text-xs sm:text-sm text-slate-300 font-sans">
                    {projects[0].details.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-400 mr-2.5 mt-1">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-semibold bg-slate-950 border border-slate-800 text-slate-400 px-2 py-1 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <a
                      href={projects[0].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                    >
                      <FaGithub className="text-sm" />
                      <span>Code Repository</span>
                    </a>
                    <a
                      href={projects[0].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      <span>Live Site</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Architecture Flow */}
              <div className="lg:col-span-5 bg-slate-950 p-8 flex flex-col justify-center items-center border-l lg:border-l border-slate-900 border-t lg:border-t-0">
                <span className="text-[10px] font-mono text-slate-500 mb-6 uppercase tracking-wider">
                  CI/CD Pipeline Architecture
                </span>
                
                {/* SVG Architecture Diagram */}
                <svg viewBox="0 0 400 300" className="w-full max-w-sm">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51, 65, 85, 0.1)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Git Commit / Local Node */}
                  <rect x="20" y="110" width="80" height="50" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <text x="60" y="133" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Git Push</text>
                  <text x="60" y="147" fill="#64748b" fontSize="8" textAnchor="middle">Local Machine</text>

                  {/* GitHub Actions */}
                  <rect x="150" y="110" width="100" height="50" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="200" y="133" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">GitHub Actions</text>
                  <text x="200" y="147" fill="#64748b" fontSize="8" textAnchor="middle">Runner Pipeline</text>

                  {/* AWS EC2 & S3 Target Group */}
                  <rect x="300" y="50" width="80" height="50" rx="6" fill="#1e293b" stroke="#0db7ed" strokeWidth="2" />
                  <text x="340" y="73" fill="#0db7ed" fontSize="10" fontWeight="bold" textAnchor="middle">AWS EC2</text>
                  <text x="340" y="87" fill="#64748b" fontSize="8" textAnchor="middle">Docker Web Server</text>

                  <rect x="300" y="170" width="80" height="50" rx="6" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
                  <text x="340" y="193" fill="#f97316" fontSize="10" fontWeight="bold" textAnchor="middle">AWS S3</text>
                  <text x="340" y="207" fill="#64748b" fontSize="8" textAnchor="middle">Static Assets</text>

                  {/* Connectors & Arrows */}
                  {/* Local -> GitHub */}
                  <path d="M 100 135 L 150 135" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="100" y1="135" x2="150" y2="135" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />

                  {/* GitHub -> EC2 */}
                  <path d="M 250 125 L 275 125 L 275 75 L 300 75" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* GitHub -> S3 */}
                  <path d="M 250 145 L 275 145 L 275 195 L 300 195" fill="none" stroke="#3b82f6" strokeWidth="2" />

                  {/* AWS CloudWatch logs flow */}
                  <ellipse cx="200" cy="250" rx="40" ry="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                  <text x="200" y="253" fill="#22c55e" fontSize="9" fontWeight="bold" textAnchor="middle">CloudWatch</text>
                  
                  <path d="M 340 100 L 340 250 L 240 250" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4" />

                  {/* Arrow marker definition */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                    </marker>
                  </defs>
                </svg>

                <div className="mt-6 flex space-x-6 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-500 rounded mr-1.5" /> CI/CD</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 bg-green-500 rounded mr-1.5" /> Monitor</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
          {filteredProjects.filter(p => !p.featured).map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="glass-panel glass-panel-hover rounded-xl overflow-hidden flex flex-col justify-between border-slate-800"
            >
              <div className="h-48 overflow-hidden bg-slate-900 border-b border-slate-800 relative group">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 transition-opacity duration-300">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 border border-slate-700 text-white rounded-full hover:border-blue-500/50 hover:text-blue-400 transition-all shadow-lg"
                    aria-label="GitHub Code"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 border border-slate-700 text-white rounded-full hover:border-blue-500/50 hover:text-blue-400 transition-all shadow-lg"
                    aria-label="Live Demo"
                  >
                    <FaExternalLinkAlt className="text-base" />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-outfit text-xl font-bold text-white mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[9px] font-semibold bg-slate-950 border border-slate-800/80 text-slate-400 px-2 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-800/60">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      Repository
                    </a>
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Demo Details
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
