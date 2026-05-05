import { format } from "date-fns";
import { Alert } from "../../types.ts";
import { ListChecks, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

export function HistoryView({ history, isDarkMode }: { history: Alert[], isDarkMode: boolean }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-2xl font-black", isDarkMode ? "text-slate-100" : "text-slate-900")}>Alert History</h2>
        <div className={cn("p-2 glass rounded-full", isDarkMode ? "glass-dark" : "glass-light")}>
          <ListChecks size={20} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
        </div>
      </div>

      <div className="space-y-0">
        {history.length > 0 ? (
          history.map((item, i) => (
            <div key={item.id} className={cn(
              "relative pl-8 pb-8 border-l last:pb-0 last:border-0",
              isDarkMode ? "border-slate-800" : "border-slate-200"
            )}>
              <div className={cn(
                "absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full",
                item.severity === "high" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
              )} />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {format(item.timestamp, "MMM d, HH:mm:ss")}
                  </span>
                </div>
                <div className={cn("glass p-4 rounded-2xl", isDarkMode ? "glass-dark" : "glass-light")}>
                  <h4 className={cn("font-bold text-sm", isDarkMode ? "text-slate-100" : "text-slate-800")}>{item.message}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">
                    Source: <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{item.type}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={cn("py-20 text-center glass rounded-3xl border-dashed", isDarkMode ? "glass-dark border-slate-800" : "glass-light border-slate-200")}>
            <p className="text-slate-500 text-sm font-medium italic">Diagnostic logs are clear.</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-600 rounded-2xl flex flex-col gap-2 mt-6">
        <span className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Smart Recommendation</span>
        <p className="text-xs text-white leading-relaxed font-medium">Regular diagnostics show optimal performance. No immediate action required.</p>
      </div>
    </div>
  );
}
