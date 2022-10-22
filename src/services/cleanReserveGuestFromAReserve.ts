import { prismaClient } from "../database/prismaClient";

export class CleanReserveGuestFromAReserve {
	async execute(reservationId: string) {
		await prismaClient.reserveGuest.deleteMany({
			where: {
				id_reserve: reservationId,
			},
		});
	}
}
