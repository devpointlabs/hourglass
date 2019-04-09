import React from "react";
import { Container, Divider, Header, Form } from "semantic-ui-react";
import axios from "axios";
import TaskViewForForm from "./TaskViewForForm";
import TaskForm from "./TaskForm";

class TaskArrayForForm extends React.Component {
  state = { tasks: [] };

  componentDidMount = () => {
    const { tasks } = this.state;
    const { project_id } = this.props;
    axios
      .get(`/api/${project_id}/view_tasks`)
      .then(res => this.setState({ tasks: res.data }));
  };

  resetState = task => {
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  showTasks = () => {
    return this.state.tasks.map(task => (
      <>
        <TaskViewForForm task={task} removeTask={this.removeTask} />
      </>
    ));
  };

  removeTask = id => {
    this.setState({ tasks: this.state.tasks.filter(t => t.id !== id) });
  };

  render() {
    return (
      <>
        <Header>Tasks</Header>
        {this.showTasks()}
        <TaskForm
          resetState={this.resetState}
          project_id={this.props.project_id}
          showTasks={this.showTasks()}
        />
      </>
    );
  }
}

export default TaskArrayForForm;
