import React from "react";
import {
  Button,
  Icon,
  Modal,
  Header,
  Form,
  Transition
} from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { TimerConsumer } from "../../providers/TimerProvider";
import { withRouter } from "react-router-dom";
import TimerStartStopButton from "./TimerStartStopButton";
import parsedInput from "./parsedInput";
import { sortSelectOptions } from "./sortSelectOptions";

class AddTimeBlockButton extends React.Component {
  state = {
    project: "",
    task: "",
    year: moment(this.props.selectedDate).format("YYYY"),
    startMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    startHourMinute: moment(this.props.timeBlock.start_time).format("HH:mm"),
    endMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    endHourMinute: "",
    hours: "",
    startMoment: {},
    endMoment: {},
    modalOpen: false,
    timeBlock: {},
    entryLoggedVisible: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { selectedDate } = this.props;

    const defaultProject = {
      value: this.props.projects[0] && this.props.projects[0].id,
      label: `${this.props.projects[0] && this.props.projects[0].name} (${this
        .props.projects[0] && this.props.projects[0].client_name})`
    };

    const selectedProjectTasks = this.props.tasks.filter(
      t => t.project_id === defaultProject.value
    );

    const defaultTask = {
      value: selectedProjectTasks[0] && selectedProjectTasks[0].id,
      label: selectedProjectTasks[0] && selectedProjectTasks[0].name
    };

    if (this.props.projects[0])
      prevState.project === "" &&
        this.setState({ project: defaultProject, task: defaultTask });
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

  handleClick = id => {
    const {
      timer: { timerRunning },
      user_id,
      stopTimer
    } = this.props;
    const { task, endMonthDay, startMonthDay, year } = this.state;

    if (timerRunning) {
      let timeNow = moment();
      this.setState({ endHourMinute: moment(timeNow).format("HH:mm") });
      this.setState({
        hours: moment(timeNow).diff(
          moment(parsedInput(year, startMonthDay, this.state.startHourMinute)),
          "hours",
          true
        )
      });
      stopTimer(id, timeNow);
      this.showEntryLoggedTextFor2Seconds();
    } else {
      this.setState(
        {
          year: moment().format("YYYY"),
          startMonthDay: moment().format("MM/DD"),
          startHourMinute: moment().format("HH:mm"),
          startMoment: moment(),
          endMonthDay: "",
          endHourMinute: "",
          hours: ""
        },
        () => {
          const block = {
            task_id: task.value,
            start_time: this.state.startMoment,
            user_id,
            status: "timerStarted"
          };
          this.addBlock(block);
          this.props.setView("day");
          this.props.setSelectedDate(moment());
          this.setState({ modalOpen: false });
        }
      );
    }

    // this.setState({ timerRunning: !this.state.timerRunning });
    this.props.timer.toggleTimer(true);
  };

  addManualBlock = () => {
    const {
      year,
      startMonthDay,
      endMonthDay,
      startHourMinute,
      endHourMinute
    } = this.state;
    const block = {
      task_id: this.state.task.value,
      start_time: moment(parsedInput(year, startMonthDay, startHourMinute)),
      user_id: this.props.user_id,
      end_time: moment(parsedInput(year, endMonthDay, endHourMinute)),
      manualEntry: true,
      status: "unSubmitted"
    };
    axios.post(`/api/timeblocks`, block).then(res => {
      this.showEntryLoggedTextFor2Seconds();
      this.props.getCurrentUserTimeBlocks();
    });
  };

  addBlock = block => {
    axios.post(`/api/timeblocks`, block).then(res => {
      this.setState({ timeBlock: res.data });
      this.props.getCurrentUserTimeBlocks();
    });
  };
  // handleSubmit = (e) => {
  //   e && e.preventDefault()
  //   axios.post('/api/timeblocks', {project_id: , task_id: 1, start_time: 1, end_time: 2})
  // }
  clearAddTimesheet = () => {
    this.setState({
      endHourMinute: "",
      hours: "",
      startHourMinute: ""
    });
  };

  showEntryLoggedTextFor2Seconds = () => {
    this.setState({ entryLoggedVisible: !this.state.entryLoggedVisible }, () =>
      this.setState(
        { entryLoggedVisible: !this.state.entryLoggedVisible },
        () =>
          this.setState({
            entryLoggedVisible: false
          })
      )
    );
  };

  render() {
    const selectOptions = sortSelectOptions(
      this.state.project,
      this.props.projects,
      this.props.tasks
    );

    // const projectSelectOptions = this.props.projects.map(p => ({
    //   value: p.id,
    //   label: `${p.name} (${p.client_name})`
    // }));

    // const selectedProjectTasks = this.props.tasks.filter(
    //   t => t.project_id === this.state.project.value
    // );

    // const taskSelectOptions = selectedProjectTasks.map(t => ({
    //   value: t.id,
    //   label: t.name
    // }));

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
              border: "solid lightgrey 1px",
              marginTop: "5px"
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
                    value={this.state.task}
                    onChange={this.handleChange2}
                    options={selectOptions.taskSelectOptions}
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
                        <Button
                          style={{
                            marginLeft: "40px",
                            marginTop: "30px",
                            width: "100px"
                          }}
                          onClick={() => this.clearAddTimesheet()}
                        >
                          Clear
                        </Button>
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
                        <Button
                          style={{
                            marginTop: "30px",
                            width: "100px",
                            color: "white",
                            background: "RebeccaPurple"
                          }}
                          onClick={() => this.addManualBlock()}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                    <div style={{ background: "white" }}>
                      <div>
                        <TimerStartStopButton
                          large={true}
                          handleClick={this.handleClick}
                          id={
                            this.props.timeBlock
                              ? this.props.timeBlock.id
                              : null
                          }
                        />
                      </div>
                      <div style={{ height: "40px" }}>
                        <Transition
                          visible={this.state.entryLoggedVisible}
                          animation="scale"
                          duration={{ show: 1, hide: 4000 }}
                          onHide={() =>
                            this.setState({ entryLoggedVisible: false })
                          }
                        >
                          <div
                            style={{
                              textAlign: "center",
                              paddingTop: "20px"
                            }}
                          >
                            Entry Logged
                            <Icon name="checkmark" />
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </div>
                </div>
              </Header>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => this.handleClose()}>Back</Button>
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
