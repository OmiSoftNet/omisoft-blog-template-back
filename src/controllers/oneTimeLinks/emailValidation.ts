import Joi from "joi";
import { JOI } from "../../utils/validation";

export default JOI.object({
  email: Joi.string().strict().required(),
});
