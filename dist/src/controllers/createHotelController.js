"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelController = void 0;
const createHotelService_1 = require("../services/createHotelService");
const createHotelService = new createHotelService_1.CreateHotelService();
class CreateHotelController {
    handle(request, response) {
        const { name, CNPJ, country, state, city } = request.body;
        if (!name) {
            return response
                .status(400)
                .json({ error: true, why: "nome-é-um-campo-obrigatório" });
        }
        if (!CNPJ) {
            return response
                .status(400)
                .json({ error: true, why: "CNPJ-é-um-campo-obrigatório" });
        }
        if (CNPJ.length !== 14) {
            return response
                .status(400)
                .json({ error: true, why: "formato-inválido-para-o-CNPJ" });
        }
        if (!country) {
            return response
                .status(400)
                .json({ error: true, why: "país-é-um-campo-obrigatório" });
        }
        if (!state) {
            return response
                .status(400)
                .json({ error: true, why: "estado-é-um-campo-obrigatório" });
        }
        if (!city) {
            return response
                .status(400)
                .json({ error: true, why: "cidade-é-um-campo-obrigatório" });
        }
        return createHotelService.execute(request, response);
    }
}
exports.CreateHotelController = CreateHotelController;
//# sourceMappingURL=createHotelController.js.map