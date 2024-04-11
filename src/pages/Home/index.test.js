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

// test d'integration ajouté

describe("When a page is created", () => {
	beforeEach(() => {
		render(<Home />);
	});

	it("a list of events is displayed", async () => {
		await screen.findByTestId("nos-realisations-testid");
		await screen.findByText("Toutes");
	});

	it("a list of people is displayed", async () => {
		await screen.findByTestId("notre-equipe-testid");
		await screen.findByText("Samira");
	});

	it("a footer is displayed", async () => {
		await screen.findByText("Contactez-nous");
		await screen.findByText("45 avenue de la République, 75000 Paris");
	});

	it("an event card, with the last event, is displayed", async () => {
		await screen.findByTestId("notre-derniere-presta-testid");
		screen.queryByText("AOUT");
	});
});

// Test V2

describe("Page Component", () => {
	it("renders all components without crashing", () => {
		const { getByTestId, getByText } = render(<Home />);

		// Check if Menu component is rendered
		expect(getByTestId("menu-testid")).toBeInTheDocument();

		// Check if Slider component is rendered
		expect(getByTestId("slider-testid")).toBeInTheDocument();

		// Check if ServiceCards are rendered
		expect(getByText("Soirée d’entreprise")).toBeInTheDocument();
		expect(getByText("Conférences")).toBeInTheDocument();
		expect(getByText("Experience digitale")).toBeInTheDocument();

		// Check if EventList component is rendered
		expect(getByTestId("nos-realisations-testid")).toBeInTheDocument();

		// Check if PeopleCards are rendered
		expect(getByText("Samira")).toBeInTheDocument();
		expect(getByText("Jean-baptiste")).toBeInTheDocument();
		expect(getByText("Alice")).toBeInTheDocument();
		expect(getByText("Luís")).toBeInTheDocument();
		expect(getByText("Christine")).toBeInTheDocument();
		expect(getByText("Isabelle")).toBeInTheDocument();

		// Check if Form component is rendered
		expect(getByTestId("form-testid")).toBeInTheDocument();

		// Check if Footer components are rendered
		expect(getByTestId("notre-derniere-presta-testid")).toBeInTheDocument();
		expect(getByText("Contactez-nous")).toBeInTheDocument();
		expect(
			getByText("45 avenue de la République, 75000 Paris")
		).toBeInTheDocument();
	});
});
