"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationGuestController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const createReservationGuestService_1 = require("../services/createReservationGuestService");
const createReservationGuestService = new createReservationGuestService_1.CreateReservationGuestService();
class CreateReservationGuestController {
    async handle(request, response) {
        const { id_hotel, reservationNumber, apartment, checkInDate, checkOutDate, status, guests, } = request.body;
        if (!id_hotel) {
            return response
                .status(400)
                .json({ error: true, why: "id-do-hotel-é-um-campo-obrigatório" });
        }
        const existsHotel = await prismaClient_1.prismaClient.hotel.findUnique({
            where: {
                id: id_hotel,
            },
        });
        if (!existsHotel) {
            return response
                .status(400)
                .json({ error: true, why: "hotel-não-cadastrado" });
        }
        if (!reservationNumber) {
            return response
                .status(400)
                .json({ error: true, why: "número-da-reserva-é-um-campo-obrigatório" });
        }
        if (!apartment) {
            return response
                .status(400)
                .json({ error: true, why: "apartamento-é-um-campo-obrigatório" });
        }
        if (!checkInDate) {
            return response
                .status(400)
                .json({ error: true, why: "data-de-check-in-é-um-campo-obrigatório" });
        }
        if (!checkOutDate) {
            return response
                .status(400)
                .json({ error: true, why: "data-de-check-out-é-um-campo-obrigatório" });
        }
        if (!status) {
            return response
                .status(400)
                .json({ error: true, why: "status-é-um-campo-obrigatório" });
        }
        if (!guests) {
            return response
                .status(400)
                .json({ error: true, why: "hóspedes-é-um-campo-obrigatório" });
        }
        if (!Array.isArray(guests)) {
            return response
                .status(400)
                .json({ error: true, why: "hóspedes-deve-ser-uma-lista" });
        }
        if ((guests === null || guests === void 0 ? void 0 : guests.length) === 0) {
            return response
                .status(400)
                .json({ error: true, why: "é-preciso-indicar-pelo-menos-um-hóspede" });
        }
        let guestsError = false;
        guests === null || guests === void 0 ? void 0 : guests.map((guest) => {
            if (!guest.name) {
                guestsError = true;
            }
            if (!guest.lastName) {
                guestsError = true;
            }
        });
        if (guestsError) {
            return response.status(400).json({
                error: true,
                why: "deve-ser-informado-o-nome-e-o-sobrenome-de-todos-os-hóspedes",
            });
        }
        return createReservationGuestService.execute(request, response);
    }
}
exports.CreateReservationGuestController = CreateReservationGuestController;
//# sourceMappingURL=createReservationGuestController.js.map