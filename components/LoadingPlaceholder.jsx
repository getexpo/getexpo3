"use client";

import React from 'react';

const LoadingPlaceholder = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 animate-pulse rounded-lg" />
      
      {/* Spinning loader */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
          
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin" />
          
          {/* Inner glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-sm" />
        </div>
      </div>
      
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/40 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-500/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-purple-500/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
