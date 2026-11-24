// Bo'limlar uchun tilga bog'liq bo'lmagan ma'lumotlar. Matnlar tarjima fayllarida `key` orqali olinadi.

// "Muammolar" bo'limi: har bir karta Muammo → Oqibati → Yechimimiz (matn: problems.items.<key>).
// Karta id'si `problem-<key>`: Yechimlar bo'limi va reklama sitelink'lari shu manzilga havola qiladi.
export const PROBLEMS = [
  { key: 'manualReports', icon: 'FileSpreadsheet' },
  { key: 'scatteredData', icon: 'Split' },
  { key: 'profitBlindness', icon: 'CircleDollarSign' },
  { key: 'inventory', icon: 'Boxes' },
  { key: 'marketing', icon: 'Megaphone' },
  { key: 'lateControl', icon: 'AlarmClock' },
];

// Asosiy xizmatlar. solves: shu xizmat hal qiladigan muammolar (PROBLEMS dagi key'lar).
// Karta id'si `solution-<key>` (footer havolalari shu yerga olib boradi).
export const SOLUTIONS = [
  { key: 'automation', icon: 'Workflow', solves: ['manualReports', 'scatteredData'] },
  { key: 'dashboards', icon: 'LayoutDashboard', solves: ['lateControl', 'scatteredData'] },
  { key: 'analytics', icon: 'ChartNoAxesCombined', solves: ['profitBlindness', 'inventory', 'marketing'] },
  { key: 'consulting', icon: 'Compass', solves: ['lateControl', 'profitBlindness'] },
];

// Qo'shimcha xizmatlar: Yechimlar bo'limining pastida ixcham qator
export const EXTRA_SERVICES = [
  { key: 'web_ads', icon: 'Globe' },
  { key: 'ai_bots', icon: 'Bot' },
  { key: 'sales_dept', icon: 'Headset' },
  { key: 'system_design', icon: 'Network' },
];

export const FAQ_ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

// Sohalar (matn: industries.items.<id>).
// Rasmlar ixtiyoriy: src/assets/industries/<id>.jpg. Ular faqat HAMMA sohalar uchun fayl bo'lganda ko'rsatiladi,
// aks holda barcha sohalarda bir xil uslubdagi ikonkali panel chiziladi (sahifa bir xil ko'rinishda qoladi).
export const INDUSTRIES = [
  { id: 'fmcg', icon: 'Store' },
  { id: 'distribution', icon: 'Warehouse' },
  { id: 'ecommerce', icon: 'ShoppingCart' },
  { id: 'manufacturing', icon: 'Factory' },
  { id: 'horeca', icon: 'UtensilsCrossed' },
  { id: 'logistics', icon: 'Truck' },
];

// Sahifa ochilganda ko'rsatiladigan soha
export const DEFAULT_INDUSTRY = 'fmcg';

// Integratsiyalar. Nom tilga qarab farq qilsa obyekt yoziladi: { default: '1C', ru: '1С' }.
// Faqat haqiqatan ulana oladigan tizimlarni qoldiring.
export const INTEGRATION_GROUPS = [
  { id: 'bi', featured: true, items: ['Power BI', 'Metabase'] },
  { id: 'erp', items: [{ default: '1C', ru: '1С' }, 'Smartup', { default: 'MoySklad', ru: 'МойСклад' }] },
  { id: 'crm', items: ['amoCRM', 'Bitrix24'] },
  { id: 'pos', items: ['Billz', 'iiko', 'R-Keeper', 'Poster'] },
  { id: 'marketplaces', items: ['Uzum Market', 'Wildberries', 'Click', 'Payme'] },
  { id: 'marketing', items: ['Google Analytics 4', 'Google Ads', 'Meta Ads'] },
  { id: 'data', items: ['Excel', 'Google Sheets', 'PostgreSQL', 'MySQL'] },
];
