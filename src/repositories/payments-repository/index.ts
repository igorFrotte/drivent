import { prisma } from "@/config";
import { CardData, Ticket } from "@/protocols";

async function findEnrollmentById(id: number) {
  return prisma.enrollment.findUnique({
    where: {
      id
    }
  });
}

async function findPaymentByTicket(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id
    }
  });
}

async function insertPayment(ticket: Ticket, cardData: CardData) {
  return await prisma.payment.create({
    data: {
      ticketId: ticket.id,
      value: ticket.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number)
    }
  });
}

const paymentRepository = {
  findEnrollmentById,
  findPaymentByTicket,
  insertPayment
};

export default paymentRepository;
