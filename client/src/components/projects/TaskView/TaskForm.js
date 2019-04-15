import React from "react";
import { Form, Button, Header, Checkbox, Icon, Table } from "semantic-ui-react";
import axios from "axios";
import UsersArray from "../../UsersArray";

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

  componentDidMount = () => {
    const { task } = this.props;
    if (task) this.setState({ task: task });
  };

  handleSubmit = () => {
    const { task } = this.state;
    const { project_id } = this.props;
    if (task.id && project_id)
      axios
        .put(`/api/projects/${project_id}/tasks/${task.id}`, { task })
        .then(res => {
          this.props.resetState(res.data);
          this.props.resetEditing();
        });
    else {
      const { task } = this.state;
      const { project_id } = this.props;
      axios.post(`/api/projects/${project_id}/tasks`, { task }).then(res => {
        this.props.resetState(res.data);
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
    }
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
                {" "}
                <Form.Input
                  name="name"
                  label="Name"
                  placeholder="Task Name"
                  value={name}
                  autofocus
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
                {" "}
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
                {" "}
                <Checkbox label="Billable" onClick={this.handleBillable} />
              </Table.Cell>
              <Table.Cell>
                <Button
                  circular
                  color="violet"
                  onClick={() => this.handleSubmit()}
                  size="mini"
                  icon="plus"
                />{" "}
              </Table.Cell>
            </Table.Row>
          </Table>
        </Form>
        {this.props.editing ? (
          <div />
        ) : (
          <UsersArray
            project_id={this.props.project_id}
            handleToggle={this.props.handleToggle}
          />
        )}
      </>
    );
  }
}

export default TaskForm;
