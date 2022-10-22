"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHotelController = void 0;
const getAllHotelService_1 = require("../services/getAllHotelService");
const getAllHotelService = new getAllHotelService_1.GetAllHotelService();
class GetAllHotelController {
    handle(request, response) {
        return getAllHotelService.execute(request, response);
    }
}
exports.GetAllHotelController = GetAllHotelController;
//# sourceMappingURL=getAllHotelController.js.map