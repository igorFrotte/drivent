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

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingsByRoomId,
  createBooking,
  updateBooking
};

export default bookingRepository;
