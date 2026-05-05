import React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  ShieldAlert, 
  Droplet, 
  Thermometer, 
  ChevronRight,
  AlertTriangle,
  Activity
} from "lucide-react";
import { SensorData, VehicleStatus, Alert } from "../../types.ts";
import { cn } from "../../lib/utils";

interface DashboardProps {
  data: SensorData;
  status: VehicleStatus;
  alerts: Alert[];
  isDarkMode: boolean;
}

export function DashboardView({ data, status, alerts, isDarkMode }: DashboardProps) {
  const latestAlert = alerts[0];

  return (
    <div className="space-y-6">
      {/* Hero Status Card */}
      <motion.div 
        className={cn(
          "rounded-3xl p-6 shadow-xl overflow-hidden relative border transition-all duration-500",
          isDarkMode ? "border-white/5 text-white shadow-black/50" : "border-slate-100 text-slate-900 shadow-slate-200/50",
          status === VehicleStatus.HEALTHY ? (isDarkMode ? "bg-gradient-to-br from-green-500/20 to-emerald-600/20" : "bg-gradient-to-br from-green-50 to-emerald-50") :
          status === VehicleStatus.WARNING ? (isDarkMode ? "bg-gradient-to-br from-yellow-400/20 to-orange-500/20" : "bg-gradient-to-br from-yellow-50 to-orange-50") :
          (isDarkMode ? "bg-gradient-to-br from-red-500/20 to-rose-600/20" : "bg-gradient-to-br from-red-50 to-rose-50")
        )}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative z-10 text-center">
          <h3 className={cn("text-xs font-bold uppercase tracking-[0.2em] mb-4", isDarkMode ? "text-slate-400" : "text-slate-500")}>Overall Vehicle Status</h3>
          <div className={cn(
            "relative w-40 h-40 mx-auto rounded-full flex items-center justify-center border-4",
            isDarkMode ? "border-slate-800" : "border-slate-100 bg-white"
          )}>
            <div className={cn(
              "absolute inset-0 rounded-full border-4",
              status === VehicleStatus.HEALTHY ? "border-green-500" : status === VehicleStatus.WARNING ? "border-yellow-500" : "border-red-500"
            )} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 85%)' }} />
            <div className="z-10 flex flex-col items-center">
              <span className={cn(
                "text-4xl font-black",
                status === VehicleStatus.HEALTHY ? "text-green-500" : status === VehicleStatus.WARNING ? "text-yellow-500" : "text-red-500"
              )}>{status === VehicleStatus.HEALTHY ? "85%" : status === VehicleStatus.WARNING ? "65%" : "35%"}</span>
              <span className={cn("text-[10px] uppercase tracking-widest font-bold", isDarkMode ? "text-slate-400" : "text-slate-400")}>{status}</span>
            </div>
          </div>
          <p className={cn("text-sm mt-4 leading-relaxed font-medium", isDarkMode ? "text-slate-300" : "text-slate-600")}>
            {status === VehicleStatus.HEALTHY 
              ? "Everything looks good. No immediate service required." 
              : status === VehicleStatus.WARNING 
              ? "Potential issues detected. Monitor sensors closely." 
              : "Critical safety warnings. Stop and inspect."}
          </p>
        </div>
      </motion.div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatusCard 
          icon={<Thermometer className="text-blue-500" />}
          label="Temp"
          value={`${Math.round(data.temperature)}°C`}
          status={data.temperature > 95 ? "critical" : data.temperature > 85 ? "warning" : "healthy"}
          progress={data.temperature}
          max={120}
          isDarkMode={isDarkMode}
        />
        <StatusCard 
          icon={<Zap className="text-purple-500" />}
          label="Vibration"
          value={`${Math.round(data.vibration)}Hz`}
          status={data.vibration > 80 ? "critical" : data.vibration > 60 ? "warning" : "healthy"}
          progress={data.vibration}
          max={100}
          isDarkMode={isDarkMode}
        />
        <StatusCard 
          icon={<Droplet className="text-cyan-500" />}
          label="Oil Level"
          value={`${Math.round(data.oilLevel)}%`}
          status={data.oilLevel < 30 ? "critical" : data.oilLevel < 50 ? "warning" : "healthy"}
          progress={data.oilLevel}
          max={100}
          isDarkMode={isDarkMode}
        />
        <StatusCard 
          icon={<Activity className="text-green-500" />}
          label="RPM"
          value={`${Math.round(data.rpm)}`}
          status="healthy"
          progress={data.rpm}
          max={8000}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Latest Alerts */}
      <div className="space-y-4">
        <h3 className={cn("text-xs font-bold uppercase tracking-wider px-1", isDarkMode ? "text-slate-500" : "text-slate-400")}>Critical Components</h3>
        
        {alerts.length > 0 ? (
          <motion.div 
            className={cn("glass rounded-3xl p-4 flex items-center gap-4 transition-all", isDarkMode ? "glass-dark" : "glass-light")}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
              latestAlert.severity === "high" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
            )}>
              <AlertTriangle size={24} className={cn(latestAlert.severity === "high" && "alert-pulse")} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={cn("font-bold text-sm truncate", isDarkMode ? "text-white" : "text-slate-900")}>{latestAlert.message}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{new Date(latestAlert.timestamp).toLocaleTimeString()}</p>
            </div>
            <ChevronRight className="text-slate-400" size={20} />
          </motion.div>
        ) : (
          <div className={cn("glass rounded-3xl p-8 text-center", isDarkMode ? "glass-dark" : "glass-light")}>
            <p className="text-slate-500 text-sm font-medium">No active alerts detected.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value, status, progress, max, isDarkMode }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  status: "healthy" | "warning" | "critical",
  progress: number,
  max: number,
  isDarkMode: boolean
}) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <motion.div 
      className={cn("glass rounded-3xl p-5 flex flex-col justify-between h-[150px]", isDarkMode ? "glass-dark" : "glass-light")}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">{label}</span>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "healthy" ? "bg-green-500" : status === "warning" ? "bg-yellow-500" : "bg-red-500"
        )} />
      </div>
      <p className={cn("text-3xl font-light my-2", isDarkMode ? "text-slate-100" : "text-slate-800")}>{value}</p>
      <div className={cn("gauge-bar h-1", isDarkMode ? "gauge-bar-dark" : "gauge-bar-light")}>
        <div 
          className={cn(
            "gauge-fill h-full",
            status === "healthy" ? "bg-green-500" : status === "warning" ? "bg-yellow-500" : "bg-red-500"
          )} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </motion.div>
  );
}
