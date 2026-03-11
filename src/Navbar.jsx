import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard", "/inventory": "Inventory",
  "/clients": "Clients", "/stock-alerts": "Stock Alerts",
  "/staff": "Staff", "/renewals": "Renewals",
};

export default function Navbar() {
  const loc = useLocation();
  const title = titles[loc.pathname] || "Bhookr";
  const now = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <header style={{
      height: "58px", background: "#fff",
      borderBottom: "1px solid #e2e8f0",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "fixed",
      top: 0, left: "230px", right: 0, zIndex: 99
    }}>
      <h1 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "#1a202c", fontFamily: "Georgia, serif", letterSpacing: "-0.3px" }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>{now}</span>
        <div style={{ width: "32px", height: "32px", background: "#CC0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "13px" }}>A</div>
      </div>
    </header>
  );
}