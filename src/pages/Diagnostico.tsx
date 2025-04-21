
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import { symptoms, generateDiagnosis, PatientData, Diagnosis } from "@/services/diagnosticService";
import { generateDiagnosisPDF } from "@/services/pdfService";
import { FilePdf, LogOut } from "lucide-react";
import ChatDiagnostic from "@/components/ChatDiagnostic";

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
  
  // Verify authentication
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
    // Validation
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
    
    // Simulate processing time
    setTimeout(() => {
      const result = generateDiagnosis(selectedSymptoms);
      setDiagnosis(result);
      setIsGeneratingDiagnosis(false);
    }, 3000);
  };
  
  const handleExportPDF = () => {
    if (!diagnosis) return;
    
    // Create symptom name mapping
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
          {/* Patient Data Panel */}
          <Card className="md:col-span-5 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-medical-purple">
                Dados do Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Nome completo do paciente"
                    value={patientData.name}
                    onChange={(e) => handlePatientDataChange("name", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Idade"
                      min={0}
                      value={patientData.age || ""}
                      onChange={(e) => handlePatientDataChange("age", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sex">Sexo</Label>
                    <Select
                      value={patientData.sex}
                      onValueChange={(value) => handlePatientDataChange("sex", value)}
                    >
                      <SelectTrigger id="sex">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Peso em kg"
                      min={0}
                      step={0.1}
                      value={patientData.weight || ""}
                      onChange={(e) => handlePatientDataChange("weight", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Altura em cm"
                      min={0}
                      value={patientData.height || ""}
                      onChange={(e) => handlePatientDataChange("height", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Observações Médicas</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informações adicionais, histórico, medicamentos, etc."
                    className="h-24"
                    value={patientData.notes}
                    onChange={(e) => handlePatientDataChange("notes", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Symptoms and Diagnosis Panel */}
          <div className="md:col-span-7 space-y-6">
            {/* Symptoms Panel */}
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
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
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
                  onClick={handleGenerateDiagnosis}
                  disabled={isGeneratingDiagnosis}
                >
                  {isGeneratingDiagnosis ? "Processando..." : "Gerar Diagnóstico"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Diagnostic Results */}
            {showChatDiagnostic && (
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
                      onClick={handleExportPDF}
                      className="border-medical-purple text-medical-purple hover:bg-medical-purple hover:text-white"
                    >
                      <FilePdf size={18} className="mr-2" />
                      Exportar em PDF
                    </Button>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
