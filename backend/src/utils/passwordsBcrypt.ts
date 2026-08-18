import bcrypt from 'bcrypt'

export const hashingPassword = async (password: string): Promise<string> => {
  if (!process.env.SALT_ROUNDS || !process.env.PEPPER) throw new Error("salt rounds or pepper doesn't exist")
  const salt = parseInt(process.env.SALT_ROUNDS as string);
  if (isNaN(salt)) throw new Error("salt rounds must be a valid number")
  const hashedPassword = await bcrypt.hash(`${password}${process.env.PEPPER}`, salt);
  return hashedPassword;
}

export const comparingPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  if (!process.env.PEPPER) throw new Error("pepper doesn't exist")
  const isMatch = await bcrypt.compare(`${password}${process.env.PEPPER}`, hashedPassword)
  return isMatch
}