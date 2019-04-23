import React from "react";
import { Modal, Header, Form, Button, Icon, Popup } from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";
import { sortSelectOptions } from "../sortSelectOptions";
import axios from "axios";
import parsedInput from "../parsedInput";
import selectStyles from "../selectStyles";

class EditTimeEntryModal extends React.Component {
  state = {
    project: {},
    task: {},
    year: "",
    startMonthDay: "",
    startHourMinute: "",
    endHourMinute: "",
    hours: ""
  };

  componentDidUpdate(prevProps) {
    const { timeBlock } = this.props;
    if (prevProps !== this.props && timeBlock) {
      this.setState({
        project: {
          value: timeBlock.taskInfo.project_id,
          label: `${timeBlock.taskInfo.projectInfo.name} (${
            timeBlock.taskInfo.projectInfo.client_name
          })`
        },
        task: { value: timeBlock.task_id, label: timeBlock.taskInfo.name }
      });

      this.setState({
        year: moment(timeBlock.start_time).format("YYYY"),
        startMonthDay: moment(timeBlock.start_time).format("MM/DD"),
        startHourMinute: moment(timeBlock.start_time).format("HH:mm"),
        endMonthDay: moment(timeBlock.end_time).format("MM/DD"),
        endHourMinute: moment(timeBlock.end_time).format("HH:mm"),
        hours: timeBlock.hours,
        status: timeBlock.status
      });
    }
  }

  handleChange = e => {
    const { year, startMonthDay, endMonthDay } = this.state;

    const targetName = e.target.name;
    console.log(targetName);

    this.setState({ [targetName]: e.target.value }, () => {
      if (this.state.startHourMinute === "" && targetName === "hours") {
        this.setState({ startHourMinute: "09:00" }, () =>
          this.setState({
            endHourMinute: moment(
              parsedInput(year, startMonthDay, this.state.startHourMinute)
            )
              .add(parseFloat(this.state.hours), "hours")
              .format("HH:mm")
          })
        );
      } else if (targetName === "hours") {
        this.setState({
          endHourMinute: moment(
            parsedInput(year, startMonthDay, this.state.startHourMinute)
          )
            .add(parseFloat(this.state.hours), "hours")
            .format("HH:mm")
        });
      } else if (targetName === "startMonthDay") {
        this.setState({
          endMonthDay: this.state.startMonthDay,
          hours: moment(
            parsedInput(
              year,
              this.state.startMonthDay,
              this.state.endHourMinute
            )
          ).diff(
            moment(
              parsedInput(
                year,
                this.state.startMonthDay,
                this.state.startHourMinute
              )
            ),
            "hours",
            true
          )
        });
      } else if (
        ((targetName === "startHourMinute" || targetName === "endHourMinute") &&
          this.state.endHourMinute.length === 8,
        5 && this.state.startHourMinute.length === 8,
        5)
      ) {
        this.setState({
          hours: moment(
            parsedInput(year, endMonthDay, this.state.endHourMinute)
          ).diff(
            moment(
              parsedInput(year, startMonthDay, this.state.startHourMinute)
            ),
            "hours",
            true
          )
        });
      }
    });
  };

  handleChange1 = project => {
    this.setState({ project }, () => {
      const selectedProjectTasks = this.props.tasks.filter(
        t => t.project_id === this.state.project.value
      );
      this.setState({
        task: {
          value: selectedProjectTasks[0].id,
          label: selectedProjectTasks[0].name
        }
      });
    });
  };

  handleChange2 = task => {
    this.setState({ task });
  };

