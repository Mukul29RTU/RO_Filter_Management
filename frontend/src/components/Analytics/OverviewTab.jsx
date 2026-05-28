import KpiCard from "./KpiCard";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import { fmtRs } from "../../utils/formatter";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

const OverviewTab = ({ data }) => {
  return (
    <>

      <div className="an-kpi-row">
              <KpiCard
                icon={<FaRupeeSign />}
                label="Total Revenue"
                value={fmtRs(data.collectionData.totalPaid)}
                sub={`${fmtRs(data.collectionData.pending)} pending`}
                color="#6173c7"
              />
              <KpiCard
                icon={<FaHandHoldingUsd />}
                label="Collection Rate"
                value={`${data.collectionRate}%`}
                sub="paid vs billed"
                color="#22c55e"
              />
              <KpiCard
                icon={<FaCalendarTimes />}
                label="Overdue Customers"
                value={data.overdueCount}
                sub="need service now"
                color="#ef4444"
              />
              <KpiCard
                icon={<FaRedoAlt />}
                label="AMC Renewals"
                value={data.amcRenewalsThisMonth}
                sub="due this month"
                color="#f59e0b"
              />
            </div>

            {/* Monthly Revenue */}
            <div className="an-card">
              <div className="an-card-title text-center">
                Monthly Revenue — Collected vs Pending
              </div>
              <BarChart
                data={data.monthlyRevenue}
                valueKey="revenue"
                secondKey="pending"
                label="Collected"
                color="#6173c7"
                secondColor="#fca5a5"
              />
            </div>

            {/* Revenue split */}
            <div className="an-card-row">
              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Revenue by Type</div>
                <DonutChart
                  slices={[
                    {
                      label: "Filter Sales",
                      value: data.revenueByType.FILTER_SALE,
                      color: "#6173c7",
                    },
                    {
                      label: "Service",
                      value: data.revenueByType.SERVICE,
                      color: "#22c55e",
                    },
                    {
                      label: "AMC",
                      value: data.revenueByType.AMC_PAYMENT,
                      color: "#f59e0b",
                    },
                  ]}
                />
                <div className="an-type-breakdown">
                  <div>
                    <span style={{ color: "#6173c7" }}>●</span> Filter Sales:{" "}
                    <strong>{fmtRs(data.revenueByType.FILTER_SALE)}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#22c55e" }}>●</span> Services:{" "}
                    <strong>{fmtRs(data.revenueByType.SERVICE)}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#f59e0b" }}>●</span> AMC:{" "}
                    <strong>{fmtRs(data.revenueByType.AMC_PAYMENT)}</strong>
                  </div>
                </div>
              </div>

              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Collection Status</div>
                <DonutChart
                  slices={[
                    {
                      label: "Collected",
                      value: data.collectionData.totalPaid,
                      color: "#22c55e",
                    },
                    {
                      label: "Pending",
                      value: data.collectionData.pending,
                      color: "#ef4444",
                    },
                  ]}
                />
                <div className="an-type-breakdown">
                  <div>
                    <span style={{ color: "#22c55e" }}>●</span> Collected:{" "}
                    <strong>{fmtRs(data.collectionData.totalPaid)}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#ef4444" }}>●</span> Pending:{" "}
                    <strong>{fmtRs(data.collectionData.pending)}</strong>
                  </div>
                  <div>
                    Billed Total:{" "}
                    <strong>{fmtRs(data.collectionData.totalAmount)}</strong>
                  </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default OverviewTab;