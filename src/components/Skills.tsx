import { motion } from 'framer-motion';
import { FaAws, FaDocker, FaDatabase, FaCode } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number; // 0 to 100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming',
      icon: <FaCode className="text-purple-400 text-2xl" />,
      skills: [
        { name: 'C++', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'SQL', level: 80 },
        { name: 'React', level: 80 },
      ],
    },
    {
      title: 'Cloud',
      icon: <FaAws className="text-orange-500 text-2xl" />,
      skills: [
        { name: 'AWS EC2', level: 85 },
        { name: 'AWS S3', level: 90 },
        { name: 'AWS CloudWatch', level: 80 },
        { name: 'IAM', level: 75 },
      ],
    },
    {
      title: 'DevOps',
      icon: <FaDocker className="text-blue-400 text-2xl" />,
      skills: [
        { name: 'Docker', level: 90 },
        { name: 'Docker Compose', level: 85 },
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 90 },
        { name: 'GitHub Actions', level: 85 },
        { name: 'Linux', level: 85 },
        { name: 'Bash', level: 80 },
      ],
    },
    {
      title: 'Database',
      icon: <FaDatabase className="text-teal-400 text-2xl" />,
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'PostgreSQL', level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-950 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] right-[5%] w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-docker-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Capabilities
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm max-w-lg mx-auto">
            Detailed breakdown of my technical proficiency across cloud infrastructure, development languages, and automation workflows.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className={`glass-panel p-6 rounded-xl hover:border-slate-700/50 transition-all ${
                category.title === 'Cloud Engineering' || category.title === 'DevOps & GitOps'
                  ? 'md:col-span-1'
                  : 'md:col-span-1'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-800">
                {category.icon}
                <h3 className="font-outfit text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills Bars */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-400 group-hover:text-slate-300 transition-colors mb-1.5">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-docker-blue rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
