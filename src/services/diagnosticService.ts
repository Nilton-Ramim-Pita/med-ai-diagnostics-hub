
// Simple diagnostic service using decision tree logic

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

// Available symptoms
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
  { id: 'diarrhea', name: 'Diarreia', selected: false }
];

// Decision tree for diagnosis
export const generateDiagnosis = (selectedSymptoms: string[]): Diagnosis => {
  // Flu diagnosis
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('cough') &&
    (selectedSymptoms.includes('muscle_pain') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'Gripe',
      confidence: 85,
      description: 'Os sintomas apresentados são consistentes com um quadro de gripe. O vírus influenza é caracterizado por febre, tosse, dores no corpo e fadiga.',
      recommendations: [
        'Repouso adequado',
        'Hidratação frequente',
        'Medicamentos para reduzir febre (sob orientação médica)',
        'Monitoramento dos sintomas por 3-5 dias',
        'Evitar contato com outras pessoas para prevenir contágio'
      ]
    };
  }
  
  // COVID-19 diagnosis
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'COVID-19',
      confidence: 75,
      description: 'Os sintomas sugerem possível COVID-19. A combinação de febre, dificuldade respiratória e outros sintomas são indicadores desta condição.',
      recommendations: [
        'Realizar teste para COVID-19 imediatamente',
        'Isolamento social imediato',
        'Monitorar níveis de oxigênio com oxímetro',
        'Buscar atendimento médico se sintomas respiratórios piorarem',
        'Hidratação e repouso são essenciais'
      ]
    };
  }
  
  // Common cold diagnosis
  if (
    selectedSymptoms.includes('runny_nose') &&
    selectedSymptoms.includes('sore_throat') &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('headache'))
  ) {
    return {
      condition: 'Resfriado Comum',
      confidence: 90,
      description: 'Os sintomas são característicos de um resfriado comum, causado por rinovírus ou outros vírus respiratórios.',
      recommendations: [
        'Repouso quando necessário',
        'Ingestão adequada de líquidos',
        'Medicamentos para alívio sintomático como descongestionantes (se necessário)',
        'Higienização frequente das mãos para evitar propagação',
        'Monitoramento de sintomas por 7-10 dias'
      ]
    };
  }
  
  // Gastroenteritis diagnosis
  if (
    (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('vomiting')) &&
    selectedSymptoms.includes('diarrhea')
  ) {
    return {
      condition: 'Gastroenterite',
      confidence: 80,
      description: 'Os sintomas indicam um quadro de gastroenterite, possivelmente de origem viral ou bacteriana.',
      recommendations: [
        'Hidratação constante para repor líquidos perdidos',
        'Dieta leve e facilmente digerível',
        'Evitar laticínios e alimentos gordurosos',
        'Medicamentos antieméticos se prescritos',
        'Buscar atendimento médico se houver desidratação severa'
      ]
    };
  }
  
  // Heart-related issues
  if (
    selectedSymptoms.includes('chest_pain') &&
    (selectedSymptoms.includes('breathing_difficulty') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'Problema Cardíaco',
      confidence: 65,
      description: 'A combinação de dor torácica com outros sintomas pode indicar um problema cardíaco que requer atenção médica imediata.',
      recommendations: [
        'Buscar atendimento médico de emergência',
        'Evitar esforços físicos',
        'Monitoramento de pressão arterial e frequência cardíaca',
        'Não auto-medicar',
        'Realização de exames cardíacos específicos'
      ]
    };
  }
  
  // Generic response for uncertain cases
  return {
    condition: 'Condição Indefinida',
    confidence: 40,
    description: 'A combinação de sintomas apresentada não corresponde claramente a um diagnóstico específico em nossa base de conhecimento.',
    recommendations: [
      'Consulta médica para avaliação mais detalhada',
      'Monitoramento da evolução dos sintomas',
      'Registro detalhado de novos sintomas que possam surgir',
      'Evitar automedicação',
      'Repouso e hidratação adequados'
    ]
  };
};
