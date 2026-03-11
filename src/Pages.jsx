import { useState } from "react";

const Btn = ({ onClick, children, variant = "primary", style: s = {} }) => (
  <button onClick={onClick} style={{
    padding: "9px 18px", border: "none", borderRadius: "7px",
    fontWeight: "600", fontSize: "13px", cursor: "pointer", fontFamily: "sans-serif",
    background: variant === "primary" ? "#CC0000" : variant === "ghost" ? "#f8fafc" : "#fff5f5",
    color: variant === "primary" ? "#fff" : variant === "ghost" ? "#64748b" : "#CC0000",
    border: variant === "ghost" ? "1px solid #e2e8f0" : variant === "danger" ? "1px solid #fecaca" : "none",
    ...s
  }}>{children}</button>
);

const Field = ({ label, value, onChange, type = "text", options }) => (
  <div>
    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "5px", fontFamily: "sans-serif" }}>{label}</label>
    {options ? (
      <select value={value} onChange={onChange}
        style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} value={value} onChange={onChange}
        style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: "7px", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "sans-serif" }}
        onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
    )}
  </div>
);

/* ─── CLIENTS ─── */
const emptyC = { name: "", contact: "", phone: "", email: "", plan: "Basic", since: "", status: "Active" };
export function Clients({ clients, setClients }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyC);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  const save = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    const c = { id: editId || Date.now(), ...form };
    setClients(editId ? clients.map(x => x.id === editId ? c : x) : [...clients, c]);
    setForm(emptyC); setShow(false); setEditId(null);
  };

  const edit = (c) => { setForm({ name: c.name, contact: c.contact, phone: c.phone, email: c.email, plan: c.plan, since: c.since, status: c.status }); setEditId(c.id); setShow(true); };
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
            style={{ padding: "9px 14px 9px 36px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", width: "260px", outline: "none", fontFamily: "sans-serif" }}
            onFocus={e => e.target.style.borderColor = "#CC0000"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
        </div>
        <Btn onClick={() => { setShow(!show); setForm(emptyC); setEditId(null); }}>+ Add Client</Btn>
      </div>

      {show && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700" }}>{editId ? "Edit Client" : "Add New Client"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px", marginBottom: "18px" }}>
            <Field label="Business Name" {...f("name")} />
            <Field label="Contact Person" {...f("contact")} />
            <Field label="Phone" {...f("phone")} />
            <Field label="Email" type="email" {...f("email")} />
            <Field label="Client Since" type="date" {...f("since")} />
            <Field label="Plan" options={["Basic", "Standard", "Premium"]} {...f("plan")} />
            <Field label="Status" options={["Active", "Inactive"]} {...f("status")} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Btn onClick={save}>{editId ? "Update" : "Save Client"}</Btn>
            <Btn variant="ghost" onClick={() => { setShow(false); setForm(emptyC); setEditId(null); }}>Cancel</Btn>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: "10px" }}>
        {clients.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "64px", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>👥</div>
            <h3 style={{ color: "#1a202c", fontSize: "16px", fontWeight: "700", marginBottom: "6px", fontFamily: "Georgia, serif" }}>No clients yet</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif" }}>Click <strong>+ Add Client</strong> to add your first client.</p>
          </div>
        ) : filtered.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: "12px", padding: "18px 22px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "42px", height: "42px", background: "#CC0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "16px", fontFamily: "Georgia, serif", flexShrink: 0 }}>{c.name.charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1a202c", fontFamily: "Georgia, serif" }}>{c.name}</span>
                  <span style={{ padding: "2px 9px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: c.status === "Active" ? "#f0fdf4" : "#f8fafc", color: c.status === "Active" ? "#16a34a" : "#94a3b8", border: `1px solid ${c.status === "Active" ? "#bbf7d0" : "#e2e8f0"}` }}>{c.status}</span>
                  <span style={{ padding: "2px 9px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: "#fff5f5", color: "#CC0000", border: "1px solid #fecaca" }}>{c.plan}</span>
                </div>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  {[c.contact && `👤 ${c.contact}`, `📞 ${c.phone}`, c.email && `✉ ${c.email}`, c.since && `📅 ${new Date(c.since).toLocaleDateString("en-IN")}`].filter(Boolean).map((t, i) => (
                    <span key={i} style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Btn variant="ghost" onClick={() => edit(c)}>Edit</Btn>
              <Btn variant="danger" onClick={() => setClients(clients.filter(x => x.id !== c.id))}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STOCK ALERTS ─── */
export function Stockalerts({ inventory }) {
  const alerts = inventory.filter(i => Number(i.quantity) <= Number(i.threshold));
  const urg = (q, t) => {
    const r = q / t;
    if (r <= 0.25) return { label: "Critical", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
    if (r <= 0.5) return { label: "High", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" };
    return { label: "Medium", color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "24px" }}>
        {[{ l: "Critical", f: a => a.quantity / a.threshold <= 0.25, c: "#dc2626" }, { l: "High", f: a => { const r = a.quantity / a.threshold; return r > 0.25 && r <= 0.5; }, c: "#ea580c" }, { l: "Medium", f: a => a.quantity / a.threshold > 0.5, c: "#d97706" }].map(s => (
          <div key={s.l} style={{ background: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid #e2e8f0", borderTop: `3px solid ${s.c}` }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: s.c, fontFamily: "Georgia, serif" }}>{alerts.filter(s.f).length}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: s.c, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "sans-serif", marginTop: "4px" }}>{s.l}</div>
          </div>
        ))}
      </div>
      {alerts.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "64px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
          <h3 style={{ color: "#16a34a", fontSize: "16px", fontWeight: "700", fontFamily: "Georgia, serif", marginBottom: "6px" }}>All stock levels healthy!</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif" }}>No items are below their threshold at the moment.</p>
        </div>
      ) : alerts.map(item => {
        const u = urg(item.quantity, item.threshold);
        const pct = Math.min((item.quantity / item.threshold) * 100, 100);
        return (
          <div key={item.id} style={{ background: "#fff", borderRadius: "12px", padding: "18px 22px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${u.color}`, marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1a202c", fontFamily: "Georgia, serif" }}>{item.name}</span>
                  <span style={{ padding: "2px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: u.bg, color: u.color, border: `1px solid ${u.border}`, fontFamily: "sans-serif" }}>{u.label}</span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "13px", fontFamily: "sans-serif", margin: "0 0 10px" }}>{item.category} · <strong style={{ color: u.color }}>{item.quantity} {item.unit}</strong> remaining · Min threshold: {item.threshold}</p>
                <div style={{ background: "#f1f5f9", borderRadius: "20px", height: "6px", width: "100%", maxWidth: "300px" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: u.color, borderRadius: "20px" }} />
                </div>
                <span style={{ fontSize: "11px", color: "#cbd5e1", fontFamily: "sans-serif" }}>{Math.round(pct)}% of threshold</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── STAFF ─── */
const emptyS = { name: "", role: "Manager", phone: "", email: "", joined: "", status: "Active" };
const roles = ["Manager", "Warehouse Staff", "Accounts", "Delivery", "Sales", "Support", "Other"];
const avatarBg = ["#CC0000", "#2563eb", "#16a34a", "#7c3aed", "#ea580c", "#0891b2"];

export function Staff({ staff, setStaff }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyS);
  const [editId, setEditId] = useState(null);
  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  const save = () => {
    if (!form.name.trim()) return;
    const s = { id: editId || Date.now(), ...form };
    setStaff(editId ? staff.map(x => x.id === editId ? s : x) : [...staff, s]);
    setForm(emptyS); setShow(false); setEditId(null);
  };

  const edit = (s) => { setForm({ name: s.name, role: s.role, phone: s.phone, email: s.email, joined: s.joined, status: s.status }); setEditId(s.id); setShow(true); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px", fontFamily: "sans-serif" }}>{staff.length} team member{staff.length !== 1 ? "s" : ""}</p>
        <Btn onClick={() => { setShow(!show); setForm(emptyS); setEditId(null); }}>+ Add Staff</Btn>
      </div>

      {show && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700" }}>{editId ? "Edit Staff Member" : "Add Staff Member"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px", marginBottom: "18px" }}>
            <Field label="Full Name" {...f("name")} />
            <Field label="Phone" {...f("phone")} />
            <Field label="Email" type="email" {...f("email")} />
            <Field label="Date Joined" type="date" {...f("joined")} />
            <Field label="Role" options={roles} {...f("role")} />
            <Field label="Status" options={["Active", "Inactive"]} {...f("status")} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Btn onClick={save}>{editId ? "Update" : "Save"}</Btn>
            <Btn variant="ghost" onClick={() => { setShow(false); setForm(emptyS); setEditId(null); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {staff.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "64px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>👤</div>
          <h3 style={{ color: "#1a202c", fontSize: "16px", fontWeight: "700", marginBottom: "6px", fontFamily: "Georgia, serif" }}>No staff yet</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif" }}>Click <strong>+ Add Staff</strong> to add your first team member.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
          {staff.map((s, i) => (
            <div key={s.id} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0", borderTop: `3px solid ${avatarBg[i % avatarBg.length]}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "44px", height: "44px", background: avatarBg[i % avatarBg.length], borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "17px", fontFamily: "Georgia, serif", flexShrink: 0 }}>{s.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#1a202c", fontFamily: "Georgia, serif" }}>{s.name}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>{s.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "14px" }}>
                {[s.phone && `📞 ${s.phone}`, s.email && `✉ ${s.email}`, s.joined && `📅 ${new Date(s.joined).toLocaleDateString("en-IN")}`].filter(Boolean).map((t, i) => (
                  <span key={i} style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ flex: 1, textAlign: "center", padding: "5px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: s.status === "Active" ? "#f0fdf4" : "#f8fafc", color: s.status === "Active" ? "#16a34a" : "#94a3b8", border: `1px solid ${s.status === "Active" ? "#bbf7d0" : "#e2e8f0"}` }}>
                  {s.status === "Active" ? "✓ Active" : "○ Inactive"}
                </span>
                <Btn variant="ghost" onClick={() => edit(s)} style={{ padding: "5px 12px" }}>Edit</Btn>
                <Btn variant="danger" onClick={() => setStaff(staff.filter(x => x.id !== s.id))} style={{ padding: "5px 12px" }}>Del</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── RENEWALS ─── */
const emptyR = { client: "", plan: "Basic", amount: "", renewalDate: "", contact: "" };
const daysUntil = d => Math.ceil((new Date(d) - new Date()) / 86400000);
const badge = days => {
  if (days < 0) return { label: "Overdue", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  if (days <= 7) return { label: `${days}d left`, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  if (days <= 14) return { label: `${days}d left`, color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" };
  if (days <= 30) return { label: `${days}d left`, color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
  return { label: `${days}d left`, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };
};

export function Renewals({ renewals, setRenewals }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyR);
  const [editId, setEditId] = useState(null);
  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  const save = () => {
    if (!form.client.trim() || !form.renewalDate) return;
    const r = { id: editId || Date.now(), ...form, amount: Number(form.amount) || 0, reminded: false };
    setRenewals(editId ? renewals.map(x => x.id === editId ? r : x) : [...renewals, r]);
    setForm(emptyR); setShow(false); setEditId(null);
  };

  const edit = (r) => { setForm({ client: r.client, plan: r.plan, amount: r.amount, renewalDate: r.renewalDate, contact: r.contact }); setEditId(r.id); setShow(true); };
  const sorted = [...renewals].sort((a, b) => daysUntil(a.renewalDate) - daysUntil(b.renewalDate));
  const overdue = renewals.filter(r => daysUntil(r.renewalDate) < 0).length;
  const week = renewals.filter(r => { const d = daysUntil(r.renewalDate); return d >= 0 && d <= 7; }).length;
  const upcoming = renewals.filter(r => daysUntil(r.renewalDate) > 7).length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "24px" }}>
        {[{ l: "Overdue", v: overdue, c: "#dc2626" }, { l: "Due This Week", v: week, c: "#ea580c" }, { l: "Upcoming", v: upcoming, c: "#16a34a" }].map(s => (
          <div key={s.l} style={{ background: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid #e2e8f0", borderTop: `3px solid ${s.c}` }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: s.c, fontFamily: "Georgia, serif" }}>{s.v}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: s.c, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "sans-serif", marginTop: "4px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Btn onClick={() => { setShow(!show); setForm(emptyR); setEditId(null); }}>+ Add Renewal</Btn>
      </div>

      {show && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px", fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700" }}>{editId ? "Edit Renewal" : "Add Renewal"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px", marginBottom: "18px" }}>
            <Field label="Client Name" {...f("client")} />
            <Field label="Phone" {...f("contact")} />
            <Field label="Amount (₹)" type="number" {...f("amount")} />
            <Field label="Renewal Date" type="date" {...f("renewalDate")} />
            <Field label="Plan" options={["Basic", "Standard", "Premium"]} {...f("plan")} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Btn onClick={save}>{editId ? "Update" : "Save"}</Btn>
            <Btn variant="ghost" onClick={() => { setShow(false); setForm(emptyR); setEditId(null); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {renewals.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "64px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔄</div>
          <h3 style={{ color: "#1a202c", fontSize: "16px", fontWeight: "700", marginBottom: "6px", fontFamily: "Georgia, serif" }}>No renewals yet</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", fontFamily: "sans-serif" }}>Click <strong>+ Add Renewal</strong> to track client renewals.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "10px" }}>
          {sorted.map(r => {
            const days = daysUntil(r.renewalDate);
            const b = badge(days);
            return (
              <div key={r.id} style={{ background: "#fff", borderRadius: "12px", padding: "18px 22px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${b.color}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#1a202c", fontFamily: "Georgia, serif" }}>{r.client}</span>
                    <span style={{ padding: "2px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>{b.label}</span>
                    <span style={{ padding: "2px 9px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", fontFamily: "sans-serif", background: "#fff5f5", color: "#CC0000", border: "1px solid #fecaca" }}>{r.plan}</span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {[`📅 ${new Date(r.renewalDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, r.amount > 0 && `₹${Number(r.amount).toLocaleString("en-IN")}`, r.contact && `📞 ${r.contact}`].filter(Boolean).map((t, i) => (
                      <span key={i} style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setRenewals(renewals.map(x => x.id === r.id ? { ...x, reminded: !x.reminded } : x))}
                    style={{ padding: "7px 12px", background: r.reminded ? "#f0fdf4" : "#f8fafc", color: r.reminded ? "#16a34a" : "#64748b", border: `1px solid ${r.reminded ? "#bbf7d0" : "#e2e8f0"}`, borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif" }}>
                    {r.reminded ? "✓ Reminded" : "Remind"}
                  </button>
                  <Btn variant="ghost" onClick={() => edit(r)} style={{ padding: "7px 12px" }}>Edit</Btn>
                  <Btn variant="danger" onClick={() => setRenewals(renewals.filter(x => x.id !== r.id))} style={{ padding: "7px 12px" }}>Delete</Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}