import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus, Headset } from 'lucide-react';
import ContactModal from '../../ui/ContactModal/ContactModal';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();

  // Array endi tarjima qilinishi uchun komponent ichiga o'tdi
  const faqData = [
    {
      id: 1,
      question: t('faq.items.q1.q'),
      answer: t('faq.items.q1.a')
    },
    {
      id: 2,
      question: t('faq.items.q2.q'),
      answer: t('faq.items.q2.a')
    },
    {
      id: 3,
      question: t('faq.items.q3.q'),
      answer: t('faq.items.q3.a')
    },
    {
      id: 4,
      question: t('faq.items.q4.q'),
      answer: t('faq.items.q4.a')
    },
    {
      id: 5,
      question: t('faq.items.q5.q'),
      answer: t('faq.items.q5.a')
    }
  ];

  // 0-indeksdagi (birinchi) savol doim ochiq turadi
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>

        <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>

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
            <h3 className={styles.ctaTitle}>
              {t('faq.ctaTitle')}
            </h3>

            {/* Modal oynani ochuvchi tugma */}
            <button
              className={styles.ctaBtn}
              onClick={() => setIsModalOpen(true)}
            >
              {t('faq.btnCall')}
            </button>
          </div>

        </div>
      </div>

      {/* Modal komponenti */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FAQ;