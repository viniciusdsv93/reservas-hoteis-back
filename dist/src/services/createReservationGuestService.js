"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const createGuestService_1 = require("./createGuestService");
const createReserveGuestService_1 = require("./createReserveGuestService");
const createGuestService = new createGuestService_1.CreateGuestService();
const createReserveGuestService = new createReserveGuestService_1.CreateReserveGuestService();
class CreateReservationGuestService {
    async execute(request, response) {
        const { guests } = request.body;
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
        const { id_hotel, reservationNumber, apartment, checkInDate, checkOutDate, status, } = request.body;
        const createdReservation = await prismaClient_1.prismaClient.reserve.create({
            data: {
                id_hotel: id_hotel,
                reservNum: reservationNumber,
                apartment: apartment,
                check_in_date: new Date(checkInDate),
                check_out_date: new Date(checkOutDate),
                status: parseInt(status),
            },
        });
        if (!createdReservation) {
            return response
                .status(500)
                .json({ error: true, why: "erro-ao-tentar-cadastrar-a-reserva" });
        }
        await createReserveGuestService.execute(createdReservation.id, newGuests);
        return response.status(201).json({ id: createdReservation.id });
    }
}
exports.CreateReservationGuestService = CreateReservationGuestService;
//# sourceMappingURL=createReservationGuestService.js.map