import React from 'react';
import { ArrowRight, ChevronDown, Activity, ShieldCheck, PieChart, Users, Zap, Globe, Lock, TrendingUp, CreditCard, Search, Bell, Wallet } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
      
      {/* Technical Grid Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]" 
           style={{
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] opacity-20"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">F</div>
            <span className="text-xl font-bold tracking-tight">FinPilot</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Developers</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={onGetStarted}
                className="hidden md:flex px-6 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
                Log In
            </button>
            <button 
                onClick={onGetStarted}
                className="bg-white text-dark-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10"
            >
                Get Started
                <ArrowRight size={16} />
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8 animate-fade-in-up backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: AstroFin 2.0 Engine Live
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 animate-fade-in-up delay-100">
            Banking intelligence <br />
            <span className="text-white">reimagined.</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            FinPilot is the AI co-pilot that transforms your financial data into actionable wealth-building strategies. Secure, predictive, and personalized.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300 mb-20">
            <button 
                onClick={onGetStarted}
                className="w-full md:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/25 hover:scale-105"
            >
                Start Free Trial
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                <Zap size={20} className="text-yellow-400" />
                View Demo
            </button>
        </div>

        {/* Dynamic Financial Grid Visual */}
        <div className="relative h-[500px] w-full max-w-5xl mx-auto perspective-1000 animate-fade-in-up delay-500 hidden md:block">
            {/* The Floating Interface Container */}
            <div className="relative w-full h-full transform-style-3d rotate-x-12 hover:rotate-x-0 transition-transform duration-1000 ease-out">
                
                {/* Main Glass Dashboard Panel */}
                <div className="absolute inset-x-10 top-0 bottom-10 bg-dark-900/80 backdrop-blur-xl border border-white/10 rounded-t-[32px] shadow-2xl overflow-hidden ring-1 ring-white/5">
                    {/* Mock Header */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="h-8 w-64 bg-white/5 rounded-full flex items-center px-3">
                            <Search size={14} className="text-gray-500" />
                        </div>
                        <div className="flex gap-3 text-gray-500">
                             <Bell size={16} />
                             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-blue-500"></div>
                        </div>
                    </div>

                    {/* Mock Content Grid */}
                    <div className="p-6 grid grid-cols-3 gap-6">
                        {/* Left Col */}
                        <div className="col-span-2 space-y-6">
                            {/* Big Graph Card */}
                            <div className="h-64 bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400">Total Net Worth</p>
                                        <h3 className="text-2xl font-bold text-white">$1,240,500</h3>
                                    </div>
                                    <span className="text-emerald-500 text-xs bg-emerald-500/10 px-2 py-1 rounded">+12.4%</span>
                                </div>
                                {/* CSS Graph */}
                                <div className="flex items-end gap-2 h-32 mt-4 opacity-80">
                                    {[40, 65, 50, 80, 55, 90, 70, 100, 85, 120, 110, 140].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-primary/10 to-primary rounded-t-sm transition-all duration-500" style={{height: `${h}%`, animationDelay: `${i*100}ms`}}></div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Row of small cards */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="h-24 bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <div className="h-2 w-20 bg-white/10 rounded mb-2"></div>
                                        <div className="h-2 w-12 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-24 bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                                     <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <div className="h-2 w-20 bg-white/10 rounded mb-2"></div>
                                        <div className="h-2 w-12 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Col */}
                        <div className="space-y-6">
                            <div className="h-40 bg-white/5 rounded-2xl p-6 border border-white/5">
                                <div className="h-32 w-32 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 mx-auto relative flex items-center justify-center">
                                    <span className="text-xl font-bold">850</span>
                                </div>
                            </div>
                             <div className="h-52 bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                                        <div className="flex-1">
                                            <div className="h-2 w-16 bg-white/10 rounded mb-1"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements (Parallax feel) */}
                <div className="absolute -left-12 top-20 bg-dark-800/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-500">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Stock Alert</p>
                            <p className="text-sm font-bold text-white">NVDA +5.2%</p>
                        </div>
                    </div>
                </div>

                <div className="absolute -right-8 top-32 bg-dark-800/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl animate-float delay-700">
                    <div className="flex items-center gap-3">
                         <div className="bg-purple-500/20 p-2 rounded-lg text-purple-500">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Security</p>
                            <p className="text-sm font-bold text-white">System Secure</p>
                        </div>
                    </div>
                </div>

                <div className="absolute left-20 -bottom-6 bg-dark-800/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl animate-float delay-1000 z-20">
                     <div className="flex items-center gap-3">
                         <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Dividends</p>
                            <p className="text-sm font-bold text-white">+$450.00 Received</p>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Reflection/Shadow under the dashboard */}
            <div className="absolute top-[90%] left-[10%] right-[10%] h-20 bg-primary/20 blur-[60px] rounded-full opacity-50 pointer-events-none"></div>
        </div>
      </div>

      {/* Partners */}
      <div className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <p className="text-center text-sm font-medium text-gray-500 mb-8">TRUSTED BY INNOVATIVE TEAMS AT</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['ACME Corp', 'GlobalBank', 'Stripe', 'Coinbase', 'Revolut'].map(brand => (
                    <span key={brand} className="text-xl font-bold font-sans tracking-tight text-white">{brand}</span>
                ))}
            </div>
          </div>
      </div>

      {/* Bento Grid Features */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for the future of finance</h2>
            <p className="text-gray-400 text-lg">Everything you need to manage wealth, assets, and liabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="md:col-span-2 bg-dark-900 border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="relative z-10 max-w-lg">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                        <Activity size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">AstroFin™ Simulation</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Our proprietary digital twin technology simulates 1,000+ financial scenarios to predict the outcome of your decisions before you make them.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Feature 2 */}
            <div className="bg-dark-900 border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        AES-256 encryption and biometric authentication ensure your data never leaves the secure enclave.
                    </p>
                </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-dark-900 border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="relative z-10">
                     <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Instant Insights</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        Real-time processing of transactions to give you up-to-the-second net worth calculations.
                    </p>
                </div>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 bg-dark-900 border border-white/10 rounded-[32px] p-10 relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                            <PieChart size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Portfolio Diversity</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Visualize your asset allocation across crypto, stocks, real estate, and cash with our unified dashboard.
                        </p>
                    </div>
                    <div className="relative h-48 bg-dark-800 rounded-2xl border border-white/5 p-4 flex items-center justify-center">
                         {/* Abstract Chart Graphic */}
                         <div className="flex gap-2 items-end h-32">
                            <div className="w-8 h-[40%] bg-orange-500/20 rounded-t-lg"></div>
                            <div className="w-8 h-[70%] bg-orange-500/40 rounded-t-lg"></div>
                            <div className="w-8 h-[50%] bg-orange-500/60 rounded-t-lg"></div>
                            <div className="w-8 h-[90%] bg-orange-500 rounded-t-lg shadow-lg shadow-orange-500/20"></div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* CTA Section */}
       <div className="max-w-7xl mx-auto px-6 pb-32">
            <div className="bg-gradient-to-r from-primary to-emerald-700 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to take control?</h2>
                    <p className="text-emerald-100 text-lg mb-10">Join thousands of users who have optimized their financial future with FinPilot.</p>
                    <button 
                        onClick={onGetStarted}
                        className="bg-white text-emerald-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
                    >
                        Get Started Now
                    </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            </div>
       </div>

       <footer className="border-t border-white/10 bg-dark-900">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                    <span className="font-bold">FinPilot</span>
                </div>
                <div className="text-gray-500 text-sm">
                    &copy; 2025 FinPilot Technologies. All rights reserved.
                </div>
                <div className="flex gap-6">
                    <Globe size={20} className="text-gray-500 hover:text-white cursor-pointer" />
                    <Lock size={20} className="text-gray-500 hover:text-white cursor-pointer" />
                </div>
            </div>
       </footer>
       
       <style>{`
         .perspective-1000 { perspective: 1000px; }
         .transform-style-3d { transform-style: preserve-3d; }
         .rotate-x-12 { transform: rotateX(12deg) rotateY(-4deg); }
         .rotate-x-0 { transform: rotateX(0deg) rotateY(0deg); }
         @keyframes float {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-10px); }
         }
         .animate-float { animation: float 6s ease-in-out infinite; }
         .delay-700 { animation-delay: 700ms; }
         .delay-1000 { animation-delay: 1000ms; }
       `}</style>
    </div>
  );
};

export default LandingPage;