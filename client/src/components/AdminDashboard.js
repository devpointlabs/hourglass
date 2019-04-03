
import React from "react";
import axios from "axios";
import { Table, Header, Image } from "semantic-ui-react";

class hoursTable extends React.Component {
  state = { timeboards: [] };

    componentDidMount() {
        axios.get('/api/dashboard')
            .then( response => this.setState({timeboards: response.data}))
    }

    render() {
        return (
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Employee</Table.HeaderCell>
              <Table.HeaderCell>Total Hours</Table.HeaderCell>
              <Table.HeaderCell>Hourly Wage</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/images/avatar/small/lena.png' rounded size='mini' />
                  <Header.Content>
                    Lena
                    <Header.Subheader>Human Resources</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>$9.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/images/avatar/small/matthew.png' rounded size='mini' />
                  <Header.Content>
                    Matthew
                    <Header.Subheader>Fabric Design</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>15</Table.Cell>
              <Table.Cell>$9.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/images/avatar/small/lindsay.png' rounded size='mini' />
                  <Header.Content>
                    Lindsay
                    <Header.Subheader>Entertainment</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>12</Table.Cell>
              <Table.Cell>$9.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/images/avatar/small/mark.png' rounded size='mini' />
                  <Header.Content>
                    Mark
                    <Header.Subheader>Executive</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>11</Table.Cell>
              <Table.Cell>$9.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
          

export default hoursTable;
