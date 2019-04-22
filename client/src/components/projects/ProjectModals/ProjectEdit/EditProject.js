import React from "react";
import { Form, Button, Header, Label, Popup, Icon } from "semantic-ui-react";
import axios from "axios";
import CalendarPickerForProjectForm from "./CalendarPickerForProjectForm";

class EditProject extends React.Component {
  state = {
    project: {
      name: this.props.project.project_name,
      client_name: this.props.project.client_name,
      planned_start: this.props.project.planned_start,
      planned_end: this.props.project.planned_end,
      budget: this.props.project.budget,
      project_id: this.props.project.project_id
    }
  };

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
      .then(res =>
        project.name && this.props.budget
          ? this.props.handleClose()
          : this.props.openModal2()
      );
  };

  deleteProject = () => {
    let r = window.confirm("Permanantly Delete Project?");
    if (r === true) {
      const { project_id } = this.state.project;
      axios.delete(`/api/projects/${project_id}`).then(res => {
        this.props.handleClose();
      });
    } else {
    }
  };

  render() {
    const {
      name,
      client_name,
      planned_start,
      planned_end,
      budget
    } = this.state.project;
    const start_date = new Date(planned_start).toDateString();
    const end_date = new Date(planned_end).toDateString();
    return (
      <>
        <Form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
          <Form.Group style={styles.modal}>
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
            <Form.Input
              label="Budget"
              name="budget"
              style={{
                width: "125px"
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
          </Form.Group>
          <span>
            <Form.Group style={{ justifyContent: "center" }}>
              <span style={{ paddingRight: "70px" }}>
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
              </span>

              <span style={{ paddingLeft: "30px" }}>
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
              </span>
            </Form.Group>
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "10px",
              alignItems: "flex-end"
            }}
          >
            <div>
              <Popup
                trigger={
                  <Icon
                    onClick={() =>
                      this.deleteProject(this.props.project.project_id)
                    }
                    name="trash alternate"
                    style={{ color: "RebeccaPurple" }}
                  />
                }
                content="Delete Project"
              />
            </div>
            <div>
              <Button
                style={{
                  width: "100px"
                }}
                onClick={() => this.props.handleClose()}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "100px",
                  color: "white",
                  background: "RebeccaPurple",
                  marginLeft: "10px"
                }}
                onClick={() => this.handleSubmit()}
              >
                {this.props.budget ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default EditProject;

const styles = {
  modal: {
    position: "relative",
    maxWidth: "93%",
    textAlign: "center",
    paddingLeft: "25px"
  }
};
