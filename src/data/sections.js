// Bo'limlar uchun tilga bog'liq bo'lmagan ma'lumotlar. Matnlar tarjima fayllarida `key` orqali olinadi.

export const SERVICES = [
  { key: 'analysis', icon: 'Database' },
  { key: 'warehousing', icon: 'Server' },
  { key: 'management', icon: 'HardDrive' },
  { key: 'bi', icon: 'BarChart3' },
  { key: 'web_ads', icon: 'LayoutDashboard' },
  { key: 'ai_bots', icon: 'Cpu' },
  { key: 'system_design', icon: 'Network' },
  { key: 'consulting', icon: 'SquareChartGantt' },
  { key: 'sales_dept', icon: 'Headset' },
];

export const BENEFITS = ['visibility', 'reporting', 'presence', 'guidance', 'roi'];

export const FAQ_ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5'];

export const TECH_CATEGORIES = [
  { id: 'frontend', icon: 'MonitorSmartphone', techs: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { id: 'backend', icon: 'TerminalSquare', techs: ['Node.js', 'Python', 'Go', 'FastAPI'] },
  { id: 'database', icon: 'Database', techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { id: 'cloud', icon: 'Cloud', techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'] },
];

// Sohalar. Rasmlar: src/assets/portfolio/<id>.jpg (Unsplash litsenziyasi; build vaqtida WebP'ga aylantiriladi).
// Haqiqiy keyslar tayyor bo'lgach shu fayllarni o'z rasmlaringiz bilan almashtiring (nom bir xil qolsin).
export const INDUSTRIES = [{ id: 'healthcare' }, { id: 'retail' }, { id: 'banking' }, { id: 'logistics' }, { id: 'insurance' }];

// Sahifa ochilganda ko'rsatiladigan soha (avvalgi versiyadagidek logistika)
export const DEFAULT_INDUSTRY = 'logistics';
