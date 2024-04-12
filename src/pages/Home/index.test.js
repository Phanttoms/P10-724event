import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import Menu from "./../../containers/Menu/index";

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

// Test d'integration
describe("Composant de la page", () => {
	it("rend tous les composants sans plantage", () => {
		const { getByTestId, getByText, getAllByTestId } = render(<Home />);

		// Vérifier si le composant Menu est rendu
		expect(getByTestId("menu-testid")).toBeInTheDocument();

		// Vérifier si le composant Slider est rendu
		expect(getByTestId("slider-testid")).toBeInTheDocument();

		// Vérifier si les composant ServiceCard sont rendues
		const serviceCards = getAllByTestId("service-card-testid");
		serviceCards.forEach((card) => {
			expect(card).toBeInTheDocument();
		});
		expect(getByText("Soirée d’entreprise")).toBeInTheDocument();
		expect(getByText("Conférences")).toBeInTheDocument();
		expect(getByText("Experience digitale")).toBeInTheDocument();

		// Vérifier si le composant EventList est rendu
		expect(getByTestId("nos-realisations-testid")).toBeInTheDocument();

		// Vérifier si les composants PeopleCard sont rendues
		const peopleCards = getAllByTestId("people-card-testid");
		peopleCards.forEach((card) => {
			expect(card).toBeInTheDocument();
		});
		expect(getByText("Samira")).toBeInTheDocument();
		expect(getByText("Jean-baptiste")).toBeInTheDocument();
		expect(getByText("Alice")).toBeInTheDocument();
		expect(getByText("Luís")).toBeInTheDocument();
		expect(getByText("Christine")).toBeInTheDocument();
		expect(getByText("Isabelle")).toBeInTheDocument();

		// Vérifier si le composant Form est rendu
		expect(getByTestId("form-testid")).toBeInTheDocument();

		// Vérifier si les composants Footer sont rendus
		expect(getByText("Contactez-nous")).toBeInTheDocument();
		expect(
			getByText("45 avenue de la République, 75000 Paris")
		).toBeInTheDocument();
	});
});
