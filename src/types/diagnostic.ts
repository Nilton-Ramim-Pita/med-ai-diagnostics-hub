
export interface PatientData {
  name: string;
  age: number;
  sex: "Masculino" | "Feminino" | "Outro";
  weight: number;
  height: number;
  notes: string;
}

export interface Symptom {
  id: string;
  name: string;
  selected: boolean;
}

export interface Diagnosis {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}
