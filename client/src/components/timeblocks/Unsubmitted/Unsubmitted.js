import React from "react";
import TimeBlockNavbar from "../NavBarComponents/TimeBlockNavbar";
import { Table, Header } from "semantic-ui-react";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks,
  AddUserInfoToBlocks
} from "../Calculations/Calculations";
import UnsubmittedTableBody from "./UnsubmittedTableBody";
import EditTimeEntryModal from "../DayView/EditTimeEntryModal";
import { AuthConsumer } from "../../../providers/AuthProvider";
import { CircleCountConsumer } from "../../../providers/CircleCountProvider";

class Unsubmitted extends React.Component {
  state = {
    timeBlocks: [],
    tasks: [],
    projects: [],
    reset: false,
    modalOpen: false
  };

  componentDidMount() {
    this.getTimeBlocks();
  }

  handleOpen = timeBlock => {
    this.setState({ modalOpen: true, timeBlock: timeBlock });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  getTimeBlocks = () => {
    if (this.props.auth.user.admin === true)
      axios.get("/api/admin/timeblocks").then(res =>
        this.setState(
          {
            timeBlocks: AddUserInfoToBlocks(
              CalculateHoursAndWeek(
                res.data.timeBlocks.filter(tb => tb.status === "unSubmitted")
              ),
              res.data.users
            ),
            users: res.data.users,
            tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
            projects: res.data.projects
          },
          () =>
            this.props.circleCount.setCircle(
              "unSubmittedCircleCount",
              this.state.timeBlocks.length
            )
        )
      );
    else
      axios.get("/api/timeblocks").then(res =>
        this.setState(
          {
            timeBlocks: CalculateHoursAndWeek(
              res.data.timeBlocks.filter(tb => tb.status === "unSubmitted")
            ),
            tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
            projects: res.data.projects
          },
          () =>
            this.props.circleCount.setCircle(
              "unSubmittedCircleCount",
              this.state.timeBlocks.length
            )
        )
      );
  };

  updateTimeblockState = block => {
    this.setState(
      {
        timeBlocks: this.state.timeBlocks.filter(b => b.id !== block.id)
      },
      () =>
        this.props.circleCount.setCircle(
          "unSubmittedCircleCount",
          this.state.timeBlocks.length
        )
    );
  };

  submitAllTimeBlocks = () => {
    this.state.timeBlocks.map(block => {
      axios
        .put(`/api/timeblocks/${block.id}`, { status: "pending" })
        .then(res => null);
    });
    this.setState({ timeBlocks: [] });
  };

  render() {
    const { timeBlocks, tasks, projects } = this.state;
    return (
      <>
        <TimeBlockNavbar />
        <Header textAlign="center" as="h1">
          Unsubmitted
        </Header>
        <div style={{ padding: "10px" }}>
          <Table style={{ marginBottom: "45px" }}>
            <UnsubmittedTableBody
              timeBlocks={timeBlocks}
              tasks={tasks}
              projects={projects}
              handleOpen={this.handleOpen}
              submitTimeBlocks={this.submitTimeBlocks}
              updateTimeblockState={this.updateTimeblockState}
              submitAllTimeBlocks={this.submitAllTimeBlocks}
            />
          </Table>
          <EditTimeEntryModal
            handleClose={this.handleClose}
            modal1Open={this.state.modalOpen}
            timeBlock={this.state.timeBlock}
            tasks={this.state.tasks}
            projects={this.state.projects}
            getCurrentUserTimeBlocks={this.getTimeBlocks}
          />
        </div>
      </>
    );
  }
}

export class ConnectedUnsubmitted extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Unsubmitted {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export class DoubleConnectedUnsubmitted extends React.Component {
  render() {
    return (
      <CircleCountConsumer>
        {circleCount => (
          <ConnectedUnsubmitted {...this.props} circleCount={circleCount} />
        )}
      </CircleCountConsumer>
    );
  }
}

export default DoubleConnectedUnsubmitted;
