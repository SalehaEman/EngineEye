import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react";
import { Logo } from "../Logo";
import { cn } from "../../lib/utils";

interface AuthViewProps {
  onLogin: (userData: { email: string; name: string }) => void;
  isDarkMode: boolean;
}

export function AuthView({ onLogin, isDarkMode }: AuthViewProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email: formData.email,
      name: mode === "signup" ? formData.name : (formData.name || formData.email.split("@")[0])
    });
  };

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col p-6 overflow-y-auto transition-colors duration-500",
      isDarkMode ? "bg-[#0f172a]" : "bg-slate-50"
    )}>
      <div className="max-w-md mx-auto w-full flex flex-col min-h-full py-8">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <Logo className={cn("scale-125 mb-6", isDarkMode ? "text-white" : "text-slate-900")} />
            <h2 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {mode === "login" 
                ? "Access your vehicle's neural diagnostics" 
                : "Join the future of predictive maintenance"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className={cn(
                        "w-full border rounded-2xl py-4 pl-12 pr-4 transition-all text-sm focus:outline-none focus:ring-2",
                        isDarkMode 
                          ? "bg-slate-900 border-white/5 text-white placeholder:text-slate-700 focus:ring-blue-500/50" 
                          : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-300 focus:ring-blue-500/20 shadow-sm"
                      )}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className={cn(
                      "w-full border rounded-2xl py-4 pl-12 pr-4 transition-all text-sm focus:outline-none focus:ring-2",
                      isDarkMode 
                        ? "bg-slate-900 border-white/5 text-white placeholder:text-slate-700 focus:ring-blue-500/50" 
                        : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-300 focus:ring-blue-500/20 shadow-sm"
                    )}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className={cn(
                      "w-full border rounded-2xl py-4 pl-12 pr-4 transition-all text-sm focus:outline-none focus:ring-2",
                      isDarkMode 
                        ? "bg-slate-900 border-white/5 text-white placeholder:text-slate-700 focus:ring-blue-500/50" 
                        : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-300 focus:ring-blue-500/20 shadow-sm"
                    )}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-600 transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                {mode === "login" ? "Secure Login" : "Initialize Account"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-4">
            <div className="relative flex items-center">
              <div className={cn("flex-grow border-t", isDarkMode ? "border-white/5" : "border-slate-200")}></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or Continue With</span>
              <div className={cn("flex-grow border-t", isDarkMode ? "border-white/5" : "border-slate-200")}></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SocialButton icon={<Chrome size={18} />} label="Google" isDarkMode={isDarkMode} />
              <SocialButton icon={<Github size={18} />} label="GitHub" isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {mode === "login" ? "New to EngineEye?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-500 font-bold hover:underline"
            >
              {mode === "login" ? "Sign Up Free" : "Login Securely"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, label, isDarkMode }: { icon: React.ReactNode; label: string; isDarkMode: boolean }) {
  return (
    <button className={cn(
      "flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all active:scale-[0.95]",
      isDarkMode 
        ? "glass-dark border-white/5 text-slate-300 hover:text-white" 
        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
    )}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
