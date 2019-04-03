import React, { Fragment } from "react";
import {
  Form,
  Table,
  Image,
  Header,
  Button,
  Dropdown
} from "semantic-ui-react";
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
                  Project Name
                  <Header.Subheader>Team Name</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              <div style={{ display: "flex", paddingLeft: "5px" }}>
                <input
                  style={{ width: "3ch", padding: 0 }}
                  name="startTimeDay"
                  value={this.state.startTimeDay}
                  onChange={this.handleChange}
                  placeholder="dd"
                />
                <input
                  style={{ width: "3ch", padding: 0 }}
                  name="startTimeMonth"
                  value={this.state.startTimeMonth}
                  onChange={this.handleChange}
                  placeholder="Mo"
                />
              </div>
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              <div style={{ display: "flex" }}>
                <input
                  style={{ display: "inline", width: "3ch", padding: 0 }}
                  name="startTimeHour"
                  value={this.state.startTimeHour}
                  onChange={this.handleChange}
                  placeholder="Hr"
                />
                <input
                  style={{ display: "inline", width: "4ch", padding: 0 }}
                  name="startTimeMinute"
                  value={this.state.startTimeMinute}
                  onChange={this.handleChange}
                  placeholder="Min"
                />
                <Dropdown
                  inline
                  style={{ display: "inline", width: "4ch", padding: 0 }}
                  name="endTimeAmPm"
                  options={[
                    { key: 1, text: "am", value: "am" },
                    { key: 2, text: "pm", value: "pm" }
                  ]}
                  value={this.state.endTimeAmPm}
                  onChange={this.handleChange}
                  placeholder="am"
                />
              </div>
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              <div style={{ display: "flex" }}>
                <input
                  style={{ display: "inline", width: "3ch", padding: 0 }}
                  name="startTimeHour"
                  value={this.state.startTimeHour}
                  onChange={this.handleChange}
                  placeholder="Hr"
                />
                <input
                  style={{ display: "inline", width: "4ch", padding: 0 }}
                  name="startTimeMinute"
                  value={this.state.startTimeMinute}
                  onChange={this.handleChange}
                  placeholder="Min"
                />
                <Dropdown
                  inline
                  style={{ display: "inline", width: "4ch", padding: 0 }}
                  name="endTimeAmPm"
                  options={[
                    { key: 1, text: "am", value: "am" },
                    { key: 2, text: "pm", value: "pm" }
                  ]}
                  value={this.state.endTimeAmPm}
                  onChange={this.handleChange}
                  placeholder="pm"
                />
              </div>
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>4</Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              {/* <input
                style={{ display: "inline", width: "4ch", padding: 0 }}
                name="billable"
                value={this.state.billabe}
                onChange={this.handleChange}
              /> */}
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              {/* {this.state.unbillable} */}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell style={{ padding: 0 }}>
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
