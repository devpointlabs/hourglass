import React from "react";
import { Button, Icon, Modal, Header, Form, Checkbox } from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { TimerConsumer } from "../../providers/TimerProvider";
import { withRouter } from "react-router-dom";
import TimerStartStopButton from "./TimerStartStopButton";
import parsedInput from "./parsedInput";

class AddTimeBlockButton extends React.Component {
  state = {
    project: "",
    task: "",
    year: moment(this.props.selectedDate).format("YYYY"),
    startMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    startHourMinute: "",
    endMonthDay: moment(this.props.selectedDate).format("a"),
    endHourMinute: "",
    hours: "",
    startMoment: {},
    endMoment: {},
    modalOpen: false
  };

  componentDidUpdate(prevProps) {
    const { selectedDate } = this.props;
    if (prevProps.selectedDate !== selectedDate)
      this.setState({
        year: moment(selectedDate).format("YYYY"),
        startMonthDay: moment(selectedDate).format("MM/DD"),
        endMonthDay: moment(selectedDate).format("MM/DD")
      });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = e => {
    const { year, startMonthDay, endMonthDay } = this.state;

    const targetName = e.target.name;

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
    this.setState({ project });
  };

  handleChange2 = task => {
    this.setState({ task });
  };

  handleClick = () => {
    const { timerRunning } = this.props.timer;

    if (timerRunning) {
      //stoptime
    } else {
      this.setState({
        year: moment().format("YYYY"),
        startMonthDay: moment().format("MM/DD"),
        startHourMinute: moment().format("HH:mm"),
        startMoment: moment()
      });
    }

    // this.setState({ timerRunning: !this.state.timerRunning });
    this.props.timer.toggleTimer();
  };

  // handleSubmit = (e) => {
  //   e && e.preventDefault()
  //   axios.post('/api/timeblocks', {project_id: , task_id: 1, start_time: 1, end_time: 2})
  // }
  cancelAddTimesheet = () => {
    this.setState({
      endHourMinute: "",
      hours: "",
      startHourMinute: "",
      project: {},
      task: {}
    });
    this.handleClose();
  };

  render() {
    const selectedProjectTasks = this.props.tasks.filter(
      t => t.project_id === this.state.project.value
    );
    const { timerRunning } = this.props.timer;

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={
          <Button
            style={{
              background: timerRunning ? "RebeccaPurple" : "RebeccaPurple",
              color: "white",
              borderRadius: 0,
              paddingLeft: "0",
              width: "4em",
              height: "4em",
              textAlign: "center",
              border: "solid lightgrey 1px"
            }}
            size="large"
            onClick={() => this.handleOpen()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "4em"
              }}
            >
              <Icon
                size="large"
                style={{ color: "white", margin: "0" }}
                name="add"
              />
            </div>
          </Button>
        }
      >
        <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
          Add Timesheet Entry
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form style={{ padding: "10px" }} onSubmit={this.handleSubmit}>
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
                    value={this.state.project}
                    onChange={this.handleChange1}
                    options={this.props.projects.map(p => ({
                      value: p.id,
                      label: `${p.name} (${p.client_name})`
                    }))}
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
                    value={this.state.task}
                    onChange={this.handleChange2}
                    options={selectedProjectTasks.map(t => ({
                      value: t.id,
                      label: t.name
                    }))}
                  />
                </div>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "100px", marginLeft: "10px" }}>
                        <Form.Input
                          maxLength="5"
                          label="Date"
                          name="startMonthDay"
                          placeholder="MM/DD"
                          onChange={this.handleChange}
                          value={this.state.startMonthDay}
                        />
                        <Form.Input
                          maxLength="4"
                          label="Year"
                          name="year"
                          placeholder="YYYY"
                          onChange={this.handleChange}
                          value={this.state.year}
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
                      {/* <div
                        style={{
                          width: "90px",
                          paddingLeft: "0",
                          paddingRight: "20px"
                        }}
                      >
                        <Form.Input
                          maxLength="2"
                          label="am/pm"
                          name="startAmPm"
                          placeholder="am"
                          onChange={this.handleChange}
                          value={this.state.startAmPm}
                        />
                      </div> */}
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
                      {/* <div
                        style={{
                          width: "90px",
                          paddingLeft: "0",
                          paddingRight: "20px"
                        }}
                      >
                        <Form.Input
                          maxLength="2"
                          label="am/pm"
                          name="endAmPm"
                          placeholder="pm"
                          onChange={this.handleChange}
                          value={this.state.endAmPm}
                        />
                      </div> */}
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
                    </div>
                    <div style={{ background: "white" }}>
                      <TimerStartStopButton handleClick={this.handleClick} />
                    </div>
                  </div>
                  <Checkbox
                    style={{ marginLeft: "20px", marginTop: "20px" }}
                    label="manually entered"
                    name="manualEnterCheckbox"
                  />
                </div>
              </Header>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {timerRunning ? (
                  <Button onClick={() => this.handleClose()}>Back</Button>
                ) : (
                  <div>
                    <Button onClick={() => this.cancelAddTimesheet()}>
                      Cancel
                    </Button>
                    <Button onClick={() => this.function()}>Submit</Button>
                  </div>
                )}
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export class ConnectedAddTimeBlockButton extends React.Component {
  render() {
    return (
      <TimerConsumer>
        {timer => <AddTimeBlockButton {...this.props} timer={timer} />}
      </TimerConsumer>
    );
  }
}

export default withRouter(ConnectedAddTimeBlockButton);
