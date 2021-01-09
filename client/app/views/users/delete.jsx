import React from 'react';

import { useHistory } from 'react-router-dom';

import useRemoveUser from '../../hooks/users/useRemoveUser';

import {
  Container,
  Row,
  Column,
  Title,
  Subtitle,
  FormButton,
} from '../../theme';

import LoadingWrapper from '../../components/loading-wrapper';

const UsersShow = ({ userid }) => {
  const { response, loading, error, thrigger } = useRemoveUser(userid, false);
  const history = useHistory();

  return (
    <LoadingWrapper loading={loading} error={error} data={response}>
      <Container>
        <Row direction="column">
          <Column>
            <Title>Are you sure you want to remove this use?</Title>

            <Column>
              <Subtitle theme="danger">This action cannot be undone!</Subtitle>
            </Column>
          </Column>

          <Column>
            <FormButton
              theme="warning"
              disabled={loading}
              onClick={() => history.goBack()}
            >
              Cancel
            </FormButton>

            <FormButton
              theme="danger"
              disabled={loading}
              onClick={() => {
                thrigger().then(() => history.push('/users'));
              }}
            >
              Confirm
            </FormButton>
          </Column>
        </Row>
      </Container>
    </LoadingWrapper>
  );
};

export default UsersShow;
