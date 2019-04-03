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
        this.props.addTimeBlock(res.data);
      });
    //   //The Start Button should not be able to setState if the stopButton has not been clicked
    // axios post start time to entry object
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  stopButton = id => {
    const createNewDate = new moment();
    const calcs = this.calculateTimeBlock(
      this.props.data.startTime,
      createNewDate,
      this.state.billable
    );
    axios
      .put(`/api/projects/${1}/timeblocks/${id}`, {
        end_time: createNewDate,
        billable: this.state.billable,
        unbillable: calcs.unbillable
      })
      .then(res =>
        this.props.updateTimeBlocks({ totalTime: calcs.totalTime, ...res.data })
      );
    //    this.setState({ endTime: createNewDate }, () => this.calculateTimeBlock());
    //   //prevent stop button from triggering if startButton value is null
    // axios get start time,
    // calculate difference
    // axios put difference, and end time to entry object
  };

  calculateTimeBlock = (start, stop, billable) => {
    const totalTime = moment
      .utc(moment.duration(stop.diff(start)).asMilliseconds())
      .format("HH.H");
    const unbillable = totalTime - billable;
    const calcs = { totalTime, unbillable };
    return calcs;
  };

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
                  <Form.Select
                    name="projectName"
                    options={[
                      { key: 1, text: "Project 1", value: "Project 1" },
                      { key: 2, text: "Project 2", value: "Project 2" },
                      { key: 3, text: "Project 3", value: "Project 3" }
                    ]}
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                  <Header.Subheader>Team Name</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Form.Group>
                <Form.Input
                  style={{ width: "5ch", padding: 0 }}
                  name="startTimeDay"
                  value={this.state.startTimeDay}
                  onChange={this.handleChange}
                  label="dd"
                />
                <Form.Input
                  style={{ width: "5ch", padding: 0 }}
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
                  style={{ width: "5ch", padding: 0 }}
                  name="startTimeHour"
                  value={this.state.startTimeHour}
                  onChange={this.handleChange}
                  label="Hr"
                />
                <Form.Input
                  style={{ width: "5ch", padding: 0 }}
                  name="startTimeMinute"
                  value={this.state.startTimeMinute}
                  onChange={this.handleChange}
                  label="Min"
                />

                <Form.Select
                  style={{ width: "5ch", padding: 0 }}
                  name="endTimeAmPm"
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
                  style={{ width: "5ch", padding: 0 }}
                  name="endTimeHour"
                  value={this.state.endTimeHour}
                  onChange={this.handleChange}
                  label="Hr"
                />
                <Form.Input
                  style={{ width: "5ch", padding: 0 }}
                  name="endTimeMinute"
                  value={this.state.endTimeMinute}
                  onChange={this.handleChange}
                  label="Min"
                />
                <Form.Select
                  style={{ width: "5ch", padding: 0 }}
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
                style={{ width: "2ch", padding: 0 }}
                name="billable"
                value={this.state.billabe}
                onChange={this.handleChange}
              />
            </Table.Cell>
            <Table.Cell>{this.state.unbillable}</Table.Cell>
            <Table.Cell />
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
