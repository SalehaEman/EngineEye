import { motion } from "motion/react";
import { Logo } from "./Logo";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <Logo className="scale-150 mb-4 text-slate-900" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 240 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-1 bg-blue-600 rounded-full mt-10 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-6"
        >
          Smart Eyes For Every Car
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
