import React from "react";
import { Table, Button, Form, Popup, Icon, TabPane } from "semantic-ui-react";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import moment from "moment";

class ApproveTimesheetsRow extends React.Component {
  state = {
    editing: false,
    start_time: this.props.tb.start_time,
    end_time: this.props.tb.end_time,
    manualEntry: this.props.tb.manualEntry,
    hours: this.props.tb.hours,
    updated: false
  };

  updateTimesheet = () => {
    if (this.state.updated === true) {
      const timeblock_id = this.props.tb.id;
      axios.get(`/api/timeblock/${timeblock_id}/pendingTB`).then(res => {
        this.setState({
          ...this.state,
          hours: res.data[0].hours,
          start_time: res.data[0].start_time,
          end_time: res.data[0].end_time,
          updated: false
        });
      });
    }
  };

  toggleUpdate = () => {
    this.setState({ updated: true }, () => this.updateTimesheet());
  };

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
    axios
      .put(`/api/timeblocks/${id}`, {
        start_time: start_time,
        end_time: end_time,
        manualEntry: manualEntry
      })
      .then(res => this.toggleUpdate());
    this.toggleEdit();
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  render() {
    const { tb, auth } = this.props;

    return (
      <Table.Row>
        <Table.Cell style={{ width: "150px", cursor: "pointer" }}>
          {moment(tb.start_time).format("L")}
        </Table.Cell>

        <Table.Cell
          style={{
            width: "1100px",
            cursor: "pointer"
          }}
        >
          <div>
            <Icon name="user" style={{ color: "RebeccaPurple" }} />
            {tb.name}
          </div>

          <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
            {tb.project_name}
          </div>

          <div>{tb.task_name}</div>

        </Table.Cell>

        <Table.Cell style={{ width: "350px", cursor: "pointer" }}>
          {this.state.editing ? (
            <Form.Input
              name="start_time"
              value={this.state.start_time}
              onChange={this.handleChange}
            />
          ) : (
            moment(this.state.start_time).format("h:mm a")
          )}
        </Table.Cell>

        <Table.Cell style={{ width: "350px", cursor: "pointer" }}>
          {this.state.editing ? (
            <Form.Input
              name="end_time"
              value={this.state.end_time}
              onChange={this.handleChange}
            />
          ) : (
            moment(tb.end_time).format("h:mm a")
          )}
        </Table.Cell>

        <Table.Cell style={{ width: "50px", cursor: "pointer" }}>
          {this.state.hours.toFixed(2)}
        </Table.Cell>


        <Table.Cell>
          <div>
            {this.props.auth.user &&
              this.props.auth.user.admin === true &&
              (this.state.editing ? (

                <Popup
                  trigger={
                    <Button
                      color="black"
                      icon="save outline"
                      size="mini"
                      circular
                      onClick={() => this.handleSubmit(tb.id)}
                    />
                  }
                  content={"Save Changes"}
                  basic
                />
              ) : (
                <>
                  <Popup
                    trigger={
                      <Button
                        color="black"
                        icon="check"
                        size="mini"
                        circular
                        onClick={() => this.approveTimeblock(tb.id)}
                      />
                    }
                    content={"Approve"}
                    basic
                  />
                  <Popup
                    trigger={
                      <Button
                        color="grey"
                        icon="pencil"
                        size="mini"
                        circular
                        onClick={() => this.toggleEdit()}
                      />
                    }
                    content={"Edit Time"}
                    basic
                  />
                </>
              ))}
            <Popup
              trigger={
                <Button
                  color="violet"
                  icon="send"
                  size="mini"
                  circular
                  onClick={() => this.sendBack(tb.id)}
                />
              }
              content={"Send back to user"}
              basic
            />
          </div>
        </Table.Cell>

      </Table.Row>
    );
  }
}

export class ConnectedApprovedTimesheetsRow extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ApproveTimesheetsRow {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedApprovedTimesheetsRow);
