
import { fmt, fmtRs } from "../../utils/formatter";
import DonutChart from "./DonutChart";
import KpiCard from "./KpiCard";
import HBar from "./HBar";
import BarChart from "./BarChart";
import { FaCalculator, FaRedoAlt, FaRegClock, FaRocket,FaExclamationTriangle   } from "react-icons/fa";

const ServicesTab = ({ data }) => {

  return (
 <>
            <div className="an-kpi-row">
              <KpiCard
                icon={<FaCalculator />}
                label="Avg Service Charge"
                value={fmtRs(data.avgServiceCharge)}
                color="#6173c7"
                sub="per visit"
              />
              <KpiCard
                icon={<FaRegClock />}
                label="Scheduled"
                value={fmt(data.serviceTypeRatio.SCHEDULED)}
                color="#22c55e"
              />
              <KpiCard
                icon={<FaRocket />}
                label="Early"
                value={fmt(data.serviceTypeRatio.EARLY)}
                color="#f59e0b"
              />
              <KpiCard
                icon={<FaExclamationTriangle  />}
                label="Emergency"
                value={fmt(data.serviceTypeRatio.EMERGENCY)}
                color="#ef4444"
              />
              <KpiCard
                icon={<FaRedoAlt/>}
                label="AMC Service"
                value={fmt(data.serviceTypeRatio.AMC_SERVICE)}
                color="#8b5cf6"
              />
            </div>

            {/* Services per month */}
            <div className="an-card">
              <div className="an-card-title text-center">Services per Month</div>
              <BarChart
                data={data.servicesPerMonth}
                valueKey="count"
                label="Services"
                color="#22c55e"
              />
            </div>

            <div className="an-card-row">
              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Service Type Ratio</div>
                <DonutChart
                  slices={[
                    {
                      label: "Scheduled",
                      value: data.serviceTypeRatio.SCHEDULED,
                      color: "#22c55e",
                    },
                    {
                      label: "Early",
                      value: data.serviceTypeRatio.EARLY,
                      color: "#f59e0b",
                    },
                    {
                      label: "Emergency",
                      value: data.serviceTypeRatio.EMERGENCY,
                      color: "#ef4444",
                    },
                    {
                      label: "AMC Service",
                      value: data.serviceTypeRatio.AMC_SERVICE,
                      color: "#8b5cf6",
                    },
                  ]}
                />
              </div>

              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Most Replaced Parts (Top 8)</div>
                {data.topParts.length === 0 ? (
                  <div className="an-empty">No parts data yet</div>
                ) : (
                  <HBar
                    items={data.topParts.slice(0, 8)}
                    nameKey="name"
                    valueKey="count"
                    color="#ef4444"
                  />
                )}
              </div>
            </div>

            {/* Parts table */}
            {data.topParts.length > 0 && (
              <div className="an-card">
                <div className="an-card-title text-center">Parts Revenue Breakdown</div>
                <table className="an-table">
                  <thead>
                    <tr>
                      <th>Part</th>
                      <th>Times Replaced</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topParts.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.count}</td>
                        <td>{fmtRs(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
  );
};

export default ServicesTab;