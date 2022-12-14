import { capacityError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";
import hotelService from "../hotels-service";

async function getBooking( id: number) {
  const booking = await bookingRepository.findBookingByUserId(id);
  if(!booking)
    throw notFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await hotelService.getHotels(userId);

  const room = await roomRepository.findRoomById(roomId);
  if(!room)
    throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);
  if(bookings.length >= room.capacity)
    throw capacityError();
    
  const userBooking = await bookingRepository.findBookingByUserId(userId);
  if(userBooking)
    throw capacityError();

  return await bookingRepository.createBooking(userId, roomId);
}

async function updateBooking(bookingId: number, roomId: number, userId: number) {
  await hotelService.getHotels(userId);

  const room = await roomRepository.findRoomById(roomId);
  if(!room)
    throw notFoundError();
  
  const bookings = await bookingRepository.findBookingsByRoomId(roomId);
  if(bookings.length >= room.capacity)
    throw capacityError();
      
  const userBooking = await bookingRepository.findBookingByUserId(userId);
  if(userBooking.roomId === roomId || !userBooking || userBooking.id !== bookingId)
    throw capacityError();
    
  return await bookingRepository.updateBooking(bookingId, roomId);
}

const bookingsService = {
  getBooking,
  createBooking,
  updateBooking
};

export default bookingsService;
