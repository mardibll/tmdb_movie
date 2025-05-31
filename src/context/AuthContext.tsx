import { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
  sessionId: string | null;
  setSessionId: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem('session_id'));

  const updateSessionId = (id: string) => {
    setSessionId(id);
    localStorage.setItem('session_id', id);
  };

  return (
    <AuthContext.Provider value={{ sessionId, setSessionId: updateSessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
