import React from 'react';
import styles from './Stats.module.css';
import { useTranslation } from 'react-i18next'; // 1. Hookni import qilamiz

const Stats = () => {
  const { t } = useTranslation(); // 2. t() funksiyasini chaqiramiz

  // Arrayni komponent ichiga olib kirdik, ranglari o'zgarishsiz qoladi
  const roadmapData = [
    {
      id: 1,
      color: '#d32f2f',
      title: t('stats.steps.step1.title'),
      desc: t('stats.steps.step1.desc')
    },
    {
      id: 2,
      color: '#df6262',
      title: t('stats.steps.step2.title'),
      desc: t('stats.steps.step2.desc')
    },
    {
      id: 3,
      color: '#e58e8e',
      title: t('stats.steps.step3.title'),
      desc: t('stats.steps.step3.desc')
    },
    {
      id: 4,
      color: '#ebb6b6',
      title: t('stats.steps.step4.title'),
      desc: t('stats.steps.step4.desc')
    },
    {
      id: 5,
      color: '#e29ab9',
      title: t('stats.steps.step5.title'),
      desc: t('stats.steps.step5.desc')
    },
    {
      id: 6,
      color: '#cd9bd9',
      title: t('stats.steps.step6.title'),
      desc: t('stats.steps.step6.desc')
    },
    {
      id: 7,
      color: '#bca1e6',
      title: t('stats.steps.step7.title'),
      desc: t('stats.steps.step7.desc')
    },
    {
      id: 8,
      color: '#d7c7f0',
      title: t('stats.steps.step8.title'),
      desc: t('stats.steps.step8.desc')
    },
    {
      id: 9,
      color: '#aa8dd8',
      title: t('stats.steps.step9.title'),
      desc: t('stats.steps.step9.desc')
    },
    {
      id: 10,
      color: '#8964c4',
      title: t('stats.steps.step10.title'),
      desc: t('stats.steps.step10.desc')
    }
  ];

  return (
    <section className={styles.statsSection} id="process">
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>{t('stats.title')}</h2>
          <p className={styles.subtitle}>
            {t('stats.subtitle')}
          </p>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.grid}>

            {roadmapData.map((item) => (
              <div key={item.id} className={styles.item} style={{ color: item.color }}>

                <div className={styles.node}>
                  <div className={styles.dot}></div>
                  <div className={styles.line}></div>
                </div>

                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;