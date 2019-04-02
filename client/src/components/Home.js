import React from 'react';
import { Header, } from 'semantic-ui-react';
import { AuthConsumer } from '../providers/AuthProvider'

class Home extends React.Component {
  render() {
    const { admin } = this.props.auth.user

    if (admin)
      return (
        <Header as="h3" textAlign="center">Hour Glass, Hello Admin!</Header>
      )
    else
      return (
        <div>Not an admin</div>
      )
  }
}

export default class ConnectedHome extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Home {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}
