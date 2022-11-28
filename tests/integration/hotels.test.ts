import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnrollmentWithAddress, createHotel, createRoom, createTicket, createTicketType, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async function() {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/hotels");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser(); 
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when user doesnt have an enrollment yet", async () => {
      const token = await generateValidToken();
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when user doesnt have a ticket yet", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when user doesnt have a paid ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when the paid ticket is online", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(false, false);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and with hotels data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(false, true);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createHotel();
      
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      ]));
    });
  });
});

describe("GET /hotels/:hotelId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/hotels/1");
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser(); 
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  describe("when token is valid", () => {
    it("should respond with status 404 when user doesnt have an enrollment yet", async () => {
      const token = await generateValidToken();
      const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  
    it("should respond with status 404 when user doesnt have a ticket yet", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);
      const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  
    it("should respond with status 404 when user doesnt have a paid ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  
    it("should respond with status 404 when the paid ticket is online", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(false, false);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when hotelId isnt valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(false, true);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
  
      const response = await server.get("/hotels/10").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("Should respond with status 200 and array containing existing rooms' data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(false, true);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const hotel = await createHotel();
      const room = await createRoom(hotel.id); 
      const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        createdAt: hotel.createdAt.toISOString(),
        updatedAt: hotel.updatedAt.toISOString(),
        Rooms: [
          {
            id: room.id,
            name: expect.any(String),
            capacity: room.capacity,
            hotelId: hotel.id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        ],
      });
    });
  });
});
