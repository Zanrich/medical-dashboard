export interface Practice {
    id: string;
    name: string;
    telephone: string;
    email: string;
    dateCreated: string;
    status: 'active' | 'disabled';
  }
  
  export interface Notification {
    id: string;
    title: string;
    user: {
      name: string;
      avatar: string;
    };
    timestamp: string;
    read: boolean;
  }
  
  export interface DashboardStats {
    totalPractices: number;
    totalSubscribers: number;
    totalTreatments: number;
    totalConsents: number;
    totalConsentsSigned: number;
    totalFactSheets: number;
  }
  
  export interface ProgressStats {
    pending: number;
    registered: number;
    postTreatment: number;
  }