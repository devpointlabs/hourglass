import React from "react";
import { Segment, Button } from "semantic-ui-react";
import axios from "axios";

class TaskViewForForm extends React.Component {
  handleDelete = () => {
    const { task } = this.props;
    debugger;
    axios.delete(`/api/tasks/${task.id}`);
    this.props.removeTask(task.id);
  };

  render() {
    const { task } = this.props;
    return (
      <>
        {" "}
        <Segment>
          <Button
            onClick={() => this.handleDelete()}
            style={{ borderRadius: "100%" }}
            color="red"
            icon="times"
            onClick={() => this.handleDelete(task.id)}
          />
          {task.name} || ${task.price_per_hour}/hr || {task.description}
        </Segment>
      </>
    );
  }
}
export default TaskViewForForm;
