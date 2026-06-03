import React from 'react';
import styles from './Benefits.module.css';

const benefitsData = [
  {
    id: 1,
    title: 'Forecast with confidence',
    desc: "No more flying blind. We surface the trends and patterns behind your data so you can plan with confidence and stay ahead of what's coming."
  },
  {
    id: 2,
    title: 'No more wasted time on manual reporting',
    desc: "Reporting shouldn't eat up your days. We automate routine tasks so your team spends less time wrangling data and more time using it."
  },
  {
    id: 3,
    title: 'Dashboards that actually tell you something',
    desc: "Ditch the messy spreadsheets. We build dashboards that show the story behind your data clearly, visually, and in real time."
  },
  {
    id: 4,
    title: 'Compliance made simpler',
    desc: "Staying compliant shouldn't feel like a burden. We help you keep data secure, traceable, and audit-ready without the stress."
  },
  {
    id: 5,
    title: 'Data that produces ROI',
    desc: "With the right metrics in place, your data becomes a tool for growth. We help you track which campaigns convert, what drives profit, and where to invest for business results."
  }
];

const Benefits = () => {
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What you'll get from working with us</h2>

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