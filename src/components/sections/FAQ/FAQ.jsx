import { useState } from 'react';
import { Plus, Minus, Headset } from 'lucide-react';
import { FAQ_ITEMS } from '@data/sections';
import SectionHeader from '@components/ui/SectionHeader/SectionHeader';
import Button from '@components/ui/Button/Button';
import styles from './FAQ.module.css';

// items: savollar kalitlari (dict.items ichida). Bosh sahifada FAQ_ITEMS, xizmat sahifalarida o'zining ro'yxati.
const FAQ = ({ dict, items = FAQ_ITEMS }) => {
  // Birinchi savol ochiq turadi
  const [activeKey, setActiveKey] = useState(items[0]);

  const toggle = (key) => setActiveKey((current) => (current === key ? null : key));

  return (
    <section className={`section ${styles.faqSection}`} id="faq">
      <div className="container">
        <SectionHeader title={dict.title} />

        <div className={styles.wrapper}>
          <div className={styles.accordion}>
            {items.map((key) => {
              const isActive = activeKey === key;
              const item = dict.items[key];
              return (
                <div key={key} className={`${styles.faqItem} ${isActive ? styles.active : ''}`} data-assemble="left">
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

          <div className={styles.ctaCard} data-assemble="right">
            <div className={styles.ctaIcon} aria-hidden="true">
              <Headset size={72} strokeWidth={1} />
            </div>
            <p className={styles.ctaTitle}>{dict.ctaTitle}</p>
            <p className={styles.ctaText}>{dict.ctaText}</p>
            <Button block size="lg" data-open-contact>
              {dict.btnCall}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
