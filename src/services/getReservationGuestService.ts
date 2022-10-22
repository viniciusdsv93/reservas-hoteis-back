import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetReservationGuestService {
	async execute(request: Request, response: Response) {
		const { reservationNumber } = request.params;

		const reservationData = await prismaClient.reserve.findUnique({
			where: {
				reservNum: reservationNumber,
			},
			include: {
				ReserveGuest: {
					select: {
						guest: true,
					},
				},
			},
		});

		if (!reservationData) {
			return response.status(404).json({ message: "reserva-não-localizada" });
		}

		const formattedGuestData = reservationData.ReserveGuest.map((guestData) => {
			return {
				idHospede: guestData.guest.id,
				nome: guestData.guest.name,
				sobrenome: guestData.guest.last_name,
			};
		});

		const formattedData = {
			idHotel: reservationData.id_hotel,
			numeroReserva: reservationData.reservNum,
			apartamento: reservationData.apartment,
			dataCheckIn: reservationData.check_in_date,
			dataCheckOut: reservationData.check_out_date,
			status: reservationData.status,
			hospedes: formattedGuestData,
		};

		return response.status(200).json(formattedData);
	}
}
