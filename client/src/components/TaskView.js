import React, { Fragment } from "react";
import { Table, Header, Checkbox } from "semantic-ui-react";
import axios from "axios";

class TaskView extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    const { id } = this.props;
    debugger;
    axios
      .get(`/api/${id}/view_tasks`)
      .then(response => this.setState({ tasks: response.data }));
  }

  showTasks = () => {
    return this.state.tasks.map(task => (
      <Table.Row key={task.id}>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell>{task.description}</Table.Cell>
        <Table.Cell>
          <Checkbox defaultChecked />
        </Table.Cell>
        <Table.Cell>{task.price_per_hour}</Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Tasks
        </Header>

        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name of Task</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Billable</Table.HeaderCell>
              <Table.HeaderCell>Price per Hour</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.showTasks()}</Table.Body>
        </Table>
      </Fragment>
    );
  }
}

export default TaskView;
