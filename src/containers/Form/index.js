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
	// États pour le suivi de l'état d'envoi du formulaire, les valeurs des champs et les erreurs de validation
	const [sending, setSending] = useState(false);
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [selectValue, setSelectValue] = useState("Personel");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [nomError, setNomError] = useState("");
	const [prenomError, setPrenomError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [messageError, setMessageError] = useState("");

	// Fonction de validation d'une adresse e-mail
	const validateEmail = (emailCheck) => {
		// Expression régulière pour vérifier si une adresse e-mail est valide
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(emailCheck);
	};

	// Fonction de réinitialisation des champs après la soumission réussie
	const resetFields = () => {
		setNom("");
		setPrenom("");
		setEmail("");
		setMessage("");
		setNomError("");
		setPrenomError("");
		setEmailError("");
		setMessageError("");
	};

	// Fonction de soumission du formulaire (callback memoized avec useCallback)
	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault(); // Empêcher le comportement par défaut du formulaire
			let isFormValid = true;

			// Validation des champs requis et gestion des erreurs
			if (!nom.trim()) {
				setNomError("Veuillez saisir votre nom");
				isFormValid = false;
			} else {
				setNomError("");
			}

			if (!prenom.trim()) {
				setPrenomError("Veuillez saisir votre prénom");
				isFormValid = false;
			} else {
				setPrenomError("");
			}

			if (!email.trim() || !validateEmail(email)) {
				setEmailError("Veuillez saisir une adresse e-mail valide");
				isFormValid = false;
			} else {
				setEmailError("");
			}

			if (!message.trim()) {
				setMessageError("Veuillez saisir un message");
				isFormValid = false;
			} else {
				setMessageError("");
			}

			// Arrêter la soumission du formulaire si des erreurs sont présentes
			if (!isFormValid) {
				return;
			}

			// Déclencher l'état d'envoi du formulaire
			setSending(true);

			try {
				await mockContactApi();
				setSending(false);
				onSuccess(); // Exécuter la fonction onSuccess (callback réussite)
				resetFields(); // Réinitialiser les champs après la soumission réussie
			} catch (err) {
				setSending(false);
				onError(err);
			}
		},
		[nom, prenom, selectValue, email, message, onSuccess, onError]
	);

	return (
		<form onSubmit={sendContact}>
			<div className="row">
				<div className="col">
					<Field
						placeholder=""
						label="Nom"
						name="Nom"
						value={nom}
						onChange={(e) => setNom(e.target.value)}
						error={nomError}
					/>
					<Field
						placeholder=""
						label="Prénom"
						name="Prénom"
						value={prenom}
						onChange={(e) => setPrenom(e.target.value)}
						error={prenomError}
					/>
					<Select
						selection={["Personel", "Entreprise"]}
						value={selectValue}
						onChange={(value) => setSelectValue(value)}
						label="Personel / Entreprise"
						type="large"
						titleEmpty
						titleDefault
					/>
					<Field
						placeholder=""
						label="Email"
						name="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={emailError}
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
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						error={messageError}
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
