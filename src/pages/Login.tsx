
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authService } from "@/services/authService";
import { User, UserRound } from "lucide-react";

type UserRole = "Doutor" | "Enfermeiro";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !role || !password) {
      toast({
        title: "Campos incompletos",
        description: "Por favor preencha todos os campos",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const success = authService.login(username, role as UserRole, password);
      
      if (success) {
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vindo ${role} ${username}!`,
        });
        navigate("/diagnostico");
      } else {
        toast({
          title: "Falha na autenticação",
          description: "Usuário ou senha incorretos",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-light bg-gradient-to-br from-medical-soft to-white">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="border-medical-purple/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-medical-purple flex items-center justify-center">
                <UserRound size={40} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-medical-dark">Sistema de Diagnóstico Médico</CardTitle>
            <CardDescription className="text-center">Faça login para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Nome de usuário
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-gray-400">
                      <User size={18} />
                    </span>
                    <Input 
                      id="username"
                      placeholder="Seu nome de usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Categoria
                  </label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger className="w-full" id="role">
                      <SelectValue placeholder="Selecione sua categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Doutor">Doutor</SelectItem>
                        <SelectItem value="Enfermeiro">Enfermeiro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-medical-purple hover:bg-medical-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Autenticando..." : "Entrar"}
                </Button>
              </div>
              
              <div className="mt-4 text-xs text-center text-gray-500">
                <p>Para testes use: dr.silva / senha123</p>
                <p>ou: enfermeira.santos / senha123</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4 text-xs text-medical-dark/60">
            © 2025 Sistema de Diagnóstico Médico
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
