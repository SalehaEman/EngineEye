import { cn } from "../lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative flex-shrink-0 w-24 h-12 flex items-center justify-center">
        <svg 
          viewBox="0 0 120 50" 
          className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Roof - Thick tapered line */}
          <path 
            d="M 35 30 Q 60 10 85 30 Q 60 15 35 30 Z" 
            className="opacity-90"
          />
          {/* Left Mirror - Organic loop */}
          <path 
            d="M 28 28 Q 23 23 33 26 Q 30 30 28 28 Z" 
          />
          {/* Right Mirror - Organic loop */}
          <path 
            d="M 92 28 Q 97 23 87 26 Q 90 30 92 28 Z" 
          />
          {/* Bottom Swoop Left */}
          <path 
            d="M 25 35 Q 45 28 65 32 Q 45 30 25 35 Z" 
          />
          {/* Bottom Swoop Right (the big organic stroke) */}
          <path 
            d="M 68 31 Q 85 28 105 45 Q 85 35 68 31 Z" 
          />
        </svg>
      </div>
      {showText && (
        <span 
          className="text-4xl font-bold tracking-tight -mt-4 drop-shadow-sm"
          style={{ 
            fontFamily: "'Caveat', cursive",
          }}
        >
          EngineEye
        </span>
      )}
    </div>
  );
}
