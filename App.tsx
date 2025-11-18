import React, { useState } from 'react';
import { FormData, STEPS, GeneratedPersona } from './types';
import StepWizard from './components/StepWizard';
import PersonaCard from './components/PersonaCard';
import { generatePersona } from './services/geminiService';
import { Users, Target, BarChart, CheckCircle2 } from 'lucide-react';

const INITIAL_DATA: FormData = {
  role: '',
  companySize: '',
  knowledgeLevel: '',
  industry: '',
  businessGoal: '', // KPI / Company Goal
  careerGoal: '',   // Personal / Promotion Goal
  biggestChallenge: '',
  dailyFrustrations: '',
  contentChannels: [],
  influencersOrTopics: '',
  mainObjections: '',
  successMetrics: '',
  productDescription: '',
};

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [generatedPersona, setGeneratedPersona] = useState<GeneratedPersona | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleGenerate = async () => {
    if (!formData.role || !formData.productDescription) {
        // Simple validation check
        setError("Por favor, preencha os campos obrigatórios (Cargo e Descrição do Produto) antes de gerar.");
        return;
    }
    
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generatePersona(formData);
      setGeneratedPersona(result);
    } catch (err: any) {
      setError("Ocorreu um erro ao gerar a persona. Verifique sua conexão e tente novamente. Detalhes: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedPersona(null);
    setCurrentStepIndex(0);
    setFormData(INITIAL_DATA);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              PersonaAI Architect
            </span>
          </div>
          <div className="hidden md:flex text-sm text-slate-500 font-medium">
             Powered by Gemini 2.5
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:max-w-full print:p-0">
        
        {/* Intro Text - Hide on print */}
        {!generatedPersona && (
            <div className="mb-10 text-center max-w-2xl mx-auto print:hidden">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Descubra quem é o seu <br/>
                    <span className="text-indigo-600">Cliente Ideal</span>
                </h1>
                <p className="text-lg text-slate-600">
                    Responda a algumas perguntas estratégicas e nossa IA criará um mapa de persona completo e acionável para suas campanhas de marketing.
                </p>
            </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 print:hidden">
             <span className="font-bold mr-2">Erro:</span> {error}
          </div>
        )}

        {!generatedPersona ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8 print:hidden">
              <div className="flex justify-between items-center relative">
                {/* Connector Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />
                
                {STEPS.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center bg-slate-50 px-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isCurrent
                            ? 'bg-white border-indigo-600 text-indigo-600 shadow-lg scale-110'
                            : 'bg-white border-slate-300 text-slate-300'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span>{index + 1}</span>}
                      </div>
                      <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Wizard */}
            <StepWizard
              currentStepIndex={currentStepIndex}
              formData={formData}
              onUpdate={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </>
        ) : (
          /* Result */
          <PersonaCard persona={generatedPersona} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;