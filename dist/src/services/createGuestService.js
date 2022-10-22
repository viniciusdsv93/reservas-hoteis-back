"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuestService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class CreateGuestService {
    async execute(guestData) {
        const { name, lastName } = guestData;
        const createdGuest = await prismaClient_1.prismaClient.guest.create({
            data: {
                name: name,
                last_name: lastName,
            },
        });
        return createdGuest;
    }
}
exports.CreateGuestService = CreateGuestService;
//# sourceMappingURL=createGuestService.js.map