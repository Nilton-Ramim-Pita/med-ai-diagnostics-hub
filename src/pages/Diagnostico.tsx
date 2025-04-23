
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateDiagnosis, Diagnosis } from "@/services/diagnosticService";
import { generateDiagnosisPDF } from "@/services/pdfService";
import SymptomsPanel from "@/components/SymptomsPanel";
import DiagnosisResultPanel from "@/components/DiagnosisResultPanel";

const Diagnostico = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isGeneratingDiagnosis, setIsGeneratingDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const { toast } = useToast();

  // Function to handle the diagnosis generation when enough symptoms are detected
  const handleDiagnosisGeneration = (symptoms: string[]) => {
    if (symptoms.length === 0) {
      return;
    }
    
    // Only generate a new diagnosis if the symptoms have changed
    if (JSON.stringify(symptoms) !== JSON.stringify(selectedSymptoms)) {
      setSelectedSymptoms(symptoms);
      
      if (symptoms.length >= 2) { // Only diagnose if at least 2 symptoms
        setIsGeneratingDiagnosis(true);
        setDiagnosis(null);
        setShowDiagnosis(true);
        
        setTimeout(() => {
          const result = generateDiagnosis(symptoms);
          
          // Ensuring confidence is at least 88%
          if (result.confidence < 88) {
            result.confidence = Math.max(88, result.confidence);
          }
          
          setDiagnosis(result);
          setIsGeneratingDiagnosis(false);
        }, 1000);
      }
    }
  };

  const handleExportPDF = () => {
    if (!diagnosis) return;

    const patientData = {
      name: "Paciente",
      age: 0,
      sex: "Não informado" as "Masculino" | "Feminino" | "Outro",
      weight: 0,
      height: 0,
      notes: ""
    };

    generateDiagnosisPDF(patientData, selectedSymptoms, diagnosis, {});
    toast({
      title: "PDF gerado com sucesso",
      description: "O relatório de diagnóstico foi exportado em PDF"
    });
  };

  return (
    <div className="min-h-screen bg-medical-light">
      <header className="bg-medical-purple text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Sistema de Diagnóstico Médico</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          <SymptomsPanel
            onSymptomsDetected={handleDiagnosisGeneration}
          />
          <DiagnosisResultPanel
            showChatDiagnostic={showDiagnosis}
            isGeneratingDiagnosis={isGeneratingDiagnosis}
            diagnosis={diagnosis}
            onExportPDF={handleExportPDF}
          />
        </div>
      </main>
      <footer className="bg-medical-purple/10 py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Sistema de Diagnóstico Médico - Para uso educacional
        </div>
      </footer>
    </div>
  );
};

export default Diagnostico;
