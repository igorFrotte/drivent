import { prisma } from "@/config";

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

const paymentRepository = {
  findEnrollmentById,
  findPaymentByTicket
};

export default paymentRepository;
