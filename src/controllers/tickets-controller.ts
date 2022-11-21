import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.listTypes();

    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
