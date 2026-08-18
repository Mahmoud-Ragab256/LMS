import Query from './connection.js'
import type { ITeacher, ICreateTeacher, IUpdateTeacher } from '../../interfaces/index.js'
import AppError from '../../utils/appError.js';


export const createTeacher = async (data: ICreateTeacher): Promise<ITeacher | undefined> => {
  try {
    const { username, email, phone, password } = data;
    const query = `
  INSERT INTO teachers (username , email, phone , password)
  values ($1 , $2 , $3 , $4)
  RETURNING *;
  `;
    const values = [username, email, phone, password];
    const result = await Query<ITeacher>(query, values);
    delete (result[0] as any).password
    return result[0];
  } catch (error: any) {
    if (error.code === '23505') {
      throw new AppError(409, "email is already exist")
    }
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const getAllTeachers = async (): Promise<ITeacher[] | undefined> => {
  try {
    const query = `SELECT * FROM teachers ORDER BY id DESC;`;
    const result = await Query<ITeacher>(query);
    delete (result as any).password
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}
export const getTeacherById = async (id: number): Promise<ITeacher | undefined> => {
  try {
    const query = `SELECT * FROM teachers WHERE id = $1;`;
    const result = await Query<ITeacher>(query, [id]);
    delete (result[0] as any).password
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}
export const getTeacherByEmail = async (email: string): Promise<ITeacher | undefined> => {
  try {
    const query = `SELECT * FROM teachers WHERE email = $1;`;
    const result = await Query<ITeacher>(query, [email]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const updatedTeacher = async (id: number, data: IUpdateTeacher): Promise<ITeacher | undefined> => {
  try {
    const keys = Object.keys(data) as (keyof IUpdateTeacher)[]
    if (!keys.length) return undefined;

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map((key) => data[key]);

    const query = `
    UPDATE teachers SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *;
    `;

    const result = await Query<ITeacher>(query, [...values, id]);
    delete (result[0] as any).password
    return result[0];

  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const deleteTeacher = async (id: number): Promise<ITeacher | undefined> => {
  try {
    const query = `DELETE * FROM teachers WHERE id = $1 RETURNING *;`;
    const result = await Query<ITeacher>(query, [id]);
    delete (result[0] as any).password
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}