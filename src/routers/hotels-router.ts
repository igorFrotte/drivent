import { Router } from "express";
import { authenticateToken, userHasHotelAccess } from "@/middlewares";
import { getHotels, getRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, userHasHotelAccess)
  .get("", getHotels)
  .get("/:hotelId", getRooms);

export { hotelsRouter };
