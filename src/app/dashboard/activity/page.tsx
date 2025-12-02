'use client';

import { motion } from 'framer-motion';

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-4">Activity</h1>
        <p>Here are your recent actions.</p>
      </motion.div>
    </div>
  );
}