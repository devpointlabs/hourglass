import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import clickHandler from "./TimeSheetNavbarClickHandler";

class TableHeaderLabels extends React.Component {
  render() {
    const {
      monday,
      selectedDate,
      setSelectedDate,
      setSelectedWeek
    } = this.props;
    const mondayDay = moment(monday).format("dd");
    const mondayDate = moment(monday).format("MM/DD");
    const tuesdayDay = moment(monday)
      .add(1, "days")
      .format("dd");
    const tuesdayDate = moment(monday)
      .add(1, "days")
      .format("MM/DD");
    const wednesdayDay = moment(monday)
      .add(2, "days")
      .format("dd");
    const wednesdayDate = moment(monday)
      .add(2, "days")
      .format("MM/DD");
    const thursdayDay = moment(monday)
      .add(3, "days")
      .format("dd");
    const thursdayDate = moment(monday)
      .add(3, "days")
      .format("MM/DD");
    const fridayDay = moment(monday)
      .add(4, "days")
      .format("dd");
    const fridayDate = moment(monday)
      .add(4, "days")
      .format("MM/DD");
    const saturdayDay = moment(monday)
      .add(5, "days")
      .format("dd");
    const saturdayDate = moment(monday)
      .add(5, "days")
      .format("MM/DD");
    const sundayDay = moment(monday)
      .add(6, "days")
      .format("dd");

    const sundayDate = moment(monday)
      .add(6, "days")
      .format("MM/DD");
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
            onClick={() =>
              clickHandler(
                monday,
                cell.dayofweek,
                setSelectedDate,
                setSelectedWeek
              )
            }
            style={
              cell.dayofweek === moment(selectedDate).format("dd")
                ? styles.highlight
                : styles.normal
            }
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
        <Table.HeaderCell style={styles.normal}>Total</Table.HeaderCell>
      </>
    );
  }
}

export default TableHeaderLabels;

const styles = {
  highlight: {
    background: "RebeccaPurple",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    fontSize: "1em",
    padding: "4px",
    cursor: "pointer",
    width: "102px"
  },
  normal: {
    textAlign: "center",
    fontSize: "1em",
    padding: "4px",
    cursor: "pointer",
    width: "102px"

  }
};
