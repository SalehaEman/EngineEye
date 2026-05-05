import { motion } from "motion/react";
import { SensorData } from "../../types.ts";
import { cn } from "../../lib/utils";

function Gauge({ value, max, min, label, unit, color, isRpm, isDarkMode }: { 
  value: number, 
  max: number, 
  min: number, 
  label: string, 
  unit: string, 
  color: string,
  isRpm?: boolean,
  isDarkMode: boolean
}) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap: Record<string, string> = {
    blue: "stroke-blue-500",
    purple: "stroke-purple-500",
    cyan: "stroke-cyan-500",
    orange: "stroke-orange-500",
  };

  const bgMap: Record<string, string> = {
    blue: isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-100",
    purple: isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-50 text-purple-600 border-purple-100",
    cyan: isDarkMode ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-cyan-50 text-cyan-600 border-cyan-100",
    orange: isDarkMode ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={cn("fill-none", isDarkMode ? "stroke-slate-800" : "stroke-slate-200")}
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            className={cn("fill-none rounded-full", colorMap[color])}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ type: "spring", stiffness: 40, damping: 10 }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Value Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
          <span className={cn("text-xl font-light", isDarkMode ? "text-slate-100" : "text-slate-800")}>
            {isRpm ? Math.round(value) : Math.round(value)}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{unit}</span>
        </div>
      </div>
      
      <div className={cn("mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", bgMap[color])}>
        {label}
      </div>
    </div>
  );
}

export function MonitoringView({ data, isDarkMode }: { data: SensorData, isDarkMode: boolean }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
        <Gauge 
          value={data.temperature} 
          max={120} 
          min={60} 
          label="Temp" 
          unit="°C" 
          color="blue"
          isDarkMode={isDarkMode}
        />
        <Gauge 
          value={data.vibration} 
          max={100} 
          min={0} 
          label="Vibration" 
          unit="Hz" 
          color="purple"
          isDarkMode={isDarkMode}
        />
        <Gauge 
          value={data.oilLevel} 
          max={100} 
          min={0} 
          label="Oil" 
          unit="%" 
          color="cyan"
          isDarkMode={isDarkMode}
        />
        <Gauge 
          value={data.rpm} 
          max={8000} 
          min={0} 
          label="RPM" 
          unit="" 
          color="orange"
          isRpm={true}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={cn("p-6 glass rounded-3xl text-center", isDarkMode ? "glass-dark" : "glass-light")}>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Hardware ID: <span className="text-blue-500">EE-PRO-GEN2</span>
        </p>
      </div>
    </div>
  );
}
