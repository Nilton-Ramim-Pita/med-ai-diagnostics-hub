
import { Diagnosis } from "@/types/diagnostic";

export const checkForDengue = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
