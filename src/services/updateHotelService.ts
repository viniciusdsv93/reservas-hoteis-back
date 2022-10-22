import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UpdateHotelService {
	async execute(request: Request, response: Response) {
		const hotelExists = await prismaClient.hotel.findUnique({
			where: {
				CNPJ: request.body.CNPJ,
			},
		});

		if (!hotelExists) {
			return response
				.status(400)
				.json({ error: true, why: "hotel-não-localizado" });
		}

		const { name, CNPJ, country, state, city } = request.body;

		const updatedHotel = await prismaClient.hotel.update({
			data: {
				name,
				CNPJ,
				country,
				state,
				city,
			},
			where: { CNPJ: CNPJ },
		});

		if (!updatedHotel) {
			return response.status(500).json({
				error: true,
				why: "erro-ao-tentar-atualizar-dados-do-hotel-informado",
			});
		}

		return response.status(204).json({ message: "hotel-atualizado-com-sucesso" });
	}
}
