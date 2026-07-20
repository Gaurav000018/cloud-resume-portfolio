import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBriefcase, FaGraduationCap, FaCertificate, FaWrench, FaFilePdf } from 'react-icons/fa';
import Toast from './Toast';
import ResumePreviewModal from './ResumePreviewModal';

export default function Resume() {
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

  return (
    <section id="resume" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curriculum Vitae
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm max-w-lg mx-auto">
            A preview of my academic credentials, certifications, and project experience.
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => handleDownloadResume(true)}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <FaFilePdf className="text-sm" />
            <span>Download Full CV (ATS PDF)</span>
            <FaDownload className="text-xs opacity-80" />
          </button>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>ATS Approved</span>
          </span>
        </div>

        {/* Interactive Resume Canvas Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-2xl border-slate-800 text-left shadow-2xl relative"
        >
          {/* Header Grid */}
          <div className="border-b border-slate-800 pb-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="font-outfit text-3xl font-extrabold text-white">Gaurav Kumar Singh</h3>
              <p className="text-blue-400 font-semibold text-sm mt-1">DevOps & Cloud Engineering Student</p>
            </div>
            <div className="mt-4 sm:mt-0 text-slate-400 text-xs space-y-1 font-mono">
              <p>Location: Punjab, India</p>
              <p>Email: heygaurav33@gmail.com</p>
              <p>GitHub: github.com/Gaurav000018</p>
              <p>LinkedIn: linkedin.com/in/gaurav-singh-a86175325</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: Education & Tech Skills */}
            <div className="md:col-span-1 space-y-8">
              {/* Education section */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FaGraduationCap className="text-blue-400" />
                  <span>Education</span>
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Lovely Professional University</h5>
                    <p className="text-xs text-blue-400 font-semibold mt-0.5">Bachelor of Technology</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Computer Science Engineering</p>
                    <p className="text-[10px] text-slate-500 mt-1">2024 – Present</p>
                  </div>
                </div>
              </div>

              {/* Skills breakdown list */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FaWrench className="text-blue-400" />
                  <span>Core Expertise</span>
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-slate-400">Programming & Web:</span>
                    <p className="mt-0.5">C++, Python, JavaScript, React, HTML, CSS, SQL</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400">DevOps & Tools:</span>
                    <p className="mt-0.5">Docker, Docker Compose, Linux, Git, GitHub, GitHub Actions</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400">Cloud Services:</span>
                    <p className="mt-0.5">AWS EC2, AWS S3, CloudWatch</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400">Databases:</span>
                    <p className="mt-0.5">MySQL, PostgreSQL</p>
                  </div>
                </div>
              </div>

              {/* Languages section */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <span className="text-blue-400">🌐</span>
                  <span>Languages</span>
                </h4>
                <p className="text-xs text-slate-300 font-mono">English, Hindi</p>
              </div>
            </div>

            {/* Right Column: Experience, Projects & Certifications */}
            <div className="md:col-span-2 space-y-8 border-t md:border-t-0 md:border-l border-slate-800 pt-8 md:pt-0 md:pl-8">
              {/* Projects section */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FaBriefcase className="text-blue-400" />
                  <span>DevOps Projects</span>
                </h4>
                <div className="space-y-5 text-xs text-slate-300">
                  <div>
                    <h5 className="font-bold text-slate-200">Cloud Resume Website with CI/CD</h5>
                    <ul className="list-disc list-inside mt-2 text-slate-400 space-y-1">
                      <li>Built a fully responsive cloud portfolio.</li>
                      <li>Containerized using Docker.</li>
                      <li>Hosted on AWS EC2.</li>
                      <li>Automated deployment using GitHub Actions.</li>
                      <li>Stored static assets on Amazon S3.</li>
                      <li>Configured CloudWatch monitoring.</li>
                      <li>Used Git for version control.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200">Other Projects</h5>
                    <div className="space-y-2.5 mt-2 text-slate-400">
                      <p><strong className="text-slate-300">Restaurant Website:</strong> Responsive multi-page website using HTML CSS JavaScript.</p>
                      <p><strong className="text-slate-300">E-Learning Platform:</strong> Full Stack project using React, backend APIs and database integration.</p>
                      <p><strong className="text-slate-300">Doorbell for Disabled People (Arduino-based Wireless Assistive Alert System):</strong> Wireless assistive alert system using Arduino, NRF24L01 modules, vibration motor, LEDs and buzzer.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications section */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FaCertificate className="text-blue-400" />
                  <span>Certifications</span>
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-slate-200">AWS Academy Graduate - AWS Academy Cloud Foundations</h5>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>Issuer: Amazon Web Services (AWS)</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div>
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FaCertificate className="text-blue-400" />
                  <span>Achievements</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5">
                  <li>Strong understanding of Data Structures & Algorithms</li>
                  <li>Building real-world DevOps projects</li>
                  <li>Learning AWS Cloud and CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
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
