import ticketRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function listTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.findAllTypes();

  return ticketsTypes;
}

const ticketsService = {
  listTypes
};

export default ticketsService;
