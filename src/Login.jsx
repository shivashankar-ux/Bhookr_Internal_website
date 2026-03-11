import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    if (!user || !pass) { setError("Please enter your username and password."); return; }
    setLoading(true);
    setTimeout(() => {
      if (login(user, pass)) navigate("/");
      else { setError("Incorrect username or password."); setLoading(false); }
    }, 500);
  };

  const inp = {
    width: "100%", padding: "11px 14px",
    border: "1.5px solid #e2e8f0", borderRadius: "8px",
    fontSize: "14px", outline: "none",
    boxSizing: "border-box", fontFamily: "sans-serif",
    color: "#1a202c", background: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s"
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f8fafc" }}>
      {/* Left - branding */}
      <div style={{
        width: "42%", background: "#CC0000",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "48px",
        position: "relative", overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: "60px", right: "-60px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,0,0,0.1)" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <div style={{ width: "40px", height: "40px", background: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#CC0000", fontSize: "20px", fontWeight: "900", fontFamily: "Georgia, serif" }}>B</span>
          </div>
          <span style={{ color: "#fff", fontSize: "22px", fontWeight: "700", fontFamily: "Georgia, serif", letterSpacing: "-0.5px" }}>Bhookr</span>
        </div>

        {/* Middle content */}
        <div style={{ zIndex: 1 }}>
          <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: "800", fontFamily: "Georgia, serif", lineHeight: 1.25, marginBottom: "16px", letterSpacing: "-1px" }}>
            Your business,<br />fully in control.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", lineHeight: 1.7, maxWidth: "320px", fontFamily: "sans-serif" }}>
            Manage inventory, clients, staff and renewals from one secure internal portal.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
            {["Inventory", "Clients", "Stock Alerts", "Renewals"].map(f => (
              <span key={f} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.15)", borderRadius: "20px", color: "#fff", fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif", backdropFilter: "blur(4px)" }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: "sans-serif", zIndex: 1 }}>
          © 2026 Bhookr Internal · v1.0
        </div>
      </div>

      {/* Right - form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1a202c", fontFamily: "Georgia, serif", letterSpacing: "-0.5px", marginBottom: "6px" }}>
              Sign in to Bhookr
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif" }}>
              Authorized personnel only
            </p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", fontFamily: "sans-serif" }}>
              Username
            </label>
            <input
              type="text" value={user}
              onChange={e => setUser(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Enter your username"
              style={inp}
              onFocus={e => { e.target.style.borderColor = "#CC0000"; e.target.style.boxShadow = "0 0 0 3px rgba(204,0,0,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", fontFamily: "sans-serif" }}>
              Password
            </label>
            <input
              type="password" value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              style={inp}
              onFocus={e => { e.target.style.borderColor = "#CC0000"; e.target.style.boxShadow = "0 0 0 3px rgba(204,0,0,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "11px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠</span> {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", padding: "13px",
            background: loading ? "#f1f5f9" : "#CC0000",
            color: loading ? "#94a3b8" : "#fff",
            border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "sans-serif", letterSpacing: "0.3px",
            transition: "all 0.2s", boxShadow: loading ? "none" : "0 4px 14px rgba(204,0,0,0.3)"
          }}
            onMouseEnter={e => { if (!loading) e.target.style.background = "#aa0000"; }}
            onMouseLeave={e => { if (!loading) e.target.style.background = "#CC0000"; }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "28px", padding: "12px 14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "16px" }}>🔒</span>
            <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>
              Secure access · Data stored locally on your device
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}