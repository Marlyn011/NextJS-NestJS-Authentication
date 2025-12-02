'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Activity</CardTitle>
          <CardDescription>See your recent actions</CardDescription>
        </CardHeader>

        <CardContent>
          <p>No recent activity.</p>
        </CardContent>
      </Card>
    </div>
  );
}