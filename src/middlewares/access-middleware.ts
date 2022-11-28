import { AuthenticatedRequest, generateUnauthorizedResponse } from "./authentication-middleware";
import { NextFunction, Response } from "express";
import { prisma } from "@/config";
import httpStatus from "http-status";

export async function userHasHotelAccess( req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId
      },
      include: {
        Address: true
      }
    });

    if(!enrollment) return res.status(httpStatus.NOT_FOUND).send();

    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId: enrollment.id
      },
      include: {
        TicketType: true
      }
    });

    if(!ticket || !ticket.TicketType.includesHotel || ticket.status !== "PAID")
      return res.status(httpStatus.NOT_FOUND).send();
        
    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}
