import { GuestData } from "../types/guestData";
import { prismaClient } from "../database/prismaClient";

export class CreateGuestService {
	async execute(guestData: GuestData) {
		const { name, lastName } = guestData;

		const createdGuest = await prismaClient.guest.create({
			data: {
				name: name,
				last_name: lastName,
			},
		});

		return createdGuest;
	}
}
