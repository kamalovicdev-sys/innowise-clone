// Xizmat sahifalari (SEO va Google Ads uchun alohida landing sahifalar).
// Matnlar: src/locales/<til>/services.json -> pages.<key>. Qisqa nomi: translation.json -> servicePages.<key>.
// slug: barcha tillarda bir xil yo'l (/power-bi/, /ru/power-bi/, /en/power-bi/).
// problems / deliverables: "Muammolar" va "Nima olasiz" bo'limlaridagi kartalar
// (key -> services.json dagi matn, icon -> lucide-react ikonka nomi).
export const SERVICE_PAGES = [
  {
    key: 'powerBi',
    slug: 'power-bi',
    problems: [
      { key: 'excelReports', icon: 'FileSpreadsheet' },
      { key: 'noSingleView', icon: 'EyeOff' },
      { key: 'unusedBi', icon: 'TriangleAlert' },
    ],
    deliverables: [
      { key: 'connections', icon: 'PlugZap' },
      { key: 'model', icon: 'Layers' },
      { key: 'executive', icon: 'LayoutDashboard' },
      { key: 'departments', icon: 'Users' },
      { key: 'alerts', icon: 'BellRing' },
      { key: 'training', icon: 'GraduationCap' },
    ],
  },
  {
    key: 'onec',
    slug: '1c-analytics',
    problems: [
      { key: 'developerQueue', icon: 'Hourglass' },
      { key: 'excelExport', icon: 'FileSpreadsheet' },
      { key: 'disconnected', icon: 'Unlink' },
    ],
    deliverables: [
      { key: 'access', icon: 'ShieldCheck' },
      { key: 'refresh', icon: 'RefreshCw' },
      { key: 'sales', icon: 'ChartColumn' },
      { key: 'inventory', icon: 'Boxes' },
      { key: 'receivables', icon: 'Wallet' },
      { key: 'crm', icon: 'Workflow' },
    ],
  },
  {
    key: 'metabase',
    slug: 'metabase',
    problems: [
      { key: 'licenseCost', icon: 'Wallet' },
      { key: 'dataLocation', icon: 'Lock' },
      { key: 'analystQueue', icon: 'MessagesSquare' },
    ],
    deliverables: [
      { key: 'install', icon: 'Server' },
      { key: 'warehouse', icon: 'Database' },
      { key: 'dashboards', icon: 'LayoutDashboard' },
      { key: 'access', icon: 'Users' },
      { key: 'alerts', icon: 'BellRing' },
      { key: 'training', icon: 'GraduationCap' },
    ],
  },
];

/** @param {string} key */
export const getServicePage = (key) => SERVICE_PAGES.find((page) => page.key === key);
