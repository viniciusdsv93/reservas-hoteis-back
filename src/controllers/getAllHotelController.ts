import { Request, Response } from "express";
import { GetAllHotelService } from "../services/getAllHotelService";

const getAllHotelService = new GetAllHotelService();

export class GetAllHotelController {
	handle(request: Request, response: Response) {
		return getAllHotelService.execute(request, response);
	}
}
