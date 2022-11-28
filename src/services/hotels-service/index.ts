import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

export async function getHotels() {
  return await hotelRepository.findHotels();
}

export async function getRooms(id: number) {
  const hotelRooms = await hotelRepository.findRooms(id);

  if(!hotelRooms.length) throw notFoundError();

  return hotelRooms;
}

const hotelService = {
  getHotels,
  getRooms
};
    
export default hotelService;
