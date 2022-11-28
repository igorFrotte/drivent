import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(id: number) {
  return prisma.hotel.findUnique({
    where: {
      id
    },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findHotelRooms
};

export default hotelRepository;
