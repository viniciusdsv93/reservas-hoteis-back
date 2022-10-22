"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanReserveGuestFromAReserve = void 0;
const prismaClient_1 = require("../database/prismaClient");
class CleanReserveGuestFromAReserve {
    async execute(reservationId) {
        await prismaClient_1.prismaClient.reserveGuest.deleteMany({
            where: {
                id_reserve: reservationId,
            },
        });
    }
}
exports.CleanReserveGuestFromAReserve = CleanReserveGuestFromAReserve;
//# sourceMappingURL=cleanReserveGuestFromAReserve.js.map