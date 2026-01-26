
import { GoogleGenAI, Type } from "@google/genai";
import { CandidateData, AnalysisResult } from "../types";

export const analyzeCandidate = async (data: CandidateData): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Te egy profi üzleti mentor és hálózatépítési szakértő vagy, aki a PM-International (FitLine) partnereit segíti. 
    A feladatod, hogy elemezz egy potenciális jelöltet az alábbi adatok alapján, és készíts egy stratégiát a megkereséséhez.
    
    Jelölt adatai:
    - Becsült kor: ${data.age}
    - Gyerekek: ${data.hasChildren ? 'Van gyereke' : 'Nincs gyereke'}
    - Családi állapot: ${data.maritalStatus}
    - Foglalkozás: ${data.occupation}
    - Lakhely: ${data.residence}
    - Jellemzők/Trait-ek: ${data.traits.join(', ')}
    - Fő motiváció: ${data.motivation}
    - Ráfordítható idő: ${data.timeAvailability}
    - Értékesítési tapasztalat: ${data.salesExperience ? 'Van' : 'Nincs'}
    - DISC típus: ${data.discType || 'Nincs meghatározva'}
    - Egyéb jegyzetek: ${data.notes}

    Kérlek, válaszolj magyar nyelven, szakmai, de támogató stílusban. 
    A válaszod tartalmazzon:
    1. Rövid összefoglalót (profileSummary): Építs a DISC típusra és az élethelyzetre.
    2. Motivációk (motivations): Sorolj fel 3-4 fő hajtóerőt, ami a PM-ben vonzó lehet neki.
    3. Megközelítési tippek (approachTips): Adj konkrét tanácsokat, hogyan szólítsd meg (pl. termékkel vagy üzlettel kezdj).
    4. Javasolt nyitómondat (openingSentence): Egy pontos, természetes hangvételű első mondat a kapcsolatfelvételhez.

    Fókuszálj a PM-International egyedi értékeire: FitLine termékek (NTC koncepció), prémium minőség, családi vállalkozás háttér, német precizitás, egyszerű üzleti modell.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profileSummary: { type: Type.STRING },
            motivations: { type: Type.ARRAY, items: { type: Type.STRING } },
            approachTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            openingSentence: { type: Type.STRING }
          },
          required: ["profileSummary", "motivations", "approachTips", "openingSentence"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw new Error("Nem sikerült az elemzés. Kérlek próbáld újra később.");
  }
};
