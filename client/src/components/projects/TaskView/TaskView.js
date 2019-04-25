import React from "react";
import { Table, Header, Dropdown } from "semantic-ui-react";
import axios from "axios";
import EditModalForm from "../ProjectModals/ProjectEdit/EditModalForms";

class TaskView extends React.Component {
  state = {
    tasks: [],
    billableTotals: {},
    unbillableTotals: {},
    start_date: "2000-04-14",
    end_date: "2091-04-15",
    taskview: true
  };

  componentDidMount() {
    this.getProjectTasks();
  }

  getProjectTasks = () => {
    const { project } = this.props;
    axios
      .get(`/api/projectdata/${project.project_id}/find_by_date`, {
        params: {
          start_date: this.state.start_date,
          end_date: this.state.end_date
        }
      })
      .then(response => {
        this.setState({ tasks: response.data });
      });
    axios.get(`/api/billable/${project.project_id}`).then(response => {
      const billable = response.data.filter(b => b.billable && b);
      const unbillable = response.data.filter(b => {
        if (b.billable === false) return b;
        return null;
      });
      this.setState({
        billableTotals: billable[0],
        unbillableTotals: unbillable[0]
      });
    });
  };

  getMonday = d => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (parseInt(day) === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  filterDates = (e, { value }) => {
    const curr = new Date();
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;
    let firstday = new Date(curr.setDate(first)).toUTCString();
    let lastday = new Date(curr.setDate(last)).toUTCString();
    let month = new Date();
    let monthFirst = new Date(
      month.getFullYear(),
      month.getMonth(),
      1
    ).toUTCString();
    let monthLast = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    ).toUTCString();

    if (value === "allTime") {
      this.setState(
        { start_date: "2000-04-14", end_date: "2091-04-15" },
        () => {
          this.getProjectTasks();
        }
      );
    } else if (value === "thisWeek") {
      this.setState({ start_date: firstday, end_date: lastday }, () => {
        this.getProjectTasks();
      });
    } else if (value === "thisMonth") {
      this.setState({ start_date: monthFirst, end_date: monthLast }, () => {
        this.getProjectTasks();
      });
    } else {
      console.log("nada");
    }
  };

  showBillableTasks = () => {
    const billableTasks = this.state.tasks.filter(t => t.billable === true);

    return billableTasks.map((task, i) => (
      <Table.Row key={i}>
        <Table.Cell>{task.task_name}</Table.Cell>
        <Table.Cell
          style={{ borderRight: "solid grey 0.5px", textAlign: "center" }}
        >
          {task.hours ? parseFloat(task.hours).toFixed(2) : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
          {task.cost ? parseFloat(task.cost).toFixed(2) : "$0"}
        </Table.Cell>
      </Table.Row>
    ));
  };

  showUnBillableTasks = () => {
    const UnbillableTasks = this.state.tasks.filter(t => t.billable === false);
    return UnbillableTasks.map((task, i) => (
      <Table.Row key={i}>
        <Table.Cell>{task.task_name}</Table.Cell>
        <Table.Cell
          style={{ borderRight: "solid grey 0.5px", textAlign: "center" }}
        >
          {task.hours ? parseFloat(task.hours).toFixed(2) : 0}
        </Table.Cell>
        <Table.Cell style={{ paddingLeft: "200px" }}>
          ${parseFloat(task.price_per_hour).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ textAlign: "center" }}>
          {task.cost ? parseFloat(task.cost).toFixed(2) : "$0"}
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    return (
      <>
        <Dropdown
          placeholder="Dates"
          fluid
          onChange={this.filterDates}
          selection
          options={options}
          style={{ borderRadius: 0 }}
          value={this.state.start_date}
        />
        <Header as="h1">
          Tasks
          <EditModalForm
            project={this.props.project}
            taskView={this.state.taskview}
          />
        </Header>
        <Table>
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                Billable Tasks
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <div style={{ textAlign: "center" }}>Hours</div>
                <div style={{ textAlign: "center" }}>
                  {this.state.billableTotals !== undefined
                    ? parseFloat(
                      this.state.billableTotals.total_billable_hours
                    ).toFixed(2)
                    : "0.00"}
                </div>
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: "200px"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <div>Total</div>
                {this.state.billableTotals === undefined
                  ? "$0.00"
                  : this.state.billableTotals.total_billable_cost}
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
            {this.showBillableTasks()}
            <Table.Row>
              <Table.Cell colSpan="6" />
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold"
                }}
              >
                Unbillable Tasks
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <div style={{ textAlign: "center" }}>Hours</div>
                <div style={{ textAlign: "center" }}>
                  {this.state.unbillableTotals === undefined
                    ? 0.0
                    : this.state.unbillableTotals.total_billable_hours}
                </div>
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "450px",
                  fontWeight: "bold",
                  paddingLeft: "200px"
                }}
              >
                Price per Hour
              </Table.Cell>
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                <div>Total</div>
                {this.state.unbillableTotals === undefined
                  ? "$0.00"
                  : this.state.unbillableTotals.total_billable_cost}
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
            {this.showUnBillableTasks()}
            <Table.Row>
              <Table.Cell colSpan="4" />
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row style={{ background: "#e2e2e2" }}>
              <Table.Cell colSpan="3" />
              <Table.Cell
                style={{
                  fontSize: "1.1em",
                  width: "100px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <div>Total</div>$
                {this.props.project.total_project_cost
                  ? this.props.project.total_project_cost.toFixed(2)
                  : "0.00"}
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        </Table>
        <br />
        <br />
      </>
    );
  }
}

const options = [
  { key: "allTime", text: "All Time", value: "allTime" },
  { key: "thisWeek", text: "This Week", value: "thisWeek" },
  { key: "thisMonth", text: "This Month", value: "thisMonth" }
];

export default TaskView;
