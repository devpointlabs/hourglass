import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import TimeSheetNavbar from "./NavBarComponents/TimeSheetNavbar";
import TimeBlockNavbar from "./NavBarComponents/TimeBlockNavbar";
import { Table, Dropdown } from "semantic-ui-react";
import AddTimeBlockButton from "./AddTimeBlockButton";
import TableData from "./TableData";
import moment from "moment";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks,
  AddUserInfoToBlocks
} from "./Calculations/Calculations";
import { withRouter } from "react-router-dom";
import { TimerConsumer } from "../../providers/TimerProvider";
import { CircleCountConsumer } from "../../providers/CircleCountProvider";

class TimeSheet extends React.Component {
  state = {
    view: "day",
    selectedDate: moment().format("YYYY-MM-DD"),
    tasks: [],
    projects: [],
    timeBlocks: [],
    currentWeekTimeBlocks: [],
    activeTimerTimeBlock: {},
    keyboardShortcutKeys: true,
    users: [],
    filteredUserIds: [],
    filteredProjectIds: []
  };

  componentDidMount() {
    this.setState({ selectedDate: moment() });
    this.getCurrentUserTimeBlocks();
    this.getWeekTimeBlocks();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  setKeyboardShortcutKeys = trueFalse => {
    this.setState({ keyboardShortcutKeys: trueFalse });
  };

  handleKeyDown = event => {
    if (this.state.keyboardShortcutKeys) {
      switch (event.keyCode) {
        case 37:
          this.setState({
            selectedDate: moment(this.state.selectedDate).subtract(1, "days")
          });
          this.setSelectedWeek(moment(this.state.selectedDate));
          break;
        case 39:
          this.setState({
            selectedDate: moment(this.state.selectedDate).add(1, "days")
          });
          this.setSelectedWeek(moment(this.state.selectedDate));
          break;
        case 32:
          this.setState({ selectedDate: moment() });
          break;
        // no default
      }
    }
  };

  // wrap in case statement that checks if modal is open then runs

  getCurrentUserTimeBlocks = () => {
    if (this.props.auth.user.admin === true)
      axios.get("api/admin/timeblocks").then(res =>
        this.setState(
          {
            projects: res.data.projects,
            tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
            timeBlocks: AddUserInfoToBlocks(
              CalculateHoursAndWeek(res.data.timeBlocks),
              res.data.users
            ),
            users: res.data.users
          },
          () => {
            this.checkForTimerRunning();
            this.getWeekTimeBlocks(this.state.selectedDate);
            this.calculateCircleCount();
          }
        )
      );
    else
      axios.get("api/timeblocks").then(res =>
        this.setState(
          {
            projects: res.data.projects,
            tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
            timeBlocks: CalculateHoursAndWeek(res.data.timeBlocks)
          },
          () => {
            this.checkForTimerRunning();
            this.getWeekTimeBlocks(this.state.selectedDate);
            this.calculateCircleCount();
          }
        )
      );
  };

  //Run this with an if else statement that will grab the initial data with axios if it doesn't exist yet?
  getWeekTimeBlocks = week => {
    const { timeBlocks, tasks } = this.state;

    const timeBlocksWithTaskInfo = timeBlocks.map(b => {
      return {
        ...b,
        taskInfo: tasks
          .filter(t => t.id === b.task_id)
          .reduce((acc, task) => acc + task)
      };
    });
    let referenceDay = week;
    if (moment(referenceDay).format("dd") === "Su")
      referenceDay = moment(referenceDay).subtract(1, "days");

    let grabCurrentWeek = timeBlocksWithTaskInfo.filter(
      tb =>
        (moment(referenceDay).format("yyyy w") ===
          moment(tb.start_time).format("yyyy w") &&
          moment(tb.start_time).format("dd") !== "Su") ||
        moment(referenceDay)
          .startOf("week")
          .add(1, "week")
          .format("yyyy MM DD") === moment(tb.start_time).format("yyyy MM DD")
    );
    this.setState({ currentWeekTimeBlocks: grabCurrentWeek });
  };

  setSelectedWeek = week => {
    this.getWeekTimeBlocks(week);
  };

  setSelectedDate = date => {
    // const { view } = this.state;
    this.setState({ selectedDate: date });
  };

  setView = view => this.setState({ view });

  checkForTimerRunning = () => {
    let activeTimerTimeBlocks = [];
    let activeTimer =
      this.state.timeBlocks.filter(b => b.status === "timerStarted").length > 0;
    this.props.timer.toggleTimer(activeTimer);
    if (activeTimer)
      activeTimerTimeBlocks = this.state.timeBlocks.filter(
        b => b.status === "timerStarted"
      );
    this.setState({ activeTimerTimeBlock: activeTimerTimeBlocks[0] });
  };

  stopTimer = (id, endTime) => {
    axios
      .put(`/api/timeblocks/${id}`, {
        end_time: endTime,
        status: "unSubmitted"
      })
      .then(res => this.getCurrentUserTimeBlocks());
  };

  filterUser = (e, { value }) => this.setState({ filteredUserIds: value });
  filterProject = (e, { value }) =>
    this.setState({ filteredProjectIds: value });

  calculateCircleCount = () => {
    let unSubmittedCircleCount = this.state.timeBlocks.filter(
      b => b.status === "unSubmitted"
    ).length;
    let pendingCircleCount = this.state.timeBlocks.filter(
      b => b.status === "pending"
    ).length;
    this.props.circleCount.setCircle(
      "unSubmittedCircleCount",
      unSubmittedCircleCount
    );
    this.props.circleCount.setCircle("pendingCircleCount", pendingCircleCount);
  };

  render() {
    const {
      view,
      selectedDate,
      timeBlocks,
      tasks,
      projects,
      currentWeekTimeBlocks,
      filteredUserIds,
      filteredProjectIds
    } = this.state;

    const options = this.state.users.map(u => ({
      key: u.id,
      text: u.name,
      value: u.id
    }));

    const projectOptions = this.state.projects.map(u => ({
      key: u.id,
      text: `${u.name} (${u.client_name})`,
      value: u.id
    }));

    return (
      <>
        <TimeBlockNavbar />
        <TimeSheetNavbar
          view={view}
          selectedDate={selectedDate}
          setSelectedDate={this.setSelectedDate}
          setView={this.setView}
          setSelectedWeek={this.setSelectedWeek}
        />
        {this.props.auth.user.admin &&
          (this.state.view === "day" ? (
            <Dropdown
              onChange={this.filterUser}
              placeholder="Teammates"
              fluid
              multiple
              selection
              options={options}
              style={{ borderRadius: 0 }}
              clearable
              scrolling
              value={this.state.filteredUserIds}
            />
          ) : (
            <Dropdown
              onChange={this.filterProject}
              placeholder="Projects"
              fluid
              multiple
              selection
              options={projectOptions}
              style={{ borderRadius: 0 }}
              clearable
              scrolling
              value={this.state.filteredProjectIds}
            />
          ))}
        <div style={{ display: "flex", padding: "10px" }}>
          <AddTimeBlockButton
            projects={projects}
            tasks={tasks}
            selectedDate={selectedDate}
            setSelectedDate={this.setSelectedDate}
            setView={this.setView}
            user_id={this.props.auth.user.id}
            getCurrentUserTimeBlocks={this.getCurrentUserTimeBlocks}
            stopTimer={this.stopTimer}
            timeBlock={this.state.activeTimerTimeBlock}
          />
          <Table
            stackable
            basic="very"
            celled
            collapsing
            style={{ width: "100%" }}
          >
            <TableData
              view={view}
              timeBlocks={timeBlocks}
              selectedDate={selectedDate}
              tasks={tasks}
              projects={projects}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
              getCurrentUserTimeBlocks={this.getCurrentUserTimeBlocks}
              stopTimer={this.stopTimer}
              setSelectedDate={this.setSelectedDate}
              setSelectedWeek={this.setSelectedWeek}
              setKeyboardShortcutKeys={this.setKeyboardShortcutKeys}
              filteredUserIds={filteredUserIds}
              filteredProjectIds={filteredProjectIds}
              setCircle={this.setCircle}
            />
          </Table>
        </div>
      </>
    );
  }
}

export class ConnectedTimeSheet extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <TimeSheet {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export class DoubleConnectedTimeSheet extends React.Component {
  render() {
    return (
      <TimerConsumer>
        {timer => <ConnectedTimeSheet {...this.props} timer={timer} />}
      </TimerConsumer>
    );
  }
}

export class TripleConnectedTimeSheet extends React.Component {
  render() {
    return (
      <CircleCountConsumer>
        {circleCount => (
          <DoubleConnectedTimeSheet {...this.props} circleCount={circleCount} />
        )}
      </CircleCountConsumer>
    );
  }
}

export default withRouter(TripleConnectedTimeSheet);
