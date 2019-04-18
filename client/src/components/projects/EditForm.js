import React, { Fragment } from "react";
import {
  Form,
  Button,
  Header,
  Icon,
  Card,
  Grid,
  List,
  Label,
  Divider,
  Container,
  Image
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class EditForm extends React.Component {
  state = {
    editing: false,
    formValues: {
      name: "",
      nickname: "",
      email: "",
      file: ""
    },
    projects: []
  };

  componentDidMount() {
    const {
      auth: {
        user: { name, nickname, email }
      }
    } = this.props;
    this.setState({
      formValues: { name, nickname, email }
    });
    axios
      .get(`/api/users/${this.props.auth.user.id}/projects`)
      .then(response => this.setState({ projects: response.data }));
  }

  toggleEdit = () => {
    this.setState(state => {
      return { editing: !this.state.editing };
    });
  };

  onDrop = files => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0] } });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    });
  };

  profileView = () => {
    const {
      auth: { user }
    } = this.props;
    return (
      <Fragment>
        <br />
        <Card>
          <Label
            style={{
              background: "RebeccaPurple",
              color: "white",
              transform: "translate(1.2em, 0)"
            }}
            ribbon
          >
            {user.email}
          </Label>
          <Image src={user.image || defaultImage} />
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>{user.nickname}</Card.Meta>
          </Card.Content>
        </Card>
      </Fragment>
    );
  };

  editView = () => {
    const {
      formValues: { name, nickname, email }
    } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        widths="equal"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid.Column mobile={1} width={4} style={{ margin: "2em" }}>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div {...getRootProps()} style={styles.dropzone}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop files here...</p>
                  ) : (
                    <p>Select a file</p>
                  )}
                </div>
              );
            }}
          </Dropzone>
        </Grid.Column>
        <Grid.Column stackable mobile={1} width={8}>
          <Mobile>
            <Form.Input
              label="New Email"
              autoFocus
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Form.Input
              label="New Name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
            <Form.Input
              label="New Nickname"
              name="nickname"
              value={nickname}
              placeholder="Nickname"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              animated="fade"
              style={{ background: "RebeccaPurple", color: "white" }}
            >
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name="cloud upload" />
              </Button.Content>
            </Button>
            <br />
            <br />
          </Mobile>
        </Grid.Column>
      </Form>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      formValues: {
        name,
        email,
        file,
        password,
        passwordConfirmation,
        nickname
      }
    } = this.state;
    const {
      auth: { user, handleEdit }
    } = this.props;
    handleEdit(user.id, {
      name,
      file,
      email,
      nickname,
      password,
      passwordConfirmation
    });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: ""
      }
    });
  };

  render() {
    const {
      auth: { handleLogout, user }
    } = this.props;
    const { editing } = this.state;
    if (user)
      return (
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Divider hidden />
          <Mobile>
            {editing ? this.editView() : this.profileView()}
            <Button.Group attached="bottom">
              <Button
                onClick={this.toggleEdit}
                style={{ background: "RebeccaPurple", color: "white" }}
              >
                {editing ? "Cancel" : "Edit"}
              </Button>
              <Button.Or />
              <Button onClick={() => handleLogout(this.props.history)}>
                Logout
              </Button>
            </Button.Group>
            <br />
            <div>
              <Header textAlign="center">Current Projects</Header>
              <Divider />
              <List textAlign="center" link>
                {this.state.projects.map(project => (
                  <List.Item as={Link} to={`/projects/${project.id}`}>
                    {project.name} - {project.client_name}
                  </List.Item>
                ))}
              </List>
            </div>
          </Mobile>
        </Container>
      );
    else return <div>nothing</div>;
  }
}

const styles = {
  dropzone: {
    height: "150px",
    width: "100px",
    border: "1px dashed black",
    borderRadius: "flex",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  }
};

export default class ConnectedEditForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <EditForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

const Mobile = styled.div`
  @media (max-width: 550px) {
    width: 50%;
  }
`;
