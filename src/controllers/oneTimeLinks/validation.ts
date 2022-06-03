import Joi from "joi";
import { JOI } from "../../utils/validation";

export default JOI.object({
  token: Joi.string().strict().required(),
});
