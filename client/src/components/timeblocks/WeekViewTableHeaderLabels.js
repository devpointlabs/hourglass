import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

class TableHeaderLabels extends React.Component {
  render() {
    const mondayDay = moment(this.props.monday).format("dd");
    const mondayDate = moment(this.props.monday).format("L");
    const tuesdayDay = moment(this.props.monday)
      .add(1, "days")
      .format("dd ");
    const tuesdayDate = moment(this.props.monday)
      .add(1, "days")
      .format("L");
    const wednesdayDay = moment(this.props.monday)
      .add(2, "days")
      .format("dd ");
    const wednesdayDate = moment(this.props.monday)
      .add(2, "days")
      .format("L");
    const thursdayDay = moment(this.props.monday)
      .add(3, "days")
      .format("dd ");
    const thursdayDate = moment(this.props.monday)
      .add(3, "days")
      .format("L");
    const fridayDay = moment(this.props.monday)
      .add(4, "days")
      .format("dd ");
    const fridayDate = moment(this.props.monday)
      .add(4, "days")
      .format("L");
    const saturdayDay = moment(this.props.monday)
      .add(5, "days")
      .format("dd ");
    const saturdayDate = moment(this.props.monday)
      .add(5, "days")
      .format("L");
    const sundayDay = moment(this.props.monday)
      .add(6, "days")
      .format("dd ");
    const sundayDate = moment(this.props.monday)
      .add(6, "days")
      .format("L");
    const days = [
      { dayofweek: mondayDay, date: mondayDate },
      { dayofweek: tuesdayDay, date: tuesdayDate },
      { dayofweek: wednesdayDay, date: wednesdayDate },
      { dayofweek: thursdayDay, date: thursdayDate },
      { dayofweek: fridayDay, date: fridayDate },
      { dayofweek: saturdayDay, date: saturdayDate },
      { dayofweek: sundayDay, date: sundayDate }
    ];
    return (
      <>
        {days.map(cell => (
          <Table.HeaderCell
            style={{
              textAlign: "center",
              fontSize: "0.9em",
              padding: "4px"
            }}
          >
            <div
              style={{
                fontSize: "1.2em"
              }}
            >
              {cell.dayofweek}
            </div>
            {cell.date}
          </Table.HeaderCell>
        ))}
      </>
    );
  }
}

export default TableHeaderLabels;
