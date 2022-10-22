import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetAllReservationGuestService {
	async execute(request: Request, response: Response) {
		const manyReservations = await prismaClient.reserve.findMany();

		const formattedData = manyReservations.map((reservationData) => {
			return {
				idHotel: reservationData.id_hotel,
				numeroReserva: reservationData.reservNum,
				apartamento: reservationData.apartment,
				dataCheckIn: reservationData.check_in_date,
				dataCheckOut: reservationData.check_out_date,
				status: reservationData.status,
			};
		});

		return response.status(200).json(formattedData);
	}
}
