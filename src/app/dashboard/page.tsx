'use client';

import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardHome() {
  const token = getToken();
  let username = "Guest";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.username) {
        username = decoded.username;
      }
    } catch (e) {
      console.error("Token decoding failed:", e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="p-6 shadow-xl backdrop-blur-md bg-white/90 rounded-2xl">
          <CardContent>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Welcome, {username}
            </h2>

            {token ? (
              <>
                <p className="text-sm font-medium">Your Bearer Token:</p>
                <pre className="p-3 bg-slate-100 text-xs mt-2 rounded-lg whitespace-pre-wrap break-all">
                  {token}
                </pre>
              </>
            ) : (
              <p className="text-sm text-red-500 text-center">
                No token found. Please log in again.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}