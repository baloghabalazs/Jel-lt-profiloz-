
import React, { useState } from 'react';
import { AnalysisResult } from '../types';

interface ProfileResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ProfileResult: React.FC<ProfileResultProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.openingSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade mt-12 mb-20">
      <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/40">
        {/* Hero Section */}
        <div className="pm-gradient-bg p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Szakértői Elemzés</span>
            <h2 className="text-4xl font-black tracking-tight mb-4 leading-tight">Megközelítési Stratégia</h2>
            <div className="h-1 w-20 bg-white/40 rounded-full mb-6"></div>
            <p className="text-red-50 text-lg leading-relaxed font-medium opacity-90 max-w-2xl">
              {result.profileSummary}
            </p>
          </div>
        </div>
        
        <div className="p-8 md:p-12 space-y-12">
          {/* Grid for Motivations and Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-5 h-px bg-red-200"></span>
                Várható Motivációk
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.motivations.map((motivation, idx) => (
                  <div key={idx} className="bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105 cursor-default">
                    {motivation}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-5 h-px bg-red-200"></span>
                Stratégiai Javaslatok
              </h3>
              <ul className="space-y-4">
                {result.approachTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-4 items-start group">
                    <span className="mt-1 flex-shrink-0 bg-red-50 text-[#ed1c24] rounded-lg p-1.5 transition-colors group-hover:bg-[#ed1c24] group-hover:text-white">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Golden Sentence Callout */}
          <section className="bg-gray-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-5 blur-[100px] -mr-32 -mt-32"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="text-xs font-black text-red-400 uppercase tracking-[0.3em]">Golden Copywriting</h3>
                </div>
                <p className="text-2xl md:text-3xl font-bold leading-tight text-gray-100 italic font-serif">
                  "{result.openingSentence}"
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  onClick={handleCopy}
                  className={`relative overflow-hidden group px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
                    copied ? 'bg-green-500 text-white' : 'bg-white text-gray-900 hover:bg-red-50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Másolva!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Szöveg másolása
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </section>

          <button
            onClick={onReset}
            className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 font-bold rounded-2xl hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all uppercase tracking-[0.2em] text-[10px]"
          >
            Új elemzés indítása
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileResult;
