"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservationGuestController = void 0;
const getReservationGuestService_1 = require("../services/getReservationGuestService");
const getReservationGuestService = new getReservationGuestService_1.GetReservationGuestService();
class GetReservationGuestController {
    handle(request, response) {
        const { reservationNumber } = request.params;
        if (!reservationNumber) {
            return response
                .status(400)
                .json({ error: true, why: "número-de-reserva-é-um-campo-obrigatório" });
        }
        return getReservationGuestService.execute(request, response);
    }
}
exports.GetReservationGuestController = GetReservationGuestController;
//# sourceMappingURL=getReservationGuestController.js.map