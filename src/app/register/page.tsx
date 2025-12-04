'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        setError(null);

        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || 'Registration failed');
            return;
        }

        router.push('/login');
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
                        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

                        <form onSubmit={handleRegister} className="space-y-4">
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
                                Register
                            </Button>
                        </form>

                        <Button
                            variant="link"
                            className="mt-4 w-full text-center"
                            onClick={() => router.push('/login')}
                        >
                            Back to Login
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}