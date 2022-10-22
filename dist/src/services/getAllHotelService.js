"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHotelService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class GetAllHotelService {
    async execute(request, response) {
        const manyHotels = await prismaClient_1.prismaClient.hotel.findMany();
        const formattedData = manyHotels.map((hotelData) => {
            return {
                id: hotelData.id,
                nome: hotelData.name,
                cnpj: hotelData.CNPJ,
                pais: hotelData.country,
                estado: hotelData.state,
                cidade: hotelData.city,
            };
        });
        return response.status(200).json(formattedData);
    }
}
exports.GetAllHotelService = GetAllHotelService;
//# sourceMappingURL=getAllHotelService.js.map