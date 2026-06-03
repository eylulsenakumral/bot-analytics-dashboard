'use client';

import { useState, useEffect } from 'react';
import { getMockDashboardData, formatTimestamp, getActivityIcon, getActivityColor } from '../lib/mockData';
import type { DashboardData, MetricCard, ChartDataPoint, ActivityEvent } from '../types';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(getMockDashboardData());
    setMounted(true);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(getMockDashboardData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!data || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bot Analytics Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Real-time metrics and insights
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
    </div>
  );
}

// Metric Card Component
function MetricCard({ metric }: { metric: MetricCard }) {
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    const timer = setTimeout(() => setUpdated(false), 500);
    return () => clearTimeout(timer);
  }, [metric.value]);

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
      <p className={`metric-value mt-2 text-3xl font-bold text-gray-900 dark:text-white ${updated ? 'updated' : ''}`}>
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
