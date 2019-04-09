import React from "react";
import DatePicker2 from "./DatePicker2";
import clickHandler from "./TimeSheetNavbarClickHandler";

class DatePicker extends React.Component {
  state = { date: this.props.selectedDate };

  handleSubmit = e => {
    clickHandler(
      this.state.date[0],
      "calendarDayPicked",
      this.props.setSelectedDate
    );
  };

  render() {
    const { date } = this.state;
    return (
      <DatePicker2
        value={date}
        onChange={date => {
          this.setState({ date }, () => this.handleSubmit());
        }}
      />
    );
  }
}

export default DatePicker;
