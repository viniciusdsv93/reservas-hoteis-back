import { Guest } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { CreateGuestService } from "./createGuestService";
import { CreateReserveGuestService } from "./createReserveGuestService";

const createGuestService = new CreateGuestService();
const createReserveGuestService = new CreateReserveGuestService();

export class CreateReservationGuestService {
	async execute(request: Request, response: Response) {
		const { guests } = request.body;

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

		const {
			id_hotel,
			reservationNumber,
			apartment,
			checkInDate,
			checkOutDate,
			status,
		} = request.body;

		const createdReservation = await prismaClient.reserve.create({
			data: {
				id_hotel: id_hotel,
				reservNum: reservationNumber,
				apartment: apartment,
				check_in_date: new Date(checkInDate),
				check_out_date: new Date(checkOutDate),
				status: parseInt(status),
			},
		});

		if (!createdReservation) {
			return response
				.status(500)
				.json({ error: true, why: "erro-ao-tentar-cadastrar-a-reserva" });
		}

		await createReserveGuestService.execute(createdReservation.id, newGuests);

		return response.status(201).json({ id: createdReservation.id });
	}
}
