import React from "react";
import { Table, Icon } from "semantic-ui-react";
import CheckboxComponent from "./CheckboxComponent";
import "../timeSheetDayView.css";
import moment from "moment";
import { AuthConsumer } from "../../../providers/AuthProvider";
import "../timeSheetDayView.css";

class UnsubmittedTableRow extends React.Component {
  state = {
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
          <Table.Row className="timeSheetDayViewTableRow" key={block.id}>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "150px", cursor: "pointer" }}
            >
              {moment(block.start_time).format("L")}
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{
                width: "1100px",
                cursor: "pointer"
              }}
            >
              {this.props.auth.user.admin && (
                <div>
                  <Icon name="user" style={{ color: "RebeccaPurple" }} />
                  {this.props.auth.user.name}
                </div>
              )}
              <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                {block.taskInfo && block.taskInfo.projectInfo.name}
              </div>
              <div>({block.taskInfo && block.taskInfo.name})</div>
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "350px", cursor: "pointer" }}
            >
              {moment(block.start_time).format("h:mm a")}
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "350px", cursor: "pointer" }}
            >
              {moment(block.end_time).format("h:mm a")}
            </Table.Cell>
            <Table.Cell
              onClick={() => this.props.handleOpen(block)}
              style={{ width: "50px", cursor: "pointer" }}
            >
              {block.taskInfo && parseFloat(block.hours).toFixed(2)}
            </Table.Cell>
            <Table.Cell style={{ width: "5px" }}>
              <CheckboxComponent
                blockId={block.id}
                handleClickForUnsubmitted={this.handleClickForUnsubmitted}
                reset={this.props.reset}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </>
    );
  }
}

export class ConnectedUnsubmittedTableRow extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <UnsubmittedTableRow {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedUnsubmittedTableRow;
