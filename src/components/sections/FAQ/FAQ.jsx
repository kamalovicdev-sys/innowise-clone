// src/components/sections/FAQ/FAQ.jsx
import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus, Headset } from 'lucide-react';
// Popup modalni chaqiramiz
import ContactModal from '../../ui/ContactModal/ContactModal';

// Rasmdagi aniq ma'lumotlar
const faqData = [
  {
    id: 1,
    question: 'How does Innowise tailor data analytics solutions to our requirements?',
    answer: "We begin by analyzing your data landscape: data sources, infrastructure, and business objectives. Based on that, we design end-to-end solutions — custom ETL pipelines, data models, and visualizations — optimized for use cases. Whether you're dealing with fragmented systems, inconsistent data, or real-time analytics needs, we build a solution that fits both your architecture and your goals."
  },
  {
    id: 2,
    question: 'What are the components of data analytics services?',
    answer: 'Our data analytics services typically include data integration, data warehousing, BI dashboard development, predictive analytics, and machine learning model deployment.'
  },
  {
    id: 3,
    question: 'What should one look for in a data analytics services company?',
    answer: 'You should look for proven expertise in your industry, strong technological partnerships, scalable architecture design, and a focus on data security and compliance.'
  },
  {
    id: 4,
    question: 'What data analytics services does Innowise offer?',
    answer: 'We offer a full spectrum of services including data strategy consulting, data engineering, advanced analytics, AI integration, and ongoing data management support.'
  }
];

const FAQ = () => {
  // 0-indeksdagi (birinchi) savol doim ochiq turadi
  const [activeIndex, setActiveIndex] = useState(0);
  // O'ng tarafdagi tugma bosilganda modalni ochish uchun state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFAQ = (index) => {
    // Agar bosilgan savol ochiq bo'lsa uni yopadi, yo'qsa ochadi
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>

        <h2 className={styles.sectionTitle}>FAQ</h2>

        <div className={styles.wrapper}>

          {/* Chap taraf: Accordion ro'yxati */}
          <div className={styles.accordion}>
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={item.id} className={`${styles.faqItem} ${isActive ? styles.active : ''}`}>

                  <button className={styles.questionBtn} onClick={() => toggleFAQ(index)}>
                    <div className={styles.iconWrapper}>
                      {isActive ? <Minus size={24} strokeWidth={1.5} /> : <Plus size={24} strokeWidth={1.5} />}
                    </div>
                    <span className={styles.questionText}>{item.question}</span>
                  </button>

                  <div className={styles.answerWrapper}>
                    <div className={styles.answerInner}>
                      <p className={styles.answerText}>{item.answer}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* O'ng taraf: Aloqa uchun CTA kartochkasi */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>
              <Headset size={72} strokeWidth={1} />
            </div>
            <h3 className={styles.ctaTitle}>Feel free to book a call and get all the answers you need.</h3>

            {/* Modal oynani ochuvchi tugma */}
            <button
              className={styles.ctaBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Book a call
            </button>
          </div>

        </div>
      </div>

      {/* Modal komponenti sahifaning eng pastida ulanadi */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FAQ;