import { error } from 'node:console'
import z from 'zod'

const phoneRegex = /^\+[1-9]\d{1,14}$/

export const createTeacherSchema = z.object({
  username: z.string({
    error: (issue) => issue.input === undefined ? "username is required" : "username must be string"
  }).min(5, "username must be at least 5 characters")
    .max(20, "username must be not more than 20 characters")
    .trim(),

  email: z.email({
    error: (issue) => issue.input === undefined ? "email is required" : "not a valid email"
  }).trim(),

  phone: z.string({
    error: (issue) => issue.input === undefined ? "phone is required" : "not a valid phone number"
  }).regex(phoneRegex, "Phone number must be starting with 'country code' like '+201012345678'")
    .trim(),

  password: z.string({
    error: (issue) => issue.input === undefined ? "password is required" : "not a valid phone number"
  }).regex(/[A-Z]/, "password must contain at least one uppercase letter")
    .regex(/[a-z]/, "password must contain at least one lowercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "password must contain at least one special character")
    .min(8, "password must be at least 8 characters")
    .trim()
})