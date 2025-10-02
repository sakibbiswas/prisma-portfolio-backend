// src/modules/auth/auth.types.ts
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: "OWNER" | "USER";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  role?: string;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: string;
}
