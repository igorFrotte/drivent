import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollment( id: number ) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id
    },
    include: {
      TicketType: true
    }
  });
}

async function insertTicket( enrollmentId: number, ticketTypeId: number ) {
  return (await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
      updatedAt: new Date()
    }
  })).id;
}

async function updateTicket( id: number) {
  return prisma.ticket.update({
    where: {
      id
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}

async function findTicketById( id: number ) {
  return prisma.ticket.findFirst({
    where: {
      id
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketTypeById( id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id
    }
  });
}

const ticketRepository = {
  findAllTypes,
  findTicketByEnrollment,
  insertTicket,
  findTicketById,
  findTicketTypeById,
  updateTicket
};

export default ticketRepository;
