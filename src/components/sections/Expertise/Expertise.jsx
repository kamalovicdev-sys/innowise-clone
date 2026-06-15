import React, { useState } from 'react';
import styles from './Expertise.module.css';
import { motion } from 'framer-motion';
import { MonitorSmartphone, TerminalSquare, Database, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

// Animatsiya sozlamalari (tashqarida qolishi yaxshi, qayta-qayta render bo'lmaydi)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const Expertise = () => {
  const { t } = useTranslation(); // 2. Hookni chaqiramiz

  // Array'ni komponent ichiga olamiz, chunki t() funksiyasi shu yerda ishlaydi
  const techCategories = [
    {
      id: 'frontend',
      title: t('expertise.categories.frontend'),
      icon: <MonitorSmartphone size={24} />,
      techs: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      id: 'backend',
      title: t('expertise.categories.backend'),
      icon: <TerminalSquare size={24} />,
      techs: ["Node.js", "Python", "Go", "FastAPI"]
    },
    {
      id: 'database',
      title: t('expertise.categories.database'),
      icon: <Database size={24} />,
      techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
    },
    {
      id: 'cloud',
      title: t('expertise.categories.cloud'),
      icon: <Cloud size={24} />,
      techs: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD"]
    }
  ];

  // State'da butun ob'ektni emas, faqat ID ni saqlaymiz (til o'zgarganda xato bermasligi uchun)
  const [activeTabId, setActiveTabId] = useState(techCategories[0].id);

  // Faol kategoriyani ID orqali topib olamiz
  const activeTab = techCategories.find(cat => cat.id === activeTabId);

  return (
    <section className={styles.expertiseSection} id="expertise">
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>{t('expertise.title')}</h2>
          <p className={styles.subtitle}>
            {t('expertise.subtitle')}
          </p>
        </div>

        <div className={styles.wrapper}>

          {/* Chap taraf - Kategoriyalar (Yon menyu) */}
          <div className={styles.sidebar}>
            {techCategories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${activeTabId === category.id ? styles.active : ''}`}
                onClick={() => setActiveTabId(category.id)}
              >
                <div className={styles.iconBox}>
                  {category.icon}
                </div>
                <span className={styles.categoryName}>{category.title}</span>
              </button>
            ))}
          </div>

          {/* O'ng taraf - Texnologiyalar Grid'i */}
          <div className={styles.contentArea}>
            <motion.div
              className={styles.techGrid}
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