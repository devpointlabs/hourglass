import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Table, Form, Button, Icon, Image } from "semantic-ui-react";
import TimeBlockForm from "./TimeBlockForm";
import axios from "axios";

class TimeBlocks extends React.Component {
  state = { timeBlocks: [] };

  componentDidMount() {
    this.getTimeBlocks();
  }

  getTimeBlocks = () => {
    const project_id = 1;
    axios.get(`/api/projects/${project_id}/timeblocks`).then(res =>
      this.setState({ timeBlocks: res.data }, () => {
        !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
      })
    );
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
    this.setState({
      timeBlocks: [...this.state.timeBlocks, { editMode: editMode }]
    });
  };

  checkForActiveTimeBlock = () => {
    let result = false;
    this.state.timeBlocks.map(t => {
      if (t.start_time && !t.end_time) result = true;
    });
    console.log(result);
    return result;
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
        <Form style={{ paddingLeft: "20px" }}>
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Total Time</Table.HeaderCell>
                <Table.HeaderCell>Billable Hours</Table.HeaderCell>
                <Table.HeaderCell>UnBillable Hours</Table.HeaderCell>
                <Table.HeaderCell>Clock In/Out</Table.HeaderCell>
                <Table.HeaderCell style={{ paddingTop: "10px" }}>
                  <Button
                    style={{ background: "#723186", color: "white" }}
                    onClick={() => this.addNewTimeBlock(true)}
                  >
                    <Icon style={{ color: "white" }} name="add" />
                    Manual
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.timeBlocks.map(t => (
                <TimeBlockForm
                  key={t.id}
                  data={t}
                  updateTimeBlocks={this.updateTimeBlocks}
                  addTimeBlock={this.addTimeBlock}
                />
              ))}
            </Table.Body>
          </Table>
        </Form>
      </>
    );
  }
}

const ConnectedTimeBlocks = props => (
  <AuthConsumer>{auth => <TimeBlocks auth={auth} {...props} />}</AuthConsumer>
);

export default ConnectedTimeBlocks;
