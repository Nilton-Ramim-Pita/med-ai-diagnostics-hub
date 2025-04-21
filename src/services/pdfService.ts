
import { jsPDF } from "jspdf";
import { PatientData, Diagnosis } from "./diagnosticService";
import { authService } from "./authService";

export const generateDiagnosisPDF = (
  patientData: PatientData,
  selectedSymptoms: string[],
  diagnosis: Diagnosis,
  symptomNames: Record<string, string>
): void => {
  const doc = new jsPDF();
  
  // Get current user
  const currentUser = authService.getCurrentUser();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(155, 135, 245); // Medical purple
  doc.text("Relatório de Diagnóstico Médico", 105, 20, { align: "center" });
  
  // Add date
  const today = new Date();
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Data: ${today.toLocaleDateString('pt-BR')}`, 105, 30, { align: "center" });
  
  // Add divider
  doc.setDrawColor(155, 135, 245);
  doc.line(20, 35, 190, 35);
  
  // Patient information
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Dados do Paciente", 20, 45);
  
  doc.setFontSize(11);
  doc.text(`Nome: ${patientData.name}`, 20, 55);
  doc.text(`Idade: ${patientData.age} anos`, 20, 62);
  doc.text(`Sexo: ${patientData.sex}`, 100, 62);
  doc.text(`Peso: ${patientData.weight} kg`, 20, 69);
  doc.text(`Altura: ${patientData.height} cm`, 100, 69);
  
  if (patientData.notes) {
    doc.text("Observações:", 20, 76);
    const splitNotes = doc.splitTextToSize(patientData.notes, 170);
    doc.text(splitNotes, 20, 83);
  }
  
  // Professional information
  const yPos = patientData.notes ? 95 + (Math.floor(patientData.notes.length / 70) * 7) : 95;
  
  doc.setFontSize(14);
  doc.text("Profissional Responsável", 20, yPos);
  
  doc.setFontSize(11);
  doc.text(`Nome: ${currentUser?.username || "Não identificado"}`, 20, yPos + 10);
  doc.text(`Categoria: ${currentUser?.role || "Não identificada"}`, 20, yPos + 17);
  
  // Symptoms
  doc.setFontSize(14);
  doc.text("Sintomas Relatados", 20, yPos + 30);
  
  doc.setFontSize(11);
  const symptomsText = selectedSymptoms.map(id => symptomNames[id] || id).join(", ");
  const splitSymptoms = doc.splitTextToSize(symptomsText, 170);
  doc.text(splitSymptoms, 20, yPos + 40);
  
  // Diagnosis
  const diagYPos = yPos + 40 + (Math.floor(symptomsText.length / 70) * 7) + 10;
  
  doc.setFontSize(14);
  doc.setTextColor(155, 135, 245);
  doc.text(`Diagnóstico: ${diagnosis.condition}`, 20, diagYPos);
  
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(`Confiança: ${diagnosis.confidence}%`, 20, diagYPos + 10);
  
  const splitDesc = doc.splitTextToSize(diagnosis.description, 170);
  doc.text(splitDesc, 20, diagYPos + 20);
  
  // Recommendations
  const recoYPos = diagYPos + 20 + (Math.floor(diagnosis.description.length / 70) * 7) + 10;
  
  doc.setFontSize(14);
  doc.text("Recomendações", 20, recoYPos);
  
  doc.setFontSize(11);
  diagnosis.recommendations.forEach((rec, i) => {
    doc.text(`• ${rec}`, 20, recoYPos + 10 + (i * 7));
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Este é um diagnóstico automatizado e não substitui a avaliação médica presencial.", 105, 280, { align: "center" });
  
  // Save the PDF
  doc.save(`diagnostico_${patientData.name.replace(/\s+/g, "_")}.pdf`);
};
