export interface User {
    id: string;
    createdAt: string; 
    updatedAt: string;  
    firstName: string;
    lastName: string;
    email: string;
    role: string;  
    isActive: boolean;
    ssoPlatform: string | null;  
    uniqueSsoProfileId: string | null;  
  }
  
  export interface FindUsersResponse {
    users: User[];
    total: number;
  }
  