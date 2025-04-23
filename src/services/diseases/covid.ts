
import { Diagnosis } from "@/types/diagnostic";

export const checkForCovid = (selectedSymptoms: string[]): Diagnosis | null => {
  // Check for loss of smell, which is a distinctive COVID-19 symptom
  const hasLossOfSmell = selectedSymptoms.includes('loss_of_smell');
  const hasLossOfTaste = selectedSymptoms.includes('loss_of_taste');
  
  // Core symptoms
  const hasFever = selectedSymptoms.includes('fever');
  const hasCough = selectedSymptoms.includes('cough');
  const hasBreathingDifficulty = selectedSymptoms.includes('breathing_difficulty');
  const hasFatigue = selectedSymptoms.includes('fatigue');
  
  // Strong indicator: loss of smell/taste + any other COVID symptom
  if ((hasLossOfSmell || hasLossOfTaste) && (hasFever || hasCough || hasBreathingDifficulty || hasFatigue)) {
    return {
      condition: 'COVID-19',
      confidence: 92, // Higher confidence with distinctive symptoms
      description: 'COVID-19 é uma infecção causada pelo coronavírus SARS-CoV-2. A combinação de perda de olfato/paladar com outros sintomas como febre, tosse, cansaço e dificuldade respiratória é altamente sugestiva de COVID-19.',
      recommendations: [
        'Realizar teste específico para COVID-19',
        'Isolamento domiciliar por 7-10 dias',
        'Monitoramento da oxigenação (oxímetro)',
        'Buscar atendimento médico imediato em caso de falta de ar intensa',
        'Hidratação adequada e repouso',
        'Seguir os protocolos de isolamento das autoridades de saúde'
      ]
    };
  }
  
  // Regular detection pattern (kept from original)
  if (
    hasFever &&
    hasBreathingDifficulty &&
    (hasCough || hasFatigue)
  ) {
    return {
      condition: 'COVID-19',
      confidence: 88, // Increased from 80 to minimum 88
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
  return null;
};
