'use client';
// frontend/src/components/layout/Sidebar.tsx
// PSU CRM & PM System — Sidebar Navigation
// Author: Roise Uddin <r.uddin@psu.edu>

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FolderOpen, CheckSquare, Briefcase,
  Users, FileText, BarChart2, Zap, MessageSquare,
  Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { PSU_COLORS } from '@/lib/constants';

const NAV_ITEMS = [
  { href: '/',          label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/projects',  label: 'Projects',     icon: FolderOpen      },
  { href: '/tasks',     label: 'Tasks',        icon: CheckSquare     },
  { href: '/crm',       label: 'CRM',          icon: Briefcase       },
  { href: '/team',      label: 'Team',         icon: Users           },
  { href: '/documents', label: 'Documents',    icon: FileText        },
  { href: '/reports',   label: 'Reports',      icon: BarChart2       },
  { href: '/ai',        label: 'AI Assistant', icon: Zap, badge: 'AI' },
  { href: '/messages',  label: 'Messages',     icon: MessageSquare   },
  { href: '/settings',  label: 'Settings',     icon: Settings        },
];

const AVATAR_COLORS: Record<string, string> = {
  super_admin: '#1a5c38', admin: '#d97706', manager: '#2563eb',
  staff: '#7c3aed', student: '#0891b2', client: '#db2777',
};

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname  = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside
      style={{
        width: collapsed ? '60px' : '224px',
        background: PSU_COLORS.dark,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* ─── Logo ───────────────────────────────── */}
      <div
        style={{
          padding: collapsed ? '14px 12px' : '14px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          minHeight: '64px',
        }}
      >
        {/* PSU Logo Mark */}
        <div
          style={{
            width: '36px', height: '36px',
            background: 'white',
            borderRadius: '9px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ color: PSU_COLORS.primary, fontWeight: 900, fontSize: '10px', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>PSU</div>
          <div style={{ color: PSU_COLORS.primary, fontWeight: 700, fontSize: '6.5px', lineHeight: 1 }}>1928</div>
        </div>

        {/* University Name */}
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '13px', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>Pacific States</div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '13px', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>University</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Konkuk University Foundation
            </div>
          </div>
        )}
      </div>

      {/* ─── Navigation ─────────────────────────── */}
      <nav style={{ flex: 1, padding: '6px 4px', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon   = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: collapsed ? '9px' : '9px 10px',
                borderRadius: '8px',
                marginBottom: '1px',
                background: active ? 'rgba(255,255,255,0.16)' : 'transparent',
                color: active ? 'white' : 'rgba(255,255,255,0.55)',
                fontSize: '12px',
                fontWeight: active ? 700 : 500,
                textDecoration: 'none',
                transition: 'all 0.15s',
                justifyContent: collapsed ? 'center' : 'flex-start',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)';
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: '3px', height: '55%', background: 'white', borderRadius: '0 2px 2px 0',
                }} />
              )}
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'rgba(255,255,255,0.18)',
                  color: 'white',
                  fontSize: '8px', fontWeight: 800,
                  padding: '2px 5px', borderRadius: '8px', flexShrink: 0,
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ─── User Profile ───────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 6px' }}>
        {!collapsed && user && (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.10)',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: AVATAR_COLORS[user.role] ?? PSU_COLORS.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '10px', flexShrink: 0,
              }}
            >
              {getInitials(user.name)}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ color: 'white', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', textTransform: 'capitalize' }}>
                {user.role.replace('_', ' ')}
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', borderRadius: '4px' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
            >
              <LogOut size={13} />
            </button>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '6px', background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', borderRadius: '6px', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
    </aside>
  );
}
