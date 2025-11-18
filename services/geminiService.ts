
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FormData, GeneratedPersona } from '../types';

const apiKey = process.env.API_KEY;

export const generatePersona = async (data: FormData): Promise<GeneratedPersona> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Instrução de Sistema aprimorada para incorporar a mentalidade de estrategista de marketing
  const systemInstruction = `
    Você é um Arquiteto de Personas e Estrategista de Marketing Sênior. 
    Sua missão não é apenas preencher dados, mas criar um perfil psicológico e comportamental profundo que sirva como base para estratégias de Vendas e Marketing de Conteúdo.
    
    Ao criar a persona, você deve seguir estritamente esta Lógica de Inferência de Marketing:
    1. **Cargo & Tamanho da Empresa** -> Use para inferir o Poder de Compra (Budget) e o Nível de Autoridade nas decisões.
    2. **Meta da Empresa vs Meta Pessoal** -> Diferencie claramente o que o chefe cobra (KPIs, Lucro) do que a pessoa quer para a carreira dela (Promoção, Reconhecimento, Menos Stress).
    3. **Nível de Conhecimento** -> Use para definir a sofisticação da linguagem (Topo, Meio ou Fundo de Funil).
    4. **Metas & Dores** -> Estes são os gatilhos emocionais. A "Dor" deve ser traduzida em "Necessidade de Alívio" na copy.
    5. **Processo de Decisão (ROI)** -> Use para definir como a solução deve ser "vendida" racionalmente.

    Use Português do Brasil (pt-BR). Seja específico, evite generalidades (como "querer crescer"). Use termos do mundo real da indústria citada.
  `;

  const prompt = `
    Gere um Mapa de Persona Acionável com base nas respostas estratégicas abaixo.

    === CONTEXTO DA SOLUÇÃO OFERECIDA ===
    Produto/Serviço: ${data.productDescription}

    === ETAPA 1: DADOS DEMOGRÁFICOS & EMPRESA (Poder & Autoridade) ===
    - Cargo: ${data.role}
    - Indústria: ${data.industry}
    - Tamanho da Empresa: ${data.companySize}
    - Nível de Conhecimento sobre a solução: ${data.knowledgeLevel} (Isso define a complexidade do conteúdo ideal).

    === ETAPA 2: METAS & MOTIVAÇÕES (O Motor da Decisão) ===
    - Meta de Negócio (O que a empresa cobra/KPIs): ${data.businessGoal}
    - Meta Pessoal/Carreira (O que ele(a) ganha pessoalmente): ${data.careerGoal}
    - Maior Obstáculo/Dor: ${data.biggestChallenge}
    - Frustrações do Dia a Dia: ${data.dailyFrustrations}

    === ETAPA 3: CONSUMO & INFLUÊNCIA (Onde Investir Esforços) ===
    - Canais de Informação: ${data.contentChannels.join(', ')}
    - Tópicos/Influenciadores que acompanha: ${data.influencersOrTopics}

    === ETAPA 4: PROCESSO DE DECISÃO (Quebra de Barreiras) ===
    - Objeções de Compra (O que impede o "Sim"): ${data.mainObjections}
    - Definição de Sucesso/ROI (Como ele mede valor): ${data.successMetrics}

    === INSTRUÇÕES DE SAÍDA ===
    Gere um objeto JSON preenchendo os campos abaixo. 
    - No campo 'goals', liste tanto os objetivos da empresa quanto os pessoais, mas deixe claro pelo contexto.
    - No campo 'solutionMapping', crie uma "ponte" lógica entre a Dor do cliente e a Solução descrita.
    - No campo 'quote', escreva algo que essa pessoa diria em um momento de frustração ou desejo intenso, usando a linguagem da indústria dela.
    - No campo 'commonObjections', refine as objeções fornecidas para soarem como dúvidas reais de um comprador.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Um nome fictício adequado à senioridade e região." },
      jobTitle: { type: Type.STRING, description: "O cargo exato e realista." },
      profileSummary: { type: Type.STRING, description: "Resumo narrativo focando em comportamento e estilo de trabalho (máx 40 palavras)." },
      demographics: {
        type: Type.OBJECT,
        properties: {
          ageRange: { type: Type.STRING, description: "Faixa etária provável baseada no cargo." },
          location: { type: Type.STRING, description: "Localização típica para esta indústria." },
          education: { type: Type.STRING, description: "Formação acadêmica provável." },
          industry: { type: Type.STRING, description: "Setor de atuação." },
        },
        required: ["ageRange", "location", "education", "industry"]
      },
      goals: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 a 5 objetivos estratégicos (mistura de KPIs de negócio e aspirações de carreira)."
      },
      painPoints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 a 5 dores agudas que impedem o sucesso."
      },
      quote: { type: Type.STRING, description: "Uma citação em primeira pessoa encapsulando a mentalidade/dor principal." },
      solutionMapping: { type: Type.STRING, description: "Argumento de venda conectando a dor à solução (Pitch)." },
      preferredChannels: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Canais específicos onde a persona consome conteúdo técnico/profissional."
      },
      commonObjections: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Dúvidas, medos ou barreiras racionais para a compra."
      },
    },
    required: ["name", "jobTitle", "profileSummary", "demographics", "goals", "painPoints", "quote", "solutionMapping", "preferredChannels", "commonObjections"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.6, // Ligeiramente mais baixo para garantir consistência estratégica
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedPersona;
    } else {
      throw new Error("Resposta vazia da IA.");
    }
  } catch (error) {
    console.error("Erro ao gerar persona:", error);
    throw error;
  }
};
