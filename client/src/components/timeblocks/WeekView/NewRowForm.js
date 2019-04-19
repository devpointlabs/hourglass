import React from "react";
import { Table, Button, Form } from "semantic-ui-react";
import moment from "moment";
import Select from "react-select";
import { sortSelectOptions } from "../sortSelectOptions";
import axios from "axios";
import { AuthConsumer } from "../../../providers/AuthProvider";

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
    task: {}
  };

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
    const { monday } = this.props;
    const mondayStartOfDay = moment(monday).startOf("day");
    this.state.mondayTotal &&
      this.submitBlock(this.state.mondayTotal, mondayStartOfDay);
    this.state.tuesdayTotal &&
      this.submitBlock(
        this.state.tuesdayTotal,
        moment(mondayStartOfDay).add(1, "days")
      );
    this.state.wednesdayTotal &&
      this.submitBlock(
        this.state.wednesdayTotal,
        moment(mondayStartOfDay).add(2, "days")
      );
    this.state.thursdayTotal &&
      this.submitBlock(
        this.state.thursdayTotal,
        moment(mondayStartOfDay).add(3, "days")
      );
    this.state.fridayTotal &&
      this.submitBlock(
        this.state.fridayTotal,
        moment(mondayStartOfDay).add(4, "days")
      );
    this.state.saturdayTotal &&
      this.submitBlock(
        this.state.saturdayTotal,
        moment(mondayStartOfDay).add(5, "days")
      );
    this.state.sundayTotal &&
      this.submitBlock(
        this.state.sundayTotal,
        moment(mondayStartOfDay).add(6, "days")
      );
    this.props.toggleShowNewRow();
  };

  submitBlock = (hours, date) => {
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

    axios.post(`/api/timeblocks`, block).then(res => console.log(res));
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
              placeholder="Select Project"
              value={this.state.project}
              onChange={this.handleChange1}
              options={selectOptions.projectSelectOptions}
            />
            <Select
              value={this.state.task}
              onChange={this.handleChange2}
              options={selectOptions.taskSelectOptions}
            />
          </Table.Cell>
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <Form.Input
              textAlign="center"
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
                onClick={() => this.handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
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
