import pool from './connection.js'
import type { ITeacher, ICreateTeacher, IUpdateTeacher } from '../../interfaces/index.js'


export const createTeacher = async (data: ICreateTeacher): Promise<ITeacher | undefined> => {
  try {
    const { username, email, phone, password } = data
    const query = `
  INSERT INTO teachers (username , email, phone , password)
  values ($1 , $2 , $3 , $4)
  RETURNING *;
  `;
    const values = [username, email, phone, password]
    const result = await pool.query<ITeacher>(query, values)
    return result.rows[0]
  } catch (error) {
    console.error(error)
  }
}

export const getAllTeachers = async (): Promise<ITeacher[] | undefined> => {
  try {
    const query = `SELECT * FROM teachers ORDER BY id DESC;`;
    const result = await pool.query<ITeacher[]>(query)
    return result.rows[0]
  } catch (error) {
    console.error(error)
  }
}
export const getTeacherById = async (id: number): Promise<ITeacher | undefined> => {
  try {
    const query = `SELECT * FROM teachers WHERE id = $1;`;
    const result = await pool.query<ITeacher>(query, [id])
    return result.rows[0]
  } catch (error) {
    console.error(error)
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

    const result = await pool.query<ITeacher>(query, [...values, id]);
    return result.rows[0];

  } catch (error) {
    console.error(error)
  }
}

export const deleteTeacher = async (id: number): Promise<ITeacher | undefined> => {
  try {
    const query = `DELETE * FROM teachers WHERE id = $1 RETURNING *;`;
    const result = await pool.query<ITeacher>(query, [id])
    return result.rows[0]
  } catch (error) {
    console.error(error)
  }
}