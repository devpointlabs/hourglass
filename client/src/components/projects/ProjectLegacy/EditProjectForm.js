import React from "react";
import {
  Form,
  Button,
  Segment,
  Icon,
  Header,
  Label,
  Divider,
  Container
} from "semantic-ui-react";
import axios from "axios";
import CalendarPickerForProjectForm from "../ProjectModals/ProjectCreate/CalendarPickerForProjectForm";
import TaskView from "../TaskView/TaskView";
import ProjectNavbar from "../ProjectNavbar";
import BudgetView from "../BudgetView";
import TeamView from "../TeamView";

class EditProjectForm extends React.Component {
  state = {
    project: {},
    taskShown: false,
    page: "budget"
  };

  componentDidMount() {
    axios
      .get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }));
  }

  setEndDate = newdate =>
    this.setState({ project: { ...this.state.project, planned_end: newdate } });

  setStartDate = newdate =>
    this.setState({
      project: { ...this.state.project, planned_start: newdate }
    });

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ project: { ...this.state.project, [name]: value } });
  };

  handleSubmit = e => {
    const { project } = this.state;
    e && e.preventDefault();
    axios
      .put(`/api/projects/${project.project_id}`, project)
      .then(this.props.history.push("/projects"));
  };

  deleteProject = () => {
    const { project_id } = this.state.project;
    axios.delete(`/api/projects/${project_id}`).then(res => {
      this.props.history.push("/projects");
    });
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
      project_name,
      client_name,
      planned_start,
      planned_end,
      budget
    } = this.state.project;
    const start_date = new Date(planned_start).toDateString();
    const end_date = new Date(planned_end).toDateString();
    return (
      <>
        <Form style={{ marginTop: "30px", textAlign: "center" }}>
          <Header as="h1" icon>
            <Icon name="sitemap" circular />
            <Header.Content>{project_name}</Header.Content>
          </Header>
          <Divider hidden />
          <Form.Group style={{ justifyContent: "center" }}>
            <Form.Input
              label="Name"
              name="project_name"
              value={project_name}
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
          <Form.Input
            label="Budget"
            name="budget"
            style={{
              width: "33.8%"
            }}
            value={budget}
            placeholder="Budget"
            required
            labelPosition="right"
            type="number"
            onChange={this.handleChange}
          >
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Form.Input>
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
          <span>
            <Button
              floated="center"
              style={{
                color: "white",
                background: "RebeccaPurple"
              }}
              onClick={() => this.handleSubmit()}
            >
              Save
            </Button>
            <Button color="red" onClick={() => this.deleteProject()}>
              Delete Project
            </Button>
          </span>
          <br />
          <br />
        </Form>
        <ProjectNavbar setPage={this.setPage} />
        <div style={{ padding: "35px" }}>
          {this.state.project.project_name && (
            <Segment>{this.renderPage()}</Segment>
          )}
        </div>

        {/* <div>
          <TaskArrayForForm
            project_id={this.state.project_id}
            handleToggle={this.props.handleToggle}
          />
        </div> */}
      </>
    );
  }
}

export default EditProjectForm;
