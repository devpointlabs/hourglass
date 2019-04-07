import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

class TableHeaderLabels extends React.Component {
  render() {
    const mondayDay = moment(this.props.monday).format("dd L");
    const mondayTotalHours = "2";
    const tuesdayDay = moment(this.props.monday)
      .add(1, "days")
      .format("dd L");
    const tuesdayTotalHours = "5.3";
    const wednesdayDay = moment(this.props.monday)
      .add(2, "days")
      .format("dd L");
    const wednesdayTotalHours = "4.3";
    const thursdayDay = moment(this.props.monday)
      .add(3, "days")
      .format("dd L");
    const thursdayTotalHours = "5.3";
    const fridayDay = moment(this.props.monday)
      .add(4, "days")
      .format("dd L");
    const fridayTotalHours = "6";
    const saturdayDay = moment(this.props.monday)
      .add(5, "days")
      .format("dd L");
    const saturdayTotalHours = "5";
    const sundayDay = moment(this.props.monday)
      .add(6, "days")
      .format("dd L");
    const sundayTotalHours = "6";
    const days = [
      { dayofweek: mondayDay, totalHours: mondayTotalHours },
      { dayofweek: tuesdayDay, totalHours: tuesdayTotalHours },
      { dayofweek: wednesdayDay, totalHours: wednesdayTotalHours },
      { dayofweek: thursdayDay, totalHours: thursdayTotalHours },
      { dayofweek: fridayDay, totalHours: fridayTotalHours },
      { dayofweek: saturdayDay, totalHours: saturdayTotalHours },
      { dayofweek: sundayDay, totalHours: sundayTotalHours }
    ];
    return (
      <>
        {days.map(cell => (
          <Table.HeaderCell>
            <div>{cell.dayofweek}</div>
            {cell.totalHours}
          </Table.HeaderCell>
        ))}
      </>
    );
  }
}

export default TableHeaderLabels;
