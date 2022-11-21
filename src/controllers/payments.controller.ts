import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listPayments(req: AuthenticatedRequest, res: Response) {
  if(req.query.ticketId === undefined) return res.sendStatus(httpStatus.BAD_REQUEST);

  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  try {
    const enrollmentId = (await ticketsService.getTicketById(ticketId)).enrollmentId;

    await paymentService.checkEnrollmentByUser(enrollmentId, userId);

    const payment = await paymentService.getPaymentByTicket(ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;

  try {
    const enrollmentId = (await ticketsService.getTicketById(ticketId)).enrollmentId;

    await paymentService.checkEnrollmentByUser(enrollmentId, userId);

    const ticket = await ticketsService.getTicketByEnrollmentId(enrollmentId);
    const payment = await paymentService.createPayment(ticket, cardData);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
