
import { Symptom } from "@/types/diagnostic";

// Expanded mapping of expressions in natural language to system symptoms
const symptomKeywords: Record<string, string[]> = {
  'fever': ['febre', 'febril', 'temperatura alta', 'quente', 'calor', 'corpo quente', 'temperatura elevada', 'hipertermia', 'febre alta', 'estado febril'],
  'cough': ['tosse', 'tossindo', 'tosse seca', 'tosse com catarro', 'expectoração', 'pigarrear', 'escarrar', 'tosse persistente', 'tosse crônica', 'tosse noturna'],
  'headache': ['dor de cabeça', 'cefaléia', 'cabeça doendo', 'dor na cabeça', 'enxaqueca', 'cefaleia', 'dor frontal', 'dor occipital', 'dor na testa', 'dor latejante na cabeça'],
  'chest_pain': ['dor no peito', 'peito doendo', 'dor torácica', 'aperto no peito', 'pressão no peito', 'desconforto torácico', 'angina', 'dor precordial', 'sensação de peso no peito'],
  'nausea': ['náusea', 'enjoo', 'vontade de vomitar', 'enjôo', 'estômago embrulhado', 'mal-estar gástrico', 'ânsia', 'estômago revirado', 'sensação de enjoo', 'náuseas constantes'],
  'vomiting': ['vômito', 'vomitando', 'botando pra fora', 'vomitei', 'regurgitar', 'êmese', 'vomitado', 'vomitando muito', 'enjoo com vômito'],
  'breathing_difficulty': ['dificuldade para respirar', 'falta de ar', 'respiração difícil', 'não consigo respirar', 'sufocado', 'dispneia', 'sufocamento', 'respirando com dificuldade', 'ofegante', 'respiração curta', 'respiração ofegante'],
  'fatigue': ['cansaço', 'fadiga', 'sem energia', 'fraqueza', 'exausto', 'cansado', 'estafa', 'esgotado', 'indisposição', 'sem forças', 'fadiga crônica', 'cansaço extremo'],
  'muscle_pain': ['dor muscular', 'mialgia', 'músculos doloridos', 'corpo doendo', 'dores musculares', 'dor nos músculos', 'dor corporal', 'músculos doendo', 'dores no corpo todo'],
  'sore_throat': ['dor de garganta', 'garganta inflamada', 'garganta doendo', 'garganta irritada', 'faringite', 'odinofagia', 'dor ao engolir', 'garganta infeccionada', 'ardência na garganta'],
  'runny_nose': ['coriza', 'nariz escorrendo', 'nariz entupido', 'rinorreia', 'secreção nasal', 'nariz congestionado', 'congestão nasal', 'rinite', 'nariz entupido ou escorrendo'],
  'diarrhea': ['diarreia', 'fezes líquidas', 'intestino solto', 'evacuações frequentes', 'disenteria', 'diarreia aquosa', 'fezes moles', 'desinteria', 'diarreia intensa'],
  'rash': ['manchas na pele', 'erupção cutânea', 'manchas vermelhas', 'alergia na pele', 'pele com manchas', 'urticária', 'vermelhidão na pele', 'exantema', 'manchas que coçam', 'pele irritada com manchas'],
  'joint_pain': ['dor nas articulações', 'artralgia', 'juntas doloridas', 'dor nos joelhos', 'dor no tornozelo', 'artrite', 'dor articular', 'dor nas juntas', 'articulações inchadas', 'dor e inchaço nas juntas'],
  'abdominal_pain': ['dor abdominal', 'dor de barriga', 'barriga doendo', 'dor no abdômen', 'cólica', 'dor estomacal', 'dor na barriga', 'dor no baixo ventre', 'cólicas abdominais'],
  'weight_loss': ['perda de peso', 'emagrecimento', 'perdendo peso', 'emagreci', 'redução de peso', 'peso diminuindo', 'emagrecendo', 'perda de peso sem motivo', 'emagrecimento rápido'],
  'night_sweats': ['suores noturnos', 'suando de noite', 'acordando suado', 'transpiração noturna', 'suor durante a noite', 'lençol molhado de suor', 'sudorese noturna', 'suor excessivo à noite'],
  'itching': ['coceira', 'prurido', 'coçando', 'pele coçando', 'comichão', 'irritação na pele', 'urticária', 'formigamento', 'sensação de coceira', 'coceira intensa'],
  'urinary_pain': ['dor ao urinar', 'ardência ao urinar', 'disúria', 'ardor ao fazer xixi', 'queimação ao urinar', 'dor na bexiga', 'desconforto urinário', 'dor ao mictar', 'ardor na uretra'],
  'blood_urine': ['sangue na urina', 'urina com sangue', 'hematúria', 'micção sanguinolenta', 'urina avermelhada', 'urina escura com sangue', 'eliminando sangue na urina'],
  'loss_of_smell': ['perda de olfato', 'não sinto cheiro', 'sem olfato', 'anosmia', 'não consigo sentir cheiros', 'perdi o olfato', 'dificuldade para sentir cheiros', 'perda do olfato'],
  'loss_of_taste': ['perda de paladar', 'não sinto gosto', 'sem paladar', 'ageusia', 'não consigo sentir sabores', 'perdi o paladar', 'comida sem gosto', 'alteração do paladar'],
  'sputum': ['catarro', 'secreção', 'escarro', 'muco', 'expectoração', 'catarro na garganta', 'secreção pulmonar', 'catarro com sangue'],
  'chills': ['calafrios', 'tremores', 'tremedeira', 'arrepios', 'sensação de frio', 'tremendo de frio', 'frio intenso', 'arrepios de frio', 'calafrios com febre'],
  'sweating': ['suor', 'suando', 'transpiração', 'sudorese', 'suando muito', 'transpiração excessiva', 'suor frio', 'sudorese profusa'],
  'confusion': ['confusão', 'desorientação', 'confuso', 'desorientado', 'perdido', 'sem saber onde estou', 'confusão mental', 'pensamento confuso', 'dificuldade de raciocínio'],
  'dizzy': ['tontura', 'vertigem', 'cabeça rodando', 'zonzo', 'atordoado', 'sensação de desmaio', 'tonteira', 'cabeça leve', 'sensação de desfalecimento']
};

