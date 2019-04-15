import React from "react";
import { Table, Checkbox, Button, Icon, Accordion } from "semantic-ui-react";
import TimeblocksByTask from "./TimeblocksByTask";

class TaskViewRow extends React.Component {
  state = { activeIndex: 0 };

  toggleTimeblocks = () => {
    this.setState({ viewTimeblocks: !this.state.viewTimeblocks });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { task } = this.props;
    const { activeIndex } = this.state;
    return (
      <Table.Row>
        <Table.Cell>{task.name}</Table.Cell>
        <Table.Cell>{task.description}</Table.Cell>
        <Table.Cell>
          {task.billable ? (
            <Icon name="check square outline" />
          ) : (
            <Icon name="square outline" />
          )}
        </Table.Cell>
        <Table.Cell>{task.price_per_hour}</Table.Cell>
      </Table.Row>
    );
  }
}

export default TaskViewRow;

{
  /* 
   {this.state.viewTimeblocks ? (<Table.Row>
            <TimeblocksByTask task={this.props.task} />
          </Table.Row>
        ) : null} */
}
