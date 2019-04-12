import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import TaskView from "./TaskView";
import BudgetView from "./BudgetView";
import TeamView from "./TeamView";
import ProjectForm from "./ProjectForm";

class ProjectView extends React.Component {
  state = {
    project: {},
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

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios.delete(`/api/projects/${id}`).then(res => {
      this.props.history.push("/projects");
    });
  };

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
        return <TaskView />;
      case "team":
        return <TeamView />;
      case "budget":
        return <BudgetView />;
      default:
        return null;
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
        <div>
          <Link to={"/projects"}>
            <Button
              inverted
              color="violet"
              floated="right"
              style={{ marginBottom: "20px" }}
            >
              <Icon name="arrow alternate circle left outline" />
              Go Back
            </Button>
          </Link>

          <Button
            onClick={() => this.handleToggle()}
            inverted
            color="blue"
            floated="right"
          >
            <Icon name="pencil" /> Update Project
          </Button>

          <Button
            inverted
            onClick={this.handleDelete}
            color="red"
            floated="right"
          >
            <Icon name="trash" /> Remove Project
          </Button>
        </div>

        <Container
          style={{
            paddingTop: "0px",
            margin: "0px"
          }}
        >
          <h1>{name}</h1>
          <h2>{client_name}</h2>
          <h4>
            {" "}
            {planned_start} - {planned_end}{" "}
          </h4>

          <Header>
            <div className="wrapper">
              <Button.Group widths="3">
                <Button buttonNumber={1} onClick={() => this.setPage("task")}>
                  Tasks
                </Button>
                <Button buttonNumber={2} onClick={() => this.setPage("team")}>
                  Team
                </Button>
                <Button buttonNumber={3} onClick={() => this.setPage("budget")}>
                  Budget
                </Button>
              </Button.Group>
            </div>
          </Header>

          <Segment>{this.renderPage()}</Segment>
        </Container>
      </>
    );
  }
}

export default ProjectView;
