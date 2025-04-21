
// Serviço de diagnóstico aprimorado com identificação de 10 doenças populares

export interface PatientData {
  name: string;
  age: number;
  sex: "Masculino" | "Feminino" | "Outro";
  weight: number;
  height: number;
  notes: string;
}

export interface Symptom {
  id: string;
  name: string;
  selected: boolean;
}

export interface Diagnosis {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

// Sintomas disponíveis — ampliado para cobrir mais doenças
export const symptoms: Symptom[] = [
  { id: 'fever', name: 'Febre', selected: false },
  { id: 'cough', name: 'Tosse', selected: false },
  { id: 'headache', name: 'Dor de cabeça', selected: false },
  { id: 'chest_pain', name: 'Dor no peito', selected: false },
  { id: 'nausea', name: 'Náusea', selected: false },
  { id: 'vomiting', name: 'Vômito', selected: false },
  { id: 'breathing_difficulty', name: 'Dificuldade para respirar', selected: false },
  { id: 'fatigue', name: 'Cansaço', selected: false },
  { id: 'muscle_pain', name: 'Dor muscular', selected: false },
  { id: 'sore_throat', name: 'Dor de garganta', selected: false },
  { id: 'runny_nose', name: 'Coriza', selected: false },
  { id: 'diarrhea', name: 'Diarreia', selected: false },
  { id: 'joint_pain', name: 'Dor nas articulações', selected: false },
  { id: 'loss_of_smell', name: 'Perda de olfato', selected: false },
  { id: 'skin_rash', name: 'Manchas na pele', selected: false },
  { id: 'high_blood_pressure', name: 'Pressão alta', selected: false },
  { id: 'disorientation', name: 'Desorientação', selected: false },
  { id: 'short_breath', name: 'Fôlego curto', selected: false },
  { id: 'productive_cough', name: 'Tosse com catarro', selected: false },
  { id: 'wheezing', name: 'Chiado no peito', selected: false }
];

// Árvore de decisão — 10 diagnósticos
export const generateDiagnosis = (selectedSymptoms: string[]): Diagnosis => {
  // Gripe
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('cough') &&
    (selectedSymptoms.includes('muscle_pain') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'Gripe (Influenza)',
      confidence: 90,
      description: 'Febre alta, tosse, dores no corpo e fadiga são típicos de gripe. Normalmente, o quadro é autolimitado.',
      recommendations: [
        'Repouso e hidratação',
        'Analgesia e antitérmicos sob orientação',
        'Observar evolução (melhora em 7 dias esperada)',
        'Evitar contato com outros'
      ]
    };
  }

  // COVID-19
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('loss_of_smell') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'COVID-19',
      confidence: 95,
      description: 'Conjunto de febre, tosse, falta de ar, fadiga ou perda de olfato são indicativos da COVID-19.',
      recommendations: [
        'Teste para COVID-19 e isolamento',
        'Monitorar saturação de oxigênio',
        'Buscar pronto atendimento se piora respiratória'
      ]
    };
  }

  // Pneumonia
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('productive_cough') &&
    selectedSymptoms.includes('breathing_difficulty')
  ) {
    return {
      condition: 'Pneumonia',
      confidence: 85,
      description: 'Quadro de febre, tosse com catarro e dificuldade de respirar sugere pneumonia.',
      recommendations: [
        'Avaliação médica urgente',
        'Realizar radiografia de tórax',
        'Antibioticoterapia se confirmada',
        'Monitoramento em ambiente hospitalar, se grave'
      ]
    };
  }

  // Resfriado comum
  if (
    selectedSymptoms.includes('runny_nose') &&
    selectedSymptoms.includes('sore_throat') &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('headache'))
  ) {
    return {
      condition: 'Resfriado Comum',
      confidence: 95,
      description: 'Coriza, dor de garganta e tosse leve são característicos de resfriados virais.',
      recommendations: [
        'Repouso',
        'Ingestão de líquidos',
        'Descongestionantes se necessário'
      ]
    };
  }

  // Sinusite
  if (
    selectedSymptoms.includes('headache') &&
    selectedSymptoms.includes('runny_nose') &&
    selectedSymptoms.includes('sore_throat')
  ) {
    return {
      condition: 'Sinusite Aguda',
      confidence: 80,
      description: 'Dor de cabeça frontal, secreção nasal e dor de garganta sugerem sinusite.',
      recommendations: [
        'Lavagem nasal com soro',
        'Analgesia',
        'Procurar serviço médico se sintomas persistirem'
      ]
    };
  }

  // Dengue
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('headache') &&
    selectedSymptoms.includes('joint_pain') &&
    selectedSymptoms.includes('skin_rash')
  ) {
    return {
      condition: 'Dengue',
      confidence: 90,
      description: 'Febre alta, dor de cabeça, dor nas articulações e manchas podem indicar dengue.',
      recommendations: [
        'Procurar assistência médica para confirmação',
        'Monitorar sinais de alarme (dor abdominal, vômitos persistentes, sangramentos)',
        'Repouso e hidratação intensa'
      ]
    };
  }

  // Enfarte agudo do miocárdio
  if (
    selectedSymptoms.includes('chest_pain') &&
    selectedSymptoms.includes('fatigue') &&
    (selectedSymptoms.includes('high_blood_pressure') || selectedSymptoms.includes('breathing_difficulty'))
  ) {
    return {
      condition: 'Infarto Agudo do Miocárdio',
      confidence: 98,
      description: 'Dor no peito intensa, cansaço e fatores de risco sugerem infarto. Trata-se de emergência.',
      recommendations: [
        'Procurar atendimento de emergência imediatamente (SAMU 192)',
        'Evitar esforços',
        'Monitorar sinais vitais'
      ]
    };
  }

  // Bronquite
  if (
    selectedSymptoms.includes('cough') &&
    selectedSymptoms.includes('wheezing') &&
    selectedSymptoms.includes('fatigue')
  ) {
    return {
      condition: 'Bronquite Aguda',
      confidence: 85,
      description: 'Tosse persistente, chiado no peito e cansaço sugerem bronquite.',
      recommendations: [
        'Evitar exposição a fumaça e irritantes',
        'Broncodilatadores se prescritos',
        'Hidratação adequada'
      ]
    };
  }

  // Asma
  if (
    selectedSymptoms.includes('wheezing') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    selectedSymptoms.includes('chest_pain')
  ) {
    return {
      condition: 'Asma Aguda',
      confidence: 92,
      description: 'Crises de chiado, falta de ar e dor no peito sugerem asma. Procure alívio rápido.',
      recommendations: [
        'Uso de bombinha/broncodilatador',
        'Retirar-se de ambientes com poeira ou fumaça',
        'Buscar atendimento se não melhorar em minutos'
      ]
    };
  }

  // Gastroenterite
  if (
    (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('vomiting')) &&
    selectedSymptoms.includes('diarrhea')
  ) {
    return {
      condition: 'Gastroenterite Aguda',
      confidence: 80,
      description: 'Quadro de náusea, vômito e diarreia são típicos de gastroenterites.',
      recommendations: [
        'Hidratação oral freqüente',
        'Evitar alimentos gordurosos/laticínios',
        'Observar sinais de desidratação'
      ]
    };
  }

  // Genérico/indefinido
  return {
    condition: 'Condição Indefinida',
    confidence: 40,
    description: 'A combinação de sintomas não aponta claramente um diagnóstico. Recomenda-se avaliação médica presencial.',
    recommendations: [
      'Consulta médica presencial',
      'Monitorização de sintomas',
      'Repouso e hidratação'
    ]
  };
};
