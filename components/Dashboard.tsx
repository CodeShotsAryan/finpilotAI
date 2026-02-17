import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  ShieldCheck, 
  Bot, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  LogOut, 
  Send, 
  Sparkles, 
  CreditCard, 
  ChevronDown, 
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PieChart,
  Activity,
  Zap,
  Target,
  RefreshCw,
  X,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { DashboardTab, ChartDataPoint, ChatMessage, Transaction } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// --- Mock Data ---

const WEALTH_DATA = [
  { name: 'Jan', value: 120000, prediction: 120000 },
  { name: 'Feb', value: 132000, prediction: 125000 },
  { name: 'Mar', value: 128000, prediction: 130000 },
  { name: 'Apr', value: 145000, prediction: 138000 },
  { name: 'May', value: 152000, prediction: 148000 },
  { name: 'Jun', value: 168000, prediction: 158000 },
  { name: 'Jul', value: 185000, prediction: 170000 },
];

const SPENDING_DATA = [
  { name: 'Housing', value: 35, color: '#3B82F6' },
  { name: 'Food', value: 20, color: '#10B981' },
  { name: 'Transport', value: 15, color: '#F59E0B' },
  { name: 'Ent', value: 10, color: '#8B5CF6' },
  { name: 'Others', value: 20, color: '#64748B' },
];

const TRANSACTIONS: Transaction[] = [
  { id: '1', merchant: 'Apple Store', category: 'Electronics', date: 'Today, 14:20', amount: -1299.00, status: 'Completed', icon: 'shopping' },
  { id: '2', merchant: 'Upwork Inc.', category: 'Income', date: 'Yesterday, 09:00', amount: 4500.00, status: 'Completed', icon: 'income' },
  { id: '3', merchant: 'Uber Technologies', category: 'Transport', date: 'Yesterday, 18:45', amount: -24.50, status: 'Completed', icon: 'transport' },
  { id: '4', merchant: 'Starbucks', category: 'Food', date: 'Oct 24, 08:15', amount: -8.50, status: 'Completed', icon: 'food' },
  { id: '5', merchant: 'Spotify AB', category: 'Sub', date: 'Oct 23, 10:00', amount: -14.99, status: 'Completed', icon: 'sub' },
];

