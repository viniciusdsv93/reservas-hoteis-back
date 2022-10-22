import { Request, Response } from "express";
import { GetReservationGuestService } from "../services/getReservationGuestService";

const getReservationGuestService = new GetReservationGuestService();

export class GetReservationGuestController {
	handle(request: Request, response: Response) {
		const { reservationNumber } = request.params;

		if (!reservationNumber) {
			return response
				.status(400)
				.json({ error: true, why: "número-de-reserva-é-um-campo-obrigatório" });
		}

		return getReservationGuestService.execute(request, response);
	}
}
