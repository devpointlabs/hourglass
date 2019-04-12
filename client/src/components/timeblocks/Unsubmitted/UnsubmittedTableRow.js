import React from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

class UnsubmittedTableRow extends React.Component {
  state = {
    timeBlocksStatus: [],
    timeBlocks: this.props.timeBlocks,
    tasks: this.props.tasks,
    checked: false
  };

  componentDidUpdate = prevProps => {
    if (prevProps.timeBlocks !== this.props.timeBlocks)
      this.setState({
        timeBlocks: this.props.timeBlocks,
        tasks: this.props.tasks
      });
  };

  handleClick = (checked, blockid) => {
    const newCheck = !checked;
    this.setState({ checked: newCheck });
    this.props.handleCheckMarks(newCheck, blockid);
  };

  // this.props.handleCheckMarks(block.id)

  render() {
    const { timeBlocks, tasks } = this.state;

    const BlocksWithTaskInfo = timeBlocks.map(b => {
      return {
        ...b,
        // {start: '', end: '', taskInfo: tasks}
        taskInfo: tasks
          .filter(t => t.id === b.task_id)
          .reduce((acc, task) => acc + task)
      };
    });

    return (
      <>
        {BlocksWithTaskInfo.map(block => (
          <Table.Row
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Table.Cell style={{ width: "140px" }}>
              {block.taskInfo && block.taskInfo.projectInfo.name}
            </Table.Cell>
            <Table.Cell style={{ width: "140px" }}>
              ({block.taskInfo && block.taskInfo.name})
            </Table.Cell>
            <Table.Cell
              style={{
                width: "460px"
              }}
            />
            <Table.Cell style={{ width: "140px", textAlign: "center" }}>
              {block.taskInfo && parseFloat(block.hours).toFixed(2)}
            </Table.Cell>
            <Table.Cell style={{ width: "140px", textAlign: "center" }}>
              <Checkbox
                onChange={() => this.handleClick(this.state.checked, block.id)}
              />
            </Table.Cell>
            <hr />
          </Table.Row>
        ))}
      </>
    );
  }
}

export default UnsubmittedTableRow;
