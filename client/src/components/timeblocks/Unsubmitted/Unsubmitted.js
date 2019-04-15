import React from "react";
import TimeBlockNavbar from "../NavBarComponents/TimeBlockNavbar";
import { Table, Header } from "semantic-ui-react";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks
} from "../Calculations/Calculations";
import UnsubmittedTableBody from "./UnsubmittedTableBody";
import EditTimeEntryModal from "../DayView/EditTimeEntryModal";
import { AuthConsumer } from "../../../providers/AuthProvider";

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
    axios.get("/api/timeblocks").then(res =>
      this.setState({
        timeBlocks: CalculateHoursAndWeek(
          res.data.timeBlocks.filter(tb => tb.status === "unSubmitted")
        ),
        tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
        projects: res.data.projects
      })
    );
  };

  handleCheckMarks = (checkedStatus, blockId) => {
    if (checkedStatus) this.handleUnChecked(blockId);
    else this.handleChecked(blockId);
  };

  handleChecked = blockId => {
    const currentTimeBlocks = this.state.timeBlocks.map(tb => {
      if (tb.id === blockId) {
        return {
          ...tb,
          status: "pending"
        };
      } else {
        return tb;
      }
    });
    this.setState({ timeBlocks: currentTimeBlocks });
  };

  handleUnChecked = blockId => {
    const currentTimeBlocks = this.state.timeBlocks.map(tb => {
      if (tb.id === blockId) {
        return {
          ...tb,
          status: "unSubmitted"
        };
      } else {
        return tb;
      }
    });
    this.setState({ timeBlocks: currentTimeBlocks });
  };

  submitTimeBlocks = () => {
    this.state.timeBlocks.map(tb =>
      axios
        .put(`/api/timeblocks/${tb.id}`, { status: tb.status })
        .then(
          res => this.getTimeBlocks(),
          this.setState({ reset: !this.state.reset })
        )
    );
  };

  render() {
    const { timeBlocks, tasks, projects } = this.state;
    return (
      <>
        <TimeBlockNavbar />
        <Header textAlign="center" as="h1">
          Unsubmitted
        </Header>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <Table style={{ marginBottom: "45px" }}>
            <UnsubmittedTableBody
              timeBlocks={timeBlocks}
              tasks={tasks}
              projects={projects}
              getTimeBlocks={this.getTimeBlocks}
              timeBlocks={this.state.timeBlocks}
              handleCheckMarks={this.handleCheckMarks}
              reset={this.state.reset}
              handleOpen={this.handleOpen}
              submitTimeBlocks={this.submitTimeBlocks}
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

export default ConnectedUnsubmitted;
