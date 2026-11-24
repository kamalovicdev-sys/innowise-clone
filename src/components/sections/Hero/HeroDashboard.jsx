import { CircleCheck, RefreshCw, TriangleAlert, TrendingUp } from 'lucide-react';
import styles from './HeroDashboard.module.css';

// Bezak uchun "jonli" demo dashbord (ekran o'quvchilardan yashirilgan). Raqamlar namuna, kompaniya natijasi emas.
// Yozuvlar barcha til versiyalarida inglizcha: dashbord interfeysi shunday ko'rinadi.
// Harakat: HeroDashboardLive.astro skripti data-view ni almashtiradi (Revenue → Channels → Inventory)
// va KPI raqamlarini sanaydi. JS bo'lmasa yoki "harakatni kamaytirish" yoqilgan bo'lsa, Revenue ko'rinishi turadi.

// --- Revenue: chiziqli grafik (bu yil va o'tgan yil) ---
const THIS_YEAR = [42, 48, 45, 55, 52, 63, 60, 70, 68, 78, 75, 86];
const LAST_YEAR = [38, 40, 41, 44, 43, 48, 50, 52, 51, 56, 58, 61];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PLOT = { left: 6, right: 346, top: 12, bottom: 116, min: 30, max: 90 };
const GRID_VALUES = [40, 60, 80];

