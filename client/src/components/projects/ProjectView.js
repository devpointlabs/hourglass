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
    page: "",
    toggleForm: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  updateSubmit = project => {
    this.setState({ project: project });
  };

  // handleDelete = () => {
  //   const { id } = this.props.match.params;
  //   axios.delete(`/api/projects/${id}`).then(res => {
  //     this.props.history.push("/projects");
  //   });
  // };

  handleToggle = () => {
    this.setState({ toggleForm: !this.state.toggleForm });
  };

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
      id,
      name,
      client_name,
      planned_start,
      planned_end
    } = this.state.project;
    return (
      <>
        <ProjectNavbar setPage={this.setPage} />
        <div>
          {this.state.toggleForm ? (
            <ProjectForm
              project={this.state.project}
              updateSubmit={this.updateSubmit}
            />
          ) : (
              <div />
            )}
        </div>
        <Container
          style={{
            paddingTop: "0px",
            margin: "0px"
          }}
        >
          <h1 style={{ marginLeft: "20px" }}>{name}
            <span style={{ fontSize: '.8em' }}> ({client_name})</span>
          </h1>
          <h4 style={{ marginLeft: "20px" }}>
            {" "}
            {planned_start} - {planned_end}
          </h4>

          <Segment>{this.renderPage()}</Segment>
        </Container>
      </>
    );
  }
}

export default withRouter(ProjectView);
