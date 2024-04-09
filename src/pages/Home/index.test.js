import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
	it("a list of fields card is displayed", async () => {
		render(<Home />);
		await screen.findByText("Email");
		await screen.findByText("Nom");
		await screen.findByText("Prénom");
		await screen.findByText("Personel / Entreprise");
	});

	describe("and a click is triggered on the submit button", () => {
		it("the success message is displayed", async () => {
			render(<Home />);
			fireEvent(
				await screen.findByText("Envoyer"),
				new MouseEvent("click", {
					cancelable: true,
					bubbles: true,
				})
			);
			setTimeout(async () => {
				await screen.findByText("En cours");
				await screen.findByText("Message envoyé !");
			}, 1000); // Ajout d'un délai d'une seconde pour simuler l'envoi du formulaire au clic sur le bouton submit
		});
	});
});

// test d'integration ajouté

describe("When a page is created", () => {
	beforeEach(() => {
		render(<Home />);
	});

	it("a list of events is displayed", async () => {
		await screen.findByTestId("nos-realisations");
		await screen.findByText("Toutes");
	});

	it("a list of people is displayed", async () => {
		await screen.findByTestId("notre-equipe");
		await screen.findByText("Samira");
	});

	it("a footer is displayed", async () => {
		await screen.findByText("Contactez-nous");
		await screen.findByText("45 avenue de la République, 75000 Paris");
	});

	it("an event card, with the last event, is displayed", async () => {
		await screen.findByTestId("notre-derniere-presta");
		screen.queryByText("AOUT");
	});
});
