import React, { Fragment } from "react";
import { Table, Header, Checkbox, Accordion, Icon } from "semantic-ui-react";
import axios from "axios";
import TaskViewRow from "./TaskViewRow";
import TimeblocksByTask from "./TimeblocksByTask";

class TaskView extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    const { id } = this.props;
    axios
      .get(`/api/${id}/view_tasks`)
      .then(response => this.setState({ tasks: response.data }));
  }

  showTasks = () => {
    return this.state.tasks.map(task => <TaskViewRow task={task} />);
  };

  render() {
    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Tasks
        </Header>

        <Table celled compact>
          <Table.Header>
            <Table.HeaderCell>Name of Task</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Billable</Table.HeaderCell>
            <Table.HeaderCell>Price per Hour</Table.HeaderCell>
          </Table.Header>

          <Table.Body>{this.showTasks()}</Table.Body>
        </Table>
      </Fragment>
    );
  }
}

export default TaskView;
