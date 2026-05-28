const HBar = ({ items, nameKey, valueKey, color = "#6173c7" }) => {
  const max = Math.max(...items.map((i) => i[valueKey] || 0), 1);
  return (
    <div className="an-hbar-list">
      {items.map((item, i) => (
        <div key={i} className="an-hbar-row">
          <div className="an-hbar-name">{item[nameKey]}</div>
          <div className="an-hbar-track">
            <div
              className="an-hbar-fill"
              style={{
                width: `${((item[valueKey] || 0) / max) * 100}%`,
                background: color,
              }}
            />
          </div>
          <div className="an-hbar-count">{item[valueKey]}</div>
        </div>
      ))}
    </div>
  );
};

export default HBar;