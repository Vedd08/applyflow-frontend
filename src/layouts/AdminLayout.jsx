import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(prev => !prev)}
      />

      <div
        className="flex-grow-1 p-4"
        style={{
          transition: 'margin-left 0.3s ease'
        }}
      >
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
