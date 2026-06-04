import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus, Headset } from 'lucide-react';
// Popup modalni chaqiramiz
import ContactModal from '../../ui/ContactModal/ContactModal';

// Rasmdagi aniq ma'lumotlar
const faqData = [
  {
    id: 1,
    question: 'What is Business Intelligence (BI) and why does my company need it?',
    answer: "Business Intelligence is the process of turning your company's raw, messy data into clear, visual, and easy-to-understand reports (dashboards). As a business owner, you likely have data scattered across sales, inventory, and marketing. BI gathers all this into one screen, allowing you to see your exact profits, top-selling products, and weak spots in real-time. You need it so you can stop making decisions based on guesses and start making them based on facts."
  },
  {
    id: 2,
    question: 'Do we need to replace our current software (like 1C, ERP, or Excel) to work with you?',
    answer: "No, absolutely not. We understand that changing software is a headache. Our BI and data solutions are designed to connect directly with the systems you already use. Whether your data lives in 1C, a custom CRM, Google Sheets, or an e-commerce platform, we seamlessly extract that data and feed it into a unified dashboard without disrupting your team's daily work."
  },
  {
    id: 3,
    question: 'How can Data Analysis help increase my sales in FMCG or E-commerce?',
    answer: 'Data analysis reveals the hidden buying patterns of your customers. For example, we can show you which products are frequently bought together, at what time of day, and by which demographic. This allows you to create highly targeted marketing campaigns, optimize your pricing, and ensure your best-selling items are never out of stock. It basically tells you what your customers want before they even ask for it.'
  },
  {
    id: 4,
    question: 'How long does it take to see the first dashboard for our business?',
    answer: 'While it depends on the complexity of your data, our goal is to deliver value quickly. Typically, within 2 to 4 weeks, we complete the initial data integration and provide your first working dashboard. From there, we continuously refine and add new metrics based on your feedback and evolving business goals.'
  },
  {
    id: 5,
    question: "Is our company data safe when we hand it over to your team?",
    answer: "Data security is our top priority. Before we even look at your data, we sign a strict Non-Disclosure Agreement (NDA). We use secure, encrypted cloud platforms to handle your information. Furthermore, we don't need access to sensitive personal data (like customer passwords); we only work with the metrics needed to build your business reports. You retain full ownership and control of your data at all times."
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