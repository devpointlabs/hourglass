import React from "react";
import { Button, Table } from "semantic-ui-react";
import axios from "axios";

class UsersViewForForm extends React.Component {
  state = { assignment: {} };

  componentDidMount = () => {
    const { project_id, user } = this.props;
    axios.get(`/api/projects/${project_id}/users/${user.id}`).then(res => {
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
      <Table.Row>
        <Table.Cell>{this.props.user.name}</Table.Cell>
        <Table.Cell>
          <Button
            circular
            size="mini"
            color="red"
            icon="times"
            onClick={() => this.handleDelete(this.props.user.id)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default UsersViewForForm;
