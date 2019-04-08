import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import { returnHoursSplitByDay } from "./Calculations";

class TableHeaderLabels extends React.Component {
  state = {
    mondayHours: "",
    tuesdayHours: "",
    wednesdayHours: "",
    thursdayHours: "",
    fridayHours: "",
    saturdayHours: "",
    sundayHours: ""
  };

  render() {
    const { currentWeekTimeBlocks } = this.props;

    const mondayDay = moment(this.props.monday).format("dd L");

    const tuesdayDay = moment(this.props.monday)
      .add(1, "days")
      .format("dd L");

    const wednesdayDay = moment(this.props.monday)
      .add(2, "days")
      .format("dd L");

    const thursdayDay = moment(this.props.monday)
      .add(3, "days")
      .format("dd L");

    const fridayDay = moment(this.props.monday)
      .add(4, "days")
      .format("dd L");

    const saturdayDay = moment(this.props.monday)
      .add(5, "days")
      .format("dd L");

    const sundayDay = moment(this.props.monday)
      .add(6, "days")
      .format("dd L");

    const days = [
      { dayofweek: mondayDay, totalHours: this.state.mondayHours },
      { dayofweek: tuesdayDay, totalHours: this.state.tuesdayHours },
      { dayofweek: wednesdayDay, totalHours: this.state.wednesdayHours },
      { dayofweek: thursdayDay, totalHours: this.state.thursdayHours },
      { dayofweek: fridayDay, totalHours: this.state.fridayHours },
      { dayofweek: saturdayDay, totalHours: this.state.saturdayHours },
      { dayofweek: sundayDay, totalHours: this.state.sundayHours }
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
