"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHotelController = void 0;
const getHotelSetvice_1 = require("../services/getHotelSetvice");
const getHotelService = new getHotelSetvice_1.GetHotelService();
class GetHotelController {
    handle(request, response) {
        const { CNPJ } = request.params;
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
        return getHotelService.execute(request, response);
    }
}
exports.GetHotelController = GetHotelController;
//# sourceMappingURL=getHotelController.js.map