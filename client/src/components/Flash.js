import React, { Component } from 'react'
import { AuthConsumer } from '../providers/AuthProvider'
import { Message, Container, Header, Button, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Flash extends Component {
    state = {showModal: true,}

    componentDidUpdate(prevProps) {
        const { location: prevLocation, auth: { flash: prevFlash } } = prevProps
        const { location, auth: { flash }, } = this.props

        const prevMessage = prevFlash.message
        const prevUrl = prevLocation.pathname
        const currentMessage = flash.message
        const currentUrl = location.pathname

        if (prevMessage && prevMessage === currentMessage) {
            if (prevUrl !== currentUrl) {
                clearTimeout(this.flashTimeout)
                this.props.auth.clearFlash()
            }
        }
    }

    fadeFlash = () => {
        setTimeout(() => {
            this.props.auth.clearFlash()
        }, 5000)
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModals})
    }

    render() {
        const { auth: { flash: { message, color, fade, }, clearFlash } } = this.props
        if (message) {
            return (
                <Container style={{ marginBottom: '40px', }}>
                    <Modal
                    open={this.state.showModal}
                    onClose={() => this.toggleModal()}
                    >
                        <Modal.Content>
                            <Message
                                onDismiss={() => clearFlash()}
                                color={color ? color : 'grey'}
                            >
                                <Header as='h5' textAlign='center'>{message}</Header>
                                {fade && this.fadeFlash()}
                            </Message>
                        </Modal.Content>
                    </Modal>
                </Container>
            )
        }
        return null
    }
}

const ConnectedFlash = (props) => (
    <AuthConsumer>
        {auth =>
            <Flash {...props} auth={auth} />
        }
    </AuthConsumer>
)

export default withRouter(ConnectedFlash)