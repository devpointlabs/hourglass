import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

class TableHeaderLabels extends React.Component {
  state = {
    days: [
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" },
      { dayofweek: "", date: "" }
    ]
  };

  componentDidMount = () => {
    const { selectedDate } = this.props;
    let todayDay = moment().format("dd");

    switch (todayDay) {
      case "Mo":
        this.setState({
          days: [
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 },
            { dayofweek: tomorrowDay2, date: tomorrowDate2 },
            { dayofweek: tomorrowDay3, date: tomorrowDate3 },
            { dayofweek: tomorrowDay4, date: tomorrowDate4 },
            { dayofweek: tomorrowDay5, date: tomorrowDate5 },
            { dayofweek: tomorrowDay6, date: tomorrowDate6 }
          ]
        });
        break;
      case "Tu":
        this.setState({
          days: [
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 },
            { dayofweek: tomorrowDay2, date: tomorrowDate2 },
            { dayofweek: tomorrowDay3, date: tomorrowDate3 },
            { dayofweek: tomorrowDay4, date: tomorrowDate4 },
            { dayofweek: tomorrowDay5, date: tomorrowDate5 }
          ]
        });
        break;
      case "We":
        this.setState({
          days: [
            { dayofweek: yesterDay2, date: yesterDate2 },
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 },
            { dayofweek: tomorrowDay2, date: tomorrowDate2 },
            { dayofweek: tomorrowDay3, date: tomorrowDate3 },
            { dayofweek: tomorrowDay4, date: tomorrowDate4 }
          ]
        });
        break;
      case "Th":
        this.setState({
          days: [
            { dayofweek: yesterDay3, date: yesterDate3 },
            { dayofweek: yesterDay2, date: yesterDate2 },
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 },
            { dayofweek: tomorrowDay2, date: tomorrowDate2 },
            { dayofweek: tomorrowDay3, date: tomorrowDate3 }
          ]
        });
        break;
      case "Fr":
        this.setState({
          days: [
            { dayofweek: yesterDay4, date: yesterDate4 },
            { dayofweek: yesterDay3, date: yesterDate3 },
            { dayofweek: yesterDay2, date: yesterDate2 },
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 },
            { dayofweek: tomorrowDay2, date: tomorrowDate2 }
          ]
        });
        break;
      case "Sa":
        this.setState({
          days: [
            { dayofweek: yesterDay5, date: yesterDate5 },
            { dayofweek: yesterDay4, date: yesterDate4 },
            { dayofweek: yesterDay3, date: yesterDate3 },
            { dayofweek: yesterDay2, date: yesterDate2 },
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate },
            { dayofweek: tomorrowDay1, date: tomorrowDate1 }
          ]
        });
        break;
      case "Su":
        this.setState({
          days: [
            { dayofweek: yesterDay6, date: yesterDate6 },
            { dayofweek: yesterDay5, date: yesterDate5 },
            { dayofweek: yesterDay4, date: yesterDate4 },
            { dayofweek: yesterDay3, date: yesterDate3 },
            { dayofweek: yesterDay2, date: yesterDate2 },
            { dayofweek: yesterDay1, date: yesterDate1 },
            { dayofweek: todayDay, date: todayDate }
          ]
        });
        break;
    }
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

let todayDate = moment().format("L");
let tomorrowDate1 = moment()
  .add(1, "days")
  .format("L");
let tomorrowDate2 = moment()
  .add(2, "days")
  .format("L");
let tomorrowDate3 = moment()
  .add(3, "days")
  .format("L");
let tomorrowDate4 = moment()
  .add(4, "days")
  .format("L");
let tomorrowDate5 = moment()
  .add(5, "days")
  .format("L");
let tomorrowDate6 = moment()
  .add(6, "days")
  .format("L");

let tomorrowDay1 = moment()
  .add(1, "days")
  .format("dd");
let tomorrowDay2 = moment()
  .add(2, "days")
  .format("dd");
let tomorrowDay3 = moment()
  .add(3, "days")
  .format("dd");
let tomorrowDay4 = moment()
  .add(4, "days")
  .format("dd");
let tomorrowDay5 = moment()
  .add(5, "days")
  .format("dd");
let tomorrowDay6 = moment()
  .add(6, "days")
  .format("dd");

let yesterDate1 = moment()
  .add(-1, "days")
  .format("L");
let yesterDate2 = moment()
  .add(-2, "days")
  .format("L");
let yesterDate3 = moment()
  .add(-3, "days")
  .format("L");
let yesterDate4 = moment()
  .add(-4, "days")
  .format("L");
let yesterDate5 = moment()
  .add(-5, "days")
  .format("L");
let yesterDate6 = moment()
  .add(-6, "days")
  .format("L");

let yesterDay1 = moment()
  .add(-1, "days")
  .format("dd");
let yesterDay2 = moment()
  .add(-2, "days")
  .format("dd");
let yesterDay3 = moment()
  .add(-3, "days")
  .format("dd");
let yesterDay4 = moment()
  .add(-4, "days")
  .format("dd");
let yesterDay5 = moment()
  .add(-5, "days")
  .format("dd");
let yesterDay6 = moment()
  .add(-6, "days")
  .format("dd");

export default TableHeaderLabels;
