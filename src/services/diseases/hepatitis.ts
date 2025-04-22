
import { Diagnosis } from "@/types/diagnostic";

export const checkForHepatitis = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
