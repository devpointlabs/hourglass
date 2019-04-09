import React from "react";
import { Segment, Button } from "semantic-ui-react";
import axios from "axios";

class UsersViewForForm extends React.Component {
  state = { assignment: {} };

  componentDidMount = () => {
    const { project_id, user } = this.props;
    axios.get(`/api/projects/${project_id}/users/${user.id}`).then(res => {
      debugger;
      this.setState({ assignment: res.data });
    });
  };

  handleDelete = () => {
    const { user } = this.props;
    const { project_id, deleteTeamMember } = this.props;
    const { assignment } = this.state;
    axios.delete(`/api/projects/${project_id}/assignments/${assignment.id}`);
    deleteTeamMember(user.id);
  };

  render() {
    return (
      <>
        {" "}
        <Segment>
          <Button
            style={{ borderRadius: "100%" }}
            color="red"
            icon="times"
            onClick={() => this.handleDelete(this.props.user.id)}
          />
          {this.props.user.name}
        </Segment>
      </>
    );
  }
}

export default UsersViewForForm;
