import React from "react";
import {
  Form,
  Button,
  Segment,
  Icon,
  Header,
  Label,
  Divider
} from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskArrayForForm from "./TaskArrayForForm";
import AddUserToTask from "./AddUserToTask";
import moment from "moment";
import { Link } from "react-router-dom";
import CalendarPickerForProjectForm from "./CalendarPickerForProjectForm";

class ProjectForm extends React.Component {
  state = {
    project: {
      name: " ",
      client_name: "",
      planned_start: "",
      planned_end: "",
      notes: ""
    },
    project_id: "",
    taskShown: false
  };

  componentDidMount() {
    if (this.props.project) {
      this.setState({
        project: this.props.project,
        project_id: this.props.project.id
      });
    } else {
      this.setState({
        project: {
          name: " ",
          client_name: "",
          planned_start: "",
          planned_end: "",
          notes: ""
        }
      });
    }
  }

  setEndDate = newdate =>
    this.setState({ project: { ...this.state.project, planned_end: newdate } });

  setStartDate = newdate =>
    this.setState({
      project: { ...this.state.project, planned_start: newdate }
    });

  toggleTask = () => (
    this.setState({
      taskShown: { ...this.state, taskShown: !this.state.taskShown }
    }),
    this.handleSubmit()
  );

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ project: { ...this.state.project, [name]: value } });
  };

  handleSubmit = e => {
    const { project } = this.state;
    // e.preventDefault();
    if (this.props.project) {
      const { id } = this.state.project;
      axios
        .put(`/api/projects/${id}`, project)
        .then(res => this.props.updateSubmit(res.data));
    } else {
      axios.post(`/api/projects`, project).then(res => {
        this.setState({ ...this.state, project_id: res.data.id });
      });
    }
  };

  render() {
    const {
      name,
      client_name,
      planned_start,
      planned_end
    } = this.state.project;
    const start_date = new Date(planned_start).toDateString();
    const end_date = new Date(planned_end).toDateString();
    return (
      <>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, grey, white)",
            width: "100%",
            height: "5px"
          }}
        />

        <Link to="/projects">
          <Button
            animated
            style={{ marginTop: "15px" }}
            inverted
            color="violet"
          >
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="angle left" />
            </Button.Content>
          </Button>
        </Link>
        <Form style={{ marginTop: "30px", marginLeft: "26em" }}>
          <Header as="h1" icon style={{ marginLeft: "4em" }}>
            <Icon name="sitemap" circular />
            <Header.Content>New Project</Header.Content>
          </Header>
          <Divider hidden />
          <Form.Group textAlign="center">
            <Form.Input
              label="Name"
              name="name"
              value={name}
              placeholder="Name of Project"
              required
              autoFocus
              onChange={this.handleChange}
            />
            <Form.Input
              label="Client Name"
              name="client_name"
              value={client_name}
              placeholder="Client Name"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <div style={{ justifyContent: "flexStart" }}>
            <Header as="h4">Start Date</Header>
            <CalendarPickerForProjectForm setDate={this.setStartDate} />
            {planned_start !== "" ? (
              <Label
                style={{ background: "RebeccaPurple", color: "white" }}
                pointing="left"
              >
                {start_date}
              </Label>
            ) : null}
          </div>
          <br />
          <div>
            <Header as="h4">End Date</Header>
            <CalendarPickerForProjectForm setDate={this.setEndDate} />
            {planned_end !== "" ? (
              <Label
                style={{ background: "RebeccaPurple", color: "white" }}
                inverted
                pointing="left"
              >
                {end_date}
              </Label>
            ) : null}
          </div>
          <br />
          <Button
            style={{ marginLeft: "6.5em" }}
            color="violet"
            animated="fade"
            inverted
            onClick={() => this.toggleTask()}
          >
            <Button.Content visible>Add Tasks and Employees</Button.Content>
            <Button.Content hidden>
              <Icon name="angle double down" />
            </Button.Content>
          </Button>
        </Form>
        {this.state.taskShown ? (
          <div>
            <TaskArrayForForm
              project_id={this.state.project_id}
              handleToggle={this.props.handleToggle}
            />{" "}
            <br />
          </div>
        ) : (
          <div />
        )}
      </>
    );
  }
}

export default ProjectForm;
