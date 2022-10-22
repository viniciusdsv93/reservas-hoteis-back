"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservationGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class GetReservationGuestService {
    async execute(request, response) {
        const { reservationNumber } = request.params;
        const reservationData = await prismaClient_1.prismaClient.reserve.findUnique({
            where: {
                reservNum: reservationNumber,
            },
            include: {
                ReserveGuest: {
                    select: {
                        guest: true,
                    },
                },
            },
        });
        if (!reservationData) {
            return response.status(404).json({ message: "reserva-não-localizada" });
        }
        const formattedGuestData = reservationData.ReserveGuest.map((guestData) => {
            return {
                idHospede: guestData.guest.id,
                nome: guestData.guest.name,
                sobrenome: guestData.guest.last_name,
            };
        });
        const formattedData = {
            idHotel: reservationData.id_hotel,
            numeroReserva: reservationData.reservNum,
            apartamento: reservationData.apartment,
            dataCheckIn: reservationData.check_in_date,
            dataCheckOut: reservationData.check_out_date,
            status: reservationData.status,
            hospedes: formattedGuestData,
        };
        return response.status(200).json(formattedData);
    }
}
exports.GetReservationGuestService = GetReservationGuestService;
//# sourceMappingURL=getReservationGuestService.js.map