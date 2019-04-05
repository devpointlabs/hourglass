import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

class TableHeaderLabels extends React.Component {
  state = {
    days: [
      { dayofweek: "day1", date: "date1" },
      { dayofweek: "day2", date: "date2" },
      { dayofweek: "day3", date: "date3" },
      { dayofweek: "day4", date: "date4" },
      { dayofweek: "day5", date: "date5" },
      { dayofweek: "day6", date: "date6" },
      { dayofweek: "day7", date: "date7" }
    ]
  };

  componentDidMount = () => {
    const { selectedDate } = this.props;

    this.setState({
      days: [
        { dayofweek: selectedDate, date: "date1" },
        { dayofweek: "day2", date: "date2" },
        { dayofweek: "day3", date: "date3" },
        { dayofweek: "day4", date: "date4" },
        { dayofweek: "day5", date: "date5" },
        { dayofweek: "day6", date: "date6" },
        { dayofweek: "day7", date: "date7" }
      ]
    });
  };

  render() {
    return (
      <>
        {this.state.days.map(cell => (
          <Table.HeaderCell>
            <div>{cell.dayofweek}</div>
            {cell.date}
          </Table.HeaderCell>
        ))}
      </>
    );
  }
}

let todayDate = moment().format("DD");
let todayDay = moment().format("LL");

export default TableHeaderLabels;
