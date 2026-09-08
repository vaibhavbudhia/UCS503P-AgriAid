// Route wiring. Login/Register/Dashboard are real (Phase 2 / Foundation);
// the rest are stubs until their phase lands.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResourceSearch from './pages/ResourceSearch';
import Bookings from './pages/Bookings';
import BreakdownReport from './pages/BreakdownReport';
import LabourRequests from './pages/LabourRequests';
import Ledger from './pages/Ledger';
import Schemes from './pages/Schemes';
import Claims from './pages/Claims';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<ResourceSearch />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/breakdowns" element={<BreakdownReport />} />
        <Route path="/labour" element={<LabourRequests />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
