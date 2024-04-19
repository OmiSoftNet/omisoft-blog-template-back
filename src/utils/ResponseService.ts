import { Response } from "express";

class ResponseService {
  static success(res: Response, data?: any, code?: number) {
    return res.status(code ?? 200).json(data);
  }
  static error(res: Response, errorMsg: string, errorCode?: number) {
    return res.status(errorCode ?? 400).json({
      error: errorMsg,
    });
  }
}

export default ResponseService;
