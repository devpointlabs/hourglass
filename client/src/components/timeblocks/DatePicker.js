import "flatpickr/dist/themes/material_devpoint.css";
import Flatpickr from "react-flatpickr";
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "semantic-ui-react";
import flatpickr from "flatpickr";

class DatePicker extends React.Component {
  state = { date: new Date() };

  render() {
    const { date } = this.state;
    return (
      <div
        id="calendarSelect"
        style={{ display: "", overflow: "", height: "" }}
      >
        <Flatpickr
          options={{
            altInput: true,
            altFormat: "",
            open: true
          }}
          value={date}
          onChange={date => {
            this.setState({ date });
          }}
        />
      </div>
    );
  }
}

export default DatePicker;
