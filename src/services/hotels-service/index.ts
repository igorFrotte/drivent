import hotelRepository from "@/repositories/hotel-repository";

export async function getHotels() {
  return await hotelRepository.findHotels();
}

const hotelService = {
  getHotels
};
    
export default hotelService;
