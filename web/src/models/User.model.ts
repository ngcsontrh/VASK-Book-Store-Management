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

export interface UserShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export enum UserRole {
  Admin = "admin",
  Customer = "customer",
}
