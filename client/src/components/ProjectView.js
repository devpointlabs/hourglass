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

          {this.state.taskview ? (
            <TaskView id={this.props.match.params.id} />
          ) : (
            <TeamView id={this.props.match.params.id} />
          )}
        </Container>{" "}
        */}
      </>
    );
  }
  toggleTasks = number => {
    console.log(`Button ${number} was clicked`);
    if (number === 2) {
      return this.setState({ taskview: false });
    }
    if (number === 1) {
      return this.setState({ taskview: true });
    } else {
      return console.log("errors");
    }
  };
  render() {
    const { id, name } = this.state.project;
    return (
      <>
        <Table>
          <Table.Row>
            <Table.Cell>ProjectName</Table.Cell>
            <Table.Cell>Budget</Table.Cell>
            <Table.Cell>Spent</Table.Cell>
            <Table.Cell>Progress</Table.Cell>
            <Table.Cell>Remaining</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Project name</Table.Cell>
            <Table.Cell>$213</Table.Cell>
            <Table.Cell>$51</Table.Cell>
            <Table.Cell>
              <Segment>
                <Progress percent={25} color="violet" />
              </Segment>
            </Table.Cell>
            <Table.Cell>$162</Table.Cell>
          </Table.Row>
        </Table>
        <br />
        <br />
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

        {this.state.toggleForm ? (
          <ProjectForm
            updateSubmit={this.updateSubmit}
            project={this.state.project}
            handleToggle={this.handleToggle}
          />
        ) : null}
        <Container
          style={{
            paddingTop: "0px",
            margin: "0px"
          }}
        >
          <h1>{name}</h1>

          <Header>
            <div className="wrapper">
              <Button.Group widths="2">
                <Button buttonNumber={1} onClick={() => this.toggleTasks(1)}>
                  Tasks
                </Button>
                <Button buttonNumber={2} onClick={() => this.toggleTasks(2)}>
                  Team
                </Button>
              </Button.Group>
            </div>
          </Header>

          {this.state.taskview ? (
            <TaskView id={this.props.match.params.id} />
          ) : (
            <TeamView id={this.props.match.params.id} />
          )}
        </Container>
      </>
    );
  }
}

export default withRouter(ProjectView);
