import React, { useState } from 'react';
import { GeneratedPersona } from '../types';
import { MapPin, Briefcase, GraduationCap, Target, AlertCircle, MessageSquare, ThumbsUp, ShieldAlert, Download, RotateCcw, Loader2 } from 'lucide-react';

interface PersonaCardProps {
  persona: GeneratedPersona;
  onReset: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onReset }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Generate a deterministic avatar URL based on the name
  const avatarUrl = `https://i.pravatar.cc/300?u=${encodeURIComponent(persona.name)}`;

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Select the element specifically intended for the PDF
    const element = document.getElementById('persona-content');
    
    // Config options for html2pdf
    const opt = {
      margin: [10, 10, 10, 10], // mm
      filename: `Persona_${persona.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // Improve resolution
        useCORS: true, // CRITICAL for loading the external avatar image
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Check if html2pdf is loaded (from index.html script)
    if ((window as any).html2pdf) {
      (window as any).html2pdf().set(opt).from(element).save()
        .then(() => {
          setIsDownloading(false);
        })
        .catch((err: any) => {
          console.error("PDF Generation Error:", err);
          setIsDownloading(false);
          alert("Houve um erro ao gerar o arquivo. Tente novamente ou use a opção de imprimir do navegador (Ctrl+P).");
        });
    } else {
      // Fallback if library fails to load
      window.print();
      setIsDownloading(false);
    }
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-3xl font-bold text-slate-800">Mapa de Persona Gerado</h2>
        <div className="flex space-x-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium transition ${isDownloading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}
          </button>
          <button 
            onClick={onReset}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition px-4 py-2"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Criar Nova
          </button>
        </div>
      </div>

      {/* ID added for html2pdf to target just this card */}
      <div id="persona-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:border print:border-slate-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white print:bg-none print:bg-white print:text-slate-900 print:border-b print:border-slate-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* UseCORS in html2canvas is needed for this image */}
            <img 
              src={avatarUrl} 
              alt={persona.name} 
              crossOrigin="anonymous"
              className="w-32 h-32 rounded-full border-4 border-white/30 shadow-lg object-cover print:border-slate-200"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2 text-white print:text-slate-900">{persona.name}</h1>
              <p className="text-xl text-indigo-100 font-medium mb-4 print:text-slate-600">{persona.jobTitle}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm opacity-90 print:text-slate-600 print:opacity-100">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {persona.demographics.location}</span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {persona.demographics.industry}</span>
                <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-1" /> {persona.demographics.education}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-white print:text-slate-700 print:bg-slate-100 print:border">{persona.demographics.ageRange}</span>
              </div>
            </div>
            <div className="hidden md:block w-px bg-white/20 self-stretch mx-4 print:hidden"></div>
            <div className="md:w-1/3 italic text-indigo-100 text-center md:text-right relative print:text-slate-600 print:w-full print:mt-4 print:text-left">
              <span className="text-6xl absolute -top-4 -left-4 opacity-20 print:text-slate-400">"</span>
              {persona.quote}
              <span className="text-6xl absolute -bottom-8 -right-2 opacity-20 print:text-slate-400">"</span>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 print:block print:space-y-6">
          {/* Column 1: Profile & Motivation */}
          <div className="space-y-8 print:break-inside-avoid">
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center">
                <span className="bg-indigo-100 p-2 rounded mr-3 text-indigo-600 print:border print:border-slate-200"><ThumbsUp className="w-5 h-5" /></span>
                Bio & Perfil
              </h3>
              <p className="text-slate-600 leading-relaxed">{persona.profileSummary}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center">
                <span className="bg-green-100 p-2 rounded mr-3 text-green-600 print:border print:border-slate-200"><Target className="w-5 h-5" /></span>
                Objetivos Principais
              </h3>
              <ul className="space-y-2">
                {persona.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <span className="mr-2 text-green-500 font-bold">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Pain & Objections */}
          <div className="space-y-8 print:break-inside-avoid">
             <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center">
                <span className="bg-red-100 p-2 rounded mr-3 text-red-600 print:border print:border-slate-200"><AlertCircle className="w-5 h-5" /></span>
                Dores & Frustrações
              </h3>
              <ul className="space-y-2">
                {persona.painPoints.map((pain, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <span className="mr-2 text-red-500 font-bold">•</span>
                    {pain}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center">
                <span className="bg-orange-100 p-2 rounded mr-3 text-orange-600 print:border print:border-slate-200"><ShieldAlert className="w-5 h-5" /></span>
                Objeções Comuns
              </h3>
              <ul className="space-y-2">
                {persona.commonObjections.map((obj, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <span className="mr-2 text-orange-500 font-bold">•</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Strategy & Channels */}
          <div className="space-y-8 print:break-inside-avoid">
             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 print:bg-white print:border-slate-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center print:text-slate-800">
                Como Nossa Solução Ajuda
              </h3>
              <p className="text-indigo-800 text-sm leading-relaxed print:text-slate-600">
                {persona.solutionMapping}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center">
                <span className="bg-blue-100 p-2 rounded mr-3 text-blue-600 print:border print:border-slate-200"><MessageSquare className="w-5 h-5" /></span>
                Canais de Consumo
              </h3>
              <div className="flex flex-wrap gap-2">
                {persona.preferredChannels.map((channel, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-medium border border-slate-200 print:border-slate-300">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;