
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import SymptomsPanel from "@/components/SymptomsPanel";

const Diagnostico = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-medical-light">
      <header className="bg-medical-purple text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Sistema de Diagnóstico Médico</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          <SymptomsPanel />
        </div>
      </main>
      <footer className="bg-medical-purple/10 py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Sistema de Diagnóstico Médico - Para uso educacional
        </div>
      </footer>
    </div>
  );
};

export default Diagnostico;
