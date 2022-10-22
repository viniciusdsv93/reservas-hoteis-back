"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReserveGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class CreateReserveGuestService {
    async execute(reservationId, guests) {
        for await (let guest of guests) {
            const createReserveGuest = await prismaClient_1.prismaClient.reserveGuest.create({
                data: {
                    id_reserve: reservationId,
                    id_guest: guest.id,
                },
            });
        }
    }
}
exports.CreateReserveGuestService = CreateReserveGuestService;
//# sourceMappingURL=createReserveGuestService.js.map