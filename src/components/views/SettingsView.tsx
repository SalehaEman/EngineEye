import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Bell, ShieldCheck, User, Info, Smartphone, Moon, Sun, Edit3, Check, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface SettingsProps {
  isSimulation: boolean;
  onToggleSimulation: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  userProfile: { name: string; email: string };
  onUpdateProfile: (profile: { name: string; email: string }) => void;
}

export function SettingsView({ 
  isSimulation, 
  onToggleSimulation, 
  isDarkMode, 
  onToggleDarkMode, 
  onLogout,
  userProfile,
  onUpdateProfile
}: SettingsProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  const handleSaveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditForm(userProfile);
    setIsEditingProfile(false);
  };
  return (
    <div className="space-y-8">
      <h2 className={cn("text-2xl font-black", isDarkMode ? "text-slate-100" : "text-slate-900")}>Settings</h2>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Appearance</h3>
        <div className={cn(
          "glass rounded-3xl overflow-hidden border",
          isDarkMode ? "border-white/5" : "border-slate-200"
        )}>
          <SettingItem 
            icon={isDarkMode ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-orange-500" />}
            label="Dark Mode"
            description={isDarkMode ? "Eyes protected" : "Daylight mode active"}
            isDarkMode={isDarkMode}
            action={
              <button 
                onClick={onToggleDarkMode}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  isDarkMode ? "bg-blue-600" : "bg-slate-300"
                )}
              >
                <motion.div 
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: isDarkMode ? 24 : 0 }}
                />
              </button>
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Application</h3>
        <div className={cn(
          "glass rounded-3xl overflow-hidden border",
          isDarkMode ? "border-white/5" : "border-slate-200"
        )}>
          <SettingItem 
            icon={<Database size={18} className="text-blue-400" />}
            label="Data Mode"
            description={isSimulation ? "Using internal generator" : "Auto-detecting live IoT feed"}
            isDarkMode={isDarkMode}
            action={
              <button 
                onClick={onToggleSimulation}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  isSimulation ? "bg-blue-600" : "bg-slate-700"
                )}
              >
                <motion.div 
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: isSimulation ? 24 : 0 }}
                />
              </button>
            }
          />
          <SettingItem 
            icon={<Bell size={18} className="text-orange-400" />}
            label="Push Notifications"
            description="Alerts for critical issues"
            isDarkMode={isDarkMode}
            action={
              <button className="relative w-12 h-6 bg-blue-600 rounded-full transition-colors">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Account & Security</h3>
        <div className={cn(
          "glass rounded-3xl overflow-hidden border",
          isDarkMode ? "border-white/5" : "border-slate-200"
        )}>
          <div className={cn(
            "p-4 border-b transition-colors",
            isDarkMode ? "border-white/5" : "border-slate-100"
          )}>
            <div className="flex items-center gap-4 mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border",
                isDarkMode ? "bg-slate-900 border-white/5 text-blue-400" : "bg-white border-slate-200 text-blue-600 shadow-sm"
              )}>
                <User size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={cn("font-bold text-sm", isDarkMode ? "text-slate-100" : "text-slate-900")}>
                  {userProfile.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium truncate">{userProfile.email}</p>
              </div>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  isDarkMode ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                <Edit3 size={16} />
              </button>
            </div>

            <AnimatePresence>
              {isEditingProfile && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                      <input 
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all",
                          isDarkMode 
                            ? "bg-slate-900 border-white/5 text-white focus:ring-blue-500/50" 
                            : "bg-white border-slate-200 text-slate-900 focus:ring-blue-500/20"
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all",
                          isDarkMode 
                            ? "bg-slate-900 border-white/5 text-white focus:ring-blue-500/50" 
                            : "bg-white border-slate-200 text-slate-900 focus:ring-blue-500/20"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveProfile}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Check size={14} /> Save Changes
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className={cn(
                        "px-4 rounded-xl flex items-center justify-center text-slate-400 border transition-all",
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
                      )}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="h-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SettingItem 
            icon={<ShieldCheck size={18} className="text-green-400" />}
            label="Device Security"
            description="Verified via EngineEye SecureLink"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onLogout}
          className={cn(
            "w-full py-4 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all border",
            isDarkMode 
              ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white" 
              : "bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white shadow-sm"
          )}
        >
          Logout Session
        </button>
      </div>

      <div className="pt-4">
        <div className={cn(
          "flex items-center gap-4 p-5 glass rounded-3xl border",
          isDarkMode ? "border-white/5" : "border-slate-200"
        )}>
          <Smartphone size={32} className="text-blue-400 shrink-0" />
          <div className="min-w-0">
            <h4 className={cn("font-bold text-sm", isDarkMode ? "text-white" : "text-slate-900")}>EngineEye Mobile</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Version 2.4.0 • Enterprise</p>
          </div>
          <button className="ml-auto text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-4 py-2 rounded-xl">Update</button>
        </div>
        
        <p className="mt-8 text-[10px] text-center text-slate-600 font-bold uppercase tracking-[0.2em]">
          EngineEye Core v4.2.0 • 2024
        </p>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, description, action, isDarkMode }: { 
  icon: React.ReactNode, 
  label: string, 
  description?: string,
  action?: React.ReactNode,
  isDarkMode: boolean
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 border-b last:border-0 transition-colors",
      isDarkMode 
        ? "hover:bg-white/5 border-white/5" 
        : "hover:bg-slate-100 border-slate-100"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
        isDarkMode 
          ? "bg-slate-900 border-white/5" 
          : "bg-white border-slate-200 shadow-sm"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={cn("font-bold text-sm leading-tight", isDarkMode ? "text-slate-100" : "text-slate-900")}>{label}</h4>
        {description && <p className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">{description}</p>}
      </div>
      <div className="shrink-0">
        {action || <div className="text-slate-400"><Info size={16} /></div>}
      </div>
    </div>
  );
}
