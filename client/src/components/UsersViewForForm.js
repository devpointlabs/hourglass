import React from "react";
import { Segment, Button } from "semantic-ui-react";
import axios from "axios";

class UsersViewForForm extends React.Component {
  state = { assignment: {} };

  componentDidMount = () => {
    const { project_id, user } = this.props;
    axios
      .get(`/api/projects/${project_id}/users/${user.id}`)
      .then(res => this.setState({ assignment: res.data }));
    debugger;
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
