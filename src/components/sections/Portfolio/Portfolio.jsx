import React, { useState } from 'react';
import styles from './Portfolio.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

const Portfolio = () => {
  const { t } = useTranslation(); // 2. Hookni chaqiramiz

  // Arrayni komponent ichiga olib kiramiz va matnlarni tarjimaga bog'laymiz
  const industriesData = [
    {
      id: 'healthcare',
      name: t('portfolio.industries.healthcare.name'),
      title: t('portfolio.industries.healthcare.title'),
      desc: t('portfolio.industries.healthcare.desc'),
      features: t('portfolio.industries.healthcare.features', { returnObjects: true }), // Arrayni qaytarish uchun
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'retail',
      name: t('portfolio.industries.retail.name'),
      title: t('portfolio.industries.retail.title'),
      desc: t('portfolio.industries.retail.desc'),
      features: t('portfolio.industries.retail.features', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'banking',
      name: t('portfolio.industries.banking.name'),
      title: t('portfolio.industries.banking.title'),
      desc: t('portfolio.industries.banking.desc'),
      features: t('portfolio.industries.banking.features', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'logistics',
      name: t('portfolio.industries.logistics.name'),
      title: t('portfolio.industries.logistics.title'),
      desc: t('portfolio.industries.logistics.desc'),
      features: t('portfolio.industries.logistics.features', { returnObjects: true }),
      image: 'https://hsl.uz/uploads/images/eac76294-0c8b-4d15-bca4-5a375ab14dab.webp?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'insurance',
      name: t('portfolio.industries.insurance.name'),
      title: t('portfolio.industries.insurance.title'),
      desc: t('portfolio.industries.insurance.desc'),
      features: t('portfolio.industries.insurance.features', { returnObjects: true }),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  // Boshlang'ich holatda 3-indeksdagi (Logistics) tabni faol qilib qo'yamiz
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

        <h2 className={styles.title}>{t('portfolio.title')}</h2>

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
              {/* Features massiv (array) bo'lgani uchun xavfsizlik tekshiruvi qo'yamiz */}
              {Array.isArray(currentData.features) && currentData.features.map((feature, index) => (
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