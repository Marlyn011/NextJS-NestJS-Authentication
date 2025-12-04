'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';
import { saveToken } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            const token = data.tokens?.accessToken || null;

            if (!token) {
                setError('Token not received from server.');
                return;
            }

            saveToken(token);

            router.push('/dashboard');

        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm"
            >
                <Card className="p-6 shadow-xl backdrop-blur-md bg-white/90 rounded-2xl">
                    <CardContent>
                        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back</h1>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="rounded-xl"
                            />

                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-xl"
                            />

                            {error && (
                                <p className="text-red-500 text-sm text-center">
                                    {error}
                                </p>
                            )}

                            <Button className="w-full rounded-xl py-2 text-md font-medium" type="submit">
                                Login
                            </Button>
                        </form>

                        <Button
                            variant="link"
                            className="mt-4 w-full text-center"
                            onClick={() => router.push('/register')}
                        >
                            Create an account
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}