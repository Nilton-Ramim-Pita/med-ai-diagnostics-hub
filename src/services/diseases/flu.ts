
import { Diagnosis } from "@/types/diagnostic";

export const checkForFlu = (selectedSymptoms: string[]): Diagnosis | null => {
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('cough') &&
    (selectedSymptoms.includes('muscle_pain') || selectedSymptoms.includes('fatigue'))
  ) {
    return {
      condition: 'Gripe',
      confidence: 85,
      description: 'A gripe é causada pelo vírus influenza. Febre, tosse, dores musculares e fadiga são sintomas clássicos devido à resposta inflamatória sistêmica causada pelo vírus.',
      recommendations: [
        'Repouso adequado e hidratação',
        'Analgesia e antitérmicos (paracetamol/dipirona, sob orientação)',
        'Manter ambiente arejado',
        'Em caso de falta de ar ou agravamento dos sintomas, procurar atendimento médico',
        'Evitar contato com outras pessoas durante os sintomas'
      ]
    };
  }
  return null;
};
