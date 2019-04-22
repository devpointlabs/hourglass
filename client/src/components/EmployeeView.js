import React, { useState, useEffect } from "react";
import axios from "axios";
import { Segment, Header, Image, Divider, Table } from "semantic-ui-react";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

const Employee = props => {
  const [projects, setProjects] = useState([]);
  const [timeblocks, setTimeblocks] = useState([]);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const { id } = props;
    axios.get(`/api/users/${id}/projects`).then(res => setProjects(res.data));
    axios.get(`/api/users/${id}/timeblocks`).then(res => {
      setTimeblocks(res.data);
    });
    axios.get(`/api/users/${id}`).then(res => setUser(res.data));
    axios.get(`/api/users/${id}/tasks`).then(res => {
      setTasks(res.data);
    });
    axios.get(`/api/users/${id}/weekly_project_hours`).then(res => {
      setHours(res.data);
    });
  }, []);

  const totals = () => {
    return hours.map(hour => <div>{hour.weekly_project_hours}</div>);
  };

  return (
    <>
      <Segment>
        <Image circular size='medium' centered src={user.image || defaultImage} />
        <Header textAlign="center">{user.name}</Header>
      </Segment>
      <Header as="h1" textAlign="center">
        <Header.Content>Hours This Week</Header.Content>
        <Header.Subheader>{totals()}</Header.Subheader>
      </Header>
      <Divider />
      <Table celled compact stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Project</Table.HeaderCell>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell>Task</Table.HeaderCell>
            <Table.HeaderCell>Hours</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map(task => (
            <Table.Row>
              <Table.Cell>{task.project_name}</Table.Cell>
              <Table.Cell>{task.client_name}</Table.Cell>
              <Table.Cell>{task.task_name}</Table.Cell>
              <Table.Cell>{task.total_task_hours}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

class EmployeeProps extends React.Component {
  state = {
    user_id: this.props.match.params.id,
    task: {}
  };

  render() {
    return <Employee id={this.state.user_id} />;
  }
}

export default EmployeeProps;
