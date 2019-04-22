import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import ProjectNavbar from "./ProjectNavbar";
import {
  Header,
  Button,
  Container,
  Card,
  Icon,
  ButtonGroup,
  Table,
  Segment,
  Progress
} from "semantic-ui-react";
import TaskView from "./TaskView/TaskView";
import BudgetView from "./BudgetView";
import TeamView from "./TeamView";
import ProjectForm from "./ProjectForm";

class ProjectView extends React.Component {
  state = {
    project: [],
    page: ""
  };

  componentDidMount() {
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
        return <BudgetView project={this.state.project} />;
      default:
        return <BudgetView project={this.state.project} />;
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
          <Header as={Link} to={`/project/${project_id}/edit`}>
            <h1 style={{ marginLeft: "20px" }}>
              {project_name}
              <span style={{ fontSize: ".8em" }}> ({client_name})</span>
            </h1>
            <h4 style={{ marginLeft: "20px" }}>
              {" "}
              {planned_start} - {planned_end}
            </h4>
          </Header>

          <Segment>{this.renderPage()}</Segment>
        </Container>
      </>
    );
  }
}

export default withRouter(ProjectView);
