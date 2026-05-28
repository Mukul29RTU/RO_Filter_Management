import { fmt } from "../../utils/formatter";

const DonutChart = ({ slices }) => {
  // slices = [{ label, value, color }]
  const total = slices.reduce((s, x) => s + x.value, 0);
  if (total === 0) return <div className="an-donut-empty">No data</div>;

  let offset = 0;
  const R = 60,
    cx = 70,
    cy = 70,
    stroke = 22;
  const circumference = 2 * Math.PI * R;

  return (
    <div className="an-donut-wrap">
      <svg width="140" height="140" className="an-donut-svg">
        {slices.map((s, i) => {
          const pct = s.value / total;
          const dash = pct * circumference;
          const gap = circumference - dash;
          const rot = offset * 360 - 90;
          offset += pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
          );
        })}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="11"
          fill="#64748b"
        >
          Total
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="#1e293b"
        >
          {fmt(total)}
        </text>
      </svg>
      <div className="an-donut-legend">
        {slices.map((s, i) => (
          <div key={i} className="an-donut-item">
            <span className="an-legend-dot" style={{ background: s.color }} />
            <span className="an-donut-label">{s.label}</span>
            <span className="an-donut-val">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;