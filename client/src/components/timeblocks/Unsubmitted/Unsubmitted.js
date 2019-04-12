import React from "react";
import TimeBlockNavbar from "../NavBarComponents/TimeBlockNavbar";
import { Table, Container, Item } from "semantic-ui-react";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks
} from "../Calculations/Calculations";
import UnsubmittedTableBody from "./UnsubmittedTableBody";
import Footer from "./Footer";
import EditTimeEntryModal from "../DayView/EditTimeEntryModal";

class Unsubmitted extends React.Component {
  state = {
    timeBlocks: [],
    tasks: [],
    projects: [],
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
    if (checkedStatus) this.handleChecked(blockId);
    else this.handleUnChecked(blockId);
  };

  handleChecked = blockId => {
    const currentTimeBlocks = this.state.timeBlocks.map(tb => {
      if (tb.id === blockId) {
        return {
          ...tb,
          status: "pendingApproval"
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
          status: "UnSubmitted"
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
        .then(res => this.getTimeBlocks())
    );
  };

  render() {
    const { timeBlocks, tasks, projects } = this.state;
    return (
      <>
        <TimeBlockNavbar />

        <div style={{ padding: "50px" }}>
          <Table style={{ marginBottom: "45px" }}>
            <UnsubmittedTableBody
              timeBlocks={timeBlocks}
              tasks={tasks}
              projects={projects}
              getTimeBlocks={this.getTimeBlocks}
              timeBlocks={this.state.timeBlocks}
              handleCheckMarks={this.handleCheckMarks}
              resetCheckMarks
              handleOpen={this.handleOpen}
            />
            <Footer submitTimeBlocks={this.submitTimeBlocks} />
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

export default Unsubmitted;
