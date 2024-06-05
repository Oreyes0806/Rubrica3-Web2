import { Router } from "express"
import { allRooms, createRoom, deleteRoomById, searchRoombyId, updateRoomById } from "../controllers/roomsControllers.js";

const roomsRoutes = Router();

roomsRoutes.get('/', allRooms);
roomsRoutes.get('/:id', searchRoombyId);
roomsRoutes.post('/', createRoom); 
roomsRoutes.delete('/:id', deleteRoomById);
roomsRoutes.put('/:id', updateRoomById)
export default roomsRoutes; 