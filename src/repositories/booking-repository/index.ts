import { prisma } from "@/config";

async function findBookingByUserId(id: number) {
  return prisma.booking.findFirst({
    where: {
      userId: id
    },
    include: {
      Room: true
    }
  });
}

async function findBookingsByRoomId(id: number) {
  return prisma.booking.findMany({
    where: {
      roomId: id
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingsByRoomId,
  createBooking
};

export default bookingRepository;
