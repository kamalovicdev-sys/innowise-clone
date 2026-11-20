import { CircleCheck, TrendingUp } from 'lucide-react';
import styles from './HeroDashboard.module.css';

// Bezak uchun demo dashbord (ekran o'quvchilardan yashirilgan, "Demo" belgisi bilan).
// Raqamlar namuna: kompaniya natijasi sifatida taqdim etilmaydi.
const THIS_YEAR = [42, 48, 45, 55, 52, 63, 60, 70, 68, 78, 75, 86];
const LAST_YEAR = [38, 40, 41, 44, 43, 48, 50, 52, 51, 56, 58, 61];
const PLOT = { left: 6, right: 346, top: 12, bottom: 116, min: 30, max: 90 };
const GRID_VALUES = [40, 60, 80];
const STOCK_LEVEL = 0.72;
const DONUT_RADIUS = 26;
const DONUT_LENGTH = 2 * Math.PI * DONUT_RADIUS;

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

const HeroDashboard = ({ dict }) => (
  <div className={styles.dashboard} aria-hidden="true">
    <div className={styles.window}>
      <div className={styles.windowBar}>
        <span className={styles.dots}>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className={styles.windowTitle}>{dict.title}</span>
        <span className={styles.badge}>{dict.badge}</span>
      </div>

      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>{dict.kpiGrowth}</span>
          <span className={styles.kpiValue}>+18%</span>
          <span className={styles.kpiTrend}>
            <TrendingUp size={14} /> 4.2
          </span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>{dict.kpiOrders}</span>
          <span className={styles.kpiValue}>1 240</span>
          <span className={styles.kpiTrend}>
            <TrendingUp size={14} /> 96
          </span>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <span className={styles.chartTitle}>{dict.chartTitle}</span>
          <span className={styles.legend}>
            <span className={styles.legendItem}>
              <i className={styles.swatchCurrent}></i>
              {dict.thisYear}
            </span>
            <span className={styles.legendItem}>
              <i className={styles.swatchPrevious}></i>
              {dict.lastYear}
            </span>
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

          <line
            x1={END_POINT[0]}
            x2={END_POINT[0]}
            y1={END_POINT[1]}
            y2={PLOT.bottom}
            className={styles.guide}
          />
          <circle cx={END_POINT[0]} cy={END_POINT[1]} r="5" className={styles.endPoint} />

          {dict.months.map((month, i) =>
            i % 2 === 0 ? (
              <text
                key={month}
                x={x(i)}
                y="134"
                textAnchor={i === 0 ? 'start' : 'middle'}
                className={styles.monthLabel}
              >
                {month}
              </text>
            ) : null
          )}
        </svg>
      </div>
    </div>

    <div className={styles.donutCard}>
      <svg viewBox="0 0 64 64" className={styles.donut}>
        <circle cx="32" cy="32" r={DONUT_RADIUS} className={styles.donutTrack} />
        <circle
          cx="32"
          cy="32"
          r={DONUT_RADIUS}
          className={styles.donutValue}
          strokeDasharray={`${(DONUT_LENGTH * STOCK_LEVEL).toFixed(1)} ${DONUT_LENGTH.toFixed(1)}`}
        />
      </svg>
      <span className={styles.donutText}>
        <strong>{Math.round(STOCK_LEVEL * 100)}%</strong>
        {dict.kpiStock}
      </span>
    </div>

    <div className={styles.toast}>
      <CircleCheck size={18} className={styles.toastIcon} />
      {dict.notification}
    </div>
  </div>
);

export default HeroDashboard;
