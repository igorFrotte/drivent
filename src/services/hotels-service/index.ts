import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

export async function getHotels() {
  return await hotelRepository.findHotels();
}

export async function getHotelRooms(id: number) {
  const hotelRooms = await hotelRepository.findHotelRooms(id);

  if(!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelService = {
  getHotels,
  getHotelRooms
};
    
export default hotelService;
