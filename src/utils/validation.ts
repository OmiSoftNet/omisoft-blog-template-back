import Joi from "joi";
import { Request, Response } from "express";
import ResponseService from "./ResponseService";
import { JOI_ERRORS, TEXT } from "./JoiErrors";

export const URL_REGEX = /^[a-z0-9_-]+$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/;

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

const validateFields = async (schema: Joi.ObjectSchema<any>, req: Request, res: Response) => {
  try {
    await schema.validateAsync(req.body);
    return false;
  } catch (error: any) {
    ResponseService.error(res, error.message);
    return true;
  }
};

export const validateStatusFields = async (schema: Joi.ObjectSchema<any>, body: any, res: Response) => {
  try {
    await schema.validateAsync(body);
    return false;
  } catch (error: any) {
    ResponseService.error(res, error.message);
    return true;
  }
};

export default validateFields;
