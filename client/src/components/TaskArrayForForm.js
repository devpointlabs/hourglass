import React from "react";
import { Container, Divider } from "semantic-ui-react";
import axios from "axios";
import TaskViewForForm from "./TaskViewForForm";
import TaskForm from "./TaskForm";

class TaskArrayForForm extends React.Component {
  state = { tasks: [] };

  componentDidMount = () => {
    axios.get(` `).then(res => this.setState({ tasks: res.data }));
  };

  render() {
    return (
      <>
        <TaskForm project_id={this.props.project_id} />
      </>
    );
  }
}

export default TaskArrayForForm;
