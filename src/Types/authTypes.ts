
export interface LoginResponse {
    user: {
      id: string;
      email: string;
      role: string;
    };
    token: {
        accessToken: string;
        refreshToken: string;
      };
  }
  
 
  export interface ErrorType {
    message: string;
  }
  
 
  