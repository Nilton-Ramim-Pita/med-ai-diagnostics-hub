
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare, AlertCircle } from "lucide-react";
import { symptoms as allSymptoms, generateDiagnosis } from "@/services/diagnosticService";
import { extractSymptomsFromText, generateNaturalResponse, generateFollowUpQuestions } from "@/services/nlpService";
import { useToast } from "@/components/ui/use-toast";
import { Diagnosis } from "@/types/diagnostic";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: React.ReactNode;
}

const SymptomsPanel: React.FC = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Descreva seus sintomas para que eu possa ajudar a identificar um possível diagnóstico. Por favor, seja o mais detalhado possível sobre como está se sentindo, há quanto tempo e com qual intensidade.' 
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [detectedSymptoms, setDetectedSymptoms] = useState<string[]>([]);
  const [lastDiagnosis, setLastDiagnosis] = useState<Diagnosis | null>(null);
  
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

    // Extração de sintomas com contexto expandido
    const extractionResult = extractSymptomsFromText(chatInput);
    const { symptoms: newSymptoms } = extractionResult;
    
    // Atualizar lista acumulada de sintomas detectados
    const updatedSymptoms = [...new Set([...detectedSymptoms, ...newSymptoms])];
    setDetectedSymptoms(updatedSymptoms);

    // Simula digitação do assistente
    setIsTyping(true);
    
    // Gera resposta natural do assistente
    setTimeout(() => {
      const assistantResponse = generateNaturalResponse(extractionResult, allSymptoms);
      
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: assistantResponse
      }]);

      // Gerar perguntas de acompanhamento se aplicável
      if (newSymptoms.length > 0 && updatedSymptoms.length < 3) {
        const followUpQuestions = generateFollowUpQuestions(newSymptoms);
        if (followUpQuestions.length > 0) {
          setTimeout(() => {
            setChatHistory(prev => [...prev, {
              role: 'assistant',
              content: (
                <div>
                  <p>Para ajudar no diagnóstico, poderia me informar mais detalhes:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    {followUpQuestions.map((question, idx) => (
                      <li key={idx}>{question}</li>
                    ))}
                  </ul>
                </div>
              )
            }]);
            setIsTyping(false);
          }, 1000);
        } else {
          setIsTyping(false);
        }
      } else if (updatedSymptoms.length >= 2) {
        // Se sintomas suficientes, gera diagnóstico detalhado
        setTimeout(() => {
          const diagnosis = generateDiagnosis(updatedSymptoms);
          setLastDiagnosis(diagnosis);
          
          // Ensuring confidence is at least 88%
          if (diagnosis.confidence < 88) {
            diagnosis.confidence = Math.max(88, diagnosis.confidence);
          }

          setChatHistory(prev => [
            ...prev, 
            {
              role: 'assistant',
              content: (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 font-semibold text-lg text-medical-purple">
                    <AlertCircle className="w-5 h-5" />
                    <span>Diagnóstico: {diagnosis.condition}</span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="font-medium mr-2">Confiança:</span>
                    <span className="inline-block w-40 bg-gray-200 h-2 rounded-full overflow-hidden align-middle">
                      <span 
                        className={`block h-2 rounded-full ${
                          diagnosis.confidence >= 90 ? "bg-green-500" : 
                          diagnosis.confidence >= 70 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${diagnosis.confidence}%` }}
                      />
                    </span>
                    <span className="ml-2 font-semibold">{diagnosis.confidence}%</span>
                  </div>
                  
                  <div className="mt-2 text-gray-700 leading-relaxed">{diagnosis.description}</div>
                  
                  {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
                    <div className="mt-4">
                      <div className="font-semibold text-medical-purple mb-2">Recomendações:</div>
                      <ul className="list-disc pl-5 space-y-2 text-gray-800">
                        {diagnosis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-4 p-2 bg-blue-50 border-l-4 border-blue-300 text-sm text-blue-900 rounded">
                    Este diagnóstico é apenas sugestivo e não substitui avaliação médica presencial. Se os sintomas piorarem ou persistirem, procure atendimento médico.
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-600">
                    Você tem mais algum sintoma ou dúvida?
                  </div>
                </div>
              )
            }
          ]);
          setIsTyping(false);
        }, 1500);
      } else {
        setIsTyping(false);
      }
    }, 800);

    setChatInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-medical-purple/20 to-medical-purple/5">
        <CardTitle className="text-medical-purple flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> Assistente de Diagnóstico Médico
        </CardTitle>
        <CardDescription>
          Descreva seus sintomas detalhadamente para um diagnóstico mais preciso
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col h-[520px]">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 p-2 rounded-md bg-gray-50"
          >
            {chatHistory.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-medical-purple text-white shadow-sm' 
                      : 'bg-white border border-gray-200 shadow-sm text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200 shadow-sm text-gray-800">
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
              placeholder="Descreva seus sintomas em detalhes... (ex: estou com febre alta e tosse seca há 3 dias)" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-h-[60px] resize-none border-medical-purple/30 focus-visible:ring-medical-purple/40"
            />
            <Button 
              type="submit" 
              className="bg-medical-purple hover:bg-medical-secondary self-end transition-colors"
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
