import React from "react";
import DatePicker2 from "../timeblocks/CalenderPicker/DatePicker2";
import moment from "moment";

class DatePicker extends React.Component {
  state = { date: moment() };

  handleSubmit = e => {
    this.props.setDate(this.state.date[0]);
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
