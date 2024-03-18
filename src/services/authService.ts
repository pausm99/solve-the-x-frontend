export default {
  
    getToken(): string | null {
      return localStorage.getItem('token');
    },

    setToken(token: string): void {
      localStorage.setItem('token', token);
    },
  
    isLoggedIn(): boolean {
      return this.getToken() !== null;
    }    
  
  };
  