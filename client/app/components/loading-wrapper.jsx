import React from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Subtitle, Title, FormButton, Row, Column } from '../theme';

const LoadingWrapper = ({
  loading,
  error = {},
  data = {},
  children,
  loadingMessage = 'Loading...',
  errorMessage = 'Request Error.',
}) => {
  const history = useHistory();

  if (loading) {
    return (
      <Container>
        <Row direction="column">
          <Subtitle align="center">{loadingMessage}</Subtitle>
        </Row>
      </Container>
    );
  }

  if ((error && error.message) || data.message) {
    return (
      <Container>
        <Row direction="column">
          <Column>
            <Title theme="danger">{errorMessage}</Title>
          </Column>

          <Column>
            <Subtitle>{error.message || data.message}</Subtitle>
          </Column>

          <Column>
            <FormButton
              theme="warning"
              disabled={loading}
              onClick={() => history.goBack()}
            >
              Back
            </FormButton>
          </Column>
        </Row>
      </Container>
    );
  }

  return children;
};

export default LoadingWrapper;
