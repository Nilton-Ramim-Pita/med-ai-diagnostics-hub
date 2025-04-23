
import { Diagnosis } from "@/types/diagnostic";

export const checkForCovid = (selectedSymptoms: string[]): Diagnosis | null => {
  // Check for COVID-specific symptoms with enhanced detection
  const hasLossOfSmellOrTaste = selectedSymptoms.includes('loss_of_smell') || selectedSymptoms.includes('loss_of_taste');
  const hasRespiratorySymptoms = selectedSymptoms.includes('breathing_difficulty') || selectedSymptoms.includes('cough');
  const hasFeverOrFatigue = selectedSymptoms.includes('fever') || selectedSymptoms.includes('fatigue');
  
  // Updated COVID-19 detection: prioritizing loss of smell/taste as highly specific symptoms
  if (hasLossOfSmellOrTaste && (hasRespiratorySymptoms || hasFeverOrFatigue)) {
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
  
  // Secondary detection pattern for COVID-19 without smell/taste symptoms
  if (hasRespiratorySymptoms && hasFeverOrFatigue) {
    return {
      condition: 'COVID-19',
      confidence: 88, // Lower confidence without the specific symptoms
      description: 'COVID-19 é uma infecção causada pelo coronavírus SARS-CoV-2. Os sintomas como febre, tosse, cansaço e dificuldade respiratória podem indicar a doença, embora sem a perda de olfato/paladar a certeza seja menor.',
      recommendations: [
        'Realizar teste específico para COVID-19',
        'Isolamento preventivo até resultado do teste',
        'Monitoramento da oxigenação (oxímetro)',
        'Buscar atendimento médico se os sintomas piorarem',
        'Hidratação adequada e repouso',
        'Evitar contato próximo com outras pessoas até confirmação diagnóstica'
      ]
    };
  }
  
  return null;
};
