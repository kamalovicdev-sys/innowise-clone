import React, { useState } from 'react';
import styles from './Portfolio.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Barcha tablar uchun ma'lumotlar bazasi (Rasmdagi Logistics to'liq ko'chirilgan)
const industriesData = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    title: 'Healthcare Analytics',
    desc: 'We help healthcare providers leverage data to improve patient outcomes, optimize resource allocation, and ensure compliance with strict medical data regulations.',
    features: [
      'Predictive patient analytics',
      'Resource and staff optimization',
      'EHR data integration and security'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'retail',
    name: 'Retail & e-commerce',
    title: 'Retail & E-commerce',
    desc: 'Transform your retail business with advanced customer analytics, personalized recommendation engines, and dynamic pricing models driven by real-time market data.',
    features: [
      'Customer churn prediction',
      'Dynamic pricing algorithms',
      'Inventory and demand forecasting'
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'banking',
    name: 'Banking & finance',
    title: 'Banking & Finance',
    desc: 'Empower your financial institution with secure data processing, fraud detection systems, and risk assessment models that protect assets and drive sustainable growth.',
    features: [
      'Real-time fraud detection systems',
      'Automated risk assessment models',
      'Algorithmic trading analytics'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'logistics',
    name: 'Transportation & logistics',
    title: 'Transportation & Logistics',
    desc: 'In logistics, every minute counts. Innowise helps companies gain full visibility into their operations by analyzing data from fleet tracking, warehouse systems, and delivery workflows, so you can act faster and plan smarter.',
    features: [
      'Lower maintenance costs',
      'Better planning from real-time insights',
      'Improved route and network optimization'
    ],
    // Rasmdagiga o'xshash konteynerli yuk mashinasi rasmi
    image: 'https://hsl.uz/uploads/images/eac76294-0c8b-4d15-bca4-5a375ab14dab.webp?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    title: 'Insurance',
    desc: 'Optimize claim processing, accurately assess risks, and provide personalized policy recommendations using our comprehensive data analytics solutions for the insurance sector.',
    features: [
      'Automated claim processing',
      'Predictive risk modeling',
      'Customer lifetime value prediction'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'
  }
];

const Portfolio = () => {
  // Boshlang'ich holatda 3-indeksdagi (Logistics) tabni faol qilib qo'yamiz (rasmdagidek)
  const [activeIndex, setActiveIndex] = useState(3);

  // O'ngga yurish (Keyingi)
  const handleNext = () => {
    setActiveIndex((prev) => (prev === industriesData.length - 1 ? 0 : prev + 1));
  };

  // Chapga yurish (Oldingi)
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? industriesData.length - 1 : prev - 1));
  };

  // Hozirgi tanlangan ma'lumotni ajratib olish
  const currentData = industriesData[activeIndex];

  return (
    <section className={styles.portfolioSection} id="portfolio">
      <div className={styles.container}>

        <h2 className={styles.title}>Data analytics for every industry</h2>

        {/* Tablar va o'q tugmalari o'rami */}
        <div className={styles.tabsHeader}>

          <div className={styles.tabList}>
            {industriesData.map((item, index) => (
              <button
                key={item.id}
                className={`${styles.tabBtn} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous">
              <ArrowLeft size={24} strokeWidth={1.5} />
            </button>
            <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next">
              <ArrowRight size={24} strokeWidth={1.5} />
            </button>
          </div>

        </div>

        {/* Tanlangan bo'lim kontenti */}
        <div className={styles.contentArea} key={currentData.id}>

          <div className={styles.leftBlock}>
            <h3 className={styles.contentTitle}>{currentData.title}</h3>
            <p className={styles.contentDesc}>{currentData.desc}</p>

            <ul className={styles.featureList}>
              {currentData.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <div className={styles.dot}></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightBlock}>
            <img src={currentData.image} alt={currentData.title} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Portfolio;