import React from 'react';
import moment from 'moment';
import { get } from 'lodash';

import useFetchUser from '../../hooks/users/useFetchUser';

import { Container, Row, Column, Title, NavigateButton } from '../../theme';

import LoadingWrapper from '../../components/loading-wrapper';

const formatGenre = (genreCode) => {
  switch (genreCode) {
    case 'M':
      return 'Male';
    case 'F':
      return 'Female';
    default:
      return 'Not Informed';
  }
};

const formatBirth = (date) => {
  const age = moment().diff(date, 'years');

  return `${moment(date).format('DD/MM/YYYY')}, ${age} ${
    age > 1 ? 'years' : 'year'
  } old.`;
};

const UsersShow = ({ userid }) => {
  const { response, loading, error } = useFetchUser(userid, true);

  return (
    <LoadingWrapper loading={loading} error={error} data={response}>
      <Container>
        <Row direction="column">
          <Column>
            <Title>User View:</Title>
          </Column>

          <Column>
            <Column>Name: {get(response, ['data', 'name'])}</Column>

            <Column>E-mail: {get(response, ['data', 'email'])}</Column>

            <Column>
              Genre: {formatGenre(get(response, ['data', 'gender']))}
            </Column>

            <Column>
              Birthdate: {formatBirth(get(response, ['data', 'birthdate']))}
            </Column>
          </Column>

          <Column>
            <NavigateButton theme="warning" to={`/users`}>
              Back
            </NavigateButton>

            <NavigateButton theme="info" to={`/user/${userid}/edit`}>
              Edit
            </NavigateButton>

            <NavigateButton theme="danger" to={`/user/${userid}/delete`}>
              Delete
            </NavigateButton>
          </Column>
        </Row>
      </Container>
    </LoadingWrapper>
  );
};

export default UsersShow;
