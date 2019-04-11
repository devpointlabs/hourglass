import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import TimeSheetNavbar from "./TimeSheetNavbar";
import TimeBlockNavbar from "./TimeBlockNavbar";
import { Table } from "semantic-ui-react";
import AddTimeBlockButton from "./AddTimeBlockButton";
import TableData from "./TableData";
import moment from "moment";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks,
  AddTaskInfoToTimeBlocks
} from "./Calculations";
import { withRouter } from "react-router-dom";
import { TimerConsumer } from "../../providers/TimerProvider";
// import DateRange from "./DateRange";
// import UserWeek from "./UserWeek";
// import groupTimeBlocksByWeek from "./groupTimeBlocksByWeek";

class TimeSheet extends React.Component {
  state = {
    view: "day",
    selectedDate: moment(),
    tasks: [],
    projects: [],
    timeBlocks: [],
    currentWeekTimeBlocks: []
  };

  componentDidMount() {
    this.setState({ selectedDate: moment() });
    this.getCurrentUserTimeBlocks();
    this.getWeekTimeBlocks();
  }

  getCurrentUserTimeBlocks = () => {
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
        }
      )
    );
  };

  //Run this with an if else statement that will grab the initial data with axios if it doesn't exist yet?
  getWeekTimeBlocks = week => {
    const { timeBlocks } = this.state;

    let grabCurrentWeek = timeBlocks.filter(
      tb =>
        moment(week).format("YYYY w") === moment(tb.start_time).format("YYYY w")
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
    this.props.timer.toggleTimer(
      this.state.timeBlocks.filter(b => b.status === "timerStarted").length > 0
    );
  };

  stopTimer = (id, endTime) => {
    axios
      .put(`/api/timeblocks/${id}`, {
        end_time: endTime,
        status: "pendingApproval"
      })
      .then(res => this.getCurrentUserTimeBlocks());
  };

  render() {
    const {
      view,
      selectedDate,
      timeBlocks,
      tasks,
      projects,
      currentWeekTimeBlocks
    } = this.state;
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
        <div style={{ display: "flex", padding: "10px" }}>
          <AddTimeBlockButton
            projects={projects}
            tasks={tasks}
            selectedDate={selectedDate}
            user_id={this.props.auth.user.id}
            getCurrentUserTimeBlocks={this.getCurrentUserTimeBlocks}
            stopTimer={this.stopTimer}
          />
          <Table basic="very" celled collapsing style={{ width: "100%" }}>
            <TableData
              view={view}
              timeBlocks={timeBlocks}
              selectedDate={selectedDate}
              tasks={tasks}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
              stopTimer={this.stopTimer}
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

export default withRouter(DoubleConnectedTimeSheet);

// get blocks
// add hours to blocks
// add user_name, project_name, task_name to blocks
// setup blocks by week

//blocksByWeek = [{week_start: "", week_end: "", date2019-04-01: [blocks with hours]}]

///////////////////////previous version for reference
/////////////////////////////////////////////////////////
// componentDidMount() {
//   this.getTimeBlocks();
// }

// getTimeBlocks = () => {
//   //user_id!!! not always 8
//   axios.get(`/api/timeblocks`).then(res =>
//     this.setState({ timeBlocks: res.data }, () => {
//       !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
//       this.updateDateRange(this.state.startDate, this.state.endDate);
//     })
//   );
// };

// updateDateRange = (startDate, endDate) => {
//   this.setState({ startDate, endDate }, () => this.setWeeks());
// };

// setWeeks = () => {
//   const { startDate, endDate, timeBlocks } = this.state;
//   this.setState({
//     weeks: groupTimeBlocksByWeek(timeBlocks, startDate, endDate)
//   });
// };

// addTimeBlock = () => {
//   this.getTimeBlocks();
// };

// updateBlocks = timeBlock => {
//   this.setState(
//     {
//       timeBlocks: this.state.timeBlocks.map(t => {
//         if (t.id === timeBlock.id) return { ...t, ...timeBlock };
//         return t;
//       })
//     },
//     () => {
//       !this.checkForActiveTimeBlock() && this.addNewTimeBlock(false);
//     }
//   );
// };

// addNewTimeBlock = editMode => {
//   this.setState(
//     {
//       timeBlocks: [...this.state.timeBlocks, { editMode: editMode }]
//     },
//     () => this.setWeeks()
//   );
// };

// updateTimeBlock = timeblock => {
//   this.setState(
//     {
//       timeblocks: this.state.timeBlocks.map(t => {
//         if (t.id === timeblock.id) return timeblock;
//         return t;
//       })
//     },
//     () => this.setWeeks()
//   );
// };

// checkForActiveTimeBlock = () => {
//   let result = false;
//   this.state.timeBlocks.map(t => {
//     if (t.start_time && !t.end_time) result = true;
//   });
//   console.log(result);
//   return result;
// };

// deleteTimeBlock = (id, project_id) => {
//   axios.delete(`/api/timeblocks/${id}`).then(res => {
//     this.setState({
//       timeBlocks: this.state.timeBlocks.filter(t => t.id !== id)
//     });
//     this.setWeeks();
//   });
// };

//   <div>
//   <Table>
//     <Table.Header>
//       <Table.Row>
//         <Table.HeaderCell style={{ paddingTop: "10px" }}>
//           <Button
//             style={{
//               background: "#723186",
//               color: "white",
//               width: "25%"
//             }}
//             onClick={() => this.addNewTimeBlock(true)}
//           >
//             <Icon style={{ color: "white" }} name="add" />
//           </Button>
//         </Table.HeaderCell>
//         <Table.HeaderCell style={{ width: "20%" }}>
//           <DateRange
//             startDate={this.state.startDate}
//             endDate={this.state.endDate}
//             updateDateRange={this.updateDateRange}
//           />
//         </Table.HeaderCell>
//         <Table.HeaderCell>Date</Table.HeaderCell>
//         <Table.HeaderCell>Start Time</Table.HeaderCell>
//         <Table.HeaderCell>End Time</Table.HeaderCell>
//         <Table.HeaderCell>Total Time</Table.HeaderCell>
//         <Table.HeaderCell>Billable</Table.HeaderCell>
//         <Table.HeaderCell>UnBillable</Table.HeaderCell>
//         <Table.HeaderCell>Clock In/Out</Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>
//     <Table.Body>
//       {this.state.weeks &&
//         this.state.weeks.map(w => (
//           <UserWeek
//             key={w.title}
//             week={w}
//             updateBlocks={this.updateBlocks}
//             addTimeBlock={this.addTimeBlock}
//             deleteTimeBlock={this.deleteTimeBlock}
//             updateTimeBlock={this.updateTimeBlock}
//           />
//         ))}
//     </Table.Body>
//   </Table>
// </div>
