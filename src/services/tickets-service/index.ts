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

async function createTicket( enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  const ticketId = await ticketRepository.insertTicket(enrollmentId, ticketTypeId);
  const ticket = await getTicketById(ticketId);
  
  return ticket;
}

async function getTicketById( id: number) {
  const ticket = await ticketRepository.findTicketById(id);

  if(!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  listTypes,
  getTicketByEnrollmentId,
  createTicket
};

export default ticketsService;
