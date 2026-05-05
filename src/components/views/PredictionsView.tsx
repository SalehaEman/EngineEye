import { motion } from "motion/react";
import { Brain, Search, Info, Lightbulb } from "lucide-react";
import { Prediction } from "../../types.ts";
import { cn } from "../../lib/utils";

export function PredictionsView({ predictions, isDarkMode }: { predictions: Prediction[], isDarkMode: boolean }) {
  return (
    <div className="space-y-6">
      <div className={cn(
        "flex items-center gap-4 glass p-6 rounded-3xl shadow-lg overflow-hidden relative border",
        isDarkMode ? "glass-dark border-white/5 text-white" : "glass-light border-slate-200 text-slate-900"
      )}>
        <div className="z-10">
          <h2 className="text-2xl font-black">Predictive Analysis</h2>
          <p className={cn("text-xs font-bold uppercase tracking-widest", isDarkMode ? "text-blue-400" : "text-blue-600")}>EngineEye Core™ v4.2</p>
        </div>
        <Brain className={cn("absolute -right-4 -bottom-4 w-24 h-24 rotate-12", isDarkMode ? "text-blue-500/10" : "text-blue-500/5")} />
      </div>

      <div className="space-y-4">
        {predictions.length > 0 ? (
          predictions.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn("glass rounded-3xl p-5 space-y-4", isDarkMode ? "glass-dark" : "glass-light")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    p.severity === "high" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : p.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
                  )} />
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{p.category}</span>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter",
                  p.severity === "high" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"
                )}>
                  {p.severity}
                </span>
              </div>
              
              <h3 className={cn("text-lg font-bold", isDarkMode ? "text-slate-100" : "text-slate-800")}>{p.issue}</h3>
              
              <div className={cn(
                "flex gap-3 p-4 rounded-2xl border",
                isDarkMode ? "bg-slate-900/50 border-white/5" : "bg-slate-50 border-slate-100"
              )}>
                <Lightbulb className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <p className={cn("text-[11px] font-medium leading-relaxed", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                  <span className={cn("font-bold uppercase tracking-tighter block mb-1", isDarkMode ? "text-blue-400" : "text-blue-600")}>Recommendation</span> {p.action}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                  Service Now
                </button>
                <button className={cn(
                  "px-4 rounded-xl border flex items-center justify-center",
                  isDarkMode ? "bg-slate-800 border-white/5 text-slate-400" : "bg-white border-slate-200 text-slate-400"
                )}>
                  <Info size={16} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center px-10">
            <Search className={cn("w-20 h-20 mb-4", isDarkMode ? "text-slate-800" : "text-slate-200")} />
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider">No Anomalies</h3>
            <p className="text-xs text-slate-500 mt-2 italic font-medium">
              Neural network models report 100% nominal operational levels.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
