import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import ResponseService from "../services/ResponseService";
import { JOI_ERRORS, TEXT } from "./JoiErrors";

export const URL_REGEX = /^[a-z0-9_-]+$/;
// Minimum eight characters, at least one letter, one number and one special character:
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const JOI = Joi.defaults((schema) => schema.messages(JOI_ERRORS));
export const publishValidationSchema = JOI.object({
  imageUrl: Joi.string().required(),
  imageAlt: Joi.string().required(),
  title: Joi.string().required(),
  shortDescription: Joi.string().required(),
  seoTitle: Joi.string().required(),
  seoDesctiption: Joi.string().required(),
  topic: Joi.string().required(),
  tags: Joi.array().required(),
  url: Joi.string().pattern(URL_REGEX).message(TEXT.ERRORS.wrongTypeUrl).required(),
  status: Joi.string(),
  similarArticles: Joi.array().max(3),
});

export const postValidationSchema = JOI.object({
  imageUrl: Joi.string().allow(""),
  imageAlt: Joi.string().allow(""),
  title: Joi.string().allow(""),
  shortDescription: Joi.string().allow(""),
  seoTitle: Joi.string().allow(""),
  seoDesctiption: Joi.string().allow(""),
  topic: Joi.string().allow(""),
  tags: Joi.array().allow(""),
  url: Joi.string().pattern(URL_REGEX).allow("").message(TEXT.ERRORS.wrongTypeUrl),
  status: Joi.string(),
  similarArticles: Joi.array().max(3),
});

const validateFields = async (schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body);
    return false;
  } catch (error: any) {
    ResponseService.error(next, error.message);
    return true;
  }
};

export const validateStatusFields = async (
  schema: Joi.ObjectSchema<any>,
  body: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validateAsync(body);
    return false;
  } catch (error: any) {
    ResponseService.error(next, error.message);
    return true;
  }
};

export default validateFields;
