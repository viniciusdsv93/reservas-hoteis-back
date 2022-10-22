import { Guest } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { CleanReserveGuestFromAReserve } from "./cleanReserveGuestFromAReserve";
import { CreateGuestService } from "./createGuestService";
import { CreateReserveGuestService } from "./createReserveGuestService";

const createGuestService = new CreateGuestService();
const createReserveGuestService = new CreateReserveGuestService();
const cleanReserveGuestFromAReserve = new CleanReserveGuestFromAReserve();

export class UpdateReservationGuestService {
	async execute(request: Request, response: Response) {
		const reservationExists = await prismaClient.reserve.findUnique({
			where: {
				reservNum: request.body.reservationNumber,
			},
		});

		if (!reservationExists) {
			return response
				.status(404)
				.json({ error: true, why: "reserva-não-localizada" });
		}

		const {
			id_hotel,
			reservationNumber,
			apartment,
			checkInDate,
			checkOutDate,
			status,
			guests,
		} = request.body;

		let newGuests: Guest[] = [];

		for await (let guest of guests) {
			const existsGuest = await prismaClient.guest.findFirst({
				where: {
					name: guest.name,
					last_name: guest.lastName,
				},
			});

			if (existsGuest) {
				newGuests.push(existsGuest);
			} else {
				const createdGuest = await createGuestService.execute(guest);
				newGuests.push(createdGuest);
			}
		}

		const updatedReservation = await prismaClient.reserve.update({
			data: {
				id_hotel: id_hotel,
				reservNum: reservationNumber,
				apartment: apartment,
				check_in_date: new Date(checkInDate),
				check_out_date: new Date(checkOutDate),
				status: parseInt(status),
			},
			where: {
				reservNum: request.body.reservationNumber,
			},
		});

		if (!updatedReservation) {
			return response.status(500).json({
				error: true,
				why: "erro-ao-tentar-atualizar-dados-da-reserva-informada",
			});
		}

		await cleanReserveGuestFromAReserve.execute(updatedReservation.id);

		await createReserveGuestService.execute(updatedReservation.id, newGuests);

		return response.status(204).json({ message: "reserva-atualizada-com-sucesso" });
	}
}
