import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all duration-300">
            <div className="relative flex items-center justify-center">
                {/* Outer glowing ring */}
                <div className="absolute w-20 h-20 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 border-b-pink-500 animate-spin blur-[1px]"></div>
                
                {/* Inner ring spinning backwards */}
                <div className="absolute w-14 h-14 rounded-full border-4 border-transparent border-t-cyan-400 border-l-teal-400 animate-spin-reverse opacity-80"></div>
                
                {/* Center pulsing dot */}
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
            </div>
            
            {/* Elegant Loading Text */}
            <span className="mt-8 text-xs font-bold tracking-widest text-slate-200 uppercase animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Loading stay...
            </span>
        </div>
    );
}
