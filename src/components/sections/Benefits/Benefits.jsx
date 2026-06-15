import React from 'react';
import styles from './Benefits.module.css';
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

const Benefits = () => {
  const { t } = useTranslation(); // 2. t funksiyasini chaqiramiz

  // Array komponent ichiga olindi va hardcoded matnlar t() ga almashtirildi
  const benefitsData = [
    {
      id: 1,
      title: t('benefits.items.visibility.title'),
      desc: t('benefits.items.visibility.desc')
    },
    {
      id: 2,
      title: t('benefits.items.reporting.title'),
      desc: t('benefits.items.reporting.desc')
    },
    {
      id: 3,
      title: t('benefits.items.presence.title'),
      desc: t('benefits.items.presence.desc')
    },
    {
      id: 4,
      title: t('benefits.items.guidance.title'),
      desc: t('benefits.items.guidance.desc')
    },
    {
      id: 5,
      title: t('benefits.items.roi.title'),
      desc: t('benefits.items.roi.desc')
    }
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t('benefits.title')}</h2>

        <div className={styles.list}>
          {benefitsData.map((item) => (
            <div key={item.id} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;