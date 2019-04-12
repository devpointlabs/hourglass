import React from "react";
import { Modal, Header, Form, Button } from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";
import { sortSelectOptions } from "../sortSelectOptions";

class EditTimeEntryModal extends React.Component {
  state = {
    project: { value: 1 },
    task: {},
    startMoment: {},
    endMoment: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.timeBlock) {
      // const defaults = defaultProjectAndTask(
      //   this.props.timeBlock.task_id,
      //   selectOptions
      // );
      this.setState({
        year: moment(this.props.timeBlock.start_date).format("YYYY"),
        startMonthDay: moment(this.props.timeBlock.start_date).format("MM/DD"),
        startHourMinute: moment(this.props.timeBlock.start_time).format(
          "HH:mm"
        ),
        endMonthDay: moment(this.props.timeBlock.end_time).format("MM/DD"),
        endHourMinute: moment(this.props.timeBlock.end_time).format("HH:mm"),
        hours: this.props.timeBlock.hours,
        status: this.props.timeBlock.status
      });
    }
  }

  handleChange = () => {
    console.log("other");
  };

  handleChange1 = () => {
    console.log("project select");
  };

  handleChange2 = () => {
    console.log("task select");
  };

  render() {
    const { handleClose, projects, tasks } = this.props;
    const selectedProject = this.state.project.value;
    const selectOptions = sortSelectOptions(selectedProject, projects, tasks);
    console.log(projects);
    console.log(selectOptions);

    return (
      <>
        <Modal open={this.props.modal1Open} onClose={() => handleClose()}>
          <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
            Edit Timesheet Entry
          </Modal.Header>
          <Form style={{ padding: "10px" }}>
            <Header>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px"
                }}
              >
                Project
                <Select
                  value={this.state.project}
                  onChange={this.handleChange1}
                  options={selectOptions.projectSelectOptions}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  marginBottom: "20px"
                }}
              >
                Task
                <Select
                  value={this.state.task}
                  onChange={this.handleChange2}
                  options={selectOptions.taskSelectOptions}
                />
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{
                    width: "100px",
                    marginLeft: "10px",
                    paddingRight: "10px"
                  }}
                >
                  <Form.Input
                    maxLength="4"
                    label="Year"
                    name="year"
                    placeholder="YYYY"
                    onChange={this.handleChange}
                    value={this.state.year}
                  />
                </div>
                <div style={{ width: "100px", marginLeft: "10px" }}>
                  <Form.Input
                    maxLength="5"
                    label="Date"
                    name="startMonthDay"
                    placeholder="MM/DD"
                    onChange={this.handleChange}
                    value={this.state.startMonthDay}
                  />
                </div>
                <div
                  style={{
                    width: "180px",
                    paddingLeft: "20px",
                    paddingRight: "0"
                  }}
                >
                  <Form.Input
                    maxLength="8"
                    label="Start Time"
                    name="startHourMinute"
                    placeholder="HH:mm am"
                    onChange={this.handleChange}
                    value={this.state.startHourMinute}
                  />
                </div>
                <div
                  style={{
                    width: "180px",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                  }}
                >
                  <Form.Input
                    maxLength="8"
                    label="End Time"
                    name="endHourMinute"
                    placeholder="HH:mm pm"
                    onChange={this.handleChange}
                    value={this.state.endHourMinute}
                  />
                </div>
                <div style={{ width: "100px" }}>
                  <Form.Input
                    autoFocus
                    placeholder="hh.hh"
                    maxLength="8"
                    label="Hours"
                    name="hours"
                    onChange={this.handleChange}
                    value={this.state.hours}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <div>Status:</div>
                  <div>{this.state.status}</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                  marginRight: "20px"
                }}
              >
                <Button
                  style={{
                    marginLeft: "40px",
                    marginTop: "30px",
                    width: "100px"
                  }}
                  onClick={() => {
                    handleClose();
                    console.log("clicked");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    marginTop: "30px",
                    width: "100px",
                    color: "white",
                    background: "RebeccaPurple"
                  }}
                  onClick={() => console.log("clicked")}
                >
                  Submit
                </Button>
              </div>
            </Header>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EditTimeEntryModal;
