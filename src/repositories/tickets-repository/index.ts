import { prisma } from "@/config";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollment( id: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  findAllTypes,
  findTicketByEnrollment
};

export default ticketRepository;
