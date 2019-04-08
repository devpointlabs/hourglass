import React from "react";
import { Table } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";
import moment from "moment";

class WeekViewTableHeaderRow extends React.Component {
  state = { monday: "" };

  render() {
    let todayDay = moment(this.props.selectedDate).format("dd");
    let todayDate = moment(this.props.selectedDate);
    let monday;
    switch (todayDay) {
      case "Mo":
        monday = moment(todayDate);
        break;
      case "Tu":
        monday = moment(todayDate).subtract(1, "days");
        break;
      case "We":
        monday = moment(todayDate).subtract(2, "days");
        break;
      case "Th":
        monday = moment(todayDate).subtract(3, "days");
        break;
      case "Fr":
        monday = moment(todayDate).subtract(4, "days");
        break;
      case "Sa":
        monday = moment(todayDate).subtract(5, "days");
        break;
      case "Su":
        monday = moment(todayDate).subtract(6, "days");
        break;
      // no default
    }

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
