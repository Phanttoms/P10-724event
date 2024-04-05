// import PropTypes from "prop-types";
// import "./style.scss";

// export const FIELD_TYPES = {
// 	INPUT_TEXT: 1,
// 	TEXTAREA: 2,
// };

// const Field = ({
// 	type = FIELD_TYPES.INPUT_TEXT,
// 	label,
// 	name,
// 	placeholder,
// 	error,
// }) => {
// 	let component;
// 	switch (type) {
// 		case FIELD_TYPES.INPUT_TEXT:
// 			component = (
// 				<input
// 					type="text"
// 					name={name}
// 					placeholder={placeholder}
// 					data-testid="field-testid"
// 				/>
// 			);
// 			break;
// 		case FIELD_TYPES.TEXTAREA:
// 			component = <textarea name={name} data-testid="field-testid" />;
// 			break;
// 		default:
// 			component = (
// 				<input
// 					type="text"
// 					name={name}
// 					placeholder={placeholder}
// 					data-testid="field-testid"
// 				/>
// 			);
// 	}
// 	return (
// 		<div className="inputField">
// 			<span>{label}</span>
// 			{component}
// 			{error && <span className="error">{error}</span>}
// 		</div>
// 	);
// };

// Field.propTypes = {
// 	type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
// 	name: PropTypes.string,
// 	label: PropTypes.string,
// 	placeholder: PropTypes.string,
// 	error: PropTypes.string, // Nouvelle prop pour afficher les messages d'erreur
// };

// Field.defaultProps = {
// 	label: "",
// 	placeholder: "",
// 	type: FIELD_TYPES.INPUT_TEXT,
// 	name: "field-name",
// 	error: "",
// };

// export default Field;

// >>>>>>>>>>>>>

import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
	INPUT_TEXT: 1,
	TEXTAREA: 2,
};

const Field = ({
	type = FIELD_TYPES.INPUT_TEXT,
	label,
	name,
	placeholder,
	error,
	value,
	onChange,
}) => {
	let component;
	switch (type) {
		case FIELD_TYPES.INPUT_TEXT:
			component = (
				<input
					type="text"
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					data-testid="field-testid"
				/>
			);
			break;
		case FIELD_TYPES.TEXTAREA:
			component = (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					data-testid="field-testid"
				/>
			);
			break;
		default:
			component = (
				<input
					type="text"
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					data-testid="field-testid"
				/>
			);
	}
	return (
		<div className="inputField">
			<span>{label}</span>
			{component}
			{error && <span className="error">{error}</span>}
		</div>
	);
};

Field.propTypes = {
	type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.string, // Nouvelle prop pour afficher les messages d'erreur
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
	label: "",
	placeholder: "",
	type: FIELD_TYPES.INPUT_TEXT,
	name: "field-name",
	error: "",
};

export default Field;
