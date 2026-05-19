'use client';
// frontend/src/app/(auth)/login/page.tsx
// PSU CRM & PM System — Login Page
// Author: Roise Uddin <r.uddin@psu.edu>

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { PSU_COLORS, APP_META } from '@/lib/constants';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f0f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* PSU Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px', height: '64px',
              background: PSU_COLORS.primary,
              borderRadius: '16px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <div style={{ color: 'white', fontWeight: 900, fontSize: '14px', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>PSU</div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontWeight: 600, fontSize: '9px' }}>1928</div>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px' }}>
            {APP_META.name}
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            {APP_META.university} · {APP_META.location}
          </p>
        </div>

        {/* Login Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>
            Sign in to your account
          </h2>

          {error && (
            <div
              style={{
                background: '#fee2e2', color: '#b91c1c',
                padding: '10px 14px', borderRadius: '8px',
                fontSize: '13px', marginBottom: '16px',
                border: '1px solid #fecaca',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@psu.edu"
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '14px', color: '#1e293b',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.target.style.borderColor = PSU_COLORS.primary; }}
                onBlur={(e)  => { e.target.style.borderColor = '#e2e8f0'; }}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '14px', color: '#1e293b',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.target.style.borderColor = PSU_COLORS.primary; }}
                onBlur={(e)  => { e.target.style.borderColor = '#e2e8f0'; }}
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <a href="/forgot-password" style={{ fontSize: '12px', color: PSU_COLORS.primary, textDecoration: 'none', fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: loading ? '#94a3b8' : PSU_COLORS.primary,
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* OAuth */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px',
                fontSize: '13px', fontWeight: 600, color: '#374151',
                textDecoration: 'none', transition: 'background 0.15s',
                background: 'white',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#f8fafc'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'white'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </a>
          </div>
        </div>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: '20px', padding: '14px 16px',
            background: PSU_COLORS.pale, borderRadius: '10px',
            border: `1px solid ${PSU_COLORS.light}40`,
          }}
        >
          <p style={{ fontSize: '11px', fontWeight: 700, color: PSU_COLORS.dark, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
            Demo Credentials
          </p>
          {[
            ['Super Admin', 'admin@psu.edu',   'PSU@admin2025'],
            ['Manager',     'manager@psu.edu', 'PSU@manager2025'],
            ['Staff',       'staff@psu.edu',   'PSU@staff2025'],
          ].map(([role, em, pw]) => (
            <button
              key={role}
              onClick={() => { setEmail(em); setPassword(pw); }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', padding: '5px 0', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: '12px', textAlign: 'left',
              }}
            >
              <span style={{ fontWeight: 600, color: PSU_COLORS.primary }}>{role}</span>
              <span style={{ color: '#64748b', fontFamily: 'monospace' }}>{em}</span>
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '16px' }}>
          {APP_META.university} · {APP_META.foundation}
        </p>
      </div>
    </div>
  );
}
