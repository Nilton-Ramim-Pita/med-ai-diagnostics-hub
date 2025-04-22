
import { Diagnosis } from "@/types/diagnostic";

export const checkForCommonCold = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
