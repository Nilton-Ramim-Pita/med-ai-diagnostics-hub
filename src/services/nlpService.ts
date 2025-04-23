
import { Symptom } from "@/types/diagnostic";

// Mapeamento de expressões em linguagem natural para sintomas do sistema
const symptomKeywords: Record<string, string[]> = {
  'fever': ['febre', 'febril', 'temperatura alta', 'quente', 'calor'],
  'cough': ['tosse', 'tossindo', 'tosse seca', 'tosse com catarro'],
  'headache': ['dor de cabeça', 'cefaléia', 'cabeça doendo', 'dor na cabeça', 'enxaqueca'],
  'chest_pain': ['dor no peito', 'peito doendo', 'dor torácica', 'aperto no peito'],
  'nausea': ['náusea', 'enjoo', 'vontade de vomitar', 'enjôo', 'estômago embrulhado'],
  'vomiting': ['vômito', 'vomitando', 'botando pra fora', 'vomitei'],
  'breathing_difficulty': ['dificuldade para respirar', 'falta de ar', 'respiração difícil', 'não consigo respirar', 'sufocado'],
  'fatigue': ['cansaço', 'fadiga', 'sem energia', 'fraqueza', 'exausto', 'cansado'],
  'muscle_pain': ['dor muscular', 'mialgia', 'músculos doloridos', 'corpo doendo'],
  'sore_throat': ['dor de garganta', 'garganta inflamada', 'garganta doendo', 'garganta irritada'],
  'runny_nose': ['coriza', 'nariz escorrendo', 'nariz entupido', 'rinorreia', 'secreção nasal'],
  'diarrhea': ['diarreia', 'fezes líquidas', 'intestino solto', 'evacuações frequentes'],
  'rash': ['manchas na pele', 'erupção cutânea', 'manchas vermelhas', 'alergia na pele', 'pele com manchas'],
  'joint_pain': ['dor nas articulações', 'artralgia', 'juntas doloridas', 'dor nos joelhos', 'dor no tornozelo'],
  'abdominal_pain': ['dor abdominal', 'dor de barriga', 'barriga doendo', 'dor no abdômen'],
  'weight_loss': ['perda de peso', 'emagrecimento', 'perdendo peso', 'emagreci'],
  'night_sweats': ['suores noturnos', 'suando de noite', 'acordando suado'],
  'itching': ['coceira', 'prurido', 'coçando', 'pele coçando', 'comichão'],
  'urinary_pain': ['dor ao urinar', 'ardência ao urinar', 'disúria', 'ardor ao fazer xixi'],
  'blood_urine': ['sangue na urina', 'urina com sangue', 'hematúria']
};

// Extrai sintomas do texto natural
export const extractSymptomsFromText = (text: string): string[] => {
  const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const extractedSymptoms: string[] = [];

  Object.entries(symptomKeywords).forEach(([symptomId, keywords]) => {
    if (keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedText.includes(normalizedKeyword);
    })) {
      extractedSymptoms.push(symptomId);
    }
  });

  return extractedSymptoms;
};

// Gera uma resposta natural baseada nos sintomas extraídos
export const generateNaturalResponse = (extractedSymptoms: string[], allSymptoms: Symptom[]): string => {
  if (extractedSymptoms.length === 0) {
    return "Não consegui identificar sintomas específicos na sua descrição. Poderia descrever com mais detalhes o que está sentindo?";
  }
  
  const symptomNames = extractedSymptoms.map(id => {
    const symptom = allSymptoms.find(s => s.id === id);
    return symptom ? symptom.name.toLowerCase() : id;
  });
  
  return `Identifiquei os seguintes sintomas: ${symptomNames.join(', ')}. 
  Vou analisar esses sintomas para sugerir um possível diagnóstico.`;
};
