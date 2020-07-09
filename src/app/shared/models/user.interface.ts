export interface User {
  uid?: string;
  token?: string;
  name?: string;
  firstSurname?: string;
  lastSurname?: string;
  email?: string;
  password?: string;
  phone?: string;
  type?: string;
  role?: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface UserVerified {
  userId: string;
  fullName: string;
  rol: string;
  job: string;
}
