
import { Symptom } from "@/types/diagnostic";

// Expanded mapping of expressions in natural language to system symptoms
const symptomKeywords: Record<string, string[]> = {
  'fever': ['febre', 'febril', 'temperatura alta', 'quente', 'calor', 'corpo quente', 'temperatura elevada', 'hipertermia'],
  'cough': ['tosse', 'tossindo', 'tosse seca', 'tosse com catarro', 'expectoração', 'pigarrear', 'escarrar'],
  'headache': ['dor de cabeça', 'cefaléia', 'cabeça doendo', 'dor na cabeça', 'enxaqueca', 'cefaleia', 'dor frontal', 'dor occipital'],
  'chest_pain': ['dor no peito', 'peito doendo', 'dor torácica', 'aperto no peito', 'pressão no peito', 'desconforto torácico', 'angina'],
  'nausea': ['náusea', 'enjoo', 'vontade de vomitar', 'enjôo', 'estômago embrulhado', 'mal-estar gástrico', 'ânsia', 'estômago revirado'],
  'vomiting': ['vômito', 'vomitando', 'botando pra fora', 'vomitei', 'regurgitar', 'êmese', 'vomitado'],
  'breathing_difficulty': ['dificuldade para respirar', 'falta de ar', 'respiração difícil', 'não consigo respirar', 'sufocado', 'dispneia', 'sufocamento', 'respirando com dificuldade', 'ofegante'],
  'fatigue': ['cansaço', 'fadiga', 'sem energia', 'fraqueza', 'exausto', 'cansado', 'estafa', 'esgotado', 'indisposição', 'sem forças'],
  'muscle_pain': ['dor muscular', 'mialgia', 'músculos doloridos', 'corpo doendo', 'dores musculares', 'dor nos músculos', 'dor corporal'],
  'sore_throat': ['dor de garganta', 'garganta inflamada', 'garganta doendo', 'garganta irritada', 'faringite', 'odinofagia', 'dor ao engolir'],
  'runny_nose': ['coriza', 'nariz escorrendo', 'nariz entupido', 'rinorreia', 'secreção nasal', 'nariz congestionado', 'congestão nasal'],
  'diarrhea': ['diarreia', 'fezes líquidas', 'intestino solto', 'evacuações frequentes', 'disenteria', 'diarreia aquosa', 'fezes moles'],
  'rash': ['manchas na pele', 'erupção cutânea', 'manchas vermelhas', 'alergia na pele', 'pele com manchas', 'urticária', 'vermelhidão na pele', 'exantema'],
  'joint_pain': ['dor nas articulações', 'artralgia', 'juntas doloridas', 'dor nos joelhos', 'dor no tornozelo', 'artrite', 'dor articular', 'dor nas juntas'],
  'abdominal_pain': ['dor abdominal', 'dor de barriga', 'barriga doendo', 'dor no abdômen', 'cólica', 'dor estomacal', 'dor na barriga'],
  'weight_loss': ['perda de peso', 'emagrecimento', 'perdendo peso', 'emagreci', 'redução de peso', 'peso diminuindo', 'emagrecendo'],
  'night_sweats': ['suores noturnos', 'suando de noite', 'acordando suado', 'transpiração noturna', 'suor durante a noite', 'lençol molhado de suor'],
  'itching': ['coceira', 'prurido', 'coçando', 'pele coçando', 'comichão', 'irritação na pele', 'urticária', 'formigamento'],
  'urinary_pain': ['dor ao urinar', 'ardência ao urinar', 'disúria', 'ardor ao fazer xixi', 'queimação ao urinar', 'dor na bexiga', 'desconforto urinário'],
  'blood_urine': ['sangue na urina', 'urina com sangue', 'hematúria', 'micção sanguinolenta', 'urina avermelhada']
};

