import { z } from 'zod';

export const signupSchema = z.object({
    firstName: z.string().min(2, "First name required.").max(50),
    lastName: z.string().min(2, "Last name required.").max(50),
    username: z.string().min(3, "Username required.").max(50),
    password: z.string().min(6, "Password required.").max(50),
});
  
export const changePasswordSchema = z.object({
    password: z.string().min(6, "Password is required.").max(50),
});