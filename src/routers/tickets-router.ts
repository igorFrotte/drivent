import { listTypes, listTickets, createTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/tickets-schema";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", listTypes)
  .get("/", listTickets)
  .post("/", validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
