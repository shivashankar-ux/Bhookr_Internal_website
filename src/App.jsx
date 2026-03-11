import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Authcontext";
import Protectedroute from "./Protectedroute";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import { Clients, Stockalerts, Staff, Renewals } from "./Pages";
import { useLocalStorage } from "./useLocalStorage";

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ marginLeft: "230px", flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ marginTop: "58px", padding: "28px", flex: 1, maxWidth: "1200px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [inventory, setInventory] = useLocalStorage("bhookr_inventory", []);
  const [clients, setClients] = useLocalStorage("bhookr_clients", []);
  const [staff, setStaff] = useLocalStorage("bhookr_staff", []);
  const [renewals, setRenewals] = useLocalStorage("bhookr_renewals", []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protectedroute><AppLayout><Dashboard inventory={inventory} clients={clients} staff={staff} renewals={renewals} /></AppLayout></Protectedroute>} />
          <Route path="/inventory" element={<Protectedroute><AppLayout><Inventory items={inventory} setItems={setInventory} /></AppLayout></Protectedroute>} />
          <Route path="/clients" element={<Protectedroute><AppLayout><Clients clients={clients} setClients={setClients} /></AppLayout></Protectedroute>} />
          <Route path="/stock-alerts" element={<Protectedroute><AppLayout><Stockalerts inventory={inventory} /></AppLayout></Protectedroute>} />
          <Route path="/staff" element={<Protectedroute><AppLayout><Staff staff={staff} setStaff={setStaff} /></AppLayout></Protectedroute>} />
          <Route path="/renewals" element={<Protectedroute><AppLayout><Renewals renewals={renewals} setRenewals={setRenewals} /></AppLayout></Protectedroute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}