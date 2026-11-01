import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  BedDouble,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import Logo from '../components/signup/Logo';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [guestHouse, setGuestHouse] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
      }
    }
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ghRes, roomsRes] = await Promise.all([
        api.get('/guesthouse').catch(() => ({ data: null })),
        api.get('/rooms').catch(() => ({ data: [] })),
      ]);

      if (ghRes.data) {
        setGuestHouse(ghRes.data);
      }

      const roomData = Array.isArray(roomsRes.data)
        ? roomsRes.data
        : roomsRes.data?.rooms || [];
      setRooms(roomData.filter((r) => r.is_active));
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Dark Navy Top Navigation Bar */}
      <header
        style={{
          backgroundColor: '#0B132B',
          color: '#ffffff',
          padding: '1.25rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Top-Left Logo Container */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <Logo />
          </div>
        </div>

        {/* User Info & Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              {user?.name || 'John Doe'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              {user?.email || 'john@example.com'}
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '0.55rem 1.15rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')
            }
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Dark Navy Hero Banner */}
        <section
          style={{
            backgroundColor: '#0B132B',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 25px -5px rgba(11, 19, 43, 0.15)',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#38BDF8',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={14} /> GCIT Guest House Service
            </span>
            <h1
              style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome back, {user?.name || 'John Doe'}!
            </h1>
            <p
              style={{
                color: '#94A3B8',
                fontSize: '1rem',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Explore available rooms, view amenities, and manage your guest house
              accommodations with ease.
            </p>
          </div>
        </section>

        {/* 3 Metric Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {/* Card 1: Available Rooms */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BedDouble size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Available Rooms
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
                {loading ? '...' : rooms.length || 8}
              </div>
            </div>
          </div>

          {/* Card 2: Guest House */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Guest House
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                {guestHouse?.name || 'GCIT Main Guest House'}
              </div>
            </div>
          </div>

          {/* Card 3: Status */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Status
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16A34A' }}>
                Operational & Open
              </div>
            </div>
          </div>
        </section>

        {/* Guest House Contact Info */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2rem 2.25rem',
            border: '1px solid #F1F5F9',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
          }}
        >
          <h3
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#0F172A',
            }}
          >
            Guest House Details
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
            {guestHouse?.description ||
              'Executive guest quarters located at Gyalposhing Campus.'}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              fontSize: '0.9rem',
              color: '#334155',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="#0F172A" />{' '}
              {guestHouse?.address || 'Thimphu, Bhutan'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} color="#0F172A" />{' '}
              {guestHouse?.phone || '+975 4 812 345'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} color="#0F172A" />{' '}
              {guestHouse?.email || 'guesthouse@gcit.edu.bt'}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}