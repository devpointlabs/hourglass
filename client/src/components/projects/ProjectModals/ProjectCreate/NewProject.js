import React from "react";
import {
  Form,
  Button,
  Header,
  Label,
} from "semantic-ui-react";
import axios from "axios";
import CalendarPickerForProjectForm from './CalendarPickerForProjectForm'

class NewProject extends React.Component {
  state = {
    project: {
      name: '',
      client_name: '',
      planned_start: '',
      planned_end: '',
      budget: ''
    }
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
    axios.post(`/api/projects`, project)
      .then(res =>
        project.name && this.props.openModal2()
      )
  }

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
            <span >
              <Button
                floated="left"
                style={{ background: 'RebeccaPurple', color: 'white' }}
                onClick={() => this.props.handleClose()}
              >
                Close
                  </Button>
            </span>
            <span>
              <Button
                floated="right"
                style={{ background: 'RebeccaPurple', color: 'white' }}
                onClick={() => this.handleSubmit()}
              >
                Next
                  </Button>
            </span>
            <div style={{ padding: '15px' }} />
          </span>

        </Form>
      </>
    );
  }
}

export default NewProject;

const styles = {
  modal: {
    position: 'relative',
    maxWidth: '93%',
    textAlign: 'center',
    paddingLeft: '25px'
  }
}