// Extended intensity and duration patterns
const intensityPatterns: Record<string, string[]> = {
  'high': ['muito', 'forte', 'intensa', 'grave', 'severa', 'insuportável', 'extrema', 'bastante', 'demais', 'intenso', 'fortíssima', 'terrível'],
  'medium': ['moderada', 'considerável', 'significativa', 'razoável', 'média', 'suportável', 'intermitente', 'regular', 'médio'],
  'low': ['leve', 'fraca', 'suave', 'pequena', 'pouca', 'ligeira', 'um pouco', 'discreta', 'tolerável', 'mínima', 'branda']
};

const durationPatterns: Record<string, string[]> = {
  'long': ['dias', 'semanas', 'meses', 'crônica', 'persistente', 'constante', 'contínua', 'há muito tempo', 'faz tempo', 'há semanas', 'há meses', 'permanente', 'longa duração'],
  'medium': ['algumas horas', 'desde ontem', 'desde anteontem', 'recente', 'há pouco tempo', 'alguns dias', 'há poucos dias', 'intermitente', 'vai e volta'],
  'recent': ['agora', 'acabou de', 'começou', 'recém', 'súbito', 'repentino', 'de repente', 'hoje', 'há poucas horas', 'iniciou agora', 'subitamente']
};

// Clinical correlation patterns - new!
const clinicalCorrelations: Record<string, string[]> = {
  'after_medication': ['depois de tomar remédio', 'após medicação', 'com o uso de medicamentos', 'tomando antibióticos', 'desde que comecei a tomar'],
  'after_food': ['depois de comer', 'após as refeições', 'quando me alimento', 'associado à comida', 'relação com alimentação'],
  'stress_related': ['quando fico nervoso', 'em situações de estresse', 'sob pressão', 'quando me estresso', 'relacionado à ansiedade'],
  'sleep_related': ['piora à noite', 'durante o sono', 'ao acordar', 'quando deito', 'relacionado ao sono', 'insônia'],
  'activity_related': ['quando me esforço', 'após exercícios', 'ao caminhar', 'quando subo escadas', 'durante atividades']
};

