'use client';

import { useState, useEffect } from 'react';
import { getMockDashboardData, formatTimestamp, getActivityIcon, getActivityColor } from '../lib/mockData';
import type { DashboardData, MetricCard, ChartDataPoint, ActivityEvent } from '../types';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(() => getMockDashboardData());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(getMockDashboardData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Header/Hero - Split Layout */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Free Forever Plan
              </div>

              {/* Headline */}
              <h1 className="text-5xl font-extrabold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
                Stop Guessing.<br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Start Measuring.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Real-time metrics that tell you exactly how your bot is performing. No credit card required.
              </p>

              {/* Value Props with Icons */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    📊
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Real-time Metrics</h3>
                    <p className="text-sm text-slate-600">See active users, messages, and errors as they happen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Error Tracking</h3>
                    <p className="text-sm text-slate-600">Spot issues before users complain</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    📈
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Trend Analysis</h3>
                    <p className="text-sm text-slate-600">Understand usage patterns and optimize performance</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => document.getElementById('demo-dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  View Live Demo →
                </button>
                <button
                  onClick={() => document.getElementById('why-use')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300"
                >
                  Explore Features
                </button>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🤖</span>
                  <span>100+ bots monitored</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">⚡</span>
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div>
              {/* Dashboard Preview Card */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Live Dashboard</h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Live
                    </span>
                  </div>

                  {/* Mini metrics grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600">Active Users</p>
                      <p className="text-xl font-bold text-slate-900">1,247</p>
                      <p className="text-xs text-emerald-600">↑ 12%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600">Messages/Day</p>
                      <p className="text-xl font-bold text-slate-900">8.4K</p>
                      <p className="text-xs text-emerald-600">↑ 8%</p>
                    </div>
                  </div>
                </div>

                {/* Floating metric card */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-xl p-4 text-white">
                  <p className="text-xs opacity-80">Error Rate</p>
                  <p className="text-2xl font-bold">0.2%</p>
                  <p className="text-xs opacity-80">↓ 45%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="demo-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UsageChart data={data.usageChart} />
          <ErrorChart data={data.errorChart} />
        </div>

        {/* Recent Activity */}
        <ActivityTable activities={data.recentActivity} />

        {/* Why Use This Section */}
        <div id="why-use" className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm border border-blue-200 dark:border-blue-900 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Use Bot Analytics?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto mb-3">
                🎯
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Track Key Metrics
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Monitor active users, messages per day, response times, and error rates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto mb-3">
                ⚠️
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Spot Issues Fast
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Real-time error tracking helps you identify and fix problems before users notice
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto mb-3">
                📈
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Improve Performance
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Usage patterns and trends help optimize your bot for better engagement
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Key Metrics Tracked
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Messages/Day</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Avg Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Error Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Usage Trends</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Error Types</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">User Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Peak Hours</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Metric Card Component
function MetricCard({ metric }: { metric: MetricCard }) {
  const trendColor = metric.trend === 'up'
    ? 'text-green-600 dark:text-green-400'
    : metric.trend === 'down'
    ? 'text-red-600 dark:text-red-400'
    : 'text-gray-600 dark:text-gray-400';

  const trendIcon = metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→';

  return (
    <div className="card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {metric.title}
        </p>
        <span className={`text-xs font-medium ${trendColor}`}>
          {trendIcon} {metric.change}
        </span>
      </div>
      <p className="metric-value mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {metric.value}
      </p>
    </div>
  );
}

// Usage Chart Component
function UsageChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Messages Over Time
      </h2>
      <div className="space-y-4">
        {data.map((point, index) => {
          const barWidth = (point.value / maxValue) * 100;
          const isHighest = point.value === maxValue;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400 shrink-0">
                {point.label}
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isHighest
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-blue-400 dark:bg-blue-500'
                  }`}
                  style={{ width: `${barWidth}%` }}
                >
                  <span className="sr-only">{point.value} messages</span>
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-900 dark:text-white text-right shrink-0">
                {point.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Error Chart Component
function ErrorChart({ data }: { data: ChartDataPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.value, 0);

  const colors = [
    'bg-red-500 dark:bg-red-600',
    'bg-orange-500 dark:bg-orange-600',
    'bg-yellow-500 dark:bg-yellow-600',
    'bg-purple-500 dark:bg-purple-600',
    'bg-gray-500 dark:bg-gray-600'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Error Distribution
      </h2>
      <div className="space-y-3">
        {data.map((point, index) => {
          const barWidth = total > 0 ? (point.value / total) * 100 : 0;
          const percentage = total > 0 ? ((point.value / total) * 100).toFixed(1) : '0.0';

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {point.label}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {point.value} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${colors[index % colors.length]}`}
                  style={{ width: `${barWidth}%` }}
                >
                  <span className="sr-only">{point.label}: {percentage}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Activity Table Component
function ActivityTable({ activities }: { activities: ActivityEvent[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                    <span>{getActivityIcon(activity.type)}</span>
                    <span className="capitalize">{activity.type}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                  {activity.user}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {activity.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatTimestamp(activity.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
