
import { Diagnosis } from "@/types/diagnostic";

export const checkForGastroenteritis = (selectedSymptoms: string[]): Diagnosis | null => {
  if (
    (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('vomiting')) &&
    selectedSymptoms.includes('diarrhea')
  ) {
    return {
      condition: 'Gastroenterite',
      confidence: 80,
      description: 'Processo infeccioso do trato digestivo por vírus, bactérias ou parasitas. Ocasiona diarreia, náuseas, vômitos e dor abdominal.',
      recommendations: [
        'Hidratação intensiva (soro caseiro ou oral)',
        'Alimentação leve, evitar laticínios',
        'Procurar serviço médico se sinais de desidratação',
        'Evitar automedicação com antidiarreicos sem orientação',
        'Lavagem das mãos frequente'
      ]
    };
  }
  return null;
};
