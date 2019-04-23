import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";

class ProjectNavbar extends React.Component {
  state = { page: "budget", }

  setBudget = () => {
    const { setPage } = this.props;
    setPage("budget")
    this.setState({ page: "budget" })
  }

  setTasks = () => {
    const { setPage } = this.props;
    setPage("task")
    this.setState({ page: "tasks" })
  }

  setTeam = () => {
    const { setPage } = this.props;
    setPage("team")
    this.setState({ page: "team" })
  }

  render() {
    const { setPage } = this.props;
    return (
      <Menu style={{ marginTop: "0" }}>
        <Menu.Item
          style={{
            width: "110px",
            display: "flex",
            justifyContent: "center"
          }}
          active={this.state.page === "budget"}
          onClick={() => this.setBudget()}
        >
          Budget
        </Menu.Item>
        <Menu.Item
          name="tasks"
          style={{
            width: "110px",
            display: "flex",
            justifyContent: "center"
          }}
          active={this.state.page === "tasks"}
          onClick={() => this.setTasks()}
        >
          Tasks
        </Menu.Item>
        <Menu.Item
          style={{
            width: "110px",
            display: "flex",
            justifyContent: "center"
          }}
          active={this.state.page === "team"}
          onClick={() => this.setTeam()}
        >
          Team
        </Menu.Item>
      </Menu>
    );
  }
}

export class ConnectedProjectNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ProjectNavbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
export default withRouter(ConnectedProjectNavbar);
