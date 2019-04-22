import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ProjectNavbar from "./ProjectNavbar";
import { Header, Container, Segment } from "semantic-ui-react";
import TaskView from "./TaskView/TaskView";
import BudgetView from "./BudgetView";
import TeamView from "./TeamView";
import EditProjectModal from "./ProjectModals/ProjectEdit/EditModalForms";

class ProjectView extends React.Component {
  state = {
    project: {},
    page: "",

  };

  componentDidMount() {
    this.getProject()
  }

  getProject = () => {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  setPage = page => {
    switch (page) {
      case "task":
        this.setState({ page: "task" });
        break;
      case "team":
        this.setState({ page: "team" });
        break;
      case "budget":
        this.setState({ page: "budget" });
        break;
      default:
        return null;
    }
  };



  renderPage = () => {
    switch (this.state.page) {
      case "task":
        return <TaskView project={this.state.project} />;
      case "team":
        return <TeamView project={this.state.project} />;
      case "budget":
        return <BudgetView project={this.state.project} getProject={this.getProject} />;
      default:
        return <BudgetView project={this.state.project} getProject={this.getProject} />;

    }
  };

  render() {
    const {
      project_id,
      project_name,
      client_name,
      planned_start,
      planned_end
    } = this.state.project;
    return (
      <>
        <ProjectNavbar setPage={this.setPage} />

        <Container
          stackable
          style={{
            paddingTop: "0px",
            margin: "0px"
          }}
        >
          <Header>
            <EditProjectModal
              project={this.state.project}
              projectInfo={
                <span style={{ marginLeft: "20px", cursor: "pointer" }}>
                  <span style={{ fontSize: "1.3em" }}>{project_name}</span>
                  <span style={{ fontSize: ".8em" }}>
                    {" "}
                    {client_name && "(" + client_name + ")"}
                  </span>
                </span>
              }
            />

            <h4 style={{ marginLeft: "20px" }}>
              {" "}
              {planned_start} {planned_start && "-"} {planned_end}
            </h4>
          </Header>

          <Segment>{this.renderPage()}</Segment>
        </Container>
      </>
    );
  }
}

export default withRouter(ProjectView);
