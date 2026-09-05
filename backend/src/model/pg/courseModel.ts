import Query from "./connection.js";
import type { ICourse, ICourseFilter, ICreateCourse, IUpdateCourse } from '../../interfaces/index.js'
import AppError from "../../utils/appError.js";

export const createCourse = async (teacherId: number, data: ICreateCourse): Promise<ICourse | undefined> => {
  try {
    const { price, description, imgUrl } = data;
    const query = `
    INSERT INTO courses (price, description, img_url, teacher_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [price, description, imgUrl, teacherId];
    const result = await Query<ICourse>(query, values);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const getAllCourses = async (data: ICourseFilter): Promise<ICourse[] | undefined> => {
  try {
    const { category, level, search, min_price, max_price, sort_by, order, page = 1, limit = 100 } = data;
    let query = `SELECT * FROM courses WHERE 1 = 1`;
    const values = [];

    if (category) {
      values.push(category);
      query += `AND category = $${values.length}`;
    }

    if (level) {
      values.push(level);
      query += `AND level = $${values.length}`;
    }

    if (search) {
      values.push(search);
      query += `AND title ILIKE $${values.length}`;
    }

    if (min_price) {
      values.push(min_price);
      query += ` AND price >= $${values.length}`;
    }

    if (max_price) {
      values.push(max_price);
      query += ` AND price <= $${values.length}`;
    }

    const validSortFields = ['price', 'created_at', 'rating'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const offset = (page - 1) * limit;
    values.push(limit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await Query<ICourse>(query, values);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }

}

export const getTeacherCourses = async (teacherId: number): Promise<ICourse[] | undefined> => {
  try {
    const query = `SELECT * FROM courses WHERE teacher_id = $1 ORDER BY id DESC;`;
    const result = await Query<ICourse>(query, [teacherId]);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const getCourseById = async (id: number): Promise<ICourse | undefined> => {
  try {
    const query = `SELECT * FROM courses WHERE id = $1;`;
    const result = await Query<ICourse>(query, [id]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
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

    const result = await Query<ICourse>(query, [...values, id, teacherId]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const deleteCourse = async (id: number): Promise<ICourse | undefined> => {
  try {
    const query = `DELETE * FROM courses WHERE id = $1 RETURNING *;`;
    const result = await Query<ICourse>(query, [id]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}