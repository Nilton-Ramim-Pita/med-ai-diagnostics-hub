
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
import { symptoms as allSymptoms, generateDiagnosis } from "@/services/diagnosticService";
import { extractSymptomsFromText, generateNaturalResponse } from "@/services/nlpService";
import { useToast } from "@/components/ui/use-toast";
import { generateDiagnosisPDF } from "@/services/pdfService";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: React.ReactNode;
}

const SymptomsPanel: React.FC = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Descreva seus sintomas para que eu possa ajudar a identificar um possível diagnóstico. Por favor, seja o mais detalhado possível sobre como está se sentindo.' 
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    // Mensagem do usuário
    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Extração de sintomas
    const extractionResult = extractSymptomsFromText(chatInput);

    // Simula digitação do assistente
    setIsTyping(true);
    
    // Gera resposta natural do assistente
    setTimeout(() => {
      const assistantResponse = generateNaturalResponse(extractionResult, allSymptoms);
      
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: assistantResponse
      }]);

      // Se sintomas suficientes, gera diagnóstico detalhado
      if (extractionResult.symptoms.length >= 2) {
        setTimeout(() => {
          const diagnosis = generateDiagnosis(extractionResult.symptoms);
          
          // Ensuring confidence is at least 88%
          if (diagnosis.confidence < 88) {
            diagnosis.confidence = Math.max(88, diagnosis.confidence);
          }

          setChatHistory(prev => [
            ...prev, 
            {
              role: 'assistant',
              content: (
                <div>
                  <div>
                    <strong className="text-medical-purple">Diagnóstico:</strong> {diagnosis.condition}
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="font-medium mr-2">Confiança:</span>
                    <span className="inline-block w-40 bg-gray-200 h-2 rounded-full overflow-hidden align-middle">
                      <span 
                        className={`block h-2 rounded-full ${diagnosis.confidence >= 88 ? "bg-green-500" : diagnosis.confidence >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${diagnosis.confidence}%` }}
                      />
                    </span>
                    <span className="ml-2 font-semibold">{diagnosis.confidence}%</span>
                  </div>
                  <div className="mt-2 text-gray-700">{diagnosis.description}</div>
                  {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
                    <div className="mt-4">
                      <div className="font-semibold text-medical-purple mb-1">Recomendações:</div>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800">
                        {diagnosis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4 text-xs text-gray-500">
                    Este diagnóstico é apenas uma sugestão e não substitui avaliação médica presencial.
                  </div>
                  <div className="mt-3">
                    <Button
                      onClick={() => handleExportPDF(extractionResult.symptoms, diagnosis)}
                      size="sm"
                      className="bg-medical-purple hover:bg-medical-secondary"
                    >
                      Exportar PDF
                    </Button>
                  </div>
                </div>
              )
            }
          ]);
          setIsTyping(false);
        }, 1200);
      } else {
        setIsTyping(false);
      }
    }, 500);

    setChatInput('');
  };

  const handleExportPDF = (selectedSymptoms: string[], diagnosis: any) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-medical-purple flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> Descreva seus Sintomas
        </CardTitle>
        <CardDescription>
          Conte-me detalhadamente o que está sentindo para um diagnóstico mais preciso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[420px]">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 p-2"
          >
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
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Textarea 
              placeholder="Descreva seus sintomas em detalhes..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
      </CardContent>
    </Card>
  );
};

export default SymptomsPanel;
