
import React from 'react';
import { 
  CandidateData, 
  AgeRange, 
  MaritalStatus, 
  Motivation, 
  TimeFrame, 
  DiscType 
} from '../types';

interface CandidateFormProps {
  onSubmit: (data: CandidateData) => void;
  isLoading: boolean;
}

const TRAITS_OPTIONS = [
  { label: "Nyitott az új dolgokra", value: "open" },
  { label: "Magabiztos", value: "confident" },
  { label: "Negatív", value: "negative" },
  { label: "Vállalkozó szellemű", value: "entrepreneur" },
  { label: "Törődő", value: "caring" },
  { label: "Visszahúzódó", value: "introverted" },
  { label: "Pozitív gondolkodású", value: "positive" },
  { label: "Elégedetlen", value: "dissatisfied" },
  { label: "Alkalmazott", value: "employee" }
];

const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<CandidateData>({
    age: AgeRange.A30_35,
    hasChildren: false,
    maritalStatus: MaritalStatus.SINGLE,
    occupation: '',
    residence: '',
    traits: [],
    motivation: Motivation.FREEDOM,
    timeAvailability: TimeFrame.T5_10,
    salesExperience: false,
    discType: '',
    notes: '',
  });

  const handleLoadTestData = () => {
    setFormData({
      age: AgeRange.A30_35,
      hasChildren: true,
      maritalStatus: MaritalStatus.MARRIED,
      occupation: 'Ingatlanértékesítő / Jóga oktató',
      residence: 'Szentendre',
      traits: ['open', 'positive', 'entrepreneur', 'caring'],
      motivation: Motivation.FREEDOM,
      timeAvailability: TimeFrame.T10_PLUS,
      salesExperience: true,
      discType: 'I',
      notes: 'Nagyon nyitott a prevencióra és a természetes megoldásokra. Jelenleg váltásban gondolkodik, mert több minőségi időt szeretne a családjával tölteni, miközben megmarad a vállalkozói szabadsága. Pozitív kisugárzású, kiterjedt kapcsolatrendszere van. Érdekli a passzív jövedelem lehetősége.',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTraitToggle = (val: string) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(val) 
        ? prev.traits.filter(t => t !== val) 
        : [...prev.traits, val]
    }));
  };

  const inputClasses = "w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-[#ed1c24] outline-none transition-all shadow-sm text-sm";
  const labelClasses = "block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1";
  const sectionTitleClasses = "text-xl font-black text-gray-900 mb-8 flex items-center gap-4";

  const renderPills = <T extends string>(
    label: string, 
    options: T[], 
    currentValue: T, 
    onChange: (val: T) => void
  ) => (
    <div className="flex flex-col">
      <label className={labelClasses}>{label}</label>
      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-50/50 rounded-[1.5rem] border border-gray-100">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-xl text-[11px] font-bold transition-all duration-300 ${
              currentValue === opt
              ? 'bg-white text-[#ed1c24] shadow-md shadow-gray-200 border-white ring-1 ring-gray-100'
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-[3rem] p-8 md:p-16 animate-fade shadow-2xl">
      <div className="mb-14 text-center md:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Strategy Assistant</span>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Jelölt Profilozása</h2>
        <p className="text-gray-400 mt-2 font-medium">Elemezd a jelöltedet a legpontosabb AI technológiával.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-14">
        {/* --- DEMOGRÁFIA --- */}
        <section>
          <h3 className={sectionTitleClasses}>
            <span className="w-10 h-10 rounded-2xl pm-gradient-bg text-white shadow-lg shadow-red-100 flex items-center justify-center text-sm font-black italic">01</span>
            Demográfiai Adatok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              {renderPills("Becsült kor", Object.values(AgeRange), formData.age, (v) => setFormData({...formData, age: v}))}
            </div>
            
            <div className="flex flex-col">
              <label className={labelClasses}>Gyerekek vannak?</label>
              <div className="flex gap-2 p-1.5 bg-gray-50/50 rounded-[1.5rem] border border-gray-100">
                {[true, false].map((opt) => (
                  <button
                    key={opt ? 'van' : 'nincs'}
                    type="button"
                    onClick={() => setFormData({...formData, hasChildren: opt})}
                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 ${
                      formData.hasChildren === opt
                      ? 'bg-white text-[#ed1c24] shadow-md shadow-gray-200 border-white'
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {opt ? 'Van' : 'Nincs'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {renderPills("Családi állapot", Object.values(MaritalStatus), formData.maritalStatus, (v) => setFormData({...formData, maritalStatus: v}))}
            </div>

            <div>
              <label className={labelClasses}>Foglalkozás</label>
              <input 
                type="text" 
                value={formData.occupation}
                onChange={e => setFormData({...formData, occupation: e.target.value})}
                placeholder="Pl. Tanár, Mérnök..."
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Lakhely</label>
              <input 
                type="text" 
                value={formData.residence}
                onChange={e => setFormData({...formData, residence: e.target.value})}
                placeholder="Település neve"
                className={inputClasses}
              />
            </div>
          </div>
        </section>

        {/* --- JELLEMZŐK --- */}
        <section>
          <h3 className={sectionTitleClasses}>
            <span className="w-10 h-10 rounded-2xl pm-gradient-bg text-white shadow-lg shadow-red-100 flex items-center justify-center text-sm font-black italic">02</span>
            Jellemzők
          </h3>
          <div className="flex flex-wrap gap-3">
            {TRAITS_OPTIONS.map((trait) => {
              const active = formData.traits.includes(trait.value);
              return (
                <button
                  key={trait.value}
                  type="button"
                  onClick={() => handleTraitToggle(trait.value)}
                  className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all duration-300 border ${
                    active 
                    ? 'border-[#ed1c24] bg-red-50 text-[#ed1c24] shadow-sm shadow-red-50 scale-[1.03]' 
                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {trait.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* --- ÜZLETI PROFIL --- */}
        <section>
          <h3 className={sectionTitleClasses}>
            <span className="w-10 h-10 rounded-2xl pm-gradient-bg text-white shadow-lg shadow-red-100 flex items-center justify-center text-sm font-black italic">03</span>
            Üzleti Profil
          </h3>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                {renderPills("Ráfordítható idő", Object.values(TimeFrame), formData.timeAvailability, (v) => setFormData({...formData, timeAvailability: v}))}
              </div>
              
              <div className="flex flex-col">
                <label className={labelClasses}>Fő motiváció</label>
                <select 
                  value={formData.motivation}
                  onChange={e => setFormData({...formData, motivation: e.target.value as Motivation})}
                  className={`${inputClasses} appearance-none bg-[right_1.25rem_center] bg-no-repeat`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  {Object.values(Motivation).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div className="flex flex-col">
                <label className={labelClasses}>Szakmai Tapasztalat</label>
                <div className="flex gap-2 p-1.5 bg-gray-50/50 rounded-[1.5rem] border border-gray-100">
                  {['Igen, van', 'Nincs'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({...formData, salesExperience: opt.includes('Igen')})}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 ${
                        (opt.includes('Igen') && formData.salesExperience) || (opt === 'Nincs' && !formData.salesExperience)
                        ? 'bg-white text-[#ed1c24] shadow-md shadow-gray-200'
                        : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Becsült Személyiségtípus (DISC)</label>
                <select 
                  value={formData.discType}
                  onChange={e => setFormData({...formData, discType: e.target.value})}
                  className={`${inputClasses} appearance-none bg-[right_1.25rem_center] bg-no-repeat`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  <option value="">Válassz típust...</option>
                  <option value="D">Domináns (D) - Eredményorientált, határozott</option>
                  <option value="I">Befolyásoló (I) - Közvetlen, lelkes</option>
                  <option value="S">Stabil (S) - Együttműködő, türelmes</option>
                  <option value="C">Szabálykövető (C) - Pontos, elemző</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Egyéb jegyzetek</label>
              <textarea 
                rows={4}
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                placeholder="További megfigyelések..."
                className={`${inputClasses} resize-none pt-4`}
              />
            </div>
          </div>
        </section>

        <div className="space-y-4 pt-6">
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full py-6 rounded-3xl text-white font-black text-xl shadow-2xl transform transition-all active:scale-[0.97] flex items-center justify-center gap-4 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'pm-gradient-bg hover:opacity-95 hover:shadow-red-200'
            }`}
          >
            {isLoading ? 'Elemzés folyamatban...' : 'Elemzés Futtatása'}
          </button>

          <button 
            type="button" 
            onClick={handleLoadTestData}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-gray-300 hover:text-gray-500 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Teszt adatok betöltése
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
