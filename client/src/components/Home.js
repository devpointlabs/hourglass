import React from 'react';
import { Header, } from 'semantic-ui-react';
import StopWatch from './StopWatch'

const Home = () => (
  <>
  <Header as="h3" textAlign="center">Hour Glass, Get er Done</Header>
  <StopWatch />
  </>
)

export default Home;