// --- Components ---

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.OVERVIEW);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'FinPilot Neural Core initialized. I have analyzed your real-time financial stream. Your portfolio is up 4.2% this week. How can I assist?', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === DashboardTab.AI_ADVISOR) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, activeTab]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputText, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const apiHistory = chatHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
    const responseText = await sendMessageToGemini(apiHistory, userMsg.text);

    setChatHistory(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() }]);
    setIsTyping(false);
  };

  const navItems = [
    { id: DashboardTab.OVERVIEW, icon: LayoutGrid, label: 'Overview' },
    { id: DashboardTab.ASTRO_FIN, icon: Activity, label: 'AstroFin Sim' },
    { id: DashboardTab.CREDIT, icon: ShieldCheck, label: 'Credit Health' },
    { id: DashboardTab.AI_ADVISOR, icon: Bot, label: 'AI Pilot' },
    { id: DashboardTab.TRANSACTIONS, icon: Wallet, label: 'Ledger' },
    { id: DashboardTab.SETTINGS, icon: Settings, label: 'System' },
  ];

  return (
    <div className="flex h-screen bg-dark-950 text-white font-sans overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Sidebar - Pro Design */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-20 md:w-64 bg-dark-950 border-r border-dark-800 flex flex-col transition-all duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-dark-800 gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="font-bold text-white">F</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            FinPilot
          </span>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                ${activeTab === item.id 
                  ? 'bg-dark-800 text-white shadow-inner' 
                  : 'text-dark-400 hover:text-white hover:bg-dark-900'}
              `}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
              <item.icon size={20} className={`transition-colors ${activeTab === item.id ? 'text-primary' : 'group-hover:text-white'}`} />
              <span className="font-medium text-sm hidden md:block">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-dark-800">
            <div className="hidden md:block bg-gradient-to-r from-dark-900 to-dark-800 rounded-xl p-4 border border-dark-700 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-xs font-bold text-white">Pro Tier</span>
                </div>
                <div className="w-full bg-dark-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[70%]"></div>
                </div>
            </div>
            <button onClick={onLogout} className="flex items-center justify-center md:justify-start gap-3 w-full px-3 py-2 text-dark-400 hover:text-red-400 transition-colors">
                <LogOut size={20} />
                <span className="hidden md:inline text-sm font-medium">Disconnect</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 flex flex-col h-full relative z-0">
        
        {/* Top Navigation Bar */}
        <header className="h-20 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800 flex items-center justify-between px-6 z-40 sticky top-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden text-dark-400">
                    <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center text-sm text-dark-400 gap-2">
                    <span>Dashboards</span>
                    <span className="text-dark-700">/</span>
                    <span className="text-white font-medium">{navItems.find(i => i.id === activeTab)?.label}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-dark-900 border border-dark-800 rounded-full px-4 py-2 w-64 focus-within:border-primary/50 transition-colors">
                    <Search size={16} className="text-dark-400" />
                    <input type="text" placeholder="Search assets, txns..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-white placeholder-dark-700" />
                </div>
                <button className="relative p-2 text-dark-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border border-white/10"></div>
            </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
            
            {/* OVERVIEW TAB */}
            {activeTab === DashboardTab.OVERVIEW && (
                <div className="max-w-[1600px] mx-auto space-y-6 animate-fade-in-up">
                    
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Net Worth Card */}
                        <div className="md:col-span-4 bg-dark-900 border border-dark-800 rounded-2xl p-6 relative overflow-hidden group hover:border-dark-700 transition-all">
                             <div className="absolute top-0 right-0 p-6 opacity-50">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Wallet size={24} />
                                </div>
                             </div>
                             <p className="text-dark-400 text-sm font-medium mb-1">Total Net Worth</p>
                             <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">$364,250.00</h2>
                             <div className="flex items-center gap-2 mb-6">
                                <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                    <ArrowUpRight size={12} /> +12.5%
                                </span>
                                <span className="text-dark-400 text-xs">vs last month</span>
                             </div>
                             
                             <div className="flex gap-3 mt-auto">
                                <button className="flex-1 bg-white text-dark-950 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Add Funds</button>
                                <button className="flex-1 bg-dark-800 text-white border border-dark-700 py-2.5 rounded-lg text-sm font-bold hover:bg-dark-700 transition-colors">Send</button>
                             </div>
                        </div>

                        {/* Market Analysis / Quick Stats */}
                        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 flex flex-col justify-between hover:border-dark-700 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-400 text-xs uppercase tracking-wider font-bold mb-1">Monthly Income</p>
                                        <h3 className="text-2xl font-bold text-white">$12,450.00</h3>
                                    </div>
                                    <TrendingUp className="text-emerald-500" size={24} />
                                </div>
                                <div className="h-24 w-full mt-4">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={[...WEALTH_DATA].slice(0,5)}>
                                            <defs>
                                                <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#colorInc)" />
                                        </AreaChart>
                                     </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 flex flex-col justify-between hover:border-dark-700 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-400 text-xs uppercase tracking-wider font-bold mb-1">Monthly Expenses</p>
                                        <h3 className="text-2xl font-bold text-white">$4,230.50</h3>
                                    </div>
                                    <Activity className="text-orange-500" size={24} />
                                </div>
                                <div className="h-24 w-full mt-4">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[...WEALTH_DATA].slice(0,5)}>
                                            <Bar dataKey="value" fill="#3f3f46" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="prediction" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                     </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-dark-900 border border-dark-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Financial Trajectory</h3>
                                    <p className="text-xs text-dark-400">Projection based on AstroFin™ Engine</p>
                                </div>
                                <div className="flex gap-2">
                                    {['1W', '1M', '3M', '1Y', 'ALL'].map(period => (
                                        <button key={period} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${period === '1Y' ? 'bg-dark-800 text-white border border-dark-700' : 'text-dark-400 hover:text-white'}`}>
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={WEALTH_DATA}>
                                        <defs>
                                            <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} tickFormatter={(val) => `$${val/1000}k`} />
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff'}}
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fill="url(#colorWealth)" />
                                        <Area type="monotone" dataKey="prediction" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Transactions List */}
                        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                                <button className="text-xs text-primary hover:text-primary-dark font-medium">View All</button>
                            </div>
                            <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                {TRANSACTIONS.map(tx => (
                                    <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-dark-800 rounded-xl transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 group-hover:text-white group-hover:border-dark-600 transition-all">
                                                {tx.amount > 0 ? <ArrowDownRight size={18} className="text-emerald-500"/> : <CreditCard size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{tx.merchant}</p>
                                                <p className="text-xs text-dark-400">{tx.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-white'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </p>
                                            <p className="text-[10px] text-dark-500">{tx.date.split(',')[0]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-dark-800">
                                <button className="w-full py-2 border border-dashed border-dark-700 rounded-lg text-xs text-dark-400 hover:text-white hover:border-dark-500 transition-colors">
                                    + Add Manual Transaction
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Transfer Row */}
                    <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
                         <h3 className="text-sm font-bold text-dark-400 uppercase tracking-wider mb-4">Quick Send</h3>
                         <div className="flex gap-4 overflow-x-auto pb-2">
                             <div className="w-14 h-14 rounded-full border-2 border-dashed border-dark-700 flex items-center justify-center text-dark-400 hover:text-primary hover:border-primary cursor-pointer transition-all shrink-0">
                                <span className="text-xl">+</span>
                             </div>
                             {[1, 2, 3, 4, 5].map(i => (
                                 <div key={i} className="group relative shrink-0 cursor-pointer">
                                     <div className="w-14 h-14 rounded-full bg-dark-800 border-2 border-dark-700 p-0.5 group-hover:border-primary transition-all">
                                         <img src={`https://i.pravatar.cc/150?img=${10+i}`} alt="User" className="w-full h-full rounded-full object-cover" />
                                     </div>
                                     <span className="absolute -bottom-1 right-0 w-4 h-4 bg-emerald-500 border-2 border-dark-900 rounded-full"></span>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {/* ASTRO FIN TAB */}
            {activeTab === DashboardTab.ASTRO_FIN && (
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Activity className="text-primary" /> 
                                        AstroFin Simulation Core
                                    </h2>
                                    <p className="text-dark-400 text-sm mt-1">Predictive analysis engaged. Probability confidence: 94%</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-dark-800 hover:bg-dark-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-dark-700 transition-colors">Save Scenario</button>
                                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20">Run Simulation</button>
                                </div>
                            </div>

                            <div className="h-[400px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={WEALTH_DATA}>
                                        <defs>
                                            <linearGradient id="astroGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff'}} 
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="transparent" strokeDasharray="5 5" name="Baseline" />
                                        <Area type="monotone" dataKey="prediction" stroke="#10B981" strokeWidth={4} fill="url(#astroGradient)" name="Optimized" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
                            <h3 className="font-bold text-white mb-6">Simulation Parameters</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-dark-400">Monthly Savings</span>
                                        <span className="text-white font-mono">$2,400</span>
                                    </div>
                                    <input type="range" className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-dark-400">Risk Tolerance</span>
                                        <span className="text-white font-mono">Aggressive</span>
                                    </div>
                                    <input type="range" className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-dark-400">Retirement Age</span>
                                        <span className="text-white font-mono">55</span>
                                    </div>
                                    <input type="range" className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-dark-900 border border-indigo-800 rounded-2xl p-6 text-center">
                            <Sparkles className="mx-auto text-indigo-400 mb-4" size={32} />
                            <h3 className="text-lg font-bold text-white mb-2">AI Insight</h3>
                            <p className="text-sm text-indigo-200 leading-relaxed">
                                "Increasing your monthly savings by just $200 could accelerate your retirement goal by 3 years based on current market projections."
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* CREDIT TAB */}
            {activeTab === DashboardTab.CREDIT && (
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full animate-fade-in-up">
                    <div className="bg-dark-900 border border-dark-800 rounded-[32px] p-12 relative flex flex-col items-center justify-center aspect-square shadow-2xl">
                         {/* Gauge Visualization */}
                         <div className="relative w-64 h-64">
                             <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="128" cy="128" r="120" stroke="#27272a" strokeWidth="16" fill="none" />
                                 <circle cx="128" cy="128" r="120" stroke="#10B981" strokeWidth="16" fill="none" strokeDasharray="753" strokeDashoffset="100" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <span className="text-6xl font-black text-white tracking-tighter">785</span>
                                 <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm mt-2">Excellent</span>
                             </div>
                         </div>
                         <div className="mt-8 text-center space-y-2">
                             <p className="text-dark-400">Your score is higher than 84% of users.</p>
                             <div className="flex justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white ring-offset-2 ring-offset-dark-900"></span>
                             </div>
                         </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Credit Impact Factors</h2>
                        <div className="space-y-4">
                             {[
                                 { label: 'Payment History', score: '100%', status: 'Perfect', color: 'text-emerald-500', bg: 'bg-emerald-500' },
                                 { label: 'Credit Utilization', score: '12%', status: 'Excellent', color: 'text-emerald-500', bg: 'bg-emerald-500' },
                                 { label: 'Credit Age', score: '4.2 Yrs', status: 'Good', color: 'text-yellow-500', bg: 'bg-yellow-500' },
                                 { label: 'Total Accounts', score: '8', status: 'Low Impact', color: 'text-blue-500', bg: 'bg-blue-500' },
                             ].map((factor, i) => (
                                 <div key={i} className="bg-dark-900 border border-dark-800 p-4 rounded-xl flex items-center justify-between hover:border-dark-700 transition-colors">
                                     <div>
                                         <p className="text-dark-400 text-xs uppercase font-bold">{factor.label}</p>
                                         <p className="text-white font-bold text-lg">{factor.score}</p>
                                     </div>
                                     <div className="text-right">
                                         <span className={`text-xs font-bold px-2 py-1 rounded-md bg-dark-800 ${factor.color}`}>{factor.status}</span>
                                     </div>
                                 </div>
                             ))}
                        </div>
                        <button className="w-full bg-white text-dark-950 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                            Generate Credit Report
                        </button>
                    </div>
                </div>
            )}

            {/* AI ADVISOR TAB */}
            {activeTab === DashboardTab.AI_ADVISOR && (
                <div className="h-full flex flex-col bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden animate-fade-in-up shadow-2xl">
                    <div className="bg-dark-800 p-4 border-b border-dark-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">FinPilot Pro</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs text-dark-400">Neural Engine Active</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-dark-400 hover:text-white"><MoreVertical size={20}/></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {chatHistory.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mr-3 mt-1 shrink-0">
                                        AI
                                    </div>
                                )}
                                <div className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${
                                    msg.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20' 
                                    : 'bg-dark-800 text-gray-200 border border-dark-700 rounded-tl-none'
                                }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    <span className="text-[10px] opacity-50 block mt-2 text-right">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center gap-2 text-dark-400 text-xs ml-11">
                                <span className="w-1.5 h-1.5 bg-dark-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-dark-500 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-dark-500 rounded-full animate-bounce delay-200"></span>
                                Thinking...
                            </div>
                        )}
                        <div ref={chatEndRef}></div>
                    </div>

                    <div className="p-4 bg-dark-900 border-t border-dark-800">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Analyze my spending patterns..." 
                                className="w-full bg-dark-950 border border-dark-700 text-white rounded-xl py-4 pl-4 pr-12 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-dark-600"
                            />
                            <button 
                                onClick={handleSendMessage}
                                disabled={!inputText.trim() || isTyping}
                                className="absolute right-2 top-2 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* OTHER TABS PLACEHOLDER */}
            {(activeTab === DashboardTab.TRANSACTIONS || activeTab === DashboardTab.SETTINGS) && (
                <div className="flex flex-col items-center justify-center h-[500px] text-dark-500 animate-fade-in-up border border-dark-800 rounded-2xl bg-dark-900">
                     <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Settings size={32} />
                     </div>
                     <h3 className="font-bold text-white text-xl">Module Under Construction</h3>
                     <p className="text-sm mt-2">This feature is coming in the next FinPilot OS update.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;