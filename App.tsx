
import React, { useState } from 'react';
import Header from './components/Header';
import CandidateForm from './components/CandidateForm';
import ProfileResult from './components/ProfileResult';
import { analyzeCandidate } from './services/geminiService';
import { CandidateData, AnalysisResult } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: CandidateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysisResult = await analyzeCandidate(data);
      setResult(analysisResult);
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || 'Hiba történt az elemzés során.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Leaders Hub Strategic Engine
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#323d5a] mb-8 tracking-tight leading-none">
            Minden szó egy <span className="hub-gradient-text italic">lehetőség</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Pszichológiai alapú elemzés és megkeresési stratégia a sikeres toborzáshoz.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-600 rounded-[2rem] flex items-center gap-4 animate-fade shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-black text-xs uppercase tracking-widest">{error}</span>
          </div>
        )}

        <div className="space-y-12">
          {!result && (
            <CandidateForm onSubmit={handleAnalyze} isLoading={isLoading} />
          )}
          
          {result && (
            <ProfileResult result={result} onReset={reset} />
          )}
        </div>
      </main>

      <footer className="py-16 px-6 text-center border-t border-gray-100 bg-white/40 backdrop-blur-sm mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-baseline font-black tracking-tighter text-xl mb-6 opacity-40">
            <span className="text-[#323d5a]">LEADERS</span>
            <span className="ml-1 bg-[#3b82f6] text-white px-2 py-0.5 rounded-md">HUB</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-2">Strategy Hub - AI Powered Recruitment</p>
          <p className="text-[10px] font-medium text-gray-400">
            &copy; {new Date().getFullYear()} Leaders Hub. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
