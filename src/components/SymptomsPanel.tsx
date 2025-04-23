
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, MessageSquare, Search } from "lucide-react";
import { symptoms } from "@/services/diagnosticService";
import { extractSymptomsFromText, generateNaturalResponse } from "@/services/nlpService";

interface SymptomsPanelProps {
  selectedSymptoms: string[];
  onSymptomToggle: (symptomId: string) => void;
  onGenerateDiagnosis: () => void;
  isGeneratingDiagnosis: boolean;
  setSelectedSymptoms: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SymptomsPanel: React.FC<SymptomsPanelProps> = ({
  selectedSymptoms,
  onSymptomToggle,
  onGenerateDiagnosis,
  isGeneratingDiagnosis,
  setSelectedSymptoms
}) => {
  const [activeTab, setActiveTab] = useState<string>('checkbox');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Descreva seus sintomas para que eu possa ajudar a identificar um possível diagnóstico.' 
    }
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Adicionar mensagem do usuário ao histórico
    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    // Processar o texto para extrair sintomas
    const extractedSymptoms = extractSymptomsFromText(chatInput);
    
    // Atualizar os sintomas selecionados
    setSelectedSymptoms(prev => {
      const uniqueSymptoms = new Set([...prev, ...extractedSymptoms]);
      return Array.from(uniqueSymptoms);
    });
    
    // Gerar resposta do assistente
    const assistantResponse = generateNaturalResponse(extractedSymptoms, symptoms);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: assistantResponse 
      }]);
    }, 500);
    
    // Limpar input
    setChatInput('');
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-medical-purple">
          Sintomas
        </CardTitle>
        <CardDescription>
          Selecione os sintomas ou descreva-os naturalmente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="checkbox" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="checkbox" className="flex items-center gap-2">
              <Search className="h-4 w-4" /> Selecionar Sintomas
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Descrever Sintomas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="checkbox" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="chat">
            <div className="flex flex-col h-[300px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-medical-purple text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Textarea 
                  placeholder="Descreva seus sintomas..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                />
                <Button 
                  type="submit" 
                  className="bg-medical-purple hover:bg-medical-secondary self-end"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button
          className="bg-medical-purple hover:bg-medical-secondary"
          onClick={onGenerateDiagnosis}
          disabled={isGeneratingDiagnosis || selectedSymptoms.length === 0}
        >
          {isGeneratingDiagnosis ? "Processando..." : "Gerar Diagnóstico"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomsPanel;
