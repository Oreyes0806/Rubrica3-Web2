import { Router } from "express";
import { createBooking, updateBookingById, deleteBookingById, allBookingsByUser } from "../controllers/bookingsControllers.js";

const bookingsRoutes = Router()
bookingsRoutes.get('/:id',allBookingsByUser)
bookingsRoutes.post('/', createBooking)
bookingsRoutes.put('/:id', updateBookingById)
bookingsRoutes.delete('/:id', deleteBookingById)
export default bookingsRoutes;