import { UUID } from "crypto";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'USER' | 'ADMIN';
    createdAt?: string;
  }