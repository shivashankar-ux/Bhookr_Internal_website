import { useState } from "react";

const empty = { name: "", contact: "", phone: "", email: "", plan: "Basic", since: "", status: "Active" };

export default function Clients({ clients, setClients }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    const c = { id: editId || Date.now(), ...form };
    if (editId) setClients(clients.map(x => x.id === editId ? c : x));
    else setClients([...clients, c]);
    setForm(empty); setShowForm(false); setEditId(null);
  };

  const handleEdit = (c) => {
    setForm({ name: c.name, contact: c.contact, phone: c.phone, email: c.email, plan: c.plan, since: c.since, status: c.status });
    setEditId(c.id); setShowForm(true);
  };

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  const Field = ({ k, label, type = "text" }) => (
    <div>
      <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", fontFamily: "sans-serif" }}>{label}</label>
      <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
        style={{ width: "100%", padding: "10px 13px", border: "1.5px solid #e8e8e8", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}
        onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" }}>
        <input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px 16px", border: "1.5px solid #e8e8e8", borderRadius: "7px", fontSize: "13px", width: "260px", outline: "none", fontFamily: "sans-serif" }}
          onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }}
          style={{ padding: "10px 20px", background: "#CC0000", color: "#fff", border: "none", borderRadius: "7px", fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif" }}>
          + Add Client
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#fff", borderRadius: "10px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "Georgia, serif", fontSize: "16px" }}>{editId ? "Edit Client" : "Add New Client"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
            <Field k="name" label="Business Name" />
            <Field k="contact" label="Contact Person" />
            <Field k="phone" label="Phone" />
            <Field k="email" label="Email" type="email" />
            <Field k="since" label="Client Since" type="date" />
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", fontFamily: "sans-serif" }}>Plan</label>
              <select value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}
                style={{ width: "100%", padding: "10px 13px", border: "1.5px solid #e8e8e8", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}>
                {["Basic", "Standard", "Premium"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", fontFamily: "sans-serif" }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: "100%", padding: "10px 13px", border: "1.5px solid #e8e8e8", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}>
                {["Active", "Inactive"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
            <button onClick={handleSave} style={{ padding: "10px 22px", background: "#CC0000", color: "#fff", border: "none", borderRadius: "7px", fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px" }}>{editId ? "Update" : "Save Client"}</button>
            <button onClick={() => { setShowForm(false); setForm(empty); setEditId(null); }} style={{ padding: "10px 22px", background: "#f5f5f5", color: "#555", border: "none", borderRadius: "7px", fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: "10px" }}>
        {clients.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "60px", textAlign: "center", color: "#ccc", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: "36px", marginBottom: "10px" }}>👥</div>
            <p style={{ fontSize: "14px" }}>No clients yet. Click <strong>+ Add Client</strong> to get started.</p>
          </div>
        ) : filtered.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: "10px", padding: "18px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                <div style={{ width: "34px", height: "34px", background: "#CC0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "14px", fontFamily: "Georgia, serif", flexShrink: 0 }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#0f0f0f", fontFamily: "Georgia, serif" }}>{c.name}</span>
                  <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "600", background: c.status === "Active" ? "#f0fff4" : "#f5f5f5", color: c.status === "Active" ? "#006400" : "#aaa", border: `1px solid ${c.status === "Active" ? "#b7ebc0" : "#e8e8e8"}` }}>{c.status}</span>
                    <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "600", background: "#fff5f5", color: "#CC0000", border: "1px solid #ffcccc" }}>{c.plan}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#aaa", display: "flex", gap: "16px", flexWrap: "wrap", paddingLeft: "44px" }}>
                {c.contact && <span>👤 {c.contact}</span>}
                <span>📞 {c.phone}</span>
                {c.email && <span>✉ {c.email}</span>}
                {c.since && <span>📅 {new Date(c.since).toLocaleDateString("en-IN")}</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleEdit(c)} style={{ padding: "7px 14px", background: "#f5f5f5", color: "#333", border: "1px solid #e8e8e8", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif" }}>Edit</button>
              <button onClick={() => setClients(clients.filter(x => x.id !== c.id))} style={{ padding: "7px 14px", background: "#fff5f5", color: "#CC0000", border: "1px solid #ffcccc", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}