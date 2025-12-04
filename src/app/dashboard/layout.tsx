'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, LogOut, User, LayoutDashboard } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      router.push('/login'); 
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("accessToken");
        router.push('/login');
        return;
      }

      setUsername(decoded.username || "Guest");
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("accessToken");
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  function logout() {
    localStorage.removeItem('accessToken');
    router.push('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex flex-col w-64 bg-white shadow-xl p-6 gap-6 border-r"
      >
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <LayoutDashboard size={22} /> Dashboard
        </h1>

        <nav className="flex flex-col gap-3">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push('/dashboard')}
          >
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>

          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push('/dashboard/activity')}
          >
            <Menu className="mr-2 h-4 w-4" /> Activity
          </Button>
        </nav>

        <div className="mt-auto">
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col">

        <header className="md:hidden flex items-center justify-between px-4 py-3 shadow bg-white border-b">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </header>

        <main className="p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="mb-4 text-lg font-medium">Welcome, {username}</p>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}