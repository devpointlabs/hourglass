import React from "react";
import TimeSheetNavbar from "./TimeSheetNavbar";
import TimeBlockNavbar from "./TimeBlockNavbar";
import { Table, Button, Icon } from "semantic-ui-react";
import DateRange from "./DateRange";
import UserWeek from "./UserWeek";
import axios from "axios";
import groupTimeBlocksByWeek from "./groupTimeBlocksByWeek";
import TableHeaderRow from "./TableHeaderRow";
//import convertMomentDateToSelectedDateString from "./convertMomentToSelectedDateString"

class TimeSheet extends React.Component {
  state = {
    view: "day",
    selectedDate: "Wednesday 12 Oct 2019",

    timeBlocks: [],
    startDate: "",
    endDate: ""
  };

  setSelectedDate = date => {
    const { view } = this.state;
    this.setState({ selectedDate: date }, () => this.setTimeBlocks(date, view));
  };

  setTimeBlocks = (date, view) => {
    ////get timeblocks from the server based on date, view, user
  };

  ////// old code below this line ////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  componentDidMount() {
    this.getTimeBlocks();
  }

  getTimeBlocks = () => {
    //user_id!!! not always 8
    axios.get(`/api/timeblocks`).then(res =>
      this.setState({ timeBlocks: res.data }, () => {
        !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
        this.updateDateRange(this.state.startDate, this.state.endDate);
      })
    );
  };

  updateDateRange = (startDate, endDate) => {
    this.setState({ startDate, endDate }, () => this.setWeeks());
  };

  setWeeks = () => {
    const { startDate, endDate, timeBlocks } = this.state;
    this.setState({
      weeks: groupTimeBlocksByWeek(timeBlocks, startDate, endDate)
    });
  };

  addTimeBlock = () => {
    this.getTimeBlocks();
  };

  updateBlocks = timeBlock => {
    this.setState(
      {
        timeBlocks: this.state.timeBlocks.map(t => {
          if (t.id === timeBlock.id) return { ...t, ...timeBlock };
          return t;
        })
      },
      () => {
        !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
      }
    );
  };

  addNewTimeBlock = editMode => {
    this.setState(
      {
        timeBlocks: [...this.state.timeBlocks, { editMode: editMode }]
      },
      () => this.setWeeks()
    );
  };

  updateTimeBlock = timeblock => {
    this.setState(
      {
        timeblocks: this.state.timeBlocks.map(t => {
          if (t.id === timeblock.id) return timeblock;
          return t;
        })
      },
      () => this.setWeeks()
    );
  };

  checkForActiveTimeBlock = () => {
    let result = false;
    this.state.timeBlocks.map(t => {
      if (t.start_time && !t.end_time) result = true;
    });
    console.log(result);
    return result;
  };

  deleteTimeBlock = (id, project_id) => {
    axios.delete(`/api/timeblocks/${id}`).then(res => {
      this.setState({
        timeBlocks: this.state.timeBlocks.filter(t => t.id !== id)
      });
      this.setWeeks();
    });
  };

  render() {
    const { view, selectedDate } = this.state;
    return (
      <>
        <TimeBlockNavbar />
        <TimeSheetNavbar
          view={view}
          selectedDate={selectedDate}
          setSelectedDate={this.setSelectedDate}
        />
        <Table basic="very" celled collapsing style={{ width: "100%" }}>
          <Table.Header>
            <TableHeaderRow />
          </Table.Header>
        </Table>

        <hr />
        <hr />
        <hr />

        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ paddingTop: "10px" }}>
                  <Button
                    style={{
                      background: "#723186",
                      color: "white",
                      width: "25%"
                    }}
                    onClick={() => this.addNewTimeBlock(true)}
                  >
                    <Icon style={{ color: "white" }} name="add" />
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "20%" }}>
                  <DateRange
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    updateDateRange={this.updateDateRange}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Total Time</Table.HeaderCell>
                <Table.HeaderCell>Billable</Table.HeaderCell>
                <Table.HeaderCell>UnBillable</Table.HeaderCell>
                <Table.HeaderCell>Clock In/Out</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.weeks &&
                this.state.weeks.map(w => (
                  <UserWeek
                    key={w.title}
                    week={w}
                    updateBlocks={this.updateBlocks}
                    addTimeBlock={this.addTimeBlock}
                    deleteTimeBlock={this.deleteTimeBlock}
                    updateTimeBlock={this.updateTimeBlock}
                  />
                ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
}

export default TimeSheet;
