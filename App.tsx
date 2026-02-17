import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';
import { ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);

  const handleLogin = () => {
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentView(ViewState.LANDING);
  };

  return (
    <>
      {currentView === ViewState.LANDING && (
        <LandingPage onGetStarted={() => setCurrentView(ViewState.LOGIN)} />
      )}
      
      {currentView === ViewState.LOGIN && (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-20"></div>

            <div className="bg-dark-900 border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl max-w-md w-full relative backdrop-blur-xl z-10">
                
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg shadow-primary/20">F</div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400 mt-2 text-sm">Enter your credentials to access your secure dashboard.</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="user@finpilot.com" 
                            className="w-full bg-dark-950 border border-dark-700 text-white px-4 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-600" 
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs text-primary hover:text-primary-dark">Forgot?</a>
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-dark-950 border border-dark-700 text-white px-4 py-3.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-600" 
                        />
                    </div>
                </div>

                <button 
                    onClick={handleLogin}
                    className="w-full mt-8 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                >
                    Sign In <ArrowRight size={18} />
                </button>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <span className="text-white font-bold cursor-pointer hover:underline">Create ID</span>
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500">
                        Demo Access: Click "Sign In" to proceed.
                    </p>
                </div>
            </div>
        </div>
      )}

      {currentView === ViewState.DASHBOARD && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;