const x = (i) => PLOT.left + (i * (PLOT.right - PLOT.left)) / (THIS_YEAR.length - 1);
const y = (v) => PLOT.bottom - ((v - PLOT.min) / (PLOT.max - PLOT.min)) * (PLOT.bottom - PLOT.top);
const fmt = ([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`;

// Silliq egri chiziq (Catmull-Rom -> kubik Bezier), build vaqtida hisoblanadi
const smoothPath = (values) => {
  const pts = values.map((v, i) => [x(i), y(v)]);
  let d = `M${fmt(pts[0])}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${fmt(c1)} ${fmt(c2)} ${fmt(p2)}`;
  }
  return d;
};

const THIS_YEAR_PATH = smoothPath(THIS_YEAR);
const LAST_YEAR_PATH = smoothPath(LAST_YEAR);
const LAST_INDEX = THIS_YEAR.length - 1;
const AREA_PATH = `${THIS_YEAR_PATH} L${fmt([x(LAST_INDEX), PLOT.bottom])} L${fmt([x(0), PLOT.bottom])} Z`;
const END_POINT = [x(LAST_INDEX), y(THIS_YEAR[LAST_INDEX])];

// --- Channels: savdo kanallari bo'yicha ulush (ustunlar) ---
const CHANNELS = [
  { label: 'Retail', value: 38 },
  { label: 'Wholesale', value: 27 },
  { label: 'E-commerce', value: 21 },
  { label: 'HoReCa', value: 14 },
];
const CHANNEL_MAX = 40;

// --- Inventory: ombor holati (donut segmentlari, pathLength=100 da foizlar) ---
const STOCK = [
  { label: 'In stock', value: 72, tone: 'ok' },
  { label: 'Low stock', value: 18, tone: 'low' },
  { label: 'Out of stock', value: 10, tone: 'out' },
];
const SEGMENT_GAP = 1.5;
const STOCK_SEGMENTS = STOCK.reduce(
  (acc, item) => ({
    start: acc.start + item.value,
    list: [...acc.list, { ...item, start: acc.start, length: item.value - SEGMENT_GAP }],
  }),
  { start: 0, list: [] }
).list;

// --- KPI: boshlang'ich (build) qiymatlar. Skript ularni noldan sanaydi va keyin biroz yangilab turadi ---
const KPIS = [
  { key: 'revenue', label: 'Revenue', value: 1.24, decimals: 2, prefix: '$', suffix: 'M', trend: '12.4%' },
  { key: 'orders', label: 'Orders', value: 3480, decimals: 0, prefix: '', suffix: '', trend: '8.1%' },
  { key: 'margin', label: 'Margin', value: 24.6, decimals: 1, prefix: '', suffix: '%', trend: '1.8 pp' },
];

const formatKpi = ({ value, decimals, prefix, suffix }) =>
  `${prefix}${value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

const TABS = [
  { view: 'revenue', label: 'Revenue' },
  { view: 'channels', label: 'Channels' },
  { view: 'inventory', label: 'Inventory' },
];

// Har bir ko'rinishga mos bildirishnoma
const TOASTS = [
  { view: 'revenue', Icon: RefreshCw, text: 'Data synced from 1C', tone: 'info' },
  { view: 'channels', Icon: CircleCheck, text: 'Weekly report sent to CEO', tone: 'ok' },
  { view: 'inventory', Icon: TriangleAlert, text: 'Low stock alert: SKU-114', tone: 'warn' },
];

const HeroDashboard = () => (
  <div className={styles.dashboard} aria-hidden="true" data-hero-dash data-view="revenue">
    <div className={styles.window}>
      <div className={styles.windowBar}>
        <span className={styles.dots}>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className={styles.windowTitle}>Sales Overview</span>
        <span className={styles.badge}>
          <i className={styles.liveDot}></i>
          Live
        </span>
      </div>

      <div className={styles.kpis}>
        {KPIS.map((kpi) => (
          <div key={kpi.key} className={styles.kpi}>
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <span
              className={styles.kpiValue}
              data-count={kpi.value}
              data-decimals={kpi.decimals}
              data-prefix={kpi.prefix}
              data-suffix={kpi.suffix}
            >
              {formatKpi(kpi)}
            </span>
            <span className={styles.kpiTrend}>
              <TrendingUp size={13} /> {kpi.trend}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chartCard}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <span key={tab.view} className={styles.tab} data-tab={tab.view}>
              {tab.label}
            </span>
          ))}
        </div>

        <div className={styles.views}>
          {/* Revenue */}
          <div className={`${styles.view} ${styles.viewRevenue}`} data-view-name="revenue">
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <i className={styles.swatchCurrent}></i>This year
              </span>
              <span className={styles.legendItem}>
                <i className={styles.swatchPrevious}></i>Last year
              </span>
            </div>
            <svg viewBox="0 0 352 140" className={styles.chart}>
              <defs>
                <linearGradient id="hero-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className={styles.fillTop} />
                  <stop offset="1" className={styles.fillBottom} />
                </linearGradient>
              </defs>
              {GRID_VALUES.map((v) => (
                <line key={v} x1={PLOT.left} x2={PLOT.right} y1={y(v)} y2={y(v)} className={styles.gridLine} />
              ))}
              <line x1={PLOT.left} x2={PLOT.right} y1={PLOT.bottom} y2={PLOT.bottom} className={styles.axis} />
              <path d={AREA_PATH} fill="url(#hero-area-fill)" className={styles.area} />
              <path d={LAST_YEAR_PATH} className={styles.linePrevious} />
              <path d={THIS_YEAR_PATH} pathLength="1" className={styles.lineCurrent} />
              <line x1={END_POINT[0]} x2={END_POINT[0]} y1={END_POINT[1]} y2={PLOT.bottom} className={styles.guide} />
              <circle cx={END_POINT[0]} cy={END_POINT[1]} r="5" className={styles.endPoint} />
              {MONTHS.map((month, i) =>
                i % 2 === 0 ? (
                  <text key={month} x={x(i)} y="134" textAnchor={i === 0 ? 'start' : 'middle'} className={styles.axisLabel}>
                    {month}
                  </text>
                ) : null
              )}
            </svg>
          </div>

          {/* Channels */}
          <div className={`${styles.view} ${styles.viewChannels}`} data-view-name="channels">
            <ul className={styles.bars}>
              {CHANNELS.map((channel, i) => (
                <li key={channel.label} className={styles.barItem} style={{ '--i': i }}>
                  <span className={styles.barValue}>{channel.value}%</span>
                  <span className={styles.barTrack}>
                    <span className={styles.bar} style={{ height: `${(channel.value / CHANNEL_MAX) * 100}%` }}></span>
                  </span>
                  <span className={styles.barLabel}>{channel.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory */}
          <div className={`${styles.view} ${styles.viewInventory}`} data-view-name="inventory">
            <div className={styles.stock}>
              <div className={styles.donutWrap}>
                <svg viewBox="0 0 64 64" className={styles.donut}>
                  <circle cx="32" cy="32" r="26" className={styles.donutTrack} />
                  {STOCK_SEGMENTS.map((segment, i) => (
                    <circle
                      key={segment.label}
                      cx="32"
                      cy="32"
                      r="26"
                      pathLength="100"
                      className={`${styles.segment} ${styles[`segment_${segment.tone}`]}`}
                      style={{
                        '--i': i,
                        strokeDasharray: `${segment.length} ${100 - segment.length}`,
                        strokeDashoffset: -segment.start,
                      }}
                    />
                  ))}
                </svg>
                <span className={styles.donutCenter}>
                  <strong>{STOCK[0].value}%</strong>
                  in stock
                </span>
              </div>
              <ul className={styles.stockLegend}>
                {STOCK.map((item, i) => (
                  <li key={item.label} style={{ '--i': i }}>
                    <i className={styles[`dot_${item.tone}`]}></i>
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.planCard}>
      <span className={styles.planHead}>
        Monthly plan <strong>104%</strong>
      </span>
      <span className={styles.planTrack}>
        <span className={styles.planFill}></span>
      </span>
    </div>

    <div className={styles.toasts}>
      {TOASTS.map(({ view, Icon, text, tone }) => (
        <div key={view} className={`${styles.toast} ${styles[`toast_${tone}`]}`} data-toast-for={view}>
          <Icon size={18} className={styles.toastIcon} />
          {text}
        </div>
      ))}
    </div>
  </div>
);

export default HeroDashboard;
