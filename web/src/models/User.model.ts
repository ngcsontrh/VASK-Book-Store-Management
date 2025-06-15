export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export enum UserRole {
  Admin = "admin",
  Customer = "customer",
}
