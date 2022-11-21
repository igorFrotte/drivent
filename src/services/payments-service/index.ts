import { unauthorizedError } from "@/errors";
import { CardData, Ticket } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function checkEnrollmentByUser(enrollmentId: number, userId: number) {
  const enrollment = await paymentRepository.findEnrollmentById(enrollmentId);

  if(userId !== enrollment.userId) throw unauthorizedError();

  return;
}

async function getPaymentByTicket(ticketId: number) {
  const payment = paymentRepository.findPaymentByTicket(ticketId);

  return payment;
}

async function createPayment( ticket: Ticket, cardData: CardData) {
  cardData.number = Number(String(cardData.number).slice(-4));
  ticket.price = (await ticketRepository.findTicketTypeById(ticket.ticketTypeId)).price;
  const payment = await paymentRepository.insertPayment(ticket, cardData);

  await ticketRepository.updateTicket(ticket.id);

  const obj = {
    ...payment,
    ticketId: ticket.id
  };

  return obj;
}

const paymentService = {
  checkEnrollmentByUser,
  getPaymentByTicket,
  createPayment
};

export default paymentService;
