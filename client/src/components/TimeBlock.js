import React from 'react';
import { Table, Header, Image } from 'semantic-ui-react';
import StopWatch from './StopWatch'

const TimeBlock = () => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4' image>
        <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
        <Header.Content>
          Project Name
          <Header.Subheader>Team Name</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>1</Table.Cell>
    <Table.Cell>2</Table.Cell>
    <Table.Cell>3</Table.Cell>
    <Table.Cell>4</Table.Cell>
    <Table.Cell>5</Table.Cell>
    <Table.Cell>6</Table.Cell>
    <StopWatch />
  </Table.Row>
)

export default TimeBlock;