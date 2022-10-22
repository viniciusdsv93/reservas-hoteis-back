"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHotelService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class GetHotelService {
    async execute(request, response) {
        const { CNPJ } = request.params;
        const hotelData = await prismaClient_1.prismaClient.hotel.findUnique({
            where: {
                CNPJ: CNPJ,
            },
        });
        if (!hotelData) {
            return response.status(404).json({ message: "hotel-não-localizado" });
        }
        const formattedData = {
            id: hotelData.id,
            nome: hotelData.name,
            cnpj: hotelData.CNPJ,
            pais: hotelData.country,
            estado: hotelData.state,
            cidade: hotelData.city,
        };
        return response.status(200).json(formattedData);
    }
}
exports.GetHotelService = GetHotelService;
//# sourceMappingURL=getHotelSetvice.js.map