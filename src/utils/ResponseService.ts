import { Response } from "express";

class ResponseService {
  static success(res: Response, data: any) {
    res.json(data);
  }
  static error(res: Response, errorCode?: number, errorMsg?: string) {
    errorMsg
      ? res.status(errorCode ?? 400).json({
          error: errorMsg,
        })
      : res.status(errorCode ?? 400).end();
  }
}

export default ResponseService;
