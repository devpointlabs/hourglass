import React from "react";
import moment from "moment";
import { Form } from "semantic-ui-react";

class DateRange extends React.Component {
  state = { startDate: "", endDate: "" };

  componentDidMount() {
    this.setDefaultStartEndDates();
  }

  setDefaultStartEndDates = () => {
    const startDate = moment(new moment())
      .subtract(30, "days")
      .format("YYYY-MM-DD")
      .toString();
    const endDate = "Unlimited";
    this.setState({ startDate, endDate }, () => this.handleSubmit());
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e && e.preventDefault();
    this.props.updateDateRange(this.state.startDate, this.state.endDate);
  };

  render() {
    return (
      <div style={{ padding: "20px 50px 10px 10px" }}>
        <div>Date Range:</div>
        <div style={{ display: "flex" }}>
          <Form onSubmit={this.handleSubmit}>
            <input
              style={{
                padding: "2px",
                border: "none",
                width: "10ch",
                textAlign: "left"
              }}
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
              placeholder="yyyy-mm-dd"
              maxLength="10"
            />
          </Form>
          to
          <Form onSubmit={this.handleSubmit}>
            <input
              style={{
                padding: "2px",
                marginLeft: "2px",
                border: "none",
                width: "13ch",
                textAlign: "left"
              }}
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              placeholder="yyyy-mm-dd"
              maxLength="10"
            />
          </Form>
        </div>
      </div>
    );
  }
}
export default DateRange;
