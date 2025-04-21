
// Simple authentication service for simulation purposes

type UserRole = "Doutor" | "Enfermeiro";

interface User {
  username: string;
  role: UserRole;
  password: string;
}

// Mock user database
const users: User[] = [
  { username: "dr.silva", role: "Doutor", password: "senha123" },
  { username: "enfermeira.santos", role: "Enfermeiro", password: "senha123" }
];

// Current logged in user
let currentUser: User | null = null;

export const authService = {
  login: (username: string, role: UserRole, password: string): boolean => {
    const user = users.find(u => 
      u.username === username && 
      u.role === role && 
      u.password === password
    );
    
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        role: user.role
      }));
      return true;
    }
    
    return false;
  },
  
  logout: (): void => {
    currentUser = null;
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser: () => {
    if (currentUser) return currentUser;
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      currentUser = users.find(u => 
        u.username === user.username && 
        u.role === user.role
      ) || null;
      return currentUser;
    }
    
    return null;
  },
  
  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  }
};
