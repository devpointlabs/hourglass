import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";

class ProjectForm extends React.Component {
  state = {
    project: {
      name: "",
      client_name: "",
      planned_start: "",
      planned_end: "",
      notes: ""
    }
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ project: { ...this.state.project, [name]: value } });
  };

  handleSubmit = e => {
    const { project } = this.state;
    e.preventDefault();
    axios.post(`/api/projects`, project).then(res => {
      this.props.resetState(project);
      this.props.history.push(`/projects`);
    });
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
        <Form style={{ marginTop: "30px" }} onSubmit={this.handleSubmit}>
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
              placeholder="YYYY-DD-MM"
              onChange={this.handleChange}
            />
            <Form.Input
              label="End Date"
              name="planned_end"
              value={planned_end}
              placeholder="YYYY"
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
          <Form.Button>Save</Form.Button>
        </Form>
      </>
    );
  }
}

export default ProjectForm;
