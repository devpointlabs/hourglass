import React from "react";
import {
  Modal,
  Menu
} from "semantic-ui-react";
import NewProject from './NewProject'
import NewTaskTable from './NewTaskTable'


class ModalForms extends React.Component {
  state = {
    modalOpen: false,
    modalOpen2: false,
    modalOpen3: false
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }
  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  openModal2 = () => {
    this.setState({ modalOpen2: true, modalOpen: false })
  }

  closeModal2 = () => {
    this.setState({ modalOpen2: false })
  }

  openModal3 = () => {
    this.setState({ modalOpen3: true, modalOpen2: false })
  }

  closeModal3 = () => {
    this.setState({ modalOpen3: false })
  }

  render() {

    return (
      <>
        <Menu style={{ marginTop: "0" }}>
          <Menu.Item onClick={() => this.handleOpen()}>Add New Project</Menu.Item>
        </Menu>
        <Modal
          open={this.state.modalOpen}
          onClose={() => this.handleClose()}
          centered={false} style={{ width: '700px' }}>
          <Modal.Header style={{ background: 'RebeccaPurple', color: 'white' }}>New Project</Modal.Header>
          <Modal.Content>
            <NewProject
              openModal2={this.openModal2}
              handleClose={this.handleClose}
            />
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.modalOpen2}
          onClose={() => this.closeModal2()}
          centered={false} style={{ width: '850px' }}>
          <Modal.Header style={{ background: 'RebeccaPurple', color: 'white' }}>Add Tasks</Modal.Header>
          <Modal.Content>
            <NewTaskTable
              closeModal2={this.closeModal2}
              openModal3={this.openModal3}
            />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default ModalForms;
