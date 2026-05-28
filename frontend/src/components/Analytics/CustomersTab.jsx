
import { fmt } from "../../utils/formatter";
import DonutChart from "./DonutChart";
import KpiCard from "./KpiCard";
import HBar from "./HBar";
import BarChart from "./BarChart";
import { FaRedoAlt, FaUserFriends,FaUserSlash,FaUserTie,FaTools } from "react-icons/fa";


const CustomersTab = ({ data }) => {

  return (
    <>
    <div className="an-kpi-row">
              <KpiCard
                icon={<FaUserFriends />}
                label="Active Customers"
                value={fmt(data.activeCount)}
                color="#22c55e"
              />
              <KpiCard
                icon={<FaUserSlash />}
                label="Inactive Customers"
                value={fmt(data.inactiveCount)}
                color="#94a3b8"
              />
              <KpiCard
                icon={ <FaUserTie />}
                label="Regular"
                value={fmt(data.customerBreakdown.REGULAR)}
                color="#6173c7"
              />
              <KpiCard
                icon={ <FaRedoAlt />}
                label="AMC"
                value={fmt(data.customerBreakdown.AMC)}
                color="#f59e0b"
              />
              <KpiCard
                icon={<FaTools />}
                label="Service Only"
                value={fmt(data.customerBreakdown.SERVICE_ONLY)}
                color="#22c55e"
              />
            </div>

            {/* New customers */}
            <div className="an-card">
              <div className="an-card-title text-center">New Customers per Month</div>
              <BarChart
                data={data.newCustomers}
                valueKey="count"
                label="New Customers"
                color="#6173c7"
              />
            </div>

            <div className="an-card-row">
              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Customer Type Breakdown</div>
                <DonutChart
                  slices={[
                    {
                      label: "Regular",
                      value: data.customerBreakdown.REGULAR,
                      color: "#6173c7",
                    },
                    {
                      label: "AMC",
                      value: data.customerBreakdown.AMC,
                      color: "#f59e0b",
                    },
                    {
                      label: "Service Only",
                      value: data.customerBreakdown.SERVICE_ONLY,
                      color: "#22c55e",
                    },
                  ]}
                />
              </div>

              <div className="an-card an-card-half">
                <div className="an-card-title text-center">Top Serviced RO Models</div>
                {data.topRoModels.length === 0 ? (
                  <div className="an-empty">No data yet</div>
                ) : (
                  <HBar
                    items={data.topRoModels}
                    nameKey="model"
                    valueKey="count"
                    color="#6173c7"
                  />
                )}
              </div>
            </div>
            </>
          
  );
};

export default CustomersTab;