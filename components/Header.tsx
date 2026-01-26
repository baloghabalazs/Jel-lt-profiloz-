
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-white/20 py-4 px-4 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 pm-gradient-bg rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-200">
            PM
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">Jelölt Profilozó</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Premium Partner Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-100/50 px-3 py-1.5 rounded-full border border-gray-200/50">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            AI Engine Active
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
