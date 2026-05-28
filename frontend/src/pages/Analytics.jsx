import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import "../styles/analytics.css";
import OverviewTab from "../components/Analytics/OverviewTab";
import CustomersTab from "../components/Analytics/CustomersTab";
import ServicesTab from "../components/Analytics/ServicesTab";
import DuesTab from "../components/Analytics/DuesTab";
import KpiCard from "../components/Analytics/KpiCard";
import { FaChartLine } from "react-icons/fa";


// ── Main Page ──────────────────────────────────────────────────────────────
const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [dues, setDues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview"); // overview | customers | services | dues

  useEffect(() => {
    const load = async () => {
      try {
        const [aRes, dRes] = await Promise.all([
          api.get("/api/analytics"),
          api.get("/api/analytics/dues"),
        ]);
        setData(aRes.analytics);
        setDues(dRes.dues);
      } catch (err) {
        setError(err?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!data) return null;

  const totalRevenue =
    data.revenueByType.FILTER_SALE +
    data.revenueByType.SERVICE +
    data.revenueByType.AMC_PAYMENT;

  return (
    <div className="an-page">
      {/* Header */}
      <div className="an-header">
        <button className="an-back" onClick={() => navigate("/")}>
         <span className="arrow"> ← </span>
    <span className="text">Dashboard</span>
        </button>
        <h1>Analytics</h1>
        <p>Last 12 months · All figures in ₹</p>
      </div>

      {/* Tabs */}
      <div className="an-tabs">
        {[
          { key: "overview", label: "📊 Overview" },
          { key: "customers", label: "👥 Customers" },
          { key: "services", label: "🔧 Services" },
          {
            key: "dues",
            label: `💰 Dues (${(dues?.invoiceDues?.length || 0) + (dues?.customerDues?.length || 0)})`,
          },
        ].map((t) => (
          <button
            key={t.key}
            className={`an-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="an-body">
        {/* ══ OVERVIEW TAB ══════════════════════════════════════════════════ */}
        {tab === "overview" && (
        <OverviewTab data={data}/>
        )}

        {/* ══ CUSTOMERS TAB ════════════════════════════════════════════════ */}
        {tab === "customers" && (
          <>
            <CustomersTab data={data} />
          </>
        )}

        {/* ══ SERVICES TAB ═════════════════════════════════════════════════ */}
        {tab === "services" && (
         <>
         <ServicesTab data={data} />
         </>
        )}

        {/* ══ DUES TAB ═════════════════════════════════════════════════════ */}
        {tab === "dues" && dues && (
        <DuesTab dues={dues} />
        )}
      </div>
    </div>
  );
};

export default Analytics;
