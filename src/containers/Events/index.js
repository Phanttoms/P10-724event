import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements à afficher par page

const EventList = () => {
	const { data, error } = useData(); // Récupération des données et gestion des erreurs
	const [type, setType] = useState(); // État pour stocker le type (catégorie) sélectionné
	const [currentPage, setCurrentPage] = useState(1); // État pour stocker le numéro de la page actuelle

	// Filtrage des événements en fonction du type sélectionné et de la pagination
	const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
		(event) => {
			// Filtrer les événements en fonction du type sélectionné
			if (!type || event.type === type) {
				// setAllFilteredEvents(allFilteredEvents + 1);
				return true;
			}
			return false;
		}
	);
	const pageFilteredEvents = filteredEvents.filter((_, index) => {
		// Pagination : Filtrer les événements à afficher en fonction de la page actuelle
		if (
			(currentPage - 1) * PER_PAGE <= index &&
			PER_PAGE * currentPage > index
		) {
			return true;
		}
		return false;
	});
	// Fonction pour changer le type (catégorie) sélectionné
	const changeType = (evtType) => {
		setCurrentPage(1);
		setType(evtType);
	};

	// Calcul du nombre total de pages en fonction du nombre total d'événements filtrés
	const totalPages =
		filteredEvents.length > 9
			? Math.ceil((pageFilteredEvents.length || 0) / PER_PAGE) + 1
			: Math.floor((pageFilteredEvents.length || 0) / PER_PAGE) + 1;

	// Création d'un ensemble de types uniques à partir des données d'événement pour les options de sélection
	const typeList = new Set(data?.events.map((event) => event.type));

	return (
		<>
			{error && <div>An error occured</div>}
			{data === null ? (
				"loading"
			) : (
				<>
					<h3 className="SelectTitle">Catégories</h3>
					<Select
						selection={Array.from(typeList)}
						onChange={(value) => (value ? changeType(value) : changeType(null))}
					/>
					<div id="events" className="ListContainer">
						{pageFilteredEvents.map((event) => (
							<Modal key={event.id} Content={<ModalEvent event={event} />}>
								{({ setIsOpened }) => (
									<EventCard
										onClick={() => setIsOpened(true)}
										imageSrc={event.cover}
										title={event.title}
										date={new Date(event.date)}
										label={event.type}
									/>
								)}
							</Modal>
						))}
					</div>
					<div className="Pagination">
						{[...Array(totalPages || 0)].map((_, n) => (
							// eslint-disable-next-line react/no-array-index-key
							<a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
								{n + 1}
							</a>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default EventList;
