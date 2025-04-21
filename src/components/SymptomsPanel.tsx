
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { symptoms } from "@/services/diagnosticService";

interface SymptomsPanelProps {
  selectedSymptoms: string[];
  onSymptomToggle: (symptomId: string) => void;
  onGenerateDiagnosis: () => void;
  isGeneratingDiagnosis: boolean;
}

const SymptomsPanel: React.FC<SymptomsPanelProps> = ({
  selectedSymptoms,
  onSymptomToggle,
  onGenerateDiagnosis,
  isGeneratingDiagnosis
}) => (
  <Card className="bg-white shadow-md">
    <CardHeader>
      <CardTitle className="text-medical-purple">
        Sintomas
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {symptoms.map((symptom) => (
          <div
            key={symptom.id}
            className="flex items-start space-x-2 p-2 rounded hover:bg-gray-50"
          >
            <Checkbox
              id={`symptom-${symptom.id}`}
              checked={selectedSymptoms.includes(symptom.id)}
              onCheckedChange={() => onSymptomToggle(symptom.id)}
            />
            <Label
              htmlFor={`symptom-${symptom.id}`}
              className="font-normal cursor-pointer"
            >
              {symptom.name}
            </Label>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex justify-center border-t pt-4">
      <Button
        className="bg-medical-purple hover:bg-medical-secondary"
        onClick={onGenerateDiagnosis}
        disabled={isGeneratingDiagnosis}
      >
        {isGeneratingDiagnosis ? "Processando..." : "Gerar Diagnóstico"}
      </Button>
    </CardFooter>
  </Card>
);

export default SymptomsPanel;
