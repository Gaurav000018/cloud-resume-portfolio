import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaFilePdf, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function ResumePreviewModal({
  isOpen,
  onClose,
  onDownload,
}: ResumePreviewModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadClick = () => {
    onDownload();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl z-10 font-sans"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center space-x-2.5">
                <FaFilePdf className="text-red-500 text-lg" />
                <h3 className="font-outfit text-base sm:text-lg font-bold text-white">
                  Resume Preview
                </h3>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                  ATS Friendly
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDownloadClick}
                  className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/15"
                >
                  {downloaded ? (
                    <>
                      <FaCheck className="text-xs" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="text-xs" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable resume preview formatted like an A4 document) */}
            <div className="overflow-y-auto p-6 sm:p-10 bg-slate-950/50 flex-1 space-y-8 select-text">
              {/* PDF Document Container simulation */}
              <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl max-w-2xl mx-auto border border-slate-200 text-left leading-relaxed text-xs">
                {/* Header */}
                <div className="text-center border-b border-slate-200 pb-4 mb-5">
                  <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-1">
                    Gaurav Kumar Singh
                  </h1>
                  <p className="text-[10px] text-slate-500 font-mono tracking-wide">
                    Punjab, India | heygaurav33@gmail.com | github.com/Gaurav000018 | linkedin.com/in/gaurav-singh-a86175325
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Professional Summary
                  </h4>
                  <p className="text-[10px] text-slate-700">
                    Computer Science Engineering student at Lovely Professional University passionate about Software Development, Cloud Computing and DevOps. Experienced with Docker, Linux, Git, AWS fundamentals, CI/CD pipelines and modern web development. Actively solving Data Structures & Algorithms problems while building production-ready cloud applications.
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-1.5 mt-5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Education
                  </h4>
                  <div className="flex justify-between font-bold text-[10px] text-slate-800">
                    <span>Lovely Professional University</span>
                    <span>2024 – Present</span>
                  </div>
                  <div className="text-[9.5px] italic text-slate-500">
                    Bachelor of Technology in Computer Science Engineering
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-1.5 mt-5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Technical Skills
                  </h4>
                  <div className="space-y-1 text-[10px] text-slate-800">
                    <p>
                      <strong className="text-slate-900">Programming & Web:</strong> C++, Python, JavaScript, React, HTML, CSS, SQL
                    </p>
                    <p>
                      <strong className="text-slate-900">DevOps & Tools:</strong> Docker, Docker Compose, Linux, Git, GitHub, GitHub Actions
                    </p>
                    <p>
                      <strong className="text-slate-900">Cloud Services:</strong> AWS EC2, AWS S3, CloudWatch
                    </p>
                    <p>
                      <strong className="text-slate-900">Databases:</strong> MySQL, PostgreSQL
                    </p>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-2 mt-5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Projects
                  </h4>
                  
                  <div>
                    <h5 className="font-bold text-[10px] text-slate-800">
                      Cloud Resume Website with CI/CD
                    </h5>
                    <ul className="list-disc list-inside pl-1.5 text-[9.5px] text-slate-700 space-y-0.5">
                      <li>Built a fully responsive cloud portfolio.</li>
                      <li>Containerized using Docker.</li>
                      <li>Hosted on AWS EC2.</li>
                      <li>Automated deployment using GitHub Actions.</li>
                      <li>Stored static assets on Amazon S3.</li>
                      <li>Configured CloudWatch monitoring.</li>
                      <li>Used Git for version control.</li>
                    </ul>
                  </div>

                  <div className="space-y-1 pt-1">
                    <h5 className="font-bold text-[10px] text-slate-800">Other Projects</h5>
                    <p className="text-[9.5px] text-slate-700">
                      <strong>Restaurant Website:</strong> Responsive multi-page website using HTML CSS JavaScript.
                    </p>
                    <p className="text-[9.5px] text-slate-700">
                      <strong>E-Learning Platform:</strong> Full Stack project using React, backend APIs and database integration.
                    </p>
                    <p className="text-[9.5px] text-slate-700">
                      <strong>Doorbell for Disabled People (Arduino-based Wireless Assistive Alert System):</strong> Wireless assistive alert system using Arduino, NRF24L01 modules, vibration motor, LEDs and buzzer.
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-1.5 mt-5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Achievements
                  </h4>
                  <ul className="list-disc list-inside pl-1.5 text-[9.5px] text-slate-700 space-y-0.5">
                    <li>Strong understanding of Data Structures & Algorithms</li>
                    <li>Building real-world DevOps projects</li>
                    <li>Learning AWS Cloud and CI/CD</li>
                  </ul>
                </div>

                {/* Languages */}
                <div className="space-y-1.5 mt-5">
                  <h4 className="font-bold text-blue-700 uppercase tracking-wide border-b border-slate-200 pb-0.5 text-[10px]">
                    Languages
                  </h4>
                  <p className="text-[10px] text-slate-700 font-medium">English, Hindi</p>
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 text-center text-[10px] text-slate-500 font-medium">
              This preview matches the exact text formatting parsed by Applicant Tracking Systems (ATS).
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
