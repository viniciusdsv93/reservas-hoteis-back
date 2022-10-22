import { Request, Response } from "express";
import { GetHotelService } from "../services/getHotelSetvice";

const getHotelService = new GetHotelService();

export class GetHotelController {
	handle(request: Request, response: Response) {
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
