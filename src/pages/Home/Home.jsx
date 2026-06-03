import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import Benefits from '../../components/sections/Benefits/Benefits';
import Services from '../../components/sections/Services/Services';
import Stats from '../../components/sections/Stats/Stats';
import Expertise from '../../components/sections/Expertise/Expertise';
import Portfolio from '../../components/sections/Portfolio/Portfolio';
import FAQ from '../../components/sections/FAQ/FAQ';
import Contact from '../../components/sections/Contact/Contact';
import Footer from '../../components/layout/Footer/Footer';

import ScrollReveal from '../../components/ui/ScrollReveal/ScrollReveal';

const Home = () => {
  return (
    <main>
      <Hero />

      {/* Hero'dan keyin darhol yangi bo'lim */}
      <ScrollReveal><Benefits /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><Stats /></ScrollReveal>
      <ScrollReveal><Expertise /></ScrollReveal>
      <ScrollReveal><Portfolio /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </main>
  );
};

export default Home;