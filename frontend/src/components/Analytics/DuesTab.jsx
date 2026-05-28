import { FaCalendarTimes, FaHourglassHalf,FaFileInvoiceDollar, FaExclamationTriangle   } from "react-icons/fa";
import { fmtRs } from "../../utils/formatter";
import HBar from "./HBar";
import KpiCard from "./KpiCard";

const DuesTab = ({ dues }) => {

  return (
    <>
            <div className="an-kpi-row">
              <KpiCard
                icon={<FaHourglassHalf />}
                label="Total Pending"
                value={fmtRs(dues.totalPending)}
                color="#ef4444"
              />
              <KpiCard
                icon={<FaCalendarTimes  />}
                label="Filter Payment Dues"
                value={dues.customerDues.length}
                color="#f59e0b"
                sub="customers with unpaid filters"
              />
              <KpiCard
                icon={<FaFileInvoiceDollar />}
                label="Invoice Dues"
                value={dues.invoiceDues.length}
                color="#6173c7"
                sub="partial or unpaid invoices"
              />
            </div>

            {/* Filter sale dues */}
            {dues.customerDues.length > 0 && (
              <div className="an-card table-responsive">
                <div className="an-card-title">
                  Filter Sale — Unpaid / Partial
                </div>
                <table className="an-table table-striped">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>RO Model</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Pending</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dues.customerDues.map((c) => (
                      <tr
                        key={c.id}
                        className="an-clickrow"
                        onClick={() => navigate(`/customers/${c.id}`)}
                      >
                        <td>{c.name}</td>
                        <td>
                          <a
                            href={`tel:${c.phone}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {c.phone}
                          </a>
                        </td>
                        <td>{c.roModel || "-"}</td>
                        <td>{fmtRs(c.filterPrice)}</td>
                        <td>{fmtRs(c.paidAmount)}</td>
                        <td className="an-due-amt">{fmtRs(c.pendingAmount)}</td>
                        <td>
                          <span
                            className={`an-status-badge an-status-${c.status.toLowerCase()}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <span className="an-arrow">→</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Invoice dues */}
            {dues.invoiceDues.length > 0 && (
              <div className="an-card table-responsive">
                <div className="an-card-title text-center">
                  Invoice Dues — All Pending Payments
                </div>
                <table className="an-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Pending</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dues.invoiceDues.map((inv) => (
                      <tr key={inv.id}>
                        <td>{inv.customerName}</td>
                        <td>
                          <a href={`tel:${inv.customerPhone}`}>
                            {inv.customerPhone}
                          </a>
                        </td>
                        <td>
                          <span className="an-type-badge">
                            {inv.type.replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          {new Date(inv.invoiceDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </td>
                        <td>{fmtRs(inv.totalAmount)}</td>
                        <td>{fmtRs(inv.paidAmount)}</td>
                        <td className="an-due-amt">
                          {fmtRs(inv.pendingAmount)}
                        </td>
                        <td>
                          <span
                            className={`an-status-badge an-status-${inv.status.toLowerCase()}`}
                          >
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {dues.customerDues.length === 0 &&
              dues.invoiceDues.length === 0 && (
                <div
                  className="an-card"
                  style={{ textAlign: "center", padding: 48 }}
                >
                  <div style={{ fontSize: 48 }}>🎉</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>
                    All clear!
                  </div>
                  <div style={{ color: "#64748b", marginTop: 4 }}>
                    No pending dues found.
                  </div>
                </div>
              )}
          </>
  );
};

export default DuesTab;