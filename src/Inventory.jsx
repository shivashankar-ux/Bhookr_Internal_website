import { useState } from "react";

const cats = ["Grains", "Pulses", "Oils", "Essentials", "Spices", "Dairy", "Beverages", "Other"];
const empty = { name: "", category: "Grains", quantity: "", unit: "", price: "", threshold: "5" };

const Btn = ({ onClick, children, variant = "primary" }) => (
  <button onClick={onClick} style={{
    padding: "9px 18px", border: "none", borderRadius: "7px",
    fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif",
    background: variant === "primary" ? "#CC0000" : variant === "ghost" ? "#f8fafc" : "#fff5f5",
    color: variant === "primary" ? "#fff" : variant === "ghost" ? "#64748b" : "#CC0000",
    border: variant === "ghost" ? "1px solid #e2e8f0" : variant === "danger" ? "1px solid #fecaca" : "none"
  }}>{children}</button>
);

export default function Inventory({ items, setItems }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.name.trim() || !form.quantity || !form.price) return;
    const item = { id: editId || Date.now(), ...form, quantity: Number(form.quantity), price: Number(form.price), threshold: Number(form.threshold) || 5 };
    setItems(editId ? items.map(i => i.id === editId ? item : i) : [...items, item]);
    setForm(empty); setShowForm(false); setEditId(null);
  };

  const edit = (item) => { setForm({ name: item.name, category: item.category, quantity: item.quantity, unit: item.unit, price: item.price, threshold: item.threshold }); setEditId(item.id); setShowForm(true); };
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Topbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "14px" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..."
            style={{ padding: "9px 14px 9px 36px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", width: "260px", outline: "none", fontFamily: "sans-serif" }}
            onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
        </div>
        <Btn onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }}>+ Add Item</Btn>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700", color: "#1a202c" }}>{editId ? "Edit Item" : "Add New Item"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", marginBottom: "18px" }}>
            {[["name", "Item Name"], ["quantity", "Quantity", "number"], ["unit", "Unit (e.g. Bags)"], ["price", "Price per Unit (₹)", "number"], ["threshold", "Alert Threshold", "number"]].map(([k, label, type = "text"]) => (
              <div key={k}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "5px", fontFamily: "sans-serif" }}>{label}</label>
                <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "5px", fontFamily: "sans-serif" }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Btn onClick={save}>{editId ? "Update Item" : "Save Item"}</Btn>
            <Btn variant="ghost" onClick={() => { setShowForm(false); setForm(empty); setEditId(null); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        {items.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
            <h3 style={{ color: "#1a202c", fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>No inventory yet</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Click <strong>+ Add Item</strong> to add your first inventory item.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Item Name", "Category", "Qty", "Unit", "Price (₹)", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "11px 18px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const low = item.quantity <= item.threshold;
                return (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                    <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#1a202c" }}>{item.name}</td>
                    <td style={{ padding: "14px 18px" }}><span style={{ padding: "3px 10px", background: "#f1f5f9", borderRadius: "20px", fontSize: "12px", color: "#64748b", fontWeight: "500" }}>{item.category}</span></td>
                    <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "700", color: low ? "#CC0000" : "#1a202c" }}>{item.quantity}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#64748b" }}>{item.unit}</td>
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#1a202c", fontWeight: "600" }}>₹{Number(item.price).toLocaleString("en-IN")}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: low ? "#fef2f2" : "#f0fdf4", color: low ? "#dc2626" : "#16a34a", border: `1px solid ${low ? "#fecaca" : "#bbf7d0"}` }}>
                        {low ? "⚠ Low Stock" : "✓ In Stock"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <Btn variant="ghost" onClick={() => edit(item)}>Edit</Btn>
                        <Btn variant="danger" onClick={() => setItems(items.filter(x => x.id !== item.id))}>Delete</Btn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}