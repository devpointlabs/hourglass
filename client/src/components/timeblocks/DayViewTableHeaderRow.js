import React from "react";
import DayViewTableHeaderLabels from "./DayViewTableHeaderLabels";
import { Table } from "semantic-ui-react";
import moment from "moment";

class DayViewTableHeaderRow extends React.Component {
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
    const { currentWeekTimeBlocks } = this.props;
    return (
      <Table.Row style={{ background: "lightgray" }}>
        <DayViewTableHeaderLabels
          selectedDate={this.props.selectedDate}
          monday={monday}
          currentWeekTimeBlocks={currentWeekTimeBlocks}
        />
        <Table.HeaderCell>Weekly Total</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    );
  }
}

export default DayViewTableHeaderRow;
