import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import ListingsPage from './pages/public/ListingsPage';
import PropertyDetailPage from './pages/public/PropertyDetailPage';
import AgentPage from './pages/public/AgentPage';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminLeads from './pages/admin/AdminLeads';
import AdminProfile from './pages/admin/AdminProfile';

// Super admin pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import SuperAdminUsers from './pages/superadmin/SuperAdminUsers';
import SuperAdminLeads from './pages/superadmin/SuperAdminLeads';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/properties" element={<PublicLayout><ListingsPage /></PublicLayout>} />
      <Route path="/properties/:id" element={<PublicLayout><PropertyDetailPage /></PublicLayout>} />
      <Route path="/agents/:id" element={<PublicLayout><AgentPage /></PublicLayout>} />

      {/* Auth */}
      <Route path="/login" element={user ? <Navigate to={user.role === 'super_admin' ? '/superadmin' : '/admin'} replace /> : <LoginPage />} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute roles={['admin','super_admin']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Super Admin */}
      <Route path="/superadmin" element={<ProtectedRoute roles={['super_admin']}><AdminLayout isSuperAdmin /></ProtectedRoute>}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="leads" element={<SuperAdminLeads />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
