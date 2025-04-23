
import { Diagnosis } from "@/types/diagnostic";
import { symptoms } from "@/data/symptoms";
import { checkForFlu } from "./diseases/flu";
import { checkForCovid } from "./diseases/covid";
import { checkForCommonCold } from "./diseases/commonCold";
import { checkForGastroenteritis } from "./diseases/gastroenteritis";
import { checkForAllergy } from "./diseases/allergy";
import { checkForUTI } from "./diseases/uti";
import { checkForDengue } from "./diseases/dengue";
import { checkForTuberculosis } from "./diseases/tuberculosis";
import { checkForHeartAttack } from "./diseases/heartAttack";
import { checkForHepatitis } from "./diseases/hepatitis";

export { symptoms };
export type { PatientData, Symptom, Diagnosis } from "@/types/diagnostic";

export const generateDiagnosis = (selectedSymptoms: string[]): Diagnosis => {
  // Check each disease
  const possibleDiagnoses = [
    checkForFlu(selectedSymptoms),
    checkForCovid(selectedSymptoms),
    checkForCommonCold(selectedSymptoms),
    checkForGastroenteritis(selectedSymptoms),
    checkForAllergy(selectedSymptoms),
    checkForUTI(selectedSymptoms),
    checkForDengue(selectedSymptoms),
    checkForTuberculosis(selectedSymptoms),
    checkForHeartAttack(selectedSymptoms),
    checkForHepatitis(selectedSymptoms)
  ].filter(diagnosis => diagnosis !== null);

  // Se não encontrou um diagnóstico específico, retorna o padrão
  if (possibleDiagnoses.length === 0) {
    return {
      condition: 'Condição Indefinida',
      confidence: 88, // Aumentado para 88% conforme solicitado
      description: 'Baseado nos sintomas apresentados, não foi possível determinar uma condição específica com alta precisão. Recomendamos uma avaliação médica presencial para diagnóstico completo.',
      recommendations: [
        'Procure avaliação médica presencial',
        'Registre evolução dos sintomas',
        'Evite automedicação',
        'Mantenha repouso e hidratação'
      ]
    };
  }

  // Encontra o diagnóstico com maior confiança
  let bestDiagnosis = possibleDiagnoses.reduce((prev, current) => {
    return (current && current.confidence > prev.confidence) ? current : prev;
  }, possibleDiagnoses[0]!);

  // Ajusta a confiança para pelo menos 88%
  if (bestDiagnosis.confidence < 88) {
    bestDiagnosis.confidence = Math.max(88, bestDiagnosis.confidence);
  }

  return bestDiagnosis;
};
