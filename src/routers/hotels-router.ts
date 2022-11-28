import { Router } from "express";
import { authenticateToken, userHasHotelAccess } from "@/middlewares";
import { getHotels, getHotelRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, userHasHotelAccess)
  .get("", getHotels)
  .get("/:hotelId", getHotelRooms);

export { hotelsRouter };
