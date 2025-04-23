
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
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
  onGenerateDiagnosis,
  isGeneratingDiagnosis,
  setSelectedSymptoms
}) => {
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Descreva seus sintomas para que eu possa ajudar a identificar um possível diagnóstico. Por favor, seja o mais detalhado possível sobre como está se sentindo.' 
    }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
    const extractionResult = extractSymptomsFromText(chatInput);
    
    // Atualizar os sintomas selecionados
    setSelectedSymptoms(prev => {
      const uniqueSymptoms = new Set([...prev, ...extractionResult.symptoms]);
      return Array.from(uniqueSymptoms);
    });
    
    // Gerar resposta do assistente
    const assistantResponse = generateNaturalResponse(extractionResult, symptoms);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: assistantResponse 
      }]);
    }, 500);
    
    // Limpar input
    setChatInput('');
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
        <div className="flex flex-col h-[350px]">
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
