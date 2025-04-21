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

// Ampliando sintomas para abranger mais doenças
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
  { id: 'rash', name: 'Manchas na pele', selected: false },
  { id: 'joint_pain', name: 'Dor nas articulações', selected: false },
  { id: 'abdominal_pain', name: 'Dor abdominal', selected: false },
  { id: 'weight_loss', name: 'Perda de peso', selected: false },
  { id: 'night_sweats', name: 'Suores noturnos', selected: false },
  { id: 'itching', name: 'Coceira', selected: false },
  { id: 'urinary_pain', name: 'Dor ao urinar', selected: false },
  { id: 'blood_urine', name: 'Sangue na urina', selected: false }
];

// IA expandida para reconocer 10+ doenças
export const generateDiagnosis = (selectedSymptoms: string[]): Diagnosis => {
  // 1. Gripe
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('cough') &&
    (selectedSymptoms.includes('muscle_pain') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'Gripe',
      confidence: 85,
      description: 'A gripe é causada pelo vírus influenza. Febre, tosse, dores musculares e fadiga são sintomas clássicos devido à resposta inflamatória sistêmica causada pelo vírus.',
      recommendations: [
        'Repouso adequado e hidratação',
        'Analgesia e antitérmicos (paracetamol/dipirona, sob orientação)',
        'Manter ambiente arejado',
        'Em caso de falta de ar ou agravamento dos sintomas, procurar atendimento médico',
        'Evitar contato com outras pessoas durante os sintomas'
      ]
    };
  }
  // 2. COVID-19
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'COVID-19',
      confidence: 80,
      description: 'COVID-19 é uma infecção causada pelo coronavírus SARS-CoV-2. Sintomas comuns incluem febre, tosse, cansaço, dificuldade respiratória e perda de paladar/olfato.',
      recommendations: [
        'Isolamento domiciliar',
        'Monitoramento da saturação de oxigênio',
        'Buscar atendimento médico em caso de falta de ar intensa',
        'Reposição de líquidos',
        'Seguir as orientações do serviço de saúde local'
      ]
    };
  }
  // 3. Resfriado comum
  if (
    selectedSymptoms.includes('runny_nose') &&
    (selectedSymptoms.includes('sore_throat') || selectedSymptoms.includes('cough'))
  ) {
    return {
      condition: 'Resfriado Comum',
      confidence: 90,
      description: 'Causado por diversos vírus, sobretudo rinovírus. Sintomas incluem coriza, espirros, dor de garganta e tosse leve; geralmente de menor gravidade.',
      recommendations: [
        'Repouso e hidratação',
        'Analgesia leve, se necessário',
        'Evitar exposição ao frio',
        'Buscar avaliação médica caso haja febre alta persistente'
      ]
    };
  }
  // 4. Gastroenterite
  if (
    (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('vomiting')) &&
    selectedSymptoms.includes('diarrhea')
  ) {
    return {
      condition: 'Gastroenterite',
      confidence: 80,
      description: 'Processo infeccioso do trato digestivo por vírus, bactérias ou parasitas. Ocasiona diarreia, náuseas, vômitos e dor abdominal.',
      recommendations: [
        'Hidratação intensiva (soro caseiro ou oral)',
        'Alimentação leve, evitar laticínios',
        'Procurar serviço médico se sinais de desidratação',
        'Evitar automedicação com antidiarreicos sem orientação',
        'Lavagem das mãos frequente'
      ]
    };
  }
  // 5. Alergia/dermatite
  if (
    selectedSymptoms.includes('rash') &&
    selectedSymptoms.includes('itching')
  ) {
    return {
      condition: 'Alergia/Dermatite',
      confidence: 75,
      description: 'Reação alérgica cutânea que se manifesta como manchas vermelhas acompanhadas de prurido (coceira). Pode ter diversas causas, como contato com substâncias químicas, alimentos ou medicamentos.',
      recommendations: [
        'Evitar contato com agentes suspeitos',
        'Uso de anti-histamínicos se recomendado',
        'Compressas frias nas áreas afetadas',
        'Buscar atendimento médico caso haja sintomas sistêmicos como dificuldade para respirar'
      ]
    };
  }
  // 6. Infecção urinária (ITU)
  if (
    selectedSymptoms.includes('urinary_pain') &&
    (selectedSymptoms.includes('blood_urine') || selectedSymptoms.includes('fever'))
  ) {
    return {
      condition: 'Infecção do Trato Urinário',
      confidence: 77,
      description: 'A ITU é comum, principalmente em mulheres. Sintomas incluem dor ou ardor ao urinar, aumento da frequência urinária e, em casos graves, sangue na urina ou febre.',
      recommendations: [
        'Aumento da ingestão de líquidos',
        'Buscar avaliação médica para confirmação e prescrição de antibiótico adequado',
        'Não postergar o atendimento se houver febre alta ou dor lombar intensa',
        'Evitar automedicação'
      ]
    };
  }
  // 7. Dengue
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('headache') &&
    selectedSymptoms.includes('muscle_pain') &&
    (selectedSymptoms.includes('rash') || selectedSymptoms.includes('joint_pain'))
  ) {
    return {
      condition: 'Dengue',
      confidence: 85,
      description: 'Doença viral transmitida pelo mosquito Aedes aegypti. Apresenta febre alta, dor de cabeça, dores musculares/articulares e, às vezes, manchas vermelhas.',
      recommendations: [
        'Atenção redobrada à hidratação',
        'Evitar medicamentos com ácido acetilsalicílico (AAS)',
        'Repouso intenso',
        'Buscar serviço médico caso apareçam sinais de alerta: dor abdominal intensa, vômitos persistentes, sangramentos, tontura'
      ]
    };
  }
  // 8. Tuberculose
  if (
    selectedSymptoms.includes('cough') &&
    selectedSymptoms.includes('weight_loss') &&
    selectedSymptoms.includes('night_sweats') &&
    selectedSymptoms.includes('fatigue')
  ) {
    return {
      condition: 'Tuberculose Pulmonar',
      confidence: 82,
      description: 'Doença infecciosa causada por Mycobacterium tuberculosis, se caracteriza por tosse crônica, sudorese noturna, emagrecimento e cansaço progressivo.',
      recommendations: [
        'Procurar unidade de saúde para diagnóstico e início imediato de tratamento',
        'Evitar contato próximo com outras pessoas, principalmente crianças e imunossuprimidos',
        'Cumprir rigorosamente a prescrição médica e não abandonar o tratamento'
      ]
    };
  }
  // 9. Infarto agudo do miocárdio
  if (
    selectedSymptoms.includes('chest_pain') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    selectedSymptoms.includes('fatigue')
  ) {
    return {
      condition: 'Infarto Agudo do Miocárdio',
      confidence: 93,
      description: 'Quadro grave, com dor no peito intensa e irradiada, falta de ar e sudorese. Pode haver enjoos e sensação de cansaço imenso.',
      recommendations: [
        'Procurar imediatamente um serviço de emergência (SAMU 192)',
        'Não tentar dirigir por conta própria',
        'Descrever os sintomas com detalhes ao atendimento',
        'Evitar uso de medicação caseira ou aguardar melhora espontânea'
      ]
    };
  }
  // 10. Hepatite Viral
  if (
    selectedSymptoms.includes('nausea') &&
    selectedSymptoms.includes('vomiting') &&
    selectedSymptoms.includes('abdominal_pain') &&
    selectedSymptoms.includes('fatigue')
  ) {
    return {
      condition: 'Hepatite Viral',
      confidence: 78,
      description: 'Infecção do fígado provocada por vírus (A, B, C, D, E). Os sintomas incluem náusea, vômito, desconforto abdominal, fadiga, dor nas articulações e pele/olhos amarelados.',
      recommendations: [
        'Evitar consumo de álcool e gorduras',
        'Repouso e hidratação',
        'Procurar orientação médica para exames e conduta',
        'Evitar contato de fluidos corporais com outras pessoas',
        'Seguir protocolo de monitoramento por equipe de saúde'
      ]
    };
  }
  // Se não atender a nenhum diagnóstico específico
  return {
    condition: 'Condição Indefinida',
    confidence: 40,
    description: 'Os sintomas não correspondem claramente a um diagnóstico específico em nossa base de conhecimento médico digital. Acompanhamento clínico é recomendado.',
    recommendations: [
      'Procure avaliação médica presencial',
      'Registre evolução dos sintomas',
      'Evite automedicação',
      'Mantenha repouso e hidratação'
    ]
  };
};
