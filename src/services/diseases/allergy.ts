
import { Diagnosis } from "@/types/diagnostic";

export const checkForAllergy = (selectedSymptoms: string[]): Diagnosis | null => {
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
  return null;
};
