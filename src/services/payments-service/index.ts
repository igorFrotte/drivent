import { unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";

async function checkEnrollmentByUser(enrollmentId: number, userId: number) {
  const enrollment = await paymentRepository.findEnrollmentById(enrollmentId);

  if(userId !== enrollment.userId) throw unauthorizedError();

  return;
}

async function getPaymentByTicket(ticketId: number) {
  const payment = paymentRepository.findPaymentByTicket(ticketId);
  return payment;
}

const paymentService = {
  checkEnrollmentByUser,
  getPaymentByTicket
};

export default paymentService;
