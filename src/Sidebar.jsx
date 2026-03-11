import { NavLink } from "react-router-dom";
import { useAuth } from "./Authcontext";

const nav = [
  { path: "/", label: "Dashboard", icon: "⊞" },
  { path: "/inventory", label: "Inventory", icon: "📦" },
  { path: "/clients", label: "Clients", icon: "👥" },
  { path: "/stock-alerts", label: "Stock Alerts", icon: "🔔" },
  { path: "/staff", label: "Staff", icon: "👤" },
  { path: "/renewals", label: "Renewals", icon: "🔄" },
];

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside style={{
      width: "230px", minHeight: "100vh",
      background: "#fff", position: "fixed", left: 0, top: 0, zIndex: 100,
      borderRight: "1px solid #e2e8f0",
      display: "flex", flexDirection: "column"
    }}>
      {/* Brand */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: "#CC0000", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "900", fontFamily: "Georgia, serif" }}>B</span>
          </div>
          <div>
            <div style={{ color: "#1a202c", fontSize: "15px", fontWeight: "800", fontFamily: "Georgia, serif", letterSpacing: "-0.3px" }}>Bhookr</div>
            <div style={{ color: "#94a3b8", fontSize: "10px", fontFamily: "sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Internal Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 10px" }}>
        <div style={{ fontSize: "10px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "1.5px", padding: "8px 10px 4px", fontFamily: "sans-serif" }}>
          Menu
        </div>
        {nav.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === "/"}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "7px", marginBottom: "2px",
              color: isActive ? "#CC0000" : "#64748b",
              background: isActive ? "#fff5f5" : "transparent",
              textDecoration: "none", fontSize: "13.5px",
              fontWeight: isActive ? "700" : "500",
              fontFamily: "sans-serif", transition: "all 0.15s",
              border: isActive ? "1px solid #fecaca" : "1px solid transparent"
            })}
            onMouseEnter={e => { if (!e.currentTarget.className.includes("active")) e.currentTarget.style.background = "#f8fafc"; }}
            onMouseLeave={e => { if (!e.currentTarget.style.color?.includes("CC0000")) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: "15px", width: "20px", textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", marginBottom: "8px" }}>
          <div style={{ width: "30px", height: "30px", background: "#CC0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#1a202c", fontFamily: "sans-serif" }}>Admin</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "sans-serif" }}>Super Admin</div>
          </div>
        </div>
        <button onClick={logout} style={{
          width: "100%", padding: "8px 12px",
          background: "transparent", border: "1px solid #e2e8f0",
          color: "#94a3b8", borderRadius: "7px", cursor: "pointer",
          fontSize: "12px", fontFamily: "sans-serif", fontWeight: "600",
          transition: "all 0.15s"
        }}
          onMouseEnter={e => { e.target.style.borderColor = "#fecaca"; e.target.style.color = "#CC0000"; e.target.style.background = "#fff5f5"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#94a3b8"; e.target.style.background = "transparent"; }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}