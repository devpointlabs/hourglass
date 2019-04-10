import React from "react";
import { Form, Button, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskArrayForForm from "./TaskArrayForForm";
import AddUserToTask from "./AddUserToTask";
import { Link } from "react-router-dom";

class ProjectForm extends React.Component {
  state = {
    project: {
      name: "",
      client_name: "",
      planned_start: "",
      planned_end: "",
      notes: ""
    },
    project_id: "",
    taskShown: false
  };

  componentDidMount() {
    this.setState({ project: this.props.project });
  }

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
    if (this.props.project.id) {
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
      planned_end,
      notes
    } = this.state.project;
    return (
      <>
        <Segment styles={{ margin: "100px" }}>
          <Link to="/projects">
            <Button style={{ marginTop: "15px" }} inverted color="violet">
              <Icon name="angle left" />
              Back
            </Button>
          </Link>
          <Form style={{ marginTop: "30px" }}>
            <Form.Group>
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
            <Form.Group>
              <Form.Input
                label="Start Date"
                name="planned_start"
                value={planned_start}
                placeholder="YYYY-MM-DD"
                onChange={this.handleChange}
              />
              <Form.Input
                label="End Date"
                name="planned_end"
                value={planned_end}
                placeholder="YYYY-MM-DD"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Notes"
                name="notes"
                value={notes}
                placeholder="Notes"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Segment>
        {this.state.taskShown ? (
          <div>
            <TaskArrayForForm project_id={this.state.project.id} /> <br />
          </div>
        ) : (
          <div>
            {" "}
            <Button onClick={() => this.toggleTask()}>
              Add Tasks and Employees
            </Button>{" "}
            {/* <Button onClick={this.handleSubmit}>Save Project</Button>{" "} */}
            {/* <Link to={"/projects"}>
              <Button inverted color="violet" style={{ marginBottom: "20px" }}>
                <Icon name="arrow alternate circle left outline" />
                Go Back
              </Button>
            </Link> */}
          </div>
        )}
      </>
    );
  }
}

export default ProjectForm;
