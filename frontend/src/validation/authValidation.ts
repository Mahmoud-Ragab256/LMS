import z from 'zod'

const phoneRegex = /^\+[1-9]\d{1,14}$/
const egyptianNationalIdRegex = /^(2|3)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d{5}$/

export const registerStudentSchema = z.object({
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
    error: (issue) => issue.input === undefined ? "password is required" : "not a valid password"
  }).refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(val);
    const isLongEnough = val.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  }, {
    message: "Password must be at-least 8 characters includes lowercase, uppercase, number and special characters"
  }).trim(),

  nid: z.string({
    error: (issue) => issue.input === undefined ? "national id is required" : "not a valid national id"
  }).regex(egyptianNationalIdRegex, "Egyptian national id not valid")
    .trim()
});


export const registerTeacherSchema = z.object({
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
    error: (issue) => issue.input === undefined ? "password is required" : "not a valid password"
  }).refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(val);
    const isLongEnough = val.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  }, {
    message: "Password must be at-least 8 characters includes lowercase, uppercase, number and special characters"
  }).trim(),
});


export const loginSchema = z.object({
  email: z.email({
    error: (issue) => issue.input === undefined ? "email is required" : "not a valid email"
  }).trim(),

  password: z.string({
    error: (issue) => issue.input === undefined ? "password is required" : "not a valid password"
  }).trim()
});