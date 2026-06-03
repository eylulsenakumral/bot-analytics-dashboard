// Bot Analytics Dashboard Types

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ActivityEvent {
  id: string;
  type: 'message' | 'command' | 'error' | 'warning';
  timestamp: Date;
  user: string;
  description: string;
}

export interface DashboardData {
  metrics: MetricCard[];
  usageChart: ChartDataPoint[];
  errorChart: ChartDataPoint[];
  recentActivity: ActivityEvent[];
}
