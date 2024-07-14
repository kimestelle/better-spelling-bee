export interface User {
    username: string;
    password: string;
    email?: string;
    emailUpdates?: boolean;
  }
  
  class UserDataService {
    private static instance: UserDataService;
  
    private constructor() {}
  
    public static getInstance(): UserDataService {
      if (!UserDataService.instance) {
        UserDataService.instance = new UserDataService();
      }
      return UserDataService.instance;
    }
  
    // Mock login function
    public login(user: User): boolean {
      return user.username === 'user' && user.password === 'pass';
    }
  
    // Mock signup function
    public signUp(user: User): boolean {
      return user.username !== '' && user.password !== '';
    }
  }
  
  export default UserDataService.getInstance();
  