import type { Response } from "express";
import { ResponseHandler } from "../utils/res-handler";

export class BaseController {

    response(response: Response): ResponseHandler{
        return new ResponseHandler(response);
    }

}