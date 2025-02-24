import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Practice {
  id: string;
  name: string;
  logo?: string;
}

interface PracticeContextType {
  selectedPractice: Practice | null;
  setSelectedPractice: (practice: Practice | null) => void;
  clearSelectedPractice: () => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

// Define practice-specific routes
const practiceSpecificRoutes = ['/users', '/patients'];

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const location = useLocation();

  // Clear selected practice when navigating to non-practice routes
  useEffect(() => {
    const isInPracticeRoute = practiceSpecificRoutes.some(route => 
      location.pathname.startsWith(route)
    );
    
    if (!isInPracticeRoute && location.pathname !== '/dashboard') {
      setSelectedPractice(null);
    }
  }, [location.pathname]);

  const clearSelectedPractice = () => {
    setSelectedPractice(null);
  };

  return (
    <PracticeContext.Provider 
      value={{ 
        selectedPractice, 
        setSelectedPractice, 
        clearSelectedPractice 
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};