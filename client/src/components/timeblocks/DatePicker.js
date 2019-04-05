import React from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import ptLocale from "react-semantic-ui-datepickers/dist/locales/pt-BR";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const DatePicker = ({ onDateChange }) => (
  <SemanticDatepicker onDateChange={onDateChange} />
);

export default DatePicker;
