import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction de simulation d'API de contact (mock)
const mockContactApi = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1000); // Simulation d'un délai de 1 seconde
	});

// Composant de formulaire
const Form = ({ onSuccess, onError }) => {
	// États pour le suivi de l'état d'envoi du formulaire et les erreurs de validation
	const [sending, setSending] = useState(false);
	const [errors, setErrors] = useState({});

	// Fonction de validation d'une adresse e-mail
	const validateEmail = (email) => {
		// Expression régulière pour vérifier si une adresse e-mail est valide
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	// Fonction de soumission du formulaire (callback memoized avec useCallback)
	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault(); // Empêcher le comportement par défaut du formulaire

			const form = evt.target;
			const fields = form.querySelectorAll(
				"input[name], textarea[name], select[name]"
			);
			const selectValue = fields[2].value;
			const selectField = form.querySelector(".Select");
			let isFormValid = true;
			const newErrors = {};

			// Validation des champs requis et gestion des erreurs
			fields.forEach((field) => {
				if (!field.value.trim()) {
					isFormValid = false;
					newErrors[field.name] = `Veuillez saisir votre ${field.name}`;
				}
			});

			// Validation du champ de sélection et gestion des erreurs
			if (!selectValue.trim()) {
				selectField.classList.add("field-empty");
				isFormValid = false;
				newErrors.select = "Veuillez sélectionner une option";
			} else {
				selectField.classList.remove("field-empty");
			}

			// Validation de l'adresse e-mail et gestion des erreurs
			const emailField = form.querySelector("input[name='Email']");
			if (!validateEmail(emailField.value)) {
				isFormValid = false;
				newErrors.Email = "Veuillez saisir une adresse e-mail valide";
			}

			// Mise à jour des erreurs
			setErrors(newErrors);

			// Arrêter la soumission du formulaire si des erreurs sont présentes
			if (!isFormValid) {
				return;
			}

			// Déclencher l'état d'envoi du formulaire
			setSending(true);

			try {
				await mockContactApi(); // Appel à l'API de contact (simulée)
				setSending(false); // Mettre à jour l'état d'envoi du formulaire
				onSuccess(); // Exécuter la fonction onSuccess (callback réussite)
			} catch (err) {
				setSending(false); // Mettre à jour l'état d'envoi du formulaire en cas d'erreur
				onError(err); // Exécuter la fonction onError (callback erreur)
			}
		},
		[onSuccess, onError]
	);

	return (
		<form onSubmit={sendContact}>
			<div className="row">
				<div className="col">
					<Field placeholder="" label="Nom" name="Nom" error={errors.Nom} />
					<Field
						placeholder=""
						label="Prénom"
						name="Prénom"
						error={errors.Prénom}
					/>
					<Select
						selection={["Personel", "Entreprise"]}
						onChange={() => null}
						label="Personel / Entreprise"
						type="large"
						titleEmpty
						error={errors.select}
					/>
					<Field
						placeholder=""
						label="Email"
						name="Email"
						error={errors.Email}
					/>
					<Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
						{sending ? "En cours" : "Envoyer"}
					</Button>
				</div>
				<div className="col">
					<Field
						placeholder="message"
						label="Message"
						type={FIELD_TYPES.TEXTAREA}
						name="Message"
						error={errors.Message}
					/>
				</div>
			</div>
		</form>
	);
};

Form.propTypes = {
	onError: PropTypes.func,
	onSuccess: PropTypes.func,
};

Form.defaultProps = {
	onError: () => null,
	onSuccess: () => null,
};

export default Form;
