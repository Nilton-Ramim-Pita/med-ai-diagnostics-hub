
import { Diagnosis } from "@/types/diagnostic";

export const checkForHeartAttack = (selectedSymptoms: string[]): Diagnosis | null => {
  if (
    selectedSymptoms.includes('chest_pain') &&
    selectedSymptoms.includes('breathing_difficulty') &&
    selectedSymptoms.includes('fatigue')
  ) {
    return {
      condition: 'Infarto Agudo do Miocárdio',
      confidence: 93,
      description: 'Quadro grave, com dor no peito intensa e irradiada, falta de ar e sudorese. Pode haver enjoos e sensação de cansaço imenso.',
      recommendations: [
        'Procurar imediatamente um serviço de emergência (SAMU 192)',
        'Não tentar dirigir por conta própria',
        'Descrever os sintomas com detalhes ao atendimento',
        'Evitar uso de medicação caseira ou aguardar melhora espontânea'
      ]
    };
  }
  return null;
};
