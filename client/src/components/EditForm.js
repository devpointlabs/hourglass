import React from 'react'
import {Form, Button, Header, Segment, } from 'semantic-ui-react'
import {AuthConsumer, } from "../providers/AuthProvider"

class EditForm extends React.Component {
    state = {email: '', password: '', passwordConfirmation: ''}

    handleChange = (e, {name, value}) => {
        // const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        const { email, password, passwordConfirmation } = this.state;
        const {
          auth: { handleRegister },
          history
        } = this.props;
    
        if (password === passwordConfirmation)
          handleRegister({ email, password, passwordConfirmation }, history);
        else 
            alert("Passwords Do Not Match!");
      };

    render() {
        const {email, password, passwordConfirmation, } = this.state
        return (
            <Segment>
                <Header as="h1">Edit Your Settings</Header>
                <Form>
                    <Form.Input
                        label="New Email"
                        autoFocus
                        required
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange} 
                    />
                    <Form.Input
                        label="New Password"
                        required
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange} 
                    />
                    <Form.Input
                        label="Confirm New Password"
                        required
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        placeholder="Confirm Password"
                        onChange={this.handleChange} 
                    />
                    <Segment textAlign="center">
                        <Button primary type='submit' color='purple' >Submit</Button>
                    </Segment>
                </Form>
            </Segment>
        )
    }
}

export default class ConnectedEditForm extends React.Component {
    render() {
        return (
            <AuthConsumer>
                { auth => <EditForm { ...this.props } auth={auth} />}
            </AuthConsumer>
        )
    }
}

// account_ for update.
