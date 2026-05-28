const KpiCard = ({ label, value, sub, color = "#6173c7", icon }) => (
  <div className="an-kpi" style={{ borderTopColor: color }}>
    <div className="an-kpi-icon">{icon}</div>
    <div className="an-kpi-value" style={{ color }}>
      {value}
    </div>
    <div className="an-kpi-label">{label}</div>
    {sub && <div className="an-kpi-sub">{sub}</div>}
  </div>
);

export default KpiCard;