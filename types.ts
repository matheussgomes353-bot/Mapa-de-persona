
export interface FormData {
  // Step 1: Demographics & Company (Power & Authority)
  role: string;
  companySize: string;
  knowledgeLevel: string; // Beginner, Intermediate, Advanced
  industry: string;

  // Step 2: Goals & Challenges (Decision Motor)
  businessGoal: string; // KPI / Company Goal
  careerGoal: string;   // Personal / Promotion Goal
  biggestChallenge: string;
  dailyFrustrations: string;

  // Step 3: Content & Objections (Where to invest)
  contentChannels: string[]; // Array of selected channels
  influencersOrTopics: string;
  
  // Step 4: Decision Process & Aspirations (Closing the deal)
  mainObjections: string;
  successMetrics: string; // How they measure ROI
  productDescription: string; // Context for the AI
}

export interface GeneratedPersona {
  name: string;
  jobTitle: string;
  profileSummary: string;
  demographics: {
    ageRange: string;
    location: string;
    education: string;
    industry: string;
  };
  goals: string[];
  painPoints: string[];
  quote: string;
  solutionMapping: string; // How our solution helps (The "Bridge")
  preferredChannels: string[];
  commonObjections: string[];
}

export type Step = 'demographics' | 'goals' | 'content' | 'decision';

export const STEPS: { id: Step; label: string; description: string }[] = [
  { id: 'demographics', label: 'Demografia', description: 'Perfil e Empresa' },
  { id: 'goals', label: 'Metas', description: 'Negócio vs Pessoal' },
  { id: 'content', label: 'Consumo', description: 'Canais e Interesses' },
  { id: 'decision', label: 'Decisão', description: 'Objeções e Sucesso' },
];

export const CONTENT_CHANNELS_OPTIONS = [
  "LinkedIn", "Instagram", "Blogs Especializados", "YouTube", 
  "Podcasts", "Newsletters", "Eventos/Conferências", "Twitter/X", 
  "Google Search", "Grupos de WhatsApp/Slack"
];
