"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReservationGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const cleanReserveGuestFromAReserve_1 = require("./cleanReserveGuestFromAReserve");
const createGuestService_1 = require("./createGuestService");
const createReserveGuestService_1 = require("./createReserveGuestService");
const createGuestService = new createGuestService_1.CreateGuestService();
const createReserveGuestService = new createReserveGuestService_1.CreateReserveGuestService();
const cleanReserveGuestFromAReserve = new cleanReserveGuestFromAReserve_1.CleanReserveGuestFromAReserve();
class UpdateReservationGuestService {
    async execute(request, response) {
        const reservationExists = await prismaClient_1.prismaClient.reserve.findUnique({
            where: {
                reservNum: request.body.reservationNumber,
            },
        });
        if (!reservationExists) {
            return response
                .status(404)
                .json({ error: true, why: "reserva-não-localizada" });
        }
        const { id_hotel, reservationNumber, apartment, checkInDate, checkOutDate, status, guests, } = request.body;
        let newGuests = [];
        for await (let guest of guests) {
            const existsGuest = await prismaClient_1.prismaClient.guest.findFirst({
                where: {
                    name: guest.name,
                    last_name: guest.lastName,
                },
            });
            if (existsGuest) {
                newGuests.push(existsGuest);
            }
            else {
                const createdGuest = await createGuestService.execute(guest);
                newGuests.push(createdGuest);
            }
        }
        const updatedReservation = await prismaClient_1.prismaClient.reserve.update({
            data: {
                id_hotel: id_hotel,
                reservNum: reservationNumber,
                apartment: apartment,
                check_in_date: new Date(checkInDate),
                check_out_date: new Date(checkOutDate),
                status: parseInt(status),
            },
            where: {
                reservNum: request.body.reservationNumber,
            },
        });
        if (!updatedReservation) {
            return response.status(500).json({
                error: true,
                why: "erro-ao-tentar-atualizar-dados-da-reserva-informada",
            });
        }
        await cleanReserveGuestFromAReserve.execute(updatedReservation.id);
        await createReserveGuestService.execute(updatedReservation.id, newGuests);
        return response.status(204).json({ message: "reserva-atualizada-com-sucesso" });
    }
}
exports.UpdateReservationGuestService = UpdateReservationGuestService;
//# sourceMappingURL=updateReservationGuestService.js.map