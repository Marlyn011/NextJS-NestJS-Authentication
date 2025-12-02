'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log('Dashboard token:', savedToken);

    if (!savedToken) {
      console.warn('No token found! Redirecting to login...');
      router.push('/');
    } else {
      setToken(savedToken);
    }
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    console.log('Token removed. Logging out...');
    router.push('/');
  }

  if (!token) {
    // Optional: show nothing or a loading spinner until token is verified
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
            <CardDescription>Welcome to your portal</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-5 shadow-md rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white">
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <p>Your account details appear here.</p>
              </Card>

              <Card className="p-5 shadow-md rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white">
                <h2 className="text-xl font-semibold mb-2">Activity</h2>
                <p>Your recent actions will show here.</p>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button onClick={logout} className="px-6 py-2 rounded-xl">Logout</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}