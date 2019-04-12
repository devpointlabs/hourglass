import React from "react";
import TimeBlockNavbar from "../NavBarComponents/TimeBlockNavbar";
import { Table, Container } from "semantic-ui-react";
import axios from "axios";
import {
  CalculateHoursAndWeek,
  AddProjectInfoToTasks
} from "../Calculations/Calculations";
import UnsubmittedTableBody from "./UnsubmittedTableBody";
import Footer from "./Footer";

class Unsubmitted extends React.Component {
  state = {
    timeBlocks: [],
    tasks: [],
    projects: []
  };

  componentDidMount() {
    this.getTimeBlocks();
  }

  getTimeBlocks = () => {
    axios.get("/api/timeblocks").then(res =>
      this.setState({
        timeBlocks: CalculateHoursAndWeek(res.data.timeBlocks),
        tasks: AddProjectInfoToTasks(res.data.projects, res.data.tasks),
        projects: res.data.projects
      })
    );
  };

  render() {
    const { timeBlocks, tasks, projects } = this.state;
    return (
      <>
        <TimeBlockNavbar />
        <div
          style={{
            backgroundColor: "RebeccaPurple",
            height: "60px",
            position: "fixed",
            bottom: "0",
            width: "78.3%",
            zIndex: "1"
          }}
        >
          <Footer />
        </div>
        <div style={{ padding: "50px" }}>
          <Table style={{ marginBottom: "45px" }}>
            <UnsubmittedTableBody
              timeBlocks={timeBlocks}
              tasks={tasks}
              projects={projects}
              getTimeBlocks={this.getTimeBlocks}
              timeBlocks={this.state.timeBlocks}
            />
          </Table>
        </div>
      </>
    );
  }
}

export default Unsubmitted;
