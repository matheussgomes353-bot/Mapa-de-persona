import React from 'react';
import { FormData, Step, CONTENT_CHANNELS_OPTIONS } from '../types';
import { Check, ChevronRight, ChevronLeft, Sparkles, HelpCircle } from 'lucide-react';

interface StepWizardProps {
  currentStepIndex: number;
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const StepWizard: React.FC<StepWizardProps> = ({
  currentStepIndex,
  formData,
  onUpdate,
  onNext,
  onBack,
  onGenerate,
  isGenerating,
}) => {
  
  const handleInputChange = (field: keyof FormData, value: string) => {
    onUpdate({ [field]: value });
  };

  const toggleChannel = (channel: string) => {
    const current = formData.contentChannels;
    const updated = current.includes(channel)
      ? current.filter(c => c !== channel)
      : [...current, channel];
    onUpdate({ contentChannels: updated });
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Demografia & Profissional</h2>
        <p className="text-slate-500">Define o poder de compra e o nível de autoridade nas decisões.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Cargo / Função</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            placeholder="Ex: Gerente de Marketing, CTO, Analista Financeiro"
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Indústria / Setor</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            placeholder="Ex: SaaS, Varejo, Saúde, Agronegócio"
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Tamanho da Empresa</label>
          <select
            value={formData.companySize}
            onChange={(e) => handleInputChange('companySize', e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900"
          >
            <option value="">Selecione...</option>
            <option value="1-10 (Micro) - Baixa burocracia">1-10 (Micro)</option>
            <option value="11-50 (Pequena) - Decisão ágil">11-50 (Pequena)</option>
            <option value="51-200 (Média) - Múltiplos decisores">51-200 (Média)</option>
            <option value="201-1000 (Grande) - Processo complexo">201-1000 (Grande)</option>
            <option value="1000+ (Corporativo) - Alta burocracia">1000+ (Corporativo)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Nível de Conhecimento
            <span className="text-xs font-normal text-slate-400 ml-2">(Define a complexidade do conteúdo)</span>
          </label>
          <select
            value={formData.knowledgeLevel}
            onChange={(e) => handleInputChange('knowledgeLevel', e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900"
          >
            <option value="">Selecione o nível...</option>
            <option value="Iniciante - Precisa de educação (Topo de Funil)">Iniciante (Topo de Funil)</option>
            <option value="Intermediário - Compara soluções (Meio de Funil)">Intermediário (Meio de Funil)</option>
            <option value="Avançado - Foca em specs/técnica (Fundo de Funil)">Avançado (Fundo de Funil)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Metas da Empresa vs. Metas Pessoais</h2>
        <p className="text-slate-500">Precisamos diferenciar o que o "CNPJ precisa" do que o "CPF deseja".</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-100 px-2 py-1 rounded-bl-lg text-xs font-bold text-blue-700 uppercase">Foco na Empresa</div>
          <label className="block text-sm font-bold text-blue-900 mb-1">
            Meta de Negócio / KPI da Empresa
          </label>
          <p className="text-xs text-blue-700 mb-3 opacity-80">
            O que o <strong>chefe</strong> ou a <strong>diretoria</strong> cobra dele? Pense em números, receita, prazos e eficiência.
          </p>
          <input
            type="text"
            value={formData.businessGoal}
            onChange={(e) => handleInputChange('businessGoal', e.target.value)}
            placeholder="Ex: Aumentar o faturamento em 20%; Reduzir custos em 15%; Lançar o produto X."
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
          />
        </div>

        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-100 px-2 py-1 rounded-bl-lg text-xs font-bold text-purple-700 uppercase">Foco na Pessoa</div>
          <label className="block text-sm font-bold text-purple-900 mb-1">
            Objetivo Pessoal / Sonho de Carreira
          </label>
          <p className="text-xs text-purple-700 mb-3 opacity-80">
            Se tudo der certo, o que <strong>ele(a) ganha</strong>? Promoção? Reconhecimento? Mais tempo livre?
          </p>
          <input
            type="text"
            value={formData.careerGoal}
            onChange={(e) => handleInputChange('careerGoal', e.target.value)}
            placeholder="Ex: Ser promovido a Diretor; Ser visto como inovador; Sair do escritório às 18h."
            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Maior Desafio / Obstáculo Atual
        </label>
        <p className="text-xs text-slate-500 mb-2">O que está impedindo o sucesso AGORA?</p>
        <input
          type="text"
          value={formData.biggestChallenge}
          onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
          placeholder="Ex: Orçamento limitado; Equipe desqualificada; Ferramentas que não conversam."
          className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Frustrações do Dia a Dia (Rotina)
        </label>
        <textarea
          value={formData.dailyFrustrations}
          onChange={(e) => handleInputChange('dailyFrustrations', e.target.value)}
          placeholder="Ex: Perder 2 horas por dia em planilhas; Reuniões improdutivas; Chefe cobrando a mesma coisa..."
          rows={2}
          className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none text-slate-900 placeholder-slate-500"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Consumo de Conteúdo</h2>
        <p className="text-slate-500">Define os canais onde devemos investir tempo e recursos.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Onde ele busca informações?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CONTENT_CHANNELS_OPTIONS.map((channel) => (
            <button
              key={channel}
              onClick={() => toggleChannel(channel)}
              className={`p-3 text-sm rounded-lg border transition flex items-center justify-between text-left ${
                formData.contentChannels.includes(channel)
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-medium'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
              }`}
            >
              {channel}
              {formData.contentChannels.includes(channel) && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Interesses e Influenciadores</label>
        <p className="text-xs text-slate-500 mb-2">Quais assuntos ou autores ele acompanha regularmente?</p>
        <input
          type="text"
          value={formData.influencersOrTopics}
          onChange={(e) => handleInputChange('influencersOrTopics', e.target.value)}
          placeholder="Ex: Marketing de Conteúdo, Inteligência Artificial, Neil Patel, Seth Godin"
          className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Processo de Decisão</h2>
        <p className="text-slate-500">Informações cruciais para quebrar barreiras e fechar vendas.</p>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <label className="block text-sm font-bold text-indigo-900 mb-2">
          Qual produto/serviço você oferece?
        </label>
        <p className="text-xs text-indigo-700 mb-2">Contexto essencial para a IA entender como ajudar.</p>
        <textarea
          value={formData.productDescription}
          onChange={(e) => handleInputChange('productDescription', e.target.value)}
          placeholder="Descreva o que você vende. Ex: Um software de CRM focado em pequenas empresas que automatiza o follow-up de vendas."
          rows={3}
          className="w-full p-3 border border-indigo-200 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none text-slate-900 placeholder-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Principais Objeções de Compra
        </label>
        <p className="text-xs text-slate-500 mb-2">Quais as dúvidas que travam o fechamento? (Fundo de Funil)</p>
        <input
          type="text"
          value={formData.mainObjections}
          onChange={(e) => handleInputChange('mainObjections', e.target.value)}
          placeholder="Ex: Preço muito alto, medo de migração de dados difícil"
          className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Como ele mede Sucesso / ROI?
        </label>
        <p className="text-xs text-slate-500 mb-2">Que métrica prova que valeu a pena comprar?</p>
        <input
          type="text"
          value={formData.successMetrics}
          onChange={(e) => handleInputChange('successMetrics', e.target.value)}
          placeholder="Ex: Redução de custos operacionais em 15%, Economia de 10h semanais"
          className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-slate-900 placeholder-slate-500"
        />
      </div>
    </div>
  );

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[640px]">
      <div className="p-8 flex-grow">
        {steps[currentStepIndex]()}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center sticky bottom-0">
        <button
          onClick={onBack}
          disabled={currentStepIndex === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
            currentStepIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar
        </button>

        {currentStepIndex < 3 ? (
          <button
            onClick={onNext}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-200 transform active:scale-95"
          >
            Próximo
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className={`flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-200 transform active:scale-95 ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Gerando Inteligência...
              </>
            ) : (
              <>
                Gerar Persona com IA
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepWizard;