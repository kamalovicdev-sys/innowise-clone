import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // margin o'rniga amount: 0.1 ishlatamiz.
      // Bu "elementning 10% qismi ekranda ko'rinishi bilan animatsiya ishlasin" degani.
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;