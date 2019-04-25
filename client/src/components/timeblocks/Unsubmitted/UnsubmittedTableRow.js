import React from "react";
import { Table, Icon, Popup, Button } from "semantic-ui-react";
import "../timeSheetDayView.css";
import moment from "moment";
import { AuthConsumer } from "../../../providers/AuthProvider";
import "../timeSheetDayView.css";
import axios from "axios";

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

  submitTimeblock = block => {
    axios
      .put(`/api/timeblocks/${block.id}`, { status: "pending" })
      .then(res => null);
    this.props.updateTimeblockState(block);
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
                  {block.userInfo.name}
                </div>
              )}
              <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                {block.taskInfo && block.taskInfo.projectInfo.name}
              </div>
              <div>{block.taskInfo && block.taskInfo.name}</div>
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
            <Table.Cell style={{ textAlign: "Center" }}>
              <Popup
                trigger={
                  <Button
                    color="black"
                    icon="check"
                    size="mini"
                    circular
                    onClick={() => this.submitTimeblock(block)}
                  />
                }
                content={"Submit"}
                basic
              />
              {/* <CheckboxComponent
                blockId={block.id}
                handleClickForUnsubmitted={this.handleClickForUnsubmitted}
                reset={this.props.reset}
              /> */}
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
