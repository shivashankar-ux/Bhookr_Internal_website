export default function Dashboard({ inventory, clients, staff, renewals }) {
  const today = new Date();
  const lowStock = inventory.filter(i => i.quantity <= i.threshold).length;
  const totalValue = inventory.reduce((s, i) => s + (Number(i.quantity) * Number(i.price)), 0);
  const dueSoon = renewals.filter(r => { const d = Math.ceil((new Date(r.renewalDate) - today) / 86400000); return d >= 0 && d <= 30; }).length;
  const activeClients = clients.filter(c => c.status === "Active").length;

  const stats = [
    { label: "Total Items", value: inventory.length, sub: `${lowStock} low stock`, color: "#CC0000", bg: "#fff5f5", icon: "📦" },
    { label: "Active Clients", value: activeClients, sub: `${clients.length} total clients`, color: "#2563eb", bg: "#eff6ff", icon: "👥" },
    { label: "Stock Alerts", value: lowStock, sub: lowStock > 0 ? "need restocking" : "all good", color: lowStock > 0 ? "#dc2626" : "#16a34a", bg: lowStock > 0 ? "#fef2f2" : "#f0fdf4", icon: "🔔" },
    { label: "Staff Members", value: staff.length, sub: `${staff.filter(s => s.status === "Active").length} active`, color: "#7c3aed", bg: "#f5f3ff", icon: "👤" },
    { label: "Renewals (30d)", value: dueSoon, sub: "due soon", color: dueSoon > 0 ? "#dc2626" : "#16a34a", bg: dueSoon > 0 ? "#fef2f2" : "#f0fdf4", icon: "🔄" },
    { label: "Inventory Value", value: `₹${totalValue.toLocaleString("en-IN")}`, sub: "estimated total", color: "#CC0000", bg: "#fff5f5", icon: "₹" },
  ];

  const isEmpty = inventory.length === 0 && clients.length === 0 && staff.length === 0;

  return (
    <div>
      {isEmpty ? (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "56px 40px", textAlign: "center", border: "2px dashed #e2e8f0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>👋</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "#1a202c", marginBottom: "10px", fontWeight: "800" }}>Welcome to Bhookr!</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif", maxWidth: "360px", margin: "0 auto", lineHeight: 1.7 }}>
            Your internal management portal is ready. Start by adding inventory items, clients, or staff members using the sidebar.
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "20px 22px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</span>
                  <div style={{ width: "34px", height: "34px", background: s.bg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{s.icon}</div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#1a202c", fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: s.color, fontFamily: "sans-serif", fontWeight: "600" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent clients table */}
          {clients.length > 0 && (
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid #f1f5f9" }}>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#1a202c", fontFamily: "Georgia, serif" }}>Recent Clients</h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Client", "Phone", "Plan", "Status"].map(h => (
                      <th key={h} style={{ padding: "10px 22px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.slice(-5).reverse().map((c, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #f8fafc" }}>
                      <td style={{ padding: "13px 22px", fontSize: "14px", fontWeight: "600", color: "#1a202c", fontFamily: "sans-serif" }}>{c.name}</td>
                      <td style={{ padding: "13px 22px", fontSize: "13px", color: "#64748b", fontFamily: "sans-serif" }}>{c.phone}</td>
                      <td style={{ padding: "13px 22px", fontSize: "13px", color: "#64748b", fontFamily: "sans-serif" }}>{c.plan}</td>
                      <td style={{ padding: "13px 22px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: c.status === "Active" ? "#f0fdf4" : "#f8fafc", color: c.status === "Active" ? "#16a34a" : "#94a3b8", border: `1px solid ${c.status === "Active" ? "#bbf7d0" : "#e2e8f0"}` }}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}