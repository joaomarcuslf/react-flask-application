import React from 'react';
import { Link } from 'react-router-dom';

import { get } from 'lodash';

import useFetchUsers from '../../hooks/users/useFetchUsers';

import { Container, Row, Column, Subtitle, Title } from '../../theme';

import LoadingWrapper from '../../components/loading-wrapper';

const UsersList = () => {
  const { response, loading, error } = useFetchUsers(true);

  return (
    <LoadingWrapper loading={loading} error={error} data={response}>
      <Container>
        <Row direction="column">
          <Column>
            <Title theme="dark">Users List:</Title>
          </Column>

          <Column>
            {get(response, ['data', 'length'], 0) ? (
              <Subtitle>
                {response.data.map((user) => (
                  <Row key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                  </Row>
                ))}
              </Subtitle>
            ) : (
              <Subtitle align="center">No user found.</Subtitle>
            )}
          </Column>
        </Row>
      </Container>
    </LoadingWrapper>
  );
};

export default UsersList;
