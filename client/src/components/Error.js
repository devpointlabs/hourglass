import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import styled from 'styled-components'
import { Icon, } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const Error = ({ location: { pathname } }) => {
  const context = useContext(AuthContext)
  const { errors, clearErrors, } = context
  useEffect(() => {
    if (errors.length !== 0) {
      clearErrors()
    }
  }, [pathname])

  if (errors.length !== 0) {
    return (
      <PageContainer>
        {errors.map((e, i) => (
          <ErrorMessage key={i}>
            <Icon name='close' />
            <span>{e}</span>
          </ErrorMessage>
        ))}
      </PageContainer>
    )
  } else {
    return null
  }
}

const ErrorMessage = styled.p`
  color: #b3001b;
  line-height: 1;
`

const PageContainer = styled.div`
  @media (max-width: 1380px) {
    margin: 40px 200px;
  }
  @media (max-width: 900px) {
    margin: 40px 100px;
  }
  margin: 40px 370px;
`

export default withRouter(Error)