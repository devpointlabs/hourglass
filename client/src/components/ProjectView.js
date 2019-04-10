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

class ProjectView extends React.Component {
  state = { project: {}, taskview: true, toggleForm: false };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  showProject = () => {
    const {
      // id,
      name,
      client_name,
      planned_start,
      planned_end
      // notes
    } = this.props.match.params;
    const { project } = this.state;
    return (
      <>
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "4px solid grey",
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Card.Group>
            <Card
              style={{ height: "300px", width: "300px", textAlign: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "20px"
                }}
              />
              <Table celled>
                <Table.Row>
                  <Table.Cell>CLIENT:</Table.Cell>
                  <Table.Cell>{project.client_name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>START DATE:</Table.Cell>
                  <Table.Cell>{project.planned_start}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>END DATE:</Table.Cell>
                  <Table.Cell>{project.planned_end}</Table.Cell>>
                </Table.Row>
              </Table>
              <Card
                style={{
                  height: "300px",
                  width: "600px",
                  display: "flex",
                  textAlign: "center",
                  text: "15px"
                }}
              />
            </Card>

            <Card
              style={{
                height: "300px",
                width: "700px",
                display: "flex",
                textAlign: "center",
                text: "15px"
              }}
            >
              <h4> Notes:</h4>
              <NoteEditor notes={this.state.project.notes} />
              {/* <h2>{project.notes}</h2> */}
            </Card>
          </Card.Group>
        </div>
        <div
          styles={{
            display: "flex",
            justifyContent: "right"
          }}
        >
          <Button.Group>
            <Button color="violet" floated="right">
              Save
            </Button>
            <Button onClick={this.handleToggle} color="red">
              Edit
            </Button>
          </Button.Group>
        </div>
      </>
    );
  };

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
      <Container
        style={{
          paddingTop: "20px",
          margin: "40px"
        }}
      >
        {this.state.toggleForm ? (
          <ProjectForm
            project={this.state.project}
            updateSubmit={this.updateSubmit}
          />
        ) : (
          <div />
        )}

        <h1>{name}</h1>
        {this.showProject()}
        <br />
        <br />
        <div>
          <Link to={"/projects"}>
            <Button inverted color="violet" style={{ marginBottom: "20px" }}>
              <Icon name="arrow alternate circle left outline" />
              Go Back
            </Button>
          </Link>
          <Link to={`/project/${id}/edit`}>
            <Button inverted color="blue">
              <Icon name="pencil" /> Update Project
            </Button>
          </Link>
          <Button inverted onClick={this.handleDelete} color="red">
            <Icon name="trash" /> Remove Project
          </Button>
        </div>

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
    );
  }
}

export default ProjectView;
