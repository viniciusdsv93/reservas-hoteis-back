"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllReservationGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class GetAllReservationGuestService {
    async execute(request, response) {
        const manyReservations = await prismaClient_1.prismaClient.reserve.findMany();
        const formattedData = manyReservations.map((reservationData) => {
            return {
                idHotel: reservationData.id_hotel,
                numeroReserva: reservationData.reservNum,
                apartamento: reservationData.apartment,
                dataCheckIn: reservationData.check_in_date,
                dataCheckOut: reservationData.check_out_date,
                status: reservationData.status,
            };
        });
        return response.status(200).json(formattedData);
    }
}
exports.GetAllReservationGuestService = GetAllReservationGuestService;
//# sourceMappingURL=getAllReservationGuestService.js.map