import React from "react";
import { Table } from "semantic-ui-react";
import WeekViewTableHeaderLabels from "./WeekViewTableHeaderLabels";
import moment from "moment";

class WeekViewTableHeaderRow extends React.Component {
  render() {
    return (
      <Table.Row style={{ background: "lightgray" }}>
        <Table.HeaderCell style={{ paddingTop: "10px", paddingLeft: "1%" }} />
        <Table.HeaderCell style={{ width: "20%" }} />
        <WeekViewTableHeaderLabels
          selectedDate={this.props.selectedDate}
          monday={this.props.monday}
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
