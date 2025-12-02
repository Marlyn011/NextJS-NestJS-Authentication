'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, LogOut, User, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('token');
    router.push('/');
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
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
