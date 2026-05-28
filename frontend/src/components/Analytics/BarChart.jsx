import { fmtRs } from "../../utils/formatter";


const BarChart = ({
  data,
  valueKey,
  label,
  color = "#6173c7",
  secondKey,
  secondColor = "#e2b96e",
}) => {
  const max = Math.max(
    ...data.map((d) =>
      Math.max(
        d[valueKey] || 0,
        d[secondKey] || 0
      )
    ),
    1
  );

  return (
    <div className="an-barchart">
      <div className="an-bars">
        {data.map((d, i) => (
          <div key={i} className="an-bar-col">
            <div className="an-bar-stack">

              {secondKey && (
                <div
                  className="an-bar-seg"
                  style={{
                    height: `${((d[secondKey] || 0) / max) * 100}%`,
                    background: secondColor,
                  }}
                  title={`${d.month}: ${fmtRs(d[secondKey])}`}
                />
              )}

              <div
                className="an-bar-seg"
                style={{
                  height: `${((d[valueKey] || 0) / max) * 100}%`,
                  background: color,
                }}
                title={`${d.month}: ${fmtRs(d[valueKey])}`}
              />
            </div>

            <div className="an-bar-label">
              {d.month?.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;