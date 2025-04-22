
import React, { useState, useEffect } from "react";
import { Diagnosis } from "@/services/diagnosticService";
import { cn } from "@/lib/utils";

interface ChatDiagnosticProps {
  isLoading: boolean;
  diagnosis: Diagnosis | null;
}

const ChatDiagnostic: React.FC<ChatDiagnosticProps> = ({ isLoading, diagnosis }) => {
  const [typedDiagnosis, setTypedDiagnosis] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [showConfidence, setShowConfidence] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Reset state when diagnosis changes
  useEffect(() => {
    if (diagnosis) {
      setTypedDiagnosis("");
      setTypedDescription("");
      setShowConfidence(false);
      setShowRecommendations(false);
      
      // Start typing animation for diagnosis
      let diagnosisIndex = 0;
      const diagnosisInterval = setInterval(() => {
        if (diagnosisIndex < diagnosis.condition.length) {
          setTypedDiagnosis(prev => prev + diagnosis.condition[diagnosisIndex]);
          diagnosisIndex++;
        } else {
          clearInterval(diagnosisInterval);
          setShowConfidence(true);
          
          // Start typing animation for description after 500ms
          setTimeout(() => {
            let descIndex = 0;
            const descInterval = setInterval(() => {
              if (descIndex < diagnosis.description.length) {
                setTypedDescription(prev => prev + diagnosis.description[descIndex]);
                descIndex++;
              } else {
                clearInterval(descInterval);
                
                // Show recommendations after 500ms
                setTimeout(() => {
                  setShowRecommendations(true);
                }, 500);
              }
            }, 10); // Faster typing for description
          }, 500);
        }
      }, 60); // Slower typing for diagnosis
      
      return () => {
        clearInterval(diagnosisInterval);
      };
    }
  }, [diagnosis]);
  
  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center">
        <div className="text-xl font-medium text-medical-purple mb-4">
          Analisando sintomas e gerando diagnóstico
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-full bg-medical-purple animate-bounce-dot-1"></div>
          <div className="w-4 h-4 rounded-full bg-medical-purple animate-bounce-dot-2"></div>
          <div className="w-4 h-4 rounded-full bg-medical-purple animate-bounce-dot-3"></div>
        </div>
      </div>
    );
  }
  
  if (!diagnosis) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 min-h-[200px]">
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-medical-purple flex items-center justify-center text-white text-lg font-semibold">
            AI
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Assistente de Diagnóstico</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="chat-message">
            <h3 className="text-lg font-semibold">
              <span className="text-medical-purple">Diagnóstico: </span>
              {typedDiagnosis}
              {typedDiagnosis.length < (diagnosis?.condition?.length || 0) && (
                <span className="animate-pulse">|</span>
              )}
            </h3>
          </div>
          
          {showConfidence && (
            <div 
              className="chat-confidence flex items-center transition-opacity duration-300"
              style={{ opacity: showConfidence ? 1 : 0 }}
            >
              <div className="font-medium mr-2">Confiança:</div>
              <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    diagnosis.confidence >= 80 ? "bg-green-500" :
                    diagnosis.confidence >= 60 ? "bg-yellow-500" :
                    "bg-red-500"
                  )}
                  style={{ width: `${diagnosis.confidence}%` }}
                ></div>
              </div>
              <div className="ml-2 text-sm font-medium">{diagnosis.confidence}%</div>
            </div>
          )}
          
          <div className="chat-description">
            <p className="text-gray-700">
              {typedDescription}
              {typedDescription.length < (diagnosis?.description?.length || 0) && (
                <span className="animate-pulse">|</span>
              )}
            </p>
          </div>
          
          {showRecommendations && diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
            <div 
              className="chat-recommendations transition-all duration-500"
              style={{ 
                opacity: showRecommendations ? 1 : 0,
                transform: showRecommendations ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h4 className="font-semibold text-medical-purple mt-4 mb-2">
                Recomendações:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {diagnosis.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-gray-700">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDiagnostic;
