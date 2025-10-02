// src/types/index.ts
export interface AuthRequestUser {
  userId: string;
  role: string;
  email?: string;
}

export type Role = "ADMIN" | "USER";
