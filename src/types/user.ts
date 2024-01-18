export interface CreateUserInput {
    fullName?: string;
    email: string; 
    experience?: string;
    companyName?: string;
  }

export interface UserDetail{
    _id?: string;
    fullName: string;
  email: string; 
  experience: string;
  companyName: string;
}