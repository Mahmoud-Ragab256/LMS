import z from 'zod';

export const updateCourseSchema = z.object({
  title: z.string().min(5, "Title must be at-least 5 characters").trim().optional(),
  description: z.string().min(30, 'Description must be at-least 30 characters').trim().optional(),
  price: z.number().positive('Price must be positive number').optional(),
  imgUrl: z.string().refine(
    (val) => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(val) || val.startsWith('/'),
    { message: 'Image url must be valid with extension .(jpg|jpeg|png|webp|avif|svg)' }
  ).optional()
});


export const createCourseSchema = z.object({
  title: z.string().min(5, "Title must be at-least 5 characters").trim(),
  description: z.string().min(30, 'Description must be at-least 30 characters').trim(),
  price: z.number().positive('Price must be positive number'),
  imgUrl: z.string().refine(
    (val) => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(val) || val.startsWith('/'),
    { message: 'Image url must be valid with extension .(jpg|jpeg|png|webp|avif|svg)' }
  )
});