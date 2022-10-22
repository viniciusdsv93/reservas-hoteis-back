"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const updateHotelController_1 = require("../controllers/updateHotelController");
const createHotelController_1 = require("../controllers/createHotelController");
const getHotelController_1 = require("../controllers/getHotelController");
const getAllHotelController_1 = require("../controllers/getAllHotelController");
const createReservationGuestController_1 = require("../controllers/createReservationGuestController");
const getReservationGuestController_1 = require("../controllers/getReservationGuestController");
const getAllReservationGuestController_1 = require("../controllers/getAllReservationGuestController");
const updateReservationGuestController_1 = require("../controllers/updateReservationGuestController");
const router = (0, express_1.Router)();
exports.router = router;
const getHotelController = new getHotelController_1.GetHotelController();
const createHotelController = new createHotelController_1.CreateHotelController();
const updateHotelController = new updateHotelController_1.UpdateHotelController();
const getAllHotelController = new getAllHotelController_1.GetAllHotelController();
const getReservationGuestController = new getReservationGuestController_1.GetReservationGuestController();
const createReservationGuestController = new createReservationGuestController_1.CreateReservationGuestController();
const getAllReservationGuestController = new getAllReservationGuestController_1.GetAllReservationGuestController();
const updateReservationGuestController = new updateReservationGuestController_1.UpdateReservationGuestController();
router.get("/test", (request, response) => response.json("ok"));
router.get("/buscarHotel", getAllHotelController.handle);
router.get("/buscarHotel/:CNPJ", getHotelController.handle);
router.put("/atualizarHotel", updateHotelController.handle);
router.post("/cadastrarHotel", createHotelController.handle);
router.get("/buscarReservaHospede/:reservationNumber", getReservationGuestController.handle);
router.get("/buscarReservaHospede", getAllReservationGuestController.handle);
router.put("/atualizarReservaHospede", updateReservationGuestController.handle);
router.post("/cadastrarReservaHospede", createReservationGuestController.handle);
//# sourceMappingURL=routes.js.map