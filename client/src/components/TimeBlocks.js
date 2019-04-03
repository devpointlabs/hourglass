import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Table, Form, Button, Icon, Accordion } from "semantic-ui-react";
import TimeBlockForm from "./TimeBlockForm";
import axios from "axios";
import UserWeek from "./UserWeek";

class TimeBlocks extends React.Component {
  state = { timeBlocks: [] };

  componentDidMount() {
    this.getTimeBlocks();
  }

  getTimeBlocks = () => {
    axios.get(`/api/timeblocks`).then(res =>
      this.setState({ timeBlocks: res.data }, () => {
        this.groupTimeBlocksByWeek();
        !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
      })
    );
  };

  groupTimeBlocksByWeek = () => {
    this.setState({ week1: this.state.timeBlocks.slice(0, 5) });
    this.setState({ week2: this.state.timeBlocks.slice(6, 10) });
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

  deleteTimeBlock = (id, project_id) => {
    axios.delete(`/api/projects/${project_id}/timeblocks/${id}`).then(res => {
      this.setState({
        timeBlocks: this.state.timeBlocks.filter(t => t.id !== id)
      });
    });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
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
                <Table.HeaderCell>Billable</Table.HeaderCell>
                <Table.HeaderCell>UnBillable</Table.HeaderCell>
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
              <UserWeek
                week={this.state.week1}
                updateTimeBlocks={this.updateTimeBlocks}
                addTimeBlock={this.addTimeBlock}
                deleteTimeBlock={this.deleteTimeBlock}
              />
              <UserWeek
                week={this.state.week2}
                updateTimeBlocks={this.updateTimeBlocks}
                addTimeBlock={this.addTimeBlock}
                deleteTimeBlock={this.deleteTimeBlock}
              />
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

{
  /* <Accordion>
<Accordion.Title
  active={activeIndex === 0}
  index={0}
  onClick={this.handleClick}
>
  <Icon name="dropdown" />
  04/01/2019 - 04/30/2019
</Accordion.Title>
<Accordion.Content active={activeIndex === 0}>
  {this.state.timeBlocks.map(t => (
    <TimeBlockForm
      key={t.id}
      data={t}
      updateTimeBlocks={this.updateTimeBlocks}
      addTimeBlock={this.addTimeBlock}
      deleteTimeBlock={this.deleteTimeBlock}
    />
  ))}
</Accordion.Content>
</Accordion> */
}
