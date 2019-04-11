import React from "react";
import { AuthConsumer } from "../../../providers/AuthProvider";
import { Table, Button, Icon } from "semantic-ui-react";

import axios from "axios";
import UserWeek from "./UserWeek";
import DateRange from "../DateRange";

import groupTimeBlocksByWeek from "./groupTimeBlocksByWeek";
import TimeBlockNavbar from "../NavBars/TimeBlockNavbar.js";

class TimeBlocks extends React.Component {
  state = { timeBlocks: [], startDate: "", endDate: "" };

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
      return result;
    });
    console.log(result);
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
    return (
      <>
        <TimeBlockNavbar />

        <div style={{ padding: "5px 20px 5px 20px" }}>
          <Table basic="very" celled collapsing style={{ width: "100%" }}>
            <Table.Header>
              <Table.Row>
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
                <Table.HeaderCell style={{ paddingTop: "10px" }}>
                  <Button
                    style={{
                      background: "#723186",
                      color: "white",
                      width: "100%"
                    }}
                    onClick={() => this.addNewTimeBlock(true)}
                  >
                    <Icon style={{ color: "white" }} name="add" />
                    Manual
                  </Button>
                </Table.HeaderCell>
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

const ConnectedTimeBlocks = props => (
  <AuthConsumer>{auth => <TimeBlocks auth={auth} {...props} />}</AuthConsumer>
);

export default ConnectedTimeBlocks;
