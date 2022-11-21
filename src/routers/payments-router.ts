import { createPayment, listPayments } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", listPayments)
  .post("/process", validateBody(paymentSchema), createPayment);

export { paymentsRouter };
