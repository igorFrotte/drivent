import { TicketStatus } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

//Regra de Negócio
export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type Ticket = {
  id: number,
  status: TicketStatus,
  ticketTypeId: number,
  enrollmentId: number,
  createdAt: Date,
  updateAt?: Date,
  price?: number
}

export type CardData = {
  issuer: "VISA" | "MASTERCARD",
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}
