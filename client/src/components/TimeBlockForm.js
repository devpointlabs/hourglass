import React, { Fragment } from "react";
import { Form, Table, Image, Header, Button } from "semantic-ui-react";
//import StopWatch from './StopWatch'
import moment from "moment";
import axios from "axios";
import TimeBlock from "./TimeBlock";

class TimeBlockForm extends React.Component {
  state = {
    project_id: 1,
    projectName: "",
    date: "",
    startTime: null,
    endTime: "",
    totalTime: "",
    billable: "",
    unbillable: "",
    editMode: false
  };

  handleSubmit = e => {
    e && e.preventDefault();
    this.toggleEditMode();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  startButton = () => {
    const { project_id } = this.state;
    let t = new moment();
    const timeBlock = { project_id, start_time: t };
    axios
      .post(`/api/projects/${project_id}/timeblocks`, timeBlock)
      .then(res => {
        this.props.updateTimeBlocks(res.data);
      });
    //   //The Start Button should not be able to setState if the stopButton has not been clicked
    // axios post start time to entry object
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  stopButton = () => {
    const createNewDate = new moment();
    axios
      .put(`/api/projects/${1}/timeblocks/${1}`, {
        end_time: createNewDate,
        billable: "",
        unbillable: ""
      })
      .then(res => {});
    this.setState({ endTime: createNewDate }, () => this.calculateTimeBlock());
    //   //prevent stop button from triggering if startButton value is null
    // axios get start time,
    // calculate difference
    // axios put difference, and end time to entry object
  };

  calculateTimeBlock = () => {};

  render() {
    return (
      <Fragment>
        {this.state.editMode ? (
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                  rounded
                  size="mini"
                />
                <Header.Content>
                  Project Name
                  <Header.Subheader>Team Name</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Form.Group>
                <Form.Input
                  style={{ width: "2ch" }}
                  name="startTimeDay"
                  value={this.state.startTimeDay}
                  onChange={this.handleChange}
                  label="dd"
                />
                <Form.Input
                  style={{ width: "2ch" }}
                  name="startTimeMonth"
                  value={this.state.startTimeMonth}
                  onChange={this.handleChange}
                  label="Mo"
                />
              </Form.Group>
            </Table.Cell>
            <Table.Cell>
              <Form.Group>
                <Form.Input
                  style={{ width: "2ch" }}
                  name="startTimeHour"
                  value={this.state.startTimeHour}
                  onChange={this.handleChange}
                  label="Hr"
                />
                <Form.Input
                  style={{ width: "2ch" }}
                  name="startTimeMinute"
                  value={this.state.startTimeMinute}
                  onChange={this.handleChange}
                  label="Min"
                />

                <Form.Select
                  style={{ width: "ch" }}
                  name="endTimeAmPM"
                  options={[
                    { key: 1, text: "am", value: "am" },
                    { key: 2, text: "pm", value: "pm" }
                  ]}
                  value={this.state.endTimeAmPm}
                  onChange={this.handleChange}
                  label="Am/Pm"
                />
              </Form.Group>
            </Table.Cell>
            <Table.Cell>
              <Form.Group>
                <Form.Input
                  style={{ width: "2ch" }}
                  name="endTimeHour"
                  value={this.state.endTimeHour}
                  onChange={this.handleChange}
                  label="Hr"
                />
                <Form.Input
                  style={{ width: "2ch" }}
                  name="endTimeMinute"
                  value={this.state.endTimeMinute}
                  onChange={this.handleChange}
                  label="Min"
                />
                <Form.Select
                  style={{ width: "2ch" }}
                  name="endTimeAmPM"
                  options={[
                    { key: 1, text: "am", value: "am" },
                    { key: 2, text: "pm", value: "pm" }
                  ]}
                  value={this.state.endTimeAmPm}
                  onChange={this.handleChange}
                  label="Am/Pm"
                />
              </Form.Group>
            </Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>
              <Form.Input
                style={{ width: "2ch" }}
                name="billable"
                value={this.state.billabe}
                onChange={this.handleChange}
              />
            </Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>
              {this.state.startTime ? (
                <Button color="red" inverted onClick={() => this.stopButton()}>
                  Stop
                </Button>
              ) : (
                <Button
                  color="green"
                  inverted
                  onClick={() => this.startButton()}
                >
                  Start
                </Button>
              )}
            </Table.Cell>

            <Table.Cell>
              {this.state.editMode ? (
                <Button
                  color="green"
                  inverted
                  onClick={() => this.handleSubmit()}
                >
                  Save
                </Button>
              ) : (
                <Button
                  color="yellow"
                  inverted
                  onClick={() => this.toggleEditMode()}
                >
                  Edit
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ) : (
          <TimeBlock
            data={this.props.data}
            toggleEditMode={this.toggleEditMode}
            stop={this.stopButton}
            start={this.startButton}
          />
        )}
      </Fragment>
    );
  }
}

export default TimeBlockForm;
