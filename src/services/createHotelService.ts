import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateHotelService {
	async execute(request: Request, response: Response) {
		const hotelExists = await prismaClient.hotel.findUnique({
			where: {
				CNPJ: request.body.CNPJ,
			},
		});

		if (hotelExists) {
			return response.status(400).json({ error: true, why: "hotel-já-cadastrado" });
		}

		const { name, CNPJ, country, state, city } = request.body;

		const createdHotel = await prismaClient.hotel.create({
			data: {
				name,
				CNPJ,
				country,
				state,
				city,
			},
		});

		return response.status(201).json({ id: createdHotel.id });
	}
}
