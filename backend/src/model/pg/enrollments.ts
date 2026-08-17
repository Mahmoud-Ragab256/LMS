import Query from './connection.js';
import type { IEnrollment, ICreateEnrollment, IUpdateEnrollment, ICourseStudent } from '../../interfaces/index.js';
import AppError from '../../utils/appError.js';



export const createEnrollment = async (data: ICreateEnrollment): Promise<IEnrollment | undefined> => {
  try {
    const { studentId, courseId, paymentId, status = 'active' } = data;

    const query = `
    INSERT INTO enrollments (student_id, course_id, payment_id, status)
    VALUES ($1, $2, $3, $4)
    RETURNING student_id, course_id, payment_id, status, enrolled_at, updated_at;
  `;

    const result = await Query<IEnrollment>(query, [studentId, courseId, paymentId, status]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
};

export const getStudentEnrollments = async (studentId: number): Promise<IEnrollment[] | undefined> => {
  try {
    const query = `SELECT * FROM enrollments WHERE student_id = $1;`;
    const result = await Query<IEnrollment>(query, [studentId]);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const updateEnrollment = async (id: number, status: IUpdateEnrollment): Promise<IEnrollment | undefined> => {
  try {
    const query = `UPDATE enrollments SET status = $1 WHERE id = $2 RETURNING *;`;
    const result = await Query<IEnrollment>(query, [status, id]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}

export const getAllCourseStudents = async (courseId: number): Promise<ICourseStudent[] | undefined> => {
  try {
    const query = `
    SELECT s.id, s.username, s.email, s.phone , e.enrolled_at, e.status AS enrollment_status
    FROM enrollments e JOIN students s
    ON e.student_id = s.id WHERE e.course_id = $1
    ORDER BY e.enrolled_at DESC;
    `;
    const result = await Query<ICourseStudent>(query, [courseId]);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
}