// Improved symptom extraction with context awareness
export const extractSymptomsFromText = (text: string): {
  symptoms: string[],
  intensity: 'high' | 'medium' | 'low' | null,
  duration: 'long' | 'medium' | 'recent' | null,
  clinicalContext: string[] | null
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

  // Direct matching for single quotes or quoted symptom names
  const quotedPattern = /'([^']+)'/g;
  const matches = normalizedText.match(quotedPattern);
  if (matches) {
    matches.forEach(match => {
      // Remove the quotes
      const symptomText = match.replace(/'/g, '').toLowerCase();
      
      // Check each symptom keyword for a match
      Object.entries(symptomKeywords).forEach(([symptomId, keywords]) => {
        if (keywords.some(keyword => {
          const normalizedKeyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return symptomText === normalizedKeyword || symptomText.includes(normalizedKeyword);
        })) {
          if (!extractedSymptoms.includes(symptomId)) {
            extractedSymptoms.push(symptomId);
          }
        }
      });
    });
  }

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

  // Extract clinical context - new!
  let clinicalContext: string[] = [];
  for (const [context, patterns] of Object.entries(clinicalCorrelations)) {
    if (patterns.some(pattern => normalizedText.includes(pattern.toLowerCase()))) {
      clinicalContext.push(context);
    }
  }

  return { 
    symptoms: extractedSymptoms, 
    intensity, 
    duration,
    clinicalContext: clinicalContext.length > 0 ? clinicalContext : null
  };
};

// Generate a more detailed natural response based on extracted symptom context
export const generateNaturalResponse = (
  extractionResult: { symptoms: string[], intensity: string | null, duration: string | null, clinicalContext: string[] | null },
  allSymptoms: Symptom[]
): string => {
  const { symptoms: extractedSymptoms, intensity, duration, clinicalContext } = extractionResult;
  
  if (extractedSymptoms.length === 0) {
    return "Não consegui identificar sintomas específicos na sua descrição. Poderia descrever com mais detalhes o que está sentindo? Por exemplo: 'Estou com dor de cabeça e febre desde ontem'. Quanto mais detalhes você fornecer, melhor será minha análise.";
  }
  
  const symptomMap: Record<string, string> = {
    'fever': 'febre',
    'cough': 'tosse',
    'headache': 'dor de cabeça',
    'chest_pain': 'dor no peito',
    'nausea': 'náusea',
    'vomiting': 'vômito',
    'breathing_difficulty': 'dificuldade para respirar',
    'fatigue': 'cansaço',
    'muscle_pain': 'dor muscular',
    'sore_throat': 'dor de garganta',
    'runny_nose': 'coriza',
    'diarrhea': 'diarreia',
    'rash': 'manchas na pele',
    'joint_pain': 'dor nas articulações',
    'abdominal_pain': 'dor abdominal',
    'weight_loss': 'perda de peso',
    'night_sweats': 'suores noturnos',
    'itching': 'coceira',
    'urinary_pain': 'dor ao urinar',
    'blood_urine': 'sangue na urina',
    'loss_of_smell': 'perda de olfato',
    'loss_of_taste': 'perda de paladar',
    'sputum': 'catarro',
    'chills': 'calafrios',
    'sweating': 'sudorese',
    'confusion': 'confusão mental',
    'dizzy': 'tontura'
  };
  
  const symptomNames = extractedSymptoms.map(id => {
    return symptomMap[id] || id;
  });
  
  // Analyze symptoms and prepare for diagnosis
  let response = `Identifiquei os seguintes sintomas: ${symptomNames.join(', ')}. `;
  
  // Add context based on intensity and duration
  if (intensity) {
    response += intensityContext(intensity);
  }
  
  if (duration) {
    response += durationContext(duration);
  }

  // Add clinical correlation context - new!
  if (clinicalContext && clinicalContext.length > 0) {
    response += clinicalCorrelationContext(clinicalContext);
  }
  
  // Different responses based on number of symptoms
  if (extractedSymptoms.length >= 2) {
    response += '\nCom base nos sintomas relatados, estou analisando para gerar um possível diagnóstico.';
  } else if (extractedSymptoms.length === 1) {
    const similarSymptoms = getSimilarSymptoms(extractedSymptoms[0], allSymptoms);
    if (similarSymptoms.length > 0) {
      response += `\nVocê também está sentindo algum destes sintomas frequentemente associados: ${similarSymptoms.join(', ')}?`;
    } else {
      response += '\nPreciso de mais informações para um diagnóstico mais preciso. Existe algum outro sintoma que está sentindo?';
    }
  } else {
    response += '\nPreciso de mais informações para um diagnóstico mais preciso. Existe algum outro sintoma que está sentindo?';
  }
  
  return response;
};

// Get symptoms commonly associated with the provided symptom
const getSimilarSymptoms = (symptomId: string, allSymptoms: Symptom[]): string[] => {
  // Maps of commonly associated symptoms
  const symptomAssociations: Record<string, string[]> = {
    'fever': ['headache', 'fatigue', 'muscle_pain', 'chills'],
    'cough': ['sore_throat', 'runny_nose', 'breathing_difficulty', 'sputum'],
    'headache': ['fever', 'fatigue', 'dizzy'],
    'chest_pain': ['breathing_difficulty', 'fatigue'],
    'nausea': ['vomiting', 'abdominal_pain', 'diarrhea'],
    'breathing_difficulty': ['chest_pain', 'fatigue', 'cough'],
    'runny_nose': ['cough', 'sore_throat'],
    'muscle_pain': ['fever', 'fatigue'],
    'loss_of_smell': ['loss_of_taste', 'runny_nose', 'fever'],
    'loss_of_taste': ['loss_of_smell', 'sore_throat', 'fever']
  };
  
  if (symptomId in symptomAssociations) {
    const associatedIds = symptomAssociations[symptomId].slice(0, 3); // Get up to 3 associated symptoms
    return associatedIds.map(id => {
      const symptom = allSymptoms.find(s => s.id === id);
      return symptom ? symptom.name.toLowerCase() : id;
    });
  }
  
  return [];
};

// Helper functions for context-specific responses
const intensityContext = (intensity: string): string => {
  switch(intensity) {
    case 'high':
      return 'Pela intensidade relatada dos sintomas, isso pode indicar uma condição que requer atenção prioritária. ';
    case 'medium':
      return 'A intensidade moderada dos sintomas sugere uma condição que deve ser monitorada cuidadosamente. ';
    case 'low':
      return 'Os sintomas parecem ser de intensidade leve, mas ainda assim merecem atenção e acompanhamento. ';
    default:
      return '';
  }
};

const durationContext = (duration: string): string => {
  switch(duration) {
    case 'long':
      return 'O fato desses sintomas persistirem por um período prolongado pode indicar uma condição crônica ou que está se desenvolvendo progressivamente. ';
    case 'medium':
      return 'Estes sintomas estão presentes há algum tempo, o que pode indicar uma condição que está evoluindo e merece avaliação. ';
    case 'recent':
      return 'O início recente e súbito desses sintomas sugere uma condição aguda que pode requerer monitoramento próximo. ';
    default:
      return '';
  }
};

// New function for clinical correlation context
const clinicalCorrelationContext = (contexts: string[]): string => {
  let response = "";
  
  if (contexts.includes('after_medication')) {
    response += "O surgimento dos sintomas após uso de medicação pode sugerir uma reação adversa ou efeito colateral. ";
  }
  
  if (contexts.includes('after_food')) {
    response += "A relação dos sintomas com a alimentação pode indicar intolerância alimentar, alergia ou condição digestiva. ";
  }
  
  if (contexts.includes('stress_related')) {
    response += "A associação com estresse ou ansiedade pode ser relevante para o diagnóstico e tratamento. ";
  }
  
  if (contexts.includes('sleep_related')) {
    response += "Os sintomas relacionados ao sono ou que pioram à noite podem ter padrões específicos importantes para o diagnóstico. ";
  }
  
  if (contexts.includes('activity_related')) {
    response += "O surgimento durante atividades físicas pode indicar condições respiratórias, cardiovasculares ou musculoesqueléticas. ";
  }
  
  return response;
};

// New function to generate follow-up questions based on symptoms
export const generateFollowUpQuestions = (symptoms: string[]): string[] => {
  const questions: string[] = [];
  
  if (symptoms.includes('fever')) {
    questions.push("Você mediu sua temperatura? Qual foi o valor mais alto registrado?");
  }
  
  if (symptoms.includes('cough')) {
    questions.push("A tosse é seca ou produtiva (com catarro)? Há algum tipo de secreção ou sangue?");
  }
  
  if (symptoms.includes('breathing_difficulty')) {
    questions.push("A dificuldade para respirar ocorre em repouso ou durante esforços?");
  }
  
  if (symptoms.includes('chest_pain')) {
    questions.push("A dor no peito irradia para algum lugar, como braço, pescoço ou costas?");
  }
  
  if (symptoms.includes('loss_of_smell') || symptoms.includes('loss_of_taste')) {
    questions.push("Você teve contato com alguém diagnosticado com COVID-19 nos últimos dias?");
  }
  
  // Limit to 2 questions
  return questions.slice(0, 2);
};

