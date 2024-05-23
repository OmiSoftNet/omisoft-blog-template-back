class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  data: { [key: string]: string } | undefined;

  constructor(message: string, statusCode?: number, trace?: string, data?: { [key: string]: string }) {
    super(message);

    this.statusCode = statusCode || 400;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
