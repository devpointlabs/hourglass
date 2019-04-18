import React from "react";
import { Table, Button, Form } from "semantic-ui-react";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";

class ApproveTimesheetsRow extends React.Component {
  state = {
    editing: false,
    start_time: "",
    end_time: "",
    manualEntry: "",
    hours: ""
  };

  componentDidMount() {
    this.setState({
      start_time: this.props.tb.start_time,
      end_time: this.props.tb.end_time,
      manualEntry: this.props.tb.manualEntry,
      hours: this.props.tb.hours.toFixed(2)
    });
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  approveTimeblock = id => {
    const { removeTimeblock } = this.props;
    axios.put(`/api/timeblocks/${id}`, { status: "approved" });
    removeTimeblock(id);
  };

  sendBack = id => {
    const { removeTimeblock } = this.props;
    axios.put(`/api/timeblocks/${id}`, { status: "unSubmitted" });
    removeTimeblock(id);
  };

  handleSubmit = id => {
    const { start_time, end_time, manualEntry } = this.state;
    this.setState({ manualEntry: true });
    axios.put(`/api/timeblocks/${id}`, {
      start_time: start_time,
      end_time: end_time,
      manualEntry: manualEntry
    });
    this.toggleEdit();
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  render() {
    const { tb } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{tb.name}</Table.Cell>
        <Table.Cell>{tb.project_name}</Table.Cell>
        <Table.Cell>{tb.task_name}</Table.Cell>
        <Table.Cell>
          {this.state.manualEntry ? "Manual Entry" : "Clocked In/Out"}
        </Table.Cell>

        <Table.Cell>
          {this.state.editing ? (
            <Form.Input
              name="start_time"
              value={this.state.start_time}
              onChange={this.handleChange}
            />
          ) : (
            this.state.start_time
          )}
        </Table.Cell>
        <Table.Cell>
          {this.state.editing ? (
            <Form.Input
              name="end_time"
              value={this.state.end_time}
              onChange={this.handleChange}
            />
          ) : (
            this.state.end_time
          )}
        </Table.Cell>
        <Table.Cell>{this.state.hours}</Table.Cell>
        {this.props.auth.user.admin ? (
          <div>
            <Table.Cell>
              {this.state.editing ? (
                <Button
                  color="blue"
                  icon="plus"
                  size="mini"
                  circular
                  onClick={() => this.handleSubmit(tb.id)}
                />
              ) : (
                <div>
                  <Button
                    color="green"
                    icon="check"
                    size="mini"
                    circular
                    onClick={() => this.approveTimeblock(tb.id)}
                  />
                  <Button
                    color="red"
                    icon="pencil"
                    size="mini"
                    circular
                    onClick={() => this.toggleEdit()}
                  />
                  <Button
                    color="blue"
                    icon="redo"
                    size="mini"
                    circular
                    onClick={() => this.sendBack(tb.id)}
                  />
                </div>
              )}
            </Table.Cell>
          </div>
        ) : (
          <Table.Cell> </Table.Cell>
        )}
      </Table.Row>
    );
  }
}

export class ConnectedApproveTimesheetsRow extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ApproveTimesheetsRow {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedApproveTimesheetsRow;