// Extended intensity and duration patterns
const intensityPatterns: Record<string, string[]> = {
  'high': ['muito', 'forte', 'intensa', 'grave', 'severa', 'insuportável', 'extrema'],
  'medium': ['moderada', 'considerável', 'significativa', 'razoável'],
  'low': ['leve', 'fraca', 'suave', 'pequena', 'pouca', 'ligeira']
};

const durationPatterns: Record<string, string[]> = {
  'long': ['dias', 'semanas', 'meses', 'crônica', 'persistente', 'constante', 'contínua'],
  'medium': ['algumas horas', 'desde ontem', 'desde anteontem', 'recente', 'há pouco tempo'],
  'recent': ['agora', 'acabou de', 'começou', 'recém', 'súbito', 'repentino']
};

// Improved symptom extraction with context awareness
export const extractSymptomsFromText = (text: string): {
  symptoms: string[],
  intensity: 'high' | 'medium' | 'low' | null,
  duration: 'long' | 'medium' | 'recent' | null
} => {
  const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const extractedSymptoms: string[] = [];
  
  // Extract symptoms
  Object.entries(symptomKeywords).forEach(([symptomId, keywords]) => {
    if (keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedText.includes(normalizedKeyword);
    })) {
      extractedSymptoms.push(symptomId);
    }
  });

  // Determine intensity
  let intensity: 'high' | 'medium' | 'low' | null = null;
  for (const [level, patterns] of Object.entries(intensityPatterns)) {
    if (patterns.some(pattern => normalizedText.includes(pattern.toLowerCase()))) {
      intensity = level as 'high' | 'medium' | 'low';
      break;
    }
  }

  // Determine duration
  let duration: 'long' | 'medium' | 'recent' | null = null;
  for (const [timeframe, patterns] of Object.entries(durationPatterns)) {
    if (patterns.some(pattern => normalizedText.includes(pattern.toLowerCase()))) {
      duration = timeframe as 'long' | 'medium' | 'recent';
      break;
    }
  }

  return { symptoms: extractedSymptoms, intensity, duration };
};

// Generate a more detailed natural response based on extracted symptom context
export const generateNaturalResponse = (
  extractionResult: { symptoms: string[], intensity: string | null, duration: string | null },
  allSymptoms: Symptom[]
): string => {
  const { symptoms: extractedSymptoms, intensity, duration } = extractionResult;
  
  if (extractedSymptoms.length === 0) {
    return "Não consegui identificar sintomas específicos na sua descrição. Poderia descrever com mais detalhes o que está sentindo? Por exemplo: 'Estou com dor de cabeça e febre desde ontem'.";
  }
  
  const symptomNames = extractedSymptoms.map(id => {
    const symptom = allSymptoms.find(s => s.id === id);
    return symptom ? symptom.name.toLowerCase() : id;
  });
  
  let response = `Identifiquei os seguintes sintomas: ${symptomNames.join(', ')}. `;
  
  // Add context based on intensity and duration
  if (intensity) {
    response += intensityContext(intensity);
  }
  
  if (duration) {
    response += durationContext(duration);
  }
  
  response += '\nVou analisar esses sintomas para sugerir um possível diagnóstico.';
  
  return response;
};

// Helper functions for context-specific responses
const intensityContext = (intensity: string): string => {
  switch(intensity) {
    case 'high':
      return 'Seus sintomas parecem ser intensos, o que pode indicar uma condição que requer atenção. ';
    case 'medium':
      return 'A intensidade moderada dos sintomas sugere uma condição que deve ser monitorada. ';
    case 'low':
      return 'Os sintomas descritos parecem leves, mas ainda assim merecem atenção. ';
    default:
      return '';
  }
};

const durationContext = (duration: string): string => {
  switch(duration) {
    case 'long':
      return 'A persistência desses sintomas por um período prolongado pode indicar uma condição crônica. ';
    case 'medium':
      return 'O surgimento recente desses sintomas pode indicar uma condição aguda. ';
    case 'recent':
      return 'O início súbito desses sintomas sugere uma condição que requer monitoramento próximo. ';
    default:
      return '';
  }
};
