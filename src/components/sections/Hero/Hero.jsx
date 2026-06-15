import React, { useState } from 'react';
import styles from './Hero.module.css';
import ContactModal from '../../ui/ContactModal/ContactModal';
// 1. Tarjima uchun hookni import qilamiz
import { useTranslation } from 'react-i18next';

const Hero = () => {
  // 2. Hookni chaqiramiz
  const { t } = useTranslation();

  // Modalni ochib-yopish uchun state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>

        {/* 1. Chap taraf (Matn) */}
        <div className={styles.content}>
          {/* Matnlarni t() funksiyasi bilan almashtiramiz */}
          <h1 className={styles.title}>
            {t('hero.title')}
          </h1>
          <p className={styles.subtitle}>
            {t('hero.subtitle')}
          </p>
          <div className={styles.buttonGroup}>
            {/* Estimate Project tugmasiga onClick ulandi */}
            <button
              className={styles.primaryBtn}
              onClick={() => setIsModalOpen(true)}
            >
              {t('hero.btnEstimate')}
            </button>
            <button className={styles.secondaryBtn}>
              {t('hero.btnExplore')}
            </button>
          </div>
        </div>

        {/* 2. O'ng taraf (Animatsiya) */}
        <div className={styles.dashWrapper}>

          {/* Asosiy animatsiya konteyneri (Dashboard) */}
          <div className={styles.dashContainer}>
            {/* 1. Card */}
            <div className={styles.dashCard}>
              <div className={styles.dashTitle}></div>
              <div className={styles.dashValue}></div>
              <div className={styles.dashBar}></div>
            </div>
            {/* 2. Card (O'rtadagisi) */}
            <div className={styles.dashCard} style={{gridColumn: '2 / 4'}}>
              <div className={styles.dashTitle} style={{width: '90%'}}></div>
              <div className={styles.dashValue}></div>
              <div style={{display: 'flex', gap: '5px'}}>
                <div className={styles.dashBar} style={{width: '70%'}}></div>
                <div className={styles.dashBar}></div>
              </div>
            </div>
            {/* 3. Card */}
            <div className={styles.dashCard} style={{gridColumn: '1 / 3'}}>
              <div className={styles.dashValue} style={{width: '60%'}}></div>
              <div className={styles.dashTitle}></div>
            </div>

            {/* Tepaga o'suvchi yorqin Bar Chart elementi */}
            <div className={styles.upwardBar}></div>
          </div>

          {/* Fon orqasida harakatlanuvchi ma'lumot chiziqlari */}
          <div className={styles.dataFlowLine}></div>
          <div className={styles.dataFlowLine}></div>
          <div className={styles.dataFlowLine}></div>
        </div>

      </div>

      {/* Modal oynani chaqiramiz (u faqat isModalOpen = true bo'lganda ko'rinadi) */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;