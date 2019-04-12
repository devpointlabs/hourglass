import React from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

class UnsubmittedTableRow extends React.Component {
  state = { timeBlocksStatus: [], timeBlocks: [] };

  componentDidUpdate = prevProps => {
    if (prevProps.timeBlocks !== this.props.timeBlocks)
      this.setState({
        timeBlocksStatus: {
          timeBlocksId: this.props.timeBlocks.map(tb => tb.id),
          status: this.props.timeBlocks.map(tb => tb.status)
        },
        timeBlocks: this.props.timeBlocks
      });
  };

  checkBoxStatus = () => {
    this.setState({ timeBlocks: !this.state.checkBox });
  };

  changeStatus = id => {
    this.state.timeBlocksStatus.filter();
    // this.setState({ timeBlocksStatus })
  };

  render() {
    const { timeBlocks, projects, tasks } = this.props;

    // const dailyTotal = currentDayBlocks.reduce(
    //   (runningTotal, block) => runningTotal + parseFloat(block.hours),
    //   0
    // );

    const BlocksWithTaskInfo = timeBlocks.map(b => {
      return {
        ...b,
        // {start: '', end: '', taskInfo: tasks}
        taskInfo: tasks
          .filter(t => t.id === b.task_id)
          .reduce((acc, task) => acc + task)
      };
    });
    console.log(BlocksWithTaskInfo);

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

              // onClick={() => this.changeStatus(block.id)}
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
