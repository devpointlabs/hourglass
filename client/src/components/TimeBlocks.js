import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Table, Form, Button, Icon } from "semantic-ui-react";
import TimeBlockForm from "./TimeBlockForm";
import axios from "axios";
import UserWeek from "./UserWeek";
import DateRange from "./DateRange";
import moment from "moment";
import groupTimeBlocksByWeek from "./groupTimeBlocksByWeek";

class TimeBlocks extends React.Component {
  state = { timeBlocks: [], startDate: "", endDate: "" };

  componentDidMount() {
    this.getTimeBlocks();
  }

  getTimeBlocks = () => {
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

  updateTimeBlocks = timeBlock => {
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

  checkForActiveTimeBlock = () => {
    let result = false;
    this.state.timeBlocks.map(t => {
      if (t.start_time && !t.end_time) result = true;
    });
    console.log(result);
    return result;
  };

  deleteTimeBlock = (id, project_id) => {
    axios.delete(`/api/projects/${project_id}/timeblocks/${id}`).then(res => {
      this.setState({
        timeBlocks: this.state.timeBlocks.filter(t => t.id !== id)
      });
      this.setWeeks();
    });
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, grey, white)",
            width: "100%",
            height: "10px"
          }}
        />
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
                    updateTimeBlocks={this.updateTimeBlocks}
                    addTimeBlock={this.addTimeBlock}
                    deleteTimeBlock={this.deleteTimeBlock}
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
