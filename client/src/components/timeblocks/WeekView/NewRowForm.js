import React from "react";
import { Table, Button, Form } from "semantic-ui-react";
import moment from "moment";
import Select from "react-select";
import { sortSelectOptions } from "../sortSelectOptions";
import axios from "axios";
import { AuthConsumer } from "../../../providers/AuthProvider";
import selectStyles from "../selectStyles";

class NewRowForm extends React.Component {
  state = {
    mondayTotal: "",
    tuesdayTotal: "",
    wednesdayTotal: "",
    thursdayTotal: "",
    fridayTotal: "",
    saturdayTotal: "",
    sundayTotal: "",
    weekTotal: "",
    project: "",
    task: {},
    mondaySubmitComplete: true,
    tuesdaySubmitComplete: true,
    wednesdaySubmitComplete: true,
    thursdaySubmitComplete: true,
    fridaySubmitComplete: true,
    saturdaySubmitComplete: true,
    sundaySubmitComplete: true
  };

  componentDidMount() {
    const t = this.props.tasks[0] && this.props.tasks[0];
    const p = t.projectInfo;
    this.setState({
      project: { value: p.id, label: `${p.name} (${p.client_name})` },
      task: { value: t.id, label: t.name }
    });
  }

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => this.compileTotals()
    );
  };

  compileTotals = () => {
    const {
      mondayTotal,
      tuesdayTotal,
      wednesdayTotal,
      thursdayTotal,
      fridayTotal,
      saturdayTotal,
      sundayTotal
    } = this.state;

    let weekTotal = parseFloat(
      (mondayTotal && parseFloat(mondayTotal)) +
      (tuesdayTotal && parseFloat(tuesdayTotal)) +
      (wednesdayTotal && parseFloat(wednesdayTotal)) +
      (thursdayTotal && parseFloat(thursdayTotal)) +
      (fridayTotal && parseFloat(fridayTotal)) +
      (saturdayTotal && parseFloat(saturdayTotal)) +
      (sundayTotal && parseFloat(sundayTotal))
    ).toFixed(2);

    this.setState({ weekTotal });
  };

  handleSubmit = e => {
    this.setState(
      {
        mondaySubmitComplete: false,
        tuesdaySubmitComplete: false,
        wednesdaySubmitComplete: false,
        thursdaySubmitComplete: false,
        fridaySubmitComplete: false,
        saturdaySubmitComplete: false,
        sundaySubmitComplete: false
      },
      () => {
        const { monday } = this.props;
        const mondayStartOfDay = moment(monday).startOf("day");
        this.state.mondayTotal
          ? this.submitBlock(this.state.mondayTotal, mondayStartOfDay, "monday")
          : this.setState({ mondaySubmitComplete: true });
        this.state.tuesdayTotal
          ? this.submitBlock(
            this.state.tuesdayTotal,
            moment(mondayStartOfDay).add(1, "days"),
            "tuesday"
          )
          : this.setState({ tuesdaySubmitComplete: true });
        this.state.wednesdayTotal
          ? this.submitBlock(
            this.state.wednesdayTotal,
            moment(mondayStartOfDay).add(2, "days"),
            "wednesday"
          )
          : this.setState({ wednesdaySubmitComplete: true });
        this.state.thursdayTotal
          ? this.submitBlock(
            this.state.thursdayTotal,
            moment(mondayStartOfDay).add(3, "days"),
            "thursday"
          )
          : this.setState({ thursdaySubmitComplete: true });
        this.state.fridayTotal
          ? this.submitBlock(
            this.state.fridayTotal,
            moment(mondayStartOfDay).add(4, "days"),
            "friday"
          )
          : this.setState({ fridaySubmitComplete: true });
        this.state.saturdayTotal
          ? this.submitBlock(
            this.state.saturdayTotal,
            moment(mondayStartOfDay).add(5, "days"),
            "saturday"
          )
          : this.setState({ saturdaySubmitComplete: true });
        this.state.sundayTotal
          ? this.submitBlock(
            this.state.sundayTotal,
            moment(mondayStartOfDay).add(6, "days"),
            "sunday"
          )
          : this.setState({ sundaySubmitComplete: true });
      }
    );
  };

  submitBlock = (hours, date, day) => {
    const start_time = moment(date).add(9, "hours");
    const end_time = moment(start_time).add(hours, "hours");
    let block = {
      task_id: this.state.task.value,
      user_id: this.props.auth.user.id,
      start_time,
      end_time,
      status: "unSubmitted",
      manualEntry: true
    };
    axios.post(`/api/timeblocks`, block).then(res => {
      switch (day) {
        case "monday":
          this.setState({ mondaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "tuesday":
          this.setState({ tuesdaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "wednesday":
          this.setState({ wednesdaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "thursday":
          this.setState({ thursdaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "friday":
          this.setState({ fridaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "saturday":
          this.setState({ saturdaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        case "sunday":
          this.setState({ sundaySubmitComplete: true }, () =>
            this.checkSubmitComplete()
          );
          break;
        // no default
      }
    });
  };

  checkSubmitComplete = () => {
    if (
      this.state.mondaySubmitComplete &&
      this.state.tuesdaySubmitComplete &&
      this.state.wednesdaySubmitComplete &&
      this.state.thursdaySubmitComplete &&
      this.state.fridaySubmitComplete &&
      this.state.saturdaySubmitComplete &&
      this.state.sundaySubmitComplete
    ) {
      this.props.getCurrentUserTimeBlocks();
      this.handleCancel();
    }
  };

  handleCancel = e => {
    this.setState({
      mondayTotal: "",
      tuesdayTotal: "",
      wednesdayTotal: "",
      thursdayTotal: "",
      fridayTotal: "",
      saturdayTotal: "",
      sundayTotal: ""
    });
    this.props.toggleShowNewRow();
  };

  handleChange1 = project => {
    this.setState({ project }, () => {
      const selectedProjectTasks = this.props.tasks.filter(
        t => t.project_id === this.state.project.value
      );
      this.setState({
        task: {
          value: selectedProjectTasks.length > 0 && selectedProjectTasks[0].id,
          label: selectedProjectTasks.length > 0 && selectedProjectTasks[0].name
        }
      });
    });
  };

  handleChange2 = task => {
    this.setState({ task });
  };

  render() {
    const selectOptions = sortSelectOptions(
      this.state.project,
      this.props.projects,
      this.props.tasks
    );

    return (
      <>
        <Table.Row>
          <Table.Cell>
            <Select
              styles={selectStyles}
              autoFocus
              placeholder="Select Project"
              value={this.state.project}
              onChange={this.handleChange1}
              options={selectOptions.projectSelectOptions}
            />
            <Select
              styles={selectStyles}
              value={this.state.task}
              onChange={this.handleChange2}
              options={selectOptions.taskSelectOptions}
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0,
                textAlign: "center !important"
              }}
              name="mondayTotal"
              value={this.state.mondayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
              type="float"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="tuesdayTotal"
              value={this.state.tuesdayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="wednesdayTotal"
              value={this.state.wednesdayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="thursdayTotal"
              value={this.state.thursdayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="fridayTotal"
              value={this.state.fridayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="saturdayTotal"
              value={this.state.saturdayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell style={{ padding: "2px" }}>
            <Form.Input
              style={{
                width: "10ch",
                padding: "1px",
                borderRadius: 0
              }}
              name="sundayTotal"
              value={this.state.sundayTotal}
              onChange={this.handleChange}
              placeholder="0.00"
              maxLength="5"
            />
          </Table.Cell>
          <Table.Cell>{this.state.weekTotal}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan="9">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                marginTop: "10px"
              }}
            >
              {!this.props.newProjectType && (
                <Button
                  style={{
                    width: "100px"
                  }}
                  onClick={() => this.handleCancel()}
                >
                  Cancel
                </Button>
              )}
              <Button
                style={{
                  width: "100px",
                  color: "white",
                  background: "RebeccaPurple",
                  marginLeft: "10px"
                }}
                ref={el => {
                  this.submitButton = el;
                }}
                onClick={() => this.handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
        <Table.Row style={{ height: "25vh" }} />
      </>
    );
  }
}

export class ConnectedNewRowForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <NewRowForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedNewRowForm;
