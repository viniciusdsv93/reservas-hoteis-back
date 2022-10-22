"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class CreateHotelService {
    async execute(request, response) {
        const hotelExists = await prismaClient_1.prismaClient.hotel.findUnique({
            where: {
                CNPJ: request.body.CNPJ,
            },
        });
        if (hotelExists) {
            return response.status(400).json({ error: true, why: "hotel-já-cadastrado" });
        }
        const { name, CNPJ, country, state, city } = request.body;
        const createdHotel = await prismaClient_1.prismaClient.hotel.create({
            data: {
                name,
                CNPJ,
                country,
                state,
                city,
            },
        });
        return response.status(201).json({ id: createdHotel.id });
    }
}
exports.CreateHotelService = CreateHotelService;
//# sourceMappingURL=createHotelService.js.map