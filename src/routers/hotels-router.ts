import { Router } from "express";
import { authenticateToken, userHasHotelAccess } from "@/middlewares";
import { getHotels } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, userHasHotelAccess)
  .get("", getHotels);

export { hotelsRouter };
