import React from "react";
import {
  Button,
  Icon,
  Modal,
  Image,
  Header,
  Form,
  Checkbox
} from "semantic-ui-react";
import Select from "react-select";
import moment from "moment";

class addTimeBlockButton extends React.Component {
  state = {
    projectId: "",
    task: "",
    year: moment(this.props.selectedDate).format("YYYY"),
    startMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    startHourMinute: "",
    startAmPm: "am",
    endMonthDay: moment(this.props.selectedDate).format("MM/DD"),
    endHourMinute: "",
    endAmPm: "pm",
    hours: ""
  };

  componentDidUpdate(prevProps) {
    const { selectedDate } = this.props;
    if (prevProps.selectedDate !== selectedDate)
      this.setState({
        year: moment(selectedDate).format("YYYY"),
        startMonthDay: moment(selectedDate).format("MM/DD"),
        endMonthDay: moment(selectedDate).format("MM/DD")
      });
  }

  handleChange = e => {
    const {
      year,
      startMonthDay,
      startHourMinute,
      endMonthDay,
      endHourMinute,
      hoursManuallyEntered,
      hours
    } = this.state;

    const targetName = e.target.name;
    const targetValue = e.target.value;

    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.startHourMinute === "" && targetName === "hours") {
        this.setState({ startHourMinute: "09:00" }, () =>
          this.setState({
            endHourMinute: moment(
              year +
                "-" +
                startMonthDay.substring(0, 2) +
                "-" +
                startMonthDay.substring(3, 5) +
                " " +
                this.state.startHourMinute
            )
              .add(parseFloat(this.state.hours), "hours")
              .format("HH:mm")
          })
        );
      } else if (targetName === "hours") {
        this.setState({
          endHourMinute: moment(
            year +
              "-" +
              startMonthDay.substring(0, 2) +
              "-" +
              startMonthDay.substring(3, 5) +
              " " +
              this.state.startHourMinute
          )
            .add(parseFloat(this.state.hours), "hours")
            .format("HH:mm")
        });
      } else if (
        (targetName === "startHourMinute" || targetName === "endHourMinute") &&
        this.state.endHourMinute.length === 5 &&
        this.state.startHourMinute.length === 5
      ) {
        this.setState({
          hours: moment(
            year +
              "-" +
              endMonthDay.substring(0, 2) +
              "-" +
              endMonthDay.substring(3, 5) +
              " " +
              this.state.endHourMinute
          ).diff(
            moment(
              year +
                "-" +
                startMonthDay.substring(0, 2) +
                "-" +
                startMonthDay.substring(3, 5) +
                " " +
                this.state.startHourMinute
            ),
            "hours",
            true
          )
        });
      }
    });
  };

  handleChange1 = e => {
    this.setState({ projectId: e.value });
  };

  handleChange2 = e => {
    this.setState({ task: e.value });
  };

  render() {
    const selectedProjectTasks = this.props.tasks.filter(
      t => t.project_id === this.state.projectId
    );

    return (
      <Modal
        trigger={
          <Button
            style={{
              background: "RebeccaPurple",
              color: "white",
              borderRadius: 0,
              paddingLeft: "0",
              width: "4em",
              height: "4em",
              textAlign: "center"
            }}
            size="large"
            onClick={() => console.log("click")}
          >
            <Icon
              size="large"
              style={{ color: "white", paddingLeft: "22px" }}
              name="add"
            />
          </Button>
        }
      >
        <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
          Add Timesheet Entry
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
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
                    onChange={this.handleChange1}
                    options={this.props.projects.map(p => ({
                      value: p.id,
                      label: `${p.name} (${p.client_name})`
                    }))}
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
                    onChange={this.handleChange2}
                    options={selectedProjectTasks.map(t => ({
                      value: t.name,
                      label: t.name
                    }))}
                  />
                </div>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "100px", marginLeft: "10px" }}>
                        <Form.Input
                          maxLength="5"
                          label="Date"
                          name="startMonthDay"
                          placeholder="MM/DD"
                          onChange={this.handleChange}
                          value={this.state.startMonthDay}
                        />
                        <Form.Input
                          maxLength="4"
                          label="Year"
                          name="year"
                          placeholder="YYYY"
                          onChange={this.handleChange}
                          value={this.state.year}
                        />
                      </div>
                      <div
                        style={{
                          width: "120px",
                          paddingLeft: "20px",
                          paddingRight: "0"
                        }}
                      >
                        <Form.Input
                          maxLength="5"
                          label="Start Time"
                          name="startHourMinute"
                          placeholder="HH:mm"
                          onChange={this.handleChange}
                          value={this.state.startHourMinute}
                        />
                      </div>
                      <div
                        style={{
                          width: "90px",
                          paddingLeft: "0",
                          paddingRight: "20px"
                        }}
                      >
                        <Form.Input
                          maxLength="2"
                          label="am/pm"
                          name="startAmPm"
                          placeholder="am"
                          onChange={this.handleChange}
                          value={this.state.startAmPm}
                        />
                      </div>
                      <div
                        style={{
                          width: "120px",
                          paddingLeft: "0",
                          paddingRight: "0"
                        }}
                      >
                        <Form.Input
                          maxLength="5"
                          label="End Time"
                          name="endHourMinute"
                          placeholder="HH:mm"
                          onChange={this.handleChange}
                          value={this.state.endHourMinute}
                        />
                      </div>
                      <div
                        style={{
                          width: "90px",
                          paddingLeft: "0",
                          paddingRight: "20px"
                        }}
                      >
                        <Form.Input
                          maxLength="2"
                          label="am/pm"
                          name="endAmPm"
                          placeholder="pm"
                          onChange={this.handleChange}
                          value={this.state.endAmPm}
                        />
                      </div>
                      <div style={{ width: "100px" }}>
                        <Form.Input
                          autoFocus
                          placeholder="hh.hh"
                          maxLength="5"
                          label="Hours"
                          name="hours"
                          onChange={this.handleChange}
                          value={this.state.hours}
                        />
                      </div>
                    </div>
                    <button
                      style={{
                        padding: "10px",
                        height: "150px",
                        width: "150px",
                        marginRight: "10px"
                      }}
                    >
                      <Icon name="clock" size="huge" style={{ margin: 0 }} />
                    </button>
                  </div>
                  <Checkbox
                    style={{ marginLeft: "20px", marginTop: "20px" }}
                    label="manually entered"
                    name="manualEnterCheckbox"
                  />
                </div>
              </Header>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default addTimeBlockButton;
