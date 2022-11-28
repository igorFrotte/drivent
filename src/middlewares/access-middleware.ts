import { AuthenticatedRequest, generateUnauthorizedResponse } from "./authentication-middleware";
import { NextFunction, Response } from "express";
import { prisma } from "@/config";

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

    if(!enrollment) return generateUnauthorizedResponse(res);

    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId: enrollment.id
      },
      include: {
        TicketType: true
      }
    });

    if(!ticket || !ticket.TicketType.includesHotel || ticket.status !== "PAID")
      return generateUnauthorizedResponse(res);
        
    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}
