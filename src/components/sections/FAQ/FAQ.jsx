import { useState } from 'react';
import { Plus, Minus, Headset } from 'lucide-react';
import { FAQ_ITEMS } from '@data/sections';
import styles from './FAQ.module.css';

const FAQ = ({ dict }) => {
  // Birinchi savol ochiq turadi
  const [activeKey, setActiveKey] = useState(FAQ_ITEMS[0]);

  const toggle = (key) => setActiveKey((current) => (current === key ? null : key));

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container} data-reveal>
        <h2 className={styles.sectionTitle}>{dict.title}</h2>

        <div className={styles.wrapper}>
          <div className={styles.accordion}>
            {FAQ_ITEMS.map((key) => {
              const isActive = activeKey === key;
              const item = dict.items[key];
              return (
                <div key={key} className={`${styles.faqItem} ${isActive ? styles.active : ''}`}>
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      id={`faq-question-${key}`}
                      className={styles.questionBtn}
                      onClick={() => toggle(key)}
                      aria-expanded={isActive}
                      aria-controls={`faq-answer-${key}`}
                    >
                      <span className={styles.iconWrapper} aria-hidden="true">
                        {isActive ? <Minus size={24} strokeWidth={1.5} /> : <Plus size={24} strokeWidth={1.5} />}
                      </span>
                      <span className={styles.questionText}>{item.q}</span>
                    </button>
                  </h3>

                  {/* inert: yopiq javob klaviatura va ekran o'quvchilar uchun ham yopiq bo'ladi */}
                  <div
                    id={`faq-answer-${key}`}
                    role="region"
                    aria-labelledby={`faq-question-${key}`}
                    className={styles.answerWrapper}
                    inert={!isActive}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answerText}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon} aria-hidden="true">
              <Headset size={72} strokeWidth={1} />
            </div>
            <p className={styles.ctaTitle}>{dict.ctaTitle}</p>
            <button type="button" className={styles.ctaBtn} data-open-contact>
              {dict.btnCall}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
