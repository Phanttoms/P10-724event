import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	const [selectedRadioIdx, setSelectedRadioIdx] = useState(0);
	// const byDateDesc = data?.focus.sort((evtA, evtB) =>
	// 	new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
	// );
	// const nextCard = () => {
	// 	setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
	// };
	// useEffect(() => {
	// 	nextCard();
	// });

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % (data?.focus.length || 1));
			setSelectedRadioIdx(
				(prevIndex) => (prevIndex + 1) % (data?.focus.length || 1)
			);
		}, 5000);
		return () => clearInterval(interval);
	}, [data]);

	// Tri des événements du plus ancien au plus récent
	const byDateAsc = data?.focus
		.slice()
		.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));

	return (
		<div className="SlideCardList">
			{byDateAsc?.map((event, idx) => (
				<>
					<div
						key={event.title}
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
					{/* <div className="SlideCard__paginationContainer">
						<div className="SlideCard__pagination">
							{byDateAsc?.map((_, radioIdx) => (
								<input
									key={`${event.title + radioIdx}`}
									type="radio"
									name="radio-button"
									checked={selectedRadioIdx === radioIdx}
								/>
							))}
						</div>
					</div> */}
				</>
			))}
			<div className="SlideCard__paginationContainer">
				<div className="SlideCard__pagination">
					{byDateAsc?.map((event, radioIdx) => (
						<input
							key={`${event.title + radioIdx}`}
							type="radio"
							name="radio-button"
							checked={selectedRadioIdx === radioIdx}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
