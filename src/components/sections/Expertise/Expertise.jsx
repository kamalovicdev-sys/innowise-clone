import React, { useState } from 'react';
import styles from './Expertise.module.css';
import { motion } from 'framer-motion';
// Kategoriyalar uchun maxsus ikonkalar
import { MonitorSmartphone, TerminalSquare, Database, Cloud } from 'lucide-react';

// Ma'lumotlar bazasini ikonka va ID lar bilan kengaytiramiz
const techCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <MonitorSmartphone size={24} />,
    techs: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <TerminalSquare size={24} />,
    techs: ["Node.js", "Python", "Go", "FastAPI"]
  },
  {
    id: 'database',
    title: 'Database',
    icon: <Database size={24} />,
    techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Cloud size={24} />,
    techs: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD"]
  }
];

// Animatsiya sozlamalari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // Har bir kartochka 0.1 soniya farq bilan chiqadi
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const Expertise = () => {
  // Boshlang'ich holatda birinchi kategoriyani (Frontend) tanlaymiz
  const [activeTab, setActiveTab] = useState(techCategories[0]);

  return (
    <section className={styles.expertiseSection} id="expertise">
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Our Core Technologies</h2>
          <p className={styles.subtitle}>
            We utilize the most modern and robust tech stacks to build scalable software solutions that fit your exact business needs.
          </p>
        </div>

        <div className={styles.wrapper}>

          {/* Chap taraf - Kategoriyalar (Yon menyu) */}
          <div className={styles.sidebar}>
            {techCategories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${activeTab.id === category.id ? styles.active : ''}`}
                onClick={() => setActiveTab(category)}
              >
                <div className={styles.iconBox}>
                  {category.icon}
                </div>
                <span className={styles.categoryName}>{category.title}</span>
              </button>
            ))}
          </div>

          {/* O'ng taraf - Texnologiyalar Grid'i (Framer Motion bilan animatsiya qilingan) */}
          <div className={styles.contentArea}>
            <motion.div
              className={styles.techGrid}
              // key parametri orqali React'ga ma'lumot o'zgarganini bildirib, animatsiyani qayta ishga tushiramiz
              key={activeTab.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeTab.techs.map((tech, index) => (
                <motion.div
                  key={index}
                  className={styles.techCard}
                  variants={itemVariants}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Expertise;