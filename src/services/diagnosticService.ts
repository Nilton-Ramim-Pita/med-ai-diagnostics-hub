
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

  // If no specific diagnosis is found, return default
  if (possibleDiagnoses.length === 0) {
    return {
      condition: 'Condição Indefinida',
      confidence: 40,
      description: 'Os sintomas não correspondem claramente a um diagnóstico específico em nossa base de conhecimento médico digital. Acompanhamento clínico é recomendado.',
      recommendations: [
        'Procure avaliação médica presencial',
        'Registre evolução dos sintomas',
        'Evite automedicação',
        'Mantenha repouso e hidratação'
      ]
    };
  }

  // Return the diagnosis with the highest confidence
  return possibleDiagnoses.reduce((prev, current) => {
    return (current && current.confidence > prev.confidence) ? current : prev;
  }, possibleDiagnoses[0]!);
};
