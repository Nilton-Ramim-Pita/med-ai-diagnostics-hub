
import { Diagnosis } from "@/types/diagnostic";

export const checkForTuberculosis = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