  handleSubmit = e => {
    const { timeBlock, getCurrentUserTimeBlocks, handleClose } = this.props;
    const {
      task,
      year,
      startMonthDay,
      startHourMinute,
      endHourMinute
    } = this.state;
    const endMonthDay = startMonthDay;
    const startMoment = parsedInput(year, startMonthDay, startHourMinute);
    const endMoment = parsedInput(year, endMonthDay, endHourMinute);
    const block = {
      start_time: startMoment,
      end_time: endMoment,
      task_id: task.value
    };
    e && e.preventDefault();
    axios.put(`/api/timeblocks/${timeBlock.id}`, block).then(res => {
      console.log(res);
      getCurrentUserTimeBlocks();
      handleClose();
    });
  };

  deleteEntry = timeBlock => {
    if (timeBlock) {
      const { getCurrentUserTimeBlocks, handleClose } = this.props;
      axios
        .delete(`/api/timeblocks/${timeBlock.id}`)
        .then(res => console.log(res));
      getCurrentUserTimeBlocks();
      handleClose();
    }
  };

  render() {
    const selectOptions = sortSelectOptions(
      this.state.project,
      this.props.projects,
      this.props.tasks
    );
    const { handleClose } = this.props;

    return (
      <>
        <Modal open={this.props.modal1Open} onClose={() => handleClose()}>
          <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
            Edit Timesheet Entry
          </Modal.Header>
          <Form style={{ padding: "10px" }}>
            <Header>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px"
                }}
              >
                Project
                <Select
                  styles={selectStyles}
                  value={this.state.project}
                  onChange={this.handleChange1}
                  options={selectOptions.projectSelectOptions}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  marginBottom: "20px"
                }}
              >
                Task
                <Select
                  styles={selectStyles}
                  value={this.state.task}
                  onChange={this.handleChange2}
                  options={selectOptions.taskSelectOptions}
                />
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{
                    width: "100px",
                    marginLeft: "10px",
                    paddingRight: "10px"
                  }}
                >
                  <Form.Input
                    maxLength="4"
                    label="Year"
                    name="year"
                    placeholder="YYYY"
                    onChange={this.handleChange}
                    value={this.state.year}
                  />
                </div>
                <div style={{ width: "100px", marginLeft: "10px" }}>
                  <Form.Input
                    maxLength="5"
                    label="Date"
                    name="startMonthDay"
                    placeholder="MM/DD"
                    onChange={this.handleChange}
                    value={this.state.startMonthDay}
                  />
                </div>
                <div
                  style={{
                    width: "180px",
                    paddingLeft: "20px",
                    paddingRight: "0"
                  }}
                >
                  <Form.Input
                    maxLength="8"
                    label="Start Time"
                    name="startHourMinute"
                    placeholder="HH:mm am"
                    onChange={this.handleChange}
                    value={this.state.startHourMinute}
                  />
                </div>
                <div
                  style={{
                    width: "180px",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                  }}
                >
                  <Form.Input
                    maxLength="8"
                    label="End Time"
                    name="endHourMinute"
                    placeholder="HH:mm pm"
                    onChange={this.handleChange}
                    value={this.state.endHourMinute}
                  />
                </div>
                <div style={{ width: "100px" }}>
                  <Form.Input
                    autoFocus
                    placeholder="hh.hh"
                    maxLength="8"
                    label="Hours"
                    name="hours"
                    onChange={this.handleChange}
                    value={this.state.hours}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <div>Status:</div>
                  <div>{this.state.status}</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  marginRight: "20px",
                  alignItems: "flex-end"
                }}
              >
                <div style={{ marginLeft: "20px" }}>
                  <Popup
                    trigger={
                      <Icon
                        onClick={() => this.deleteEntry(this.props.timeBlock)}
                        name="trash alternate"
                        style={{ color: "RebeccaPurple" }}
                      />
                    }
                    content="Delete Entry"
                  />
                </div>
                <div>
                  <Button
                    style={{
                      marginLeft: "40px",
                      marginTop: "30px",
                      width: "100px"
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      marginTop: "30px",
                      width: "100px",
                      color: "white",
                      background: "RebeccaPurple"
                    }}
                    onClick={() => this.handleSubmit()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Header>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EditTimeEntryModal;
