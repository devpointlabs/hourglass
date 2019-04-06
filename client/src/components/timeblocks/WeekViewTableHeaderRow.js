import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";
import moment from "moment";

class WeekViewTableHeaderRow extends React.Component {
  state = { monday: "" };

  componentDidMount = () => {
    let todayDay = moment(this.props.selectedDate).format("dd");
    let todayDate = moment(this.props.selectedDate);
    switch (todayDay) {
      case "Mo":
        this.setState({ monday: todayDate });
        break;
      case "Tu":
        this.setState({ monday: moment(todayDate).subtract(1, "days") });
        break;
      case "We":
        this.setState({ monday: moment(todayDate).subtract(2, "days") });
        break;
      case "Th":
        this.setState({ monday: moment(todayDate).subtract(3, "days") });
        break;
      case "Fr":
        this.setState({ monday: moment(todayDate).subtract(4, "days") });
        break;
      case "Sa":
        this.setState({ monday: moment(todayDate).subtract(5, "days") });
        break;
      case "Su":
        this.setState({ monday: moment(todayDate).subtract(6, "days") });
        break;
    }
  };

  nextWeek = () => {
    let newMonday = moment(this.state.monday).add(7, "days");
    this.setState({ monday: newMonday });
  };

  lastWeek = () => {
    let newMonday = moment(this.state.monday).subtract(7, "days");
    this.setState({ monday: newMonday });
  };

  render() {
    return (
      <Table.Row style={{ background: "lightgray" }}>
        <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
        <Table.HeaderCell style={{ width: "20%" }}>
          <Button onClick={() => this.lastWeek()}>Left</Button>
        </Table.HeaderCell>
        <WeekViewTableHeaderLabels
          selectedDate={this.props.selectedDate}
          monday={this.state.monday}
        />
        <Table.HeaderCell>
          <Button onClick={() => this.nextWeek()}>Right</Button>
        </Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    );
  }
}

export default WeekViewTableHeaderRow;

////////////////////////////////
///////previous version
///////////////////////

{
  /* <DateRange
  startDate={this.state.startDate}
  endDate={this.state.endDate}
  updateDateRange={this.updateDateRange}
/> */
}
