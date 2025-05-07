import { handlers } from "@/app/api/auth/auth";
import { authConfig } from "@/app/api/auth/auth.config";

export const { GET, POST } = handlers;
export const runtime = 'edge'; // Опционально для Vercel