
export enum AgeRange {
  A20_25 = '20-25 év',
  A25_30 = '25-30 év',
  A30_35 = '30-35 év',
  A35_40 = '35-40 év',
  A40_PLUS = '40+ év'
}

export enum MaritalStatus {
  SINGLE = 'Egyedülálló',
  MARRIED = 'Házas/Kapcsolatban',
  OTHER = 'Egyéb'
}

export enum Motivation {
  MONEY = 'Pénz / Anyagi függetlenség',
  FREEDOM = 'Szabadság / Idő',
  PRODUCT = 'Termék / Egészség',
  COMMUNITY = 'Közösség / Elismerés'
}

export enum TimeFrame {
  T0_5 = 'Heti 0-5 óra',
  T5_10 = 'Heti 5-10 óra',
  T10_PLUS = 'Heti 10+ óra'
}

export enum DiscType {
  D = 'Domináns (D) - Eredményorientált, határozott',
  I = 'Befolyásoló (I) - Közvetlen, lelkes',
  S = 'Stabil (S) - Együttműködő, türelmes',
  C = 'Szabálykövető (C) - Pontos, elemző'
}

export interface CandidateData {
  age: AgeRange;
  hasChildren: boolean;
  maritalStatus: MaritalStatus;
  occupation: string;
  residence: string;
  traits: string[];
  motivation: Motivation;
  timeAvailability: TimeFrame;
  salesExperience: boolean;
  discType: string;
  notes: string;
}

export interface AnalysisResult {
  profileSummary: string;
  motivations: string[];
  approachTips: string[];
  openingSentence: string;
}
