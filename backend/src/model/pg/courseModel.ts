import pool from "./connection.js";
import type { ICourse, ICreateCourse, IUpdateCourse } from '../../interfaces/index.js'

export const createCourse = async (teacherId: number, data: ICreateCourse): Promise<ICourse | undefined> => {
  try {
    const { price, description, img_url } = data;
    const query = `
    INSERT INTO courses (price, description, img_url, teacher_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [price, description, img_url, teacherId];
    const result = await pool.query<ICourse>(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export const getAllCourses = async (): Promise<ICourse[] | undefined> => {
  try {
    const query = `SELECT * FROM courses ORDER BY id DESC;`;
    const result = await pool.query<ICourse[]>(query);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }

}

export const getTeacherCourses = async (teacherId: number): Promise<ICourse[] | undefined> => {
  try {
    const query = `SELECT * FROM courses WHERE teacher_id = $1 ORDER BY id DESC;`;
    const result = await pool.query<ICourse[]>(query, [teacherId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export const getCourseById = async (id: number): Promise<ICourse | undefined> => {
  try {
    const query = `SELECT * FROM courses WHERE id = $1;`;
    const result = await pool.query<ICourse>(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export const updateCourse = async (id: number, teacherId: number, data: IUpdateCourse): Promise<ICourse | undefined> => {
  try {
    const keys = Object.keys(data) as (keyof IUpdateCourse)[];
    if (keys.length === 0) return undefined;

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map(key => data[key]);
    const query = `
    UPDATE courses SET ${setClause}
    WHERE id = $${keys.length + 1} AND teacher_id = $${keys.length + 2}
    RETURNING *;
    `;

    const result = await pool.query<ICourse>(query, [...values, id, teacherId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export const deleteCourse = async (id: number): Promise<ICourse | undefined> => {
  try {
    const query = `DELETE * FROM courses WHERE id = $1 RETURNING *;`;
    const result = await pool.query<ICourse>(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}