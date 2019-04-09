import React from "react";
import {
  Button,
  Icon,
  Modal,
  Image,
  Header,
  Form,
  Checkbox
} from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";
import axios from "axios";

class addTimeBlockButton extends React.Component {
  state = {
    projectId: "",
    task: "",
    year: moment(this.props.selectedDate).format("YYYY"),
    startMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    startHourMinute: "",
    endMonthDay: moment(this.props.selectedDate).format("a"),
    endHourMinute: "",
    hours: "",
    startMoment: {},
    endMoment: {},
    modalOpen: false,
    timerRunning: false
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
    const {
      year,
      startMonthDay,
      startHourMinute,
      endMonthDay,
      endHourMinute,
      hoursManuallyEntered,
      hours
    } = this.state;

    const targetName = e.target.name;
    const targetValue = e.target.value;

    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.startHourMinute === "" && targetName === "hours") {
        this.setState({ startHourMinute: "09:00" }, () =>
          this.setState({
            endHourMinute: moment(
              year +
                "-" +
                startMonthDay.substring(0, 2) +
                "-" +
                startMonthDay.substring(3, 5) +
                " " +
                this.state.startHourMinute
            )
              .add(parseFloat(this.state.hours), "hours")
              .format("HH:mm")
          })
        );
      } else if (targetName === "hours") {
        this.setState({
          endHourMinute: moment(
            year +
              "-" +
              startMonthDay.substring(0, 2) +
              "-" +
              startMonthDay.substring(3, 5) +
              " " +
              this.state.startHourMinute
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
            year +
              "-" +
              endMonthDay.substring(0, 2) +
              "-" +
              endMonthDay.substring(3, 5) +
              " " +
              this.state.endHourMinute
          ).diff(
            moment(
              year +
                "-" +
                startMonthDay.substring(0, 2) +
                "-" +
                startMonthDay.substring(3, 5) +
                " " +
                this.state.startHourMinute
            ),
            "hours",
            true
          )
        });
      }
    });
  };

  handleChange1 = e => {
    this.setState({ projectId: e.value });
  };

  handleChange2 = e => {
    this.setState({ task: e.value });
  };

  handleClick = () => {
    const { timerRunning } = this.state;

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

    this.setState({ timerRunning: !this.state.timerRunning });
  };

  // handleSubmit = (e) => {
  //   e && e.preventDefault()
  //   axios.post('/api/timeblocks', {project_id: , task_id: 1, start_time: 1, end_time: 2})
  // }
  canceltimer = () => {
    this.setState({ endHourMinute: "", hours: "", startHourMinute: "" });
    this.handleClose();
  };

  render() {
    const selectedProjectTasks = this.props.tasks.filter(
      t => t.project_id === this.state.projectId
    );
    const { timerRunning } = this.state;

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        trigger={
          <Button
            style={{
              background: "RebeccaPurple",
              color: "white",
              borderRadius: 0,
              paddingLeft: "0",
              width: "4em",
              height: "4em",
              textAlign: "center"
            }}
            size="large"
            onClick={() => this.handleOpen()}
          >
            <Icon
              size="large"
              style={{ color: "white", paddingLeft: "22px" }}
              name="add"
            />
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
                    onChange={this.handleChange2}
                    options={selectedProjectTasks.map(t => ({
                      value: t.name,
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
                      <Button
                        onClick={() => this.handleClick()}
                        style={{
                          padding: "10px",
                          height: "150px",
                          width: "150px",
                          marginRight: "10px",
                          marginTop: "10px",
                          backgroundColor: timerRunning
                            ? "white"
                            : "RebeccaPurple",
                          color: timerRunning ? "black" : "white",
                          border: "solid lightgray 1px"
                        }}
                      >
                        {timerRunning ? (
                          <div style={{ fontSize: "2em" }}>
                            <div>
                              <img
                                style={{
                                  height: "50px"
                                }}
                                src={require("../../images/clock.gif")}
                              />
                            </div>
                            Stop
                          </div>
                        ) : (
                          <div style={{ fontSize: "2em" }}>
                            <div>
                              <Icon
                                name="clock outline"
                                size="large"
                                style={{
                                  margin: 0,
                                  color: "white"
                                }}
                              />
                            </div>
                            Start
                          </div>
                        )}
                      </Button>
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
                    <Button onClick={() => this.cancelTimer()}>Cancel</Button>
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
export default addTimeBlockButton;
