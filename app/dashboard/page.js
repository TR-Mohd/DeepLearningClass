'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.card}>
          <div className="spinner" style={{ margin: '0 auto' }} />
        </div>
      </main>
    );
  }

  const initial = user?.email?.charAt(0)?.toUpperCase() || '?';
  const provider = user?.app_metadata?.provider || 'email';

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatar}>{initial}</div>
        <h1 className={styles.greeting}>Welcome!</h1>
        <p className={styles.email}>{user?.email}</p>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Authenticated via {provider}
        </div>
        <button
          id="logout-btn"
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </main>
  );
}
