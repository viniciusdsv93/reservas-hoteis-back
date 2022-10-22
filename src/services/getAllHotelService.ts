import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetAllHotelService {
	async execute(request: Request, response: Response) {
		const manyHotels = await prismaClient.hotel.findMany();

		const formattedData = manyHotels.map((hotelData) => {
			return {
				id: hotelData.id,
				nome: hotelData.name,
				cnpj: hotelData.CNPJ,
				pais: hotelData.country,
				estado: hotelData.state,
				cidade: hotelData.city,
			};
		});

		return response.status(200).json(formattedData);
	}
}
