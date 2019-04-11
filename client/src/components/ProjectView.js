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
  Table
} from "semantic-ui-react";
import TaskView from "./TaskView";
import NoteEditor from "./NoteEditor";
import TeamView from "./TeamView";
import ProjectForm from "./ProjectForm";
import Notes from "./Notes";
import Scroll from "react-awesome-scroll";

class ProjectView extends React.Component {
  state = { project: {}, taskview: true, toggleForm: false };

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
    this.setState({ toggleForm: true });
  };

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

          <Link to={`/project/${id}/edit`}>
            <Button inverted color="blue" floated="right">
              <Icon name="pencil" /> Update Project
            </Button>
          </Link>
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

export default ProjectView;
