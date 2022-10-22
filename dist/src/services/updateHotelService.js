"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelService = void 0;
const prismaClient_1 = require("../database/prismaClient");
class UpdateHotelService {
    async execute(request, response) {
        const hotelExists = await prismaClient_1.prismaClient.hotel.findUnique({
            where: {
                CNPJ: request.body.CNPJ,
            },
        });
        if (!hotelExists) {
            return response
                .status(400)
                .json({ error: true, why: "hotel-não-localizado" });
        }
        const { name, CNPJ, country, state, city } = request.body;
        const updatedHotel = await prismaClient_1.prismaClient.hotel.update({
            data: {
                name,
                CNPJ,
                country,
                state,
                city,
            },
            where: { CNPJ: CNPJ },
        });
        if (!updatedHotel) {
            return response.status(500).json({
                error: true,
                why: "erro-ao-tentar-atualizar-dados-do-hotel-informado",
            });
        }
        return response.status(204).json({ message: "hotel-atualizado-com-sucesso" });
    }
}
exports.UpdateHotelService = UpdateHotelService;
//# sourceMappingURL=updateHotelService.js.map