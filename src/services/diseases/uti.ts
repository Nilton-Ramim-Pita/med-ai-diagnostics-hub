
import { Diagnosis } from "@/types/diagnostic";

export const checkForUTI = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
