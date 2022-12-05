import { AuthenticatedRequest } from "@/middlewares";
import bookingsService from "@/services/bookings-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBooking(userId);

    return res.status(httpStatus.OK).send(
      {
        id: booking.id,
        Room: booking.Room
      }
    );
  } catch (error) {
    if(error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  if (!roomId)
    return res.sendStatus(httpStatus.NOT_FOUND);

  try {
    const booking = await bookingsService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if(error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "CannotListHotelsError" || error.name === "CapacityError")
      return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);
  
  try {
    const booking = await bookingsService.updateBooking(bookingId, roomId, userId);
  
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if(error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "CannotListHotelsError" || error.name === "CapacityError")
      return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
