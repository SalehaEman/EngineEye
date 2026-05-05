import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Activity, 
  BrainCircuit, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  User
} from "lucide-react";
import { SplashScreen } from "./components/SplashScreen";
import { useEngineData } from "./hooks/useEngineData";
import { DashboardView } from "./components/views/DashboardView";
import { MonitoringView } from "./components/views/MonitoringView";
import { PredictionsView } from "./components/views/PredictionsView";
import { HistoryView } from "./components/views/HistoryView";
import { SettingsView } from "./components/views/SettingsView";
import { Logo } from "./components/Logo";
import { AuthView } from "./components/views/AuthView";
import { cn } from "./lib/utils";

type Tab = "dashboard" | "monitoring" | "predictions" | "history" | "settings";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const { data, status, activePredictions, history } = useEngineData();
  const [isSimulation, setIsSimulation] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com"
  });

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <AuthView 
        onLogin={(userData) => {
          setUserProfile(userData);
          setIsLoggedIn(true);
        }} 
        isDarkMode={isDarkMode} 
      />
    );
  }

  const renderView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView data={data} status={status} alerts={history} isDarkMode={isDarkMode} />;
      case "monitoring":
        return <MonitoringView data={data} isDarkMode={isDarkMode} />;
      case "predictions":
        return <PredictionsView predictions={activePredictions} isDarkMode={isDarkMode} />;
      case "history":
        return <HistoryView history={history} isDarkMode={isDarkMode} />;
      case "settings":
        return (
          <SettingsView 
            isSimulation={isSimulation} 
            onToggleSimulation={() => setIsSimulation(!isSimulation)} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onLogout={() => setIsLoggedIn(false)}
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
          />
        );
      default:
        return <DashboardView data={data} status={status} alerts={history} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans border-x max-w-md mx-auto relative overflow-hidden shadow-2xl transition-colors duration-500",
      isDarkMode 
        ? "bg-[#0f172a] text-slate-50 border-slate-800" 
        : "bg-slate-50 text-slate-900 border-slate-200"
    )}>
      {/* Header */}
      <header className={cn(
        "glass sticky top-0 z-40 px-6 py-6 flex items-center justify-between border-b",
        isDarkMode ? "border-white/5" : "border-slate-200"
      )}>
        <Logo showText={true} className={cn("scale-75 -ml-4", isDarkMode ? "text-white" : "text-slate-900")} />
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                status === "Healthy" ? "bg-green-500" : status === "Warning" ? "bg-yellow-500" : "bg-red-500"
              )} />
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest leading-none",
                isDarkMode ? "text-slate-400" : "text-slate-500"
              )}>{status}</span>
            </div>
            <span className={cn(
              "text-[8px] font-bold uppercase tracking-tighter",
              isDarkMode ? "text-slate-600" : "text-slate-400"
            )}>System Online</span>
          </div>

          <button 
            onClick={() => setActiveTab("settings")}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-sm",
              isDarkMode ? "bg-slate-800 border-white/10 text-blue-400" : "bg-white border-slate-200 text-blue-600"
            )}
          >
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className={cn(
        "glass border-t flex justify-around items-center h-20 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 transition-colors duration-500",
        isDarkMode ? "border-white/5" : "border-slate-200"
      )}>
        <NavButton 
          active={activeTab === "dashboard"} 
          onClick={() => setActiveTab("dashboard")}
          icon={<LayoutDashboard size={20} />}
          label="Home"
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === "monitoring"} 
          onClick={() => setActiveTab("monitoring")}
          icon={<Activity size={20} />}
          label="Live"
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === "predictions"} 
          onClick={() => setActiveTab("predictions")}
          icon={<BrainCircuit size={20} />}
          label="AI"
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === "history"} 
          onClick={() => setActiveTab("history")}
          icon={<HistoryIcon size={20} />}
          label="Logs"
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === "settings"} 
          onClick={() => setActiveTab("settings")}
          icon={<SettingsIcon size={20} />}
          label="Settings"
          isDarkMode={isDarkMode}
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, isDarkMode }: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode, 
  label: string,
  isDarkMode: boolean
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 transition-all",
        active 
          ? (isDarkMode ? "text-blue-400 scale-110" : "text-blue-600 scale-110") 
          : (isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
      )}
    >
      <div className={cn(
        "p-1 rounded-lg transition-all",
        active 
          ? (isDarkMode ? "bg-blue-500/10" : "bg-blue-500/5") 
          : "transparent"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

