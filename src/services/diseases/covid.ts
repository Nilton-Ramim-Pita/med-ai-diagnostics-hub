
import { Diagnosis } from "@/types/diagnostic";

export const checkForCovid = (selectedSymptoms: string[]): Diagnosis | null => {
  // Check for COVID-specific symptoms
  const hasLossOfSmellOrTaste = selectedSymptoms.includes('loss_of_smell') || selectedSymptoms.includes('loss_of_taste');
  
  // Updated COVID-19 detection: now checks for loss of smell/taste specifically
  if (
    (selectedSymptoms.includes('fever') || selectedSymptoms.includes('cough')) &&
    (selectedSymptoms.includes('breathing_difficulty') || hasLossOfSmellOrTaste)
  ) {
    return {
      condition: 'COVID-19',
      confidence: 92,
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
  return null;
};
