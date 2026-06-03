import { DashboardData, MetricCard, ChartDataPoint, ActivityEvent } from '../types';

function generateMockMetrics(): MetricCard[] {
  return [
    {
      title: 'Total Messages',
      value: '24,847',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '1,423',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Error Rate',
      value: '0.12%',
      change: '-0.03%',
      trend: 'down'
    },
    {
      title: 'Response Time',
      value: '142ms',
      change: '-18ms',
      trend: 'down'
    }
  ];
}

function generateUsageChartData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    data.push({
      label: days[i],
      value: Math.floor(Math.random() * 3000) + 2000
    });
  }

  return data;
}

function generateErrorChartData(): ChartDataPoint[] {
  return [
    { label: 'API Errors', value: 12 },
    { label: 'Timeouts', value: 8 },
    { label: 'Rate Limits', value: 5 },
    { label: 'Auth Failures', value: 3 },
    { label: 'Other', value: 2 }
  ];
}

function generateRecentActivity(): ActivityEvent[] {
  const activities: Omit<ActivityEvent, 'id' | 'timestamp'>[] = [
    {
      type: 'message',
      user: 'user_12345',
      description: 'Sent command: /help'
    },
    {
      type: 'command',
      user: 'user_67890',
      description: 'Executed: /analytics export'
    },
    {
      type: 'error',
      user: 'system',
      description: 'API rate limit exceeded for user_11111'
    },
    {
      type: 'warning',
      user: 'system',
      description: 'High memory usage detected (85%)'
    },
    {
      type: 'message',
      user: 'user_22222',
      description: 'Sent command: /status'
    },
    {
      type: 'command',
      user: 'user_33333',
      description: 'Executed: /settings update'
    },
    {
      type: 'message',
      user: 'user_44444',
      description: 'Sent command: /reports'
    },
    {
      type: 'error',
      user: 'system',
      description: 'Database connection timeout'
    },
    {
      type: 'message',
      user: 'user_55555',
      description: 'Sent command: /dashboard'
    },
    {
      type: 'command',
      user: 'user_66666',
      description: 'Executed: /data sync'
    }
  ];

  return activities.map((activity, index) => ({
    ...activity,
    id: `activity-${index}`,
    timestamp: new Date(Date.now() - index * 1000 * 60 * 5) // 5 minutes apart
  })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getMockDashboardData(): DashboardData {
  return {
    metrics: generateMockMetrics(),
    usageChart: generateUsageChartData(),
    errorChart: generateErrorChartData(),
    recentActivity: generateRecentActivity()
  };
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getActivityIcon(type: ActivityEvent['type']): string {
  switch (type) {
    case 'message':
      return '💬';
    case 'command':
      return '⚡';
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    default:
      return '📌';
  }
}

export function getActivityColor(type: ActivityEvent['type']): string {
  switch (type) {
    case 'message':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'command':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}
