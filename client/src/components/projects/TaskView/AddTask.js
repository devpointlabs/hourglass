import React from "react";
import { Form, Button, Header, Checkbox, Icon, Table } from "semantic-ui-react";
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
    usersShown: false
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
    this.props.handleModal();
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

  render() {
    const { name, description, price_per_hour } = this.state.task;
    const { task } = this.props;
    return (
      <>
        <Form>
          <Table>
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
                <Checkbox label="Billable" onClick={this.handleBillable} />
              </Table.Cell>
              <Table.Cell>
                <Button
                  circular
                  color="violet"
                  onClick={() => this.handleSubmit()}
                  size="mini"
                  icon="plus"
                />
              </Table.Cell>
            </Table.Row>
          </Table>
        </Form>
      </>
    );
  }
}

export default TaskForm;
