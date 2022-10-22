import { Request, Response } from "express";
import { UpdateHotelService } from "../services/updateHotelService";

const updateHotelService = new UpdateHotelService();

export class UpdateHotelController {
	handle(request: Request, response: Response) {
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

		return updateHotelService.execute(request, response);
	}
}
