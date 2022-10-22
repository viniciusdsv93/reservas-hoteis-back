import { Request, Response } from "express";
import { GetAllReservationGuestService } from "../services/getAllReservationGuestService";

const getAllReservationGuestService = new GetAllReservationGuestService();

export class GetAllReservationGuestController {
	handle(request: Request, response: Response) {
		return getAllReservationGuestService.execute(request, response);
	}
}
