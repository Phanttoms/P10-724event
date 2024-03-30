import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

const Form = ({ onSuccess, onError }) => {
	const [sending, setSending] = useState(false);
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		// Expression régulière pour vérifier si une adresse e-mail est valide
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault();

			const form = evt.target;
			const fields = form.querySelectorAll(
				"input[name], textarea[name], select[name]"
			);
			const selectValue = fields[2].value;
			const selectField = form.querySelector(".Select");
			let isFormValid = true;
			const newErrors = {};

			fields.forEach((field) => {
				if (!field.value.trim()) {
					isFormValid = false;
					newErrors[field.name] = `Veuillez saisir votre ${field.name}`;
				}
			});

			if (!selectValue.trim()) {
				selectField.classList.add("field-empty");
				isFormValid = false;
				newErrors.select = "Veuillez sélectionner une option";
			} else {
				selectField.classList.remove("field-empty");
			}

			const emailField = form.querySelector("input[name='Email']");
			if (!validateEmail(emailField.value)) {
				isFormValid = false;
				newErrors.Email = "Veuillez saisir une adresse e-mail valide";
			}

			setErrors(newErrors);

			if (!isFormValid) {
				return;
			}

			setSending(true);

			try {
				await mockContactApi();
				setSending(false);
				onSuccess();
			} catch (err) {
				setSending(false);
				onError(err);
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
