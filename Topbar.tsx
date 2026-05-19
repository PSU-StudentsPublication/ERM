'use client';
// frontend/src/components/layout/Topbar.tsx
// PSU CRM & PM System — Top Navigation Bar

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Moon, Sun, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { PSU_COLORS } from '@/lib/constants';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Task deadline tomorrow',        type: 'warn', time: '5m ago'  },
  { id: '2', title: 'Project CRM approved',          type: 'ok',   time: '1h ago'  },
  { id: '3', title: 'New message from Pacific Tech', type: 'info', time: '2h ago'  },
  { id: '4', title: 'Storage at 68% — review soon',  type: 'warn', time: '3h ago'  },
];

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export function Topbar() {
  const { user, logout }   = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifOpen, setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dotColor = { warn: '#d97706', ok: '#16a34a', info: '#2563eb' } as const;

  return (
    <header
      style={{
        height: '52px',
        background: 'white',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '10px',
        flexShrink: 0,
        zIndex: 5,
      }}
    >
      {/* ─── Search ─────────────────────────────── */}
      <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
        <Search
          size={14}
          style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, tasks, contacts…"
          style={{
            width: '100%',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '7px 10px 7px 32px',
            fontSize: '12px',
            color: '#1e293b',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e)  => { e.target.style.borderColor = PSU_COLORS.primary; }}
          onBlur={(e)   => { e.target.style.borderColor = '#e2e8f0'; }}
        />
      </div>

      {/* ─── Right Controls ─────────────────────── */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>

        {/* Semester badge */}
        <div style={{ padding: '4px 10px', background: PSU_COLORS.pale, borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: PSU_COLORS.primary, marginRight: '6px' }}>
          Fall 2025
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', borderRadius: '8px', transition: 'all 0.15s', display: 'flex', alignItems: 'center' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', borderRadius: '8px', transition: 'all 0.15s', display: 'flex', alignItems: 'center', position: 'relative' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
          >
            <Bell size={15} />
            <span style={{ position: 'absolute', top: '5px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', border: '1.5px solid white' }} />
          </button>

          {notifOpen && (
            <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '280px', background: 'white', borderRadius: '12px', boxShadow: '0 8px 28px rgba(0,0,0,.12)', border: '1px solid #f1f5f9', zIndex: 100, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>Notifications</span>
                <span style={{ fontSize: '11px', color: PSU_COLORS.primary, cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
              </div>
              {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} style={{ padding: '10px 14px', borderBottom: '1px solid #f8fafc', display: 'flex', gap: '8px', alignItems: 'flex-start', cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                >
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: dotColor[n.type as keyof typeof dotColor], marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#374151' }}>{n.title}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 14px', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: PSU_COLORS.primary, cursor: 'pointer', fontWeight: 600 }}>View all notifications</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', marginLeft: '4px', borderLeft: '1px solid #f1f5f9', transition: 'background 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: PSU_COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '10px' }}>
              {user ? getInitials(user.name) : 'U'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>{user?.name.split(' ')[0] ?? 'User'}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'capitalize' }}>{user?.role.replace('_', ' ')}</div>
            </div>
            <ChevronDown size={12} style={{ color: '#94a3b8' }} />
          </button>

          {profileOpen && (
            <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '200px', background: 'white', borderRadius: '12px', boxShadow: '0 8px 28px rgba(0,0,0,.12)', border: '1px solid #f1f5f9', zIndex: 100, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>{user?.name}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{user?.email}</div>
              </div>
              {[{ href: '/settings', label: 'Settings', icon: Settings }, { label: 'Logout', icon: LogOut, action: logout }].map((item, i) => (
                <div key={i} onClick={() => { item.action?.(); setProfileOpen(false); }}
                  style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: item.label === 'Logout' ? '#dc2626' : '#374151', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                >
                  <item.icon size={14} />
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
