import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRooms(id: number) {
  return prisma.room.findMany({
    where: {
      hotelId: Number(id)
    },
    include: {
      Hotel: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findRooms
};

export default hotelRepository;
