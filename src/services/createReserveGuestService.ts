import { Guest } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export class CreateReserveGuestService {
	async execute(reservationId: string, guests: Guest[]): Promise<void> {
		for await (let guest of guests) {
			const createReserveGuest = await prismaClient.reserveGuest.create({
				data: {
					id_reserve: reservationId,
					id_guest: guest.id,
				},
			});
		}
	}
}
