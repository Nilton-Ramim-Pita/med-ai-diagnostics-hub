
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PatientData } from "@/services/diagnosticService";

interface PatientDataPanelProps {
  patientData: PatientData;
  onChange: (field: keyof PatientData, value: string | number) => void;
}

const PatientDataPanel: React.FC<PatientDataPanelProps> = ({ patientData, onChange }) => (
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
            onChange={(e) => onChange("name", e.target.value)}
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
              onChange={(e) => onChange("age", parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="sex">Sexo</Label>
            <Select
              value={patientData.sex}
              onValueChange={(value) => onChange("sex", value)}
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
              onChange={(e) => onChange("weight", parseFloat(e.target.value) || 0)}
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
              onChange={(e) => onChange("height", parseInt(e.target.value) || 0)}
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
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PatientDataPanel;
