import { Fragment, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Composant Slider
const Slider = () => {
	const { data } = useData(); // Utilisation du hook useData pour récupérer les données
	// États pour suivre l'index de l'élément actif et l'index de l'élément radio sélectionné
	const [index, setIndex] = useState(0);
	const [selectedRadioIdx, setSelectedRadioIdx] = useState(0);

	// Effet useEffect pour gérer le défilement automatique
	useEffect(() => {
		// Interval pour changer l'index de l'élément actif et de l'élément radio sélectionné
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % (data?.focus.length || 1));
			setSelectedRadioIdx(
				(prevIndex) => (prevIndex + 1) % (data?.focus.length || 1)
			);
		}, 5000); // Changement toutes les 5 secondes
		return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
	}, [data]);

	// Tri des événements par date ascendant
	const byDateAsc = data?.focus
		.slice()
		.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));

	// Fonction pour gérer le changement de l'élément radio sélectionné
	const handleRadioChange = (radioIdx) => {
		setIndex(radioIdx);
		setSelectedRadioIdx(radioIdx);
	};

	return (
		<div className="SlideCardList" data-testid="slider-testid">
			{byDateAsc?.map((event, idx) => (
				<Fragment key={event.title}>
					<div
						className={`SlideCard SlideCard--${
							index === idx ? "display" : "hide"
						}`}
					>
						<img src={event.cover} alt="forum" />
						<div className="SlideCard__descriptionContainer">
							<div className="SlideCard__description">
								<h3>{event.title}</h3>
								<p>{event.description}</p>
								<div>{getMonth(new Date(event.date))}</div>
							</div>
						</div>
					</div>
				</Fragment>
			))}
			<div className="SlideCard__paginationContainer">
				<div className="SlideCard__pagination">
					{byDateAsc?.map((event, radioIdx) => (
						<input
							key={`${event.title + radioIdx}`}
							type="radio"
							name="radio-button"
							checked={selectedRadioIdx === radioIdx}
							onChange={() => handleRadioChange(radioIdx)}
							aria-label={`Index ${radioIdx + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
