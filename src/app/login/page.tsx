'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { saveToken } from '@/lib/auth';
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: any) {
    e.preventDefault();
    setError('');

    console.log('Login clicked', { username, password }); // debug

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Response data:', data);

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store token using your helper
      if (data.accessToken) {
        saveToken(data.accessToken);
        console.log('Token saved to localStorage:', data.accessToken);
      }

      alert('Login successful! Redirecting to dashboard...');
      router.push('/dashboard');
    } catch (err) {
      console.error('Error connecting to backend:', err);
      setError('Backend not reachable');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500 p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 backdrop-blur bg-white/20 border-white/30 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-neutral-200">Login to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                className="bg-white/50" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <Input 
                className="bg-white/50" 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {error && <p className="text-red-300 text-sm">{error}</p>}
              <Button className="w-full rounded-xl py-2 text-lg" type="submit">Login</Button>
            </form>

            <Button variant="link" className="mt-3 w-full text-white/90" onClick={() => router.push('/register')}>
              Create an account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}