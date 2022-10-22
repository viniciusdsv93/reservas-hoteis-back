"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllReservationGuestController = void 0;
const getAllReservationGuestService_1 = require("../services/getAllReservationGuestService");
const getAllReservationGuestService = new getAllReservationGuestService_1.GetAllReservationGuestService();
class GetAllReservationGuestController {
    handle(request, response) {
        return getAllReservationGuestService.execute(request, response);
    }
}
exports.GetAllReservationGuestController = GetAllReservationGuestController;
//# sourceMappingURL=getAllReservationGuestController.js.map