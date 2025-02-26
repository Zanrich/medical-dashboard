'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface Practice {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface PracticeContextType {
  selectedPractice: Practice | null;
  setSelectedPractice: (practice: Practice | null) => void;
  clearSelectedPractice: () => void; // Added this function
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);

  // Add the clear function
  const clearSelectedPractice = () => {
    setSelectedPractice(null);
  };

  return (
    <PracticeContext.Provider
      value={{
        selectedPractice,
        setSelectedPractice,
        clearSelectedPractice,
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
