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

// Jarayon bosqichlari (Stats bo'limi): rang lojuvarddan (#1F3A93) firuzaga (#0E9AA7) silliq o'tadi.
// Har bir rang oq fonda kamida 3.4:1 kontrastga ega (grafik elementlar uchun talab >= 3:1).
export const PROCESS_STEPS = [
  { key: 'step1', color: '#1f3a93' },
  { key: 'step2', color: '#1d4595' },
  { key: 'step3', color: '#1b4f97' },
  { key: 'step4', color: '#195a9a' },
  { key: 'step5', color: '#17659c' },
  { key: 'step6', color: '#166f9e' },
  { key: 'step7', color: '#147aa0' },
  { key: 'step8', color: '#1285a3' },
  { key: 'step9', color: '#108fa5' },
  { key: 'step10', color: '#0e9aa7' },
];

export const BENEFITS = ['visibility', 'reporting', 'presence', 'guidance', 'roi'];

export const FAQ_ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5'];

export const TECH_CATEGORIES = [
  { id: 'frontend', icon: 'MonitorSmartphone', techs: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { id: 'backend', icon: 'TerminalSquare', techs: ['Node.js', 'Python', 'Go', 'FastAPI'] },
  { id: 'database', icon: 'Database', techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { id: 'cloud', icon: 'Cloud', techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'] },
];

// Rasmlar vaqtinchalik: haqiqiy keyslar tayyor bo'lgach o'z rasmlarimizga almashtiriladi (5-bosqich).
export const INDUSTRIES = [
  { id: 'healthcare', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000&h=667' },
  { id: 'retail', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000&h=667' },
  { id: 'banking', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000&h=667' },
  { id: 'logistics', image: 'https://hsl.uz/uploads/images/eac76294-0c8b-4d15-bca4-5a375ab14dab.webp' },
  { id: 'insurance', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000&h=667' },
];

// Sahifa ochilganda ko'rsatiladigan soha (avvalgi versiyadagidek logistika)
export const DEFAULT_INDUSTRY = 'logistics';
