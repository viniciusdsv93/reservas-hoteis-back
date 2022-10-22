import { Router } from "express";
import { UpdateHotelController } from "../controllers/updateHotelController";
import { CreateHotelController } from "../controllers/createHotelController";
import { GetHotelController } from "../controllers/getHotelController";
import { GetAllHotelController } from "../controllers/getAllHotelController";
import { CreateReservationGuestController } from "../controllers/createReservationGuestController";
import { GetReservationGuestController } from "../controllers/getReservationGuestController";
import { GetAllReservationGuestController } from "../controllers/getAllReservationGuestController";
import { UpdateReservationGuestController } from "../controllers/updateReservationGuestController";

const router = Router();

const getHotelController = new GetHotelController();
const createHotelController = new CreateHotelController();
const updateHotelController = new UpdateHotelController();
const getAllHotelController = new GetAllHotelController();

const getReservationGuestController = new GetReservationGuestController();
const createReservationGuestController = new CreateReservationGuestController();
const getAllReservationGuestController = new GetAllReservationGuestController();
const updateReservationGuestController = new UpdateReservationGuestController();

router.get("/test", (request, response) => response.json("ok"));
router.get("/buscarHotel", getAllHotelController.handle);
router.get("/buscarHotel/:CNPJ", getHotelController.handle);
router.put("/atualizarHotel", updateHotelController.handle);
router.post("/cadastrarHotel", createHotelController.handle);

router.get(
	"/buscarReservaHospede/:reservationNumber",
	getReservationGuestController.handle
);
router.get("/buscarReservaHospede", getAllReservationGuestController.handle);
router.put("/atualizarReservaHospede", updateReservationGuestController.handle);
router.post("/cadastrarReservaHospede", createReservationGuestController.handle);

export { router };
