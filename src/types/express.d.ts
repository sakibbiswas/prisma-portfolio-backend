// src/types/express.d.ts
import { JWTPayload } from "../controllers/auth.controller";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
