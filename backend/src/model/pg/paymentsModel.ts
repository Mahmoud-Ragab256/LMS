import Query from './connection.js';
import type { IPayment, ICreatePayment, IUpdatePaymentStatus } from '../../interfaces/index.js';
import AppError from '../../utils/appError.js';

export const createPayment = async (data: ICreatePayment): Promise<IPayment | undefined> => {
  try {
    const {
      studentId,
      courseId,
      amount,
      provider = 'paymob',
      providerOrderId,
      providerTransactionId,
      currency = 'EGP',
      paymentMethod,
      walletNumber,
      status = 'pending',
      rawResponse,
    } = data;

    const query = `
    INSERT INTO payments (
      student_id, course_id, amount, provider, provider_order_id,
      provider_transaction_id, currency, payment_method, wallet_number, status, raw_response
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
    `;

    const values = [
      studentId,
      courseId,
      amount,
      provider,
      providerOrderId || null,
      providerTransactionId || null,
      currency,
      paymentMethod || null,
      walletNumber || null,
      status,
      rawResponse ? JSON.stringify(rawResponse) : null,
    ];

    const result = await Query<IPayment>(query, values);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
};

export const updatePaymentByOrderId = async (providerOrderId: string, data: IUpdatePaymentStatus): Promise<IPayment | undefined> => {
  try {
    const { status, providerTransactionId, rawResponse, paymentMethod } = data;

    const query = `
    UPDATE payments
    SET
      status = $1,
      provider_transaction_id = COALESCE($2, provider_transaction_id),
      raw_response = COALESCE($3, raw_response),
      payment_method = COALESCE($4, payment_method),
      updated_at = NOW()
    WHERE provider_order_id = $5
    RETURNING *
    `;

    const values = [
      status,
      providerTransactionId || null,
      rawResponse ? JSON.stringify(rawResponse) : null,
      paymentMethod || null,
      providerOrderId,
    ];

    const result = await Query<IPayment>(query, values);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
};

export const getPaymentById = async (id: number): Promise<IPayment | undefined> => {
  try {
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const result = await Query<IPayment>(query, [id]);
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
};

export const getPaymentsByStudentId = async (studentId: number): Promise<IPayment[] | undefined> => {
  try {
    const query = `
    SELECT
      id, student_id AS "studentId", course_id AS "courseId", amount, provider,
      provider_order_id AS "providerOrderId", provider_transaction_id AS "providerTransactionId",
      currency, payment_method AS "paymentMethod", wallet_number AS "walletNumber",
      status, raw_response AS "rawResponse", created_at AS "createdAt", updated_at AS "updatedAt"
    FROM payments
    WHERE student_id = $1
    ORDER BY created_at DESC;
  `;
    const result = await Query<IPayment>(query, [studentId]);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(500, error.message)
    }
  }
};