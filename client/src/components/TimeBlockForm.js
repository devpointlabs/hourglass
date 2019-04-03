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
import styled from "styled-components";

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
    editMode: this.props.data.editMode
  };

  componentDidMount = () => {
    this.setState({
      project_id: this.props.project_id,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      billable: this.props.billable,
      unbillable: this.props.unbillable
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();
    this.toggleEditMode();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  startButton = () => {
    const project_id = 1;
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
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
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
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
              <div>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="startTimeDay"
                  value={this.state.startTimeDay}
                  onChange={this.handleChange}
                  placeholder="dd"
                />
                <span>/</span>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="startTimeMonth"
                  value={this.state.startTimeMonth}
                  onChange={this.handleChange}
                  placeholder="Mo"
                />
              </div>
            </Table.Cell>
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="startTimeHour"
                  value={this.state.startTimeHour}
                  onChange={this.handleChange}
                  placeholder="hh"
                  maxLength="2"
                />
                <span>:</span>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="startTimeMinute"
                  value={this.state.startTimeMinute}
                  onChange={this.handleChange}
                  placeholder="mm"
                  maxLength="2"
                />
                <SelectStyler>
                  <Dropdown
                    inline
                    name="endTimeAmPM"
                    options={[
                      { key: 1, text: "am", value: "am" },
                      { key: 2, text: "pm", value: "pm" }
                    ]}
                    value={this.state.endTimeAmPm}
                    onChange={this.handleChange}
                    defaultValue={"am"}
                  />
                </SelectStyler>
              </div>
            </Table.Cell>
            <Table.Cell style={{ paddingLeft: "2px", paddingRight: "2px" }}>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="endTimeHour"
                  value={this.state.endTimeHour}
                  onChange={this.handleChange}
                  placeholder="hh"
                  maxLength="2"
                />
                <span>:</span>
                <input
                  style={{ width: "2.5ch", padding: "1px" }}
                  name="endTimeMinute"
                  value={this.state.endTimeMinute}
                  onChange={this.handleChange}
                  placeholder="mm"
                  maxLength="2"
                />
                <SelectStyler>
                  <Dropdown
                    inline
                    name="endTimeAmPM"
                    options={[
                      { key: 1, text: "am", value: "am" },
                      { key: 2, text: "pm", value: "pm" }
                    ]}
                    value={this.state.endTimeAmPm}
                    onChange={this.handleChange}
                    defaultValue="pm"
                  />
                </SelectStyler>
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
              <input
                style={{ width: "4ch", padding: 0 }}
                name="billable"
                value={this.state.billabe}
                onChange={this.handleChange}
              />{" "}
            </Table.Cell>
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
              {/* {this.state.unbillable} */}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell style={{ paddingLeft: "5px", paddingRight: "2px" }}>
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

const SelectStyler = styled.div`
  .ui.selection.dropdown {
    min-width: 3px;
    padding: 0;
  }
`;

export default TimeBlockForm;
