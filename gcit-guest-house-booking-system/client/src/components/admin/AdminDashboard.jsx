import React, { useState } from 'react';
import { Building, BedDouble, LogOut } from 'lucide-react';
import {
  DashboardContainer,
  Sidebar,
  BrandTitle,
  NavItem,
  MainContent,
  HeaderBar,
} from '../../styles/DashboardLayout';
import Logo from '../../components/signup/Logo';
import GuestHouseManagement from '../../pages/GuestHouseManagement';
// import RoomManagement from '../../pages/RoomManagement';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('guesthouse');
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear JWT token and user details
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. Display feedback toast
    toast.success('Logged out successfully');

    // 3. Redirect to Sign In page
    navigate('/signin');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <BrandTitle>
          <Logo />
        </BrandTitle>

        <NavItem
          $active={activeTab === 'guesthouse'}
          onClick={() => setActiveTab('guesthouse')}
        >
          <Building size={18} />
          Guest House Details
        </NavItem>

        <NavItem
          $active={activeTab === 'rooms'}
          onClick={() => setActiveTab('rooms')}
        >
          <BedDouble size={18} />
          Room Operations
        </NavItem>
      </Sidebar>

      <MainContent>
        <HeaderBar>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              margin: 0,
              color: '#0b132b',
            }}
          >
            {activeTab === 'guesthouse'
              ? 'Manage Guest House Details'
              : 'Manage Rooms'}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}
            >
              Role: Admin
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 0.875rem',
                backgroundColor: '#0b132b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0b132b')}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </HeaderBar>

        {activeTab === 'guesthouse' && <GuestHouseManagement />}
        {/* {activeTab === 'rooms' && <RoomManagement />} */}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;