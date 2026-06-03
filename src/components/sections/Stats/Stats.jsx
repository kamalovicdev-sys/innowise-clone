// src/components/sections/Stats/Stats.jsx
import React from 'react';
import styles from './Stats.module.css';

const roadmapData = [
  {
    id: 1,
    color: '#d32f2f', // To'q qizil
    title: 'Requirement analysis',
    desc: "We look at how your team uses data, find what's missing, and define what your analytics system needs to deliver."
  },
  {
    id: 2,
    color: '#df6262',
    title: 'Data architecture',
    desc: "We design how your data is structured, labeled, and linked, so your analytics are accurate, fast, and easy to scale."
  },
  {
    id: 3,
    color: '#e58e8e',
    title: 'Data ingestion',
    desc: "Whether it's files, APIs, or cloud tools, we connect every source and ensure your data flows into one place without errors or delays."
  },
  {
    id: 4,
    color: '#ebb6b6', // Och pushti
    title: 'Data lake building',
    desc: "We set up storage for all raw and semi-structured data, so you can keep everything in one place and use it later for reports or deep analysis."
  },
  {
    id: 5,
    color: '#e29ab9',
    title: 'Data warehouse setup',
    desc: "This is where clean data lives. We set up a central warehouse that keeps everything organized and ready for reporting."
  },
  {
    id: 6,
    color: '#cd9bd9',
    title: 'Data cleaning',
    desc: "From duplicates to format mismatches, we resolve the issues that slow teams down, so every record can be trusted."
  },
  {
    id: 7,
    color: '#bca1e6', // Och binafsha
    title: 'ETL/ELT development',
    desc: "Your analytics are only as fresh as your pipeline. We set up flows that move and transform data without delays or manual work."
  },
  {
    id: 8,
    color: '#d7c7f0', // Eng och binafsha
    title: 'Quality assurance',
    desc: "We test each component of your data pipeline, including data connections, pipeline logic, data accuracy, load times to prevent future issues."
  },
  {
    id: 9,
    color: '#aa8dd8',
    title: 'Deployment',
    desc: "Finally, we put it all in motion — automating updates, syncing reports, and handing off a system that's ready to deliver insights from day one."
  },
  {
    id: 10,
    color: '#8964c4', // To'q binafsha
    title: 'Data analytics',
    desc: "With everything in place, we integrate real-time analytics into your workflows so your team can explore data insights and make data-driven decisions."
  }
];

const Stats = () => {
  return (
    <section className={styles.statsSection} id="process">
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Your project at your pace</h2>
          <p className={styles.subtitle}>
            Each step moves your data closer to real business value with zero wasted effort or guesswork.
          </p>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.grid}>

            {roadmapData.map((item) => (
              // Inline style orqali rang beramiz, CSS dagi 'currentColor' buni o'qib oladi
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