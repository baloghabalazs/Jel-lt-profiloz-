
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
      // Smooth scroll to result
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
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Találd meg a <span className="pm-gradient-text italic">tökéletes hangot</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            A legmodernebb mesterséges intelligencia segítségével elemezzük a jelöltedet, hogy minden szavad telibe találjon.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 text-[#ed1c24] rounded-[1.5rem] flex items-center gap-4 animate-fade">
            <div className="bg-[#ed1c24] text-white rounded-full p-1.5 shadow-lg shadow-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-sm">{error}</span>
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

      <footer className="py-12 px-6 text-center border-t border-gray-100/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">PM-International Partner Hub</p>
          <p className="text-xs font-medium text-gray-400">
            &copy; {new Date().getFullYear()} Strategy Tool. Powered by <span className="text-[#ed1c24] font-bold">Google Gemini AI</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
