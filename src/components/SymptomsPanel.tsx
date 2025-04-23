
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
import { symptoms as allSymptoms, generateDiagnosis } from "@/services/diagnosticService";
import { extractSymptomsFromText, generateNaturalResponse } from "@/services/nlpService";

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
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

    // Gera resposta natural do assistente
    const assistantResponse = generateNaturalResponse(extractionResult, allSymptoms);

    // Exibe resposta do assistente
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: assistantResponse
      }]);

      // Se sintomas suficientes, gera diagnóstico detalhado
      if (extractionResult.symptoms.length >= 2) {
        setTimeout(() => {
          const diagnosis = generateDiagnosis(extractionResult.symptoms);

          if (diagnosis) {
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
                  </div>
                )
              }
            ]);
          }
        }, 1200);
      }

    }, 500);

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
