export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}

export enum DashboardTab {
  OVERVIEW = 'OVERVIEW',
  ASTRO_FIN = 'ASTRO_FIN',
  CREDIT = 'CREDIT',
  AI_ADVISOR = 'AI_ADVISOR',
  TRANSACTIONS = 'TRANSACTIONS',
  SETTINGS = 'SETTINGS'
}

export interface ChartDataPoint {
  name: string;
  value: number;
  prediction?: number; // For AstroFin projections
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string; // e.g., "+$500/yr"
  type: 'SAVINGS' | 'LOAN' | 'INSURANCE' | 'INVESTMENT';
}

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending';
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}