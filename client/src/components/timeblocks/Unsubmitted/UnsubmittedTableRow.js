import React from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";
import CheckboxComponent from "./CheckboxComponent";
import "../timeSheetDayView.css";

class UnsubmittedTableRow extends React.Component {
  state = {
    timeBlocksStatus: [],
    timeBlocks: this.props.timeBlocks,
    tasks: this.props.tasks
  };

  componentDidUpdate = prevProps => {
    if (prevProps.timeBlocks !== this.props.timeBlocks)
      this.setState({
        timeBlocks: this.props.timeBlocks,
        tasks: this.props.tasks
      });
  };

  handleClickForUnsubmitted = (checkbox, blockid) => {
    this.props.handleCheckMarks(checkbox, blockid);
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
            className="unSubmittedTableRow"
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "140px" }}
            >
              {block.taskInfo && block.taskInfo.projectInfo.name}
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "140px" }}
            >
              ({block.taskInfo && block.taskInfo.name})
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{
                width: "460px"
              }}
            />
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "140px", textAlign: "center" }}
            >
              {block.taskInfo && parseFloat(block.hours).toFixed(2)}
            </Table.Cell>
            <Table.Cell style={{ width: "140px", textAlign: "center" }}>
              <CheckboxComponent
                blockId={block.id}
                handleClickForUnsubmitted={this.handleClickForUnsubmitted}
                reset={this.props.reset}
              />
              {/* <Checkbox
                onChange={() => this.handleClick(this.state.checkbox, block.id)}
                checked={this.state.checkbox}
              /> */}
            </Table.Cell>
            <hr />
          </Table.Row>
        ))}
      </>
    );
  }
}

export default UnsubmittedTableRow;
