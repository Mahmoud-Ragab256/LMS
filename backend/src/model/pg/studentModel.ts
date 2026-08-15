import Query from './connection.js'
import type { IStudent, ICreateStudent, IUpdateStudent } from '../../interfaces/index.js'

export const createStudent = async (data: ICreateStudent): Promise<IStudent | undefined> => {
  try {
    const { username, email, password, phone, nid } = data;
    const query = `
  INSERT INTO students (username , email , password, phone, nid)
  VALUES ($1 , $2, $3, $4, $5)
  RETURNING *;
  `;
    const values = [username, email, password, phone, nid];
    const result = await Query<IStudent>(query, values);

    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export const getAllStudents = async (): Promise<IStudent[] | undefined> => {
  try {
    const query = `SELECT * FROM students ORDER BY id DESC;`;
    const result = await Query<IStudent>(query);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const getStudentById = async (id: number): Promise<IStudent | undefined> => {
  try {
    const query = `SELECT * FROM students WHERE id = $1;`;
    const result = await Query<IStudent>(query, [id]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export const updateStudent = async (id: number, data: IUpdateStudent): Promise<IStudent | undefined> => {
  try {
    const keys = Object.keys(data) as (keyof IUpdateStudent)[];
    if (keys.length === 0) return undefined;

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(key => data[key]);
    const query = `
    UPDATE students SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *;
    `;

    const result = await Query<IStudent>(query, [...values, id])
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export const deleteStudent = async (id: number): Promise<IStudent | undefined> => {
  try {
    const query = `DELETE * FROM students WHERE id = $1 RETURNING *;`;
    const result = await Query<IStudent>(query, [id]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
}