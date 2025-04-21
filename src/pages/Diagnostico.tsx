
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { symptoms, generateDiagnosis, PatientData, Diagnosis } from "@/services/diagnosticService";
import { generateDiagnosisPDF } from "@/services/pdfService";
import PatientDataPanel from "@/components/PatientDataPanel";
import SymptomsPanel from "@/components/SymptomsPanel";
import DiagnosisResultPanel from "@/components/DiagnosisResultPanel";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Diagnostico = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    age: 0,
    sex: "Masculino",
    weight: 0,
    height: 0,
    notes: ""
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isGeneratingDiagnosis, setIsGeneratingDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [showChatDiagnostic, setShowChatDiagnostic] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handlePatientDataChange = (field: keyof PatientData, value: string | number) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };

  const handleGenerateDiagnosis = () => {
    if (!patientData.name || patientData.age <= 0 || !patientData.sex || patientData.weight <= 0 || patientData.height <= 0) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os dados do paciente",
        variant: "destructive"
      });
      return;
    }
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Nenhum sintoma selecionado",
        description: "Por favor, selecione pelo menos um sintoma",
        variant: "destructive"
      });
      return;
    }
    setIsGeneratingDiagnosis(true);
    setDiagnosis(null);
    setShowChatDiagnostic(true);

    setTimeout(() => {
      const result = generateDiagnosis(selectedSymptoms);
      setDiagnosis(result);
      setIsGeneratingDiagnosis(false);
    }, 3000);
  };

  const handleExportPDF = () => {
    if (!diagnosis) return;
    const symptomNames: Record<string, string> = {};
    symptoms.forEach(symptom => {
      symptomNames[symptom.id] = symptom.name;
    });
    generateDiagnosisPDF(patientData, selectedSymptoms, diagnosis, symptomNames);
    toast({
      title: "PDF gerado com sucesso",
      description: "O relatório de diagnóstico foi exportado em PDF"
    });
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-screen bg-medical-light">
      <header className="bg-medical-purple text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Sistema de Diagnóstico Médico</h1>
          <div className="flex items-center space-x-4">
            <span>
              {currentUser?.role} {currentUser?.username}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={18} className="mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <PatientDataPanel
            patientData={patientData}
            onChange={handlePatientDataChange}
          />
          <div className="md:col-span-7 space-y-6">
            <SymptomsPanel
              selectedSymptoms={selectedSymptoms}
              onSymptomToggle={handleSymptomToggle}
              onGenerateDiagnosis={handleGenerateDiagnosis}
              isGeneratingDiagnosis={isGeneratingDiagnosis}
            />
            <DiagnosisResultPanel
              showChatDiagnostic={showChatDiagnostic}
              isGeneratingDiagnosis={isGeneratingDiagnosis}
              diagnosis={diagnosis}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
