
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import ChatDiagnostic from "@/components/ChatDiagnostic";
import { Diagnosis } from "@/services/diagnosticService";

interface DiagnosisResultPanelProps {
  showChatDiagnostic: boolean;
  isGeneratingDiagnosis: boolean;
  diagnosis: Diagnosis | null;
  onExportPDF: () => void;
}

const DiagnosisResultPanel: React.FC<DiagnosisResultPanelProps> = ({
  showChatDiagnostic,
  isGeneratingDiagnosis,
  diagnosis,
  onExportPDF
}) => {
  if (!showChatDiagnostic) return null;
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-medical-purple">
          Resultado do Diagnóstico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChatDiagnostic 
          isLoading={isGeneratingDiagnosis}
          diagnosis={diagnosis}
        />
      </CardContent>
      {diagnosis && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button
            variant="outline"
            onClick={onExportPDF}
            className="border-medical-purple text-medical-purple hover:bg-medical-purple hover:text-white"
          >
            <FileText size={18} className="mr-2" />
            Exportar em PDF
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DiagnosisResultPanel;
