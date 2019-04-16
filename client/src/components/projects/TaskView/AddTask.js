import React from "react";
import {
  Form,
  Button,
  Header,
  Checkbox,
  Modal,
  Table
} from "semantic-ui-react";
import axios from "axios";

class TaskForm extends React.Component {
  state = {
    task: {
      name: "",
      description: "",
      billable: false,
      price_per_hour: "",
      id: ""
    },
    usersShown: false,
    modalOpen: false
  };

  handleSubmit = () => {
    const { task } = this.state;
    const { project } = this.props;
    axios.post(`/api/projects/${project.id}/tasks`, { task }).then(res => {
      this.setState({
        task: {
          ...this.state.task,
          name: "",
          description: "",
          billable: false,
          price_per_hour: "",
          id: ""
        }
      });
    });
  };

  handleBillable = () => {
    this.setState({
      task: { ...this.state.task, billable: !this.state.task.billable }
    });
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ task: { ...this.state.task, [name]: value } });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { name, description, price_per_hour } = this.state.task;
    const { task } = this.props;
    return (
      <>
        <Button
          onClick={() => this.handleOpen()}
          circular
          icon="add"
          size="mini"
          floated="right"
          style={{
            marginRight: "35px",
            background: "RebeccaPurple",
            color: "white"
          }}
        />
        <Modal open={this.state.modalOpen} onClose={() => this.handleClose()}>
          <Modal.Header>Create a New Task</Modal.Header>
          <Modal.Content>
            <Form>
              <Table>
                <Table.Body>
                  <Table.Row key={"new"}>
                    <Table.Cell>
                      <Form.Input
                        name="name"
                        label="Name"
                        placeholder="Task Name"
                        value={name}
                        autoFocus
                        required
                        onChange={this.handleChange}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        name="description"
                        label="Description"
                        placeholder="Description"
                        value={description}
                        onChange={this.handleChange}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        name="price_per_hour"
                        label="Price per hour"
                        placeholder="Price per hour"
                        value={price_per_hour}
                        required
                        onChange={this.handleChange}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        label="Billable"
                        onClick={this.handleBillable}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        circular
                        style={{ background: "RebeccaPurple", color: "white" }}
                        onClick={() => this.handleSubmit()}
                        size="mini"
                        icon="plus"
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form>
            <br />
            <Button
              floated="right"
              style={{ background: "RebeccaPurple", color: "white" }}
              onClick={() => this.handleClose()}
            >
              Close
            </Button>
            <br />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default TaskForm;
