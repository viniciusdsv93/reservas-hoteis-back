import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetHotelService {
	async execute(request: Request, response: Response) {
		const { CNPJ } = request.params;

		const hotelData = await prismaClient.hotel.findUnique({
			where: {
				CNPJ: CNPJ,
			},
		});

		if (!hotelData) {
			return response.status(404).json({ message: "hotel-não-localizado" });
		}

		const formattedData = {
			id: hotelData.id,
			nome: hotelData.name,
			cnpj: hotelData.CNPJ,
			pais: hotelData.country,
			estado: hotelData.state,
			cidade: hotelData.city,
		};

		return response.status(200).json(formattedData);
	}
}
