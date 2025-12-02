"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // If user is already logged in → redirect to dashboard
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-pink-500 via-pink-300 to-pink-400 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white max-w-lg"
      >
        <h1 className="text-5xl font-extrabold drop-shadow mb-4">
          Welcome to Your Dashboard App
        </h1>

        <p className="text-lg opacity-90 mb-8">
          Manage your account, track your tasks, and access your personalized
          dashboard — simple and fast.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/login">
            <Button className="px-6 py-3 text-lg rounded-xl shadow-lg">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button
              variant="outline"
              className="px-6 py-3 text-lg rounded-xl text-white border-white hover:bg-white/20"
            >
              Register
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}