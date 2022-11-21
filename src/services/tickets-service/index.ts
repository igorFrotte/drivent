import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { TicketType, Ticket } from "@prisma/client";

async function listTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.findAllTypes();

  return ticketsTypes;
}

async function getTicketByEnrollmentId(id: number): Promise<Ticket> {
  const ticket = await ticketRepository.findTicketByEnrollment(id);

  if(!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  listTypes,
  getTicketByEnrollmentId
};

export default ticketsService;
