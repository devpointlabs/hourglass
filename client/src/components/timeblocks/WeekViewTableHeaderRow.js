import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";
import moment from "moment";

class WeekViewTableHeaderRow extends React.Component {
  state = { monday: "" };

  render() {
    let todayDay = moment(this.props.selectedDate).format("dd");
    let todayDate = moment(this.props.selectedDate);
    if ((todayDay = "Mo")) var monday = moment(todayDate);
    else if ((todayDay = "Tu"))
      var monday = moment(todayDate).subtract(1, "days");
    else if ((todayDay = "We"))
      var monday = moment(todayDate).subtract(2, "days");
    else if ((todayDay = "Th"))
      var monday = moment(todayDate).subtract(3, "days");
    else if ((todayDay = "Fr"))
      var monday = moment(todayDate).subtract(4, "days");
    else if ((todayDay = "Sa"))
      var monday = moment(todayDate).subtract(5, "days");
    else todayDay = "Su";
    var monday = moment(todayDate).subtract(6, "days");

    return (
      <Table.Row style={{ background: "lightgray" }}>
        <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
        <Table.HeaderCell style={{ width: "20%" }} />
        <WeekViewTableHeaderLabels
          selectedDate={this.props.selectedDate}
          monday={monday}
        />
        <Table.HeaderCell />
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
