import React from 'react';
import axios from 'axios';
import { Card, Grid, CardMeta, GridColumn,  } from 'semantic-ui-react';


class Projects extends React.Component{
  state = { projects: [] }

componentDidMount() {
  axios.get('/api/projects')
    .then(res => this.setState({ projects: res.data}))
}

showProjects = () => {
  return this.state.projects.map(p => (
    <div style={{ padding: '30px', border: '3px solid grey', margin: '5px 5px 5px 5px' }}>
    <Card>
      <Card.Header
        style={{
          fontSize: "20px",
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {p.name}
      </Card.Header>
      <CardMeta style={{
          fontSize: "20px",
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {p.client_name}
      </CardMeta>
      <Card.Description
        style={{
          fontSize: "20px",
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {p.notes}
      </Card.Description>
    </Card>
    </div>
  ) )
}

  render(){
    return(
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column columns={4} style={{marginTop: "30px"}}>
              <Card.Group>
                {this.showProjects()}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default Projects
