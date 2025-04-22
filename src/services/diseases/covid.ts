
import { Diagnosis } from "@/types/diagnostic";

export const checkForCovid = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
