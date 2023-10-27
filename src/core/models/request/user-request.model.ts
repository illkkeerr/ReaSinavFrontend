import { UserType } from "../user.model";

export class UserRequest {
   
    email?: string;
    fullName?: string; 
    userType?:UserType;
    balance?:number;
   
  }
  
  
 