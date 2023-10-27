/*
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
    public bool IsMale { get; set; } = default!;
    public byte[] PasswordSalt { get; set; } = default!;
    public byte[] PasswordHash { get; set; } = default!;
    public UserType UserType { get; set; } = UserType.Member;*/
export class User {
  id: number = 0;
  email?: string;
  fullName?: string; 
  userType?: UserType;
  createdAt?:Date;
  balance?:number;
}

export enum UserType {
  Admin,
  Employee,
  Customer
  
}
