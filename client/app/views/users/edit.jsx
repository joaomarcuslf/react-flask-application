import React from 'react';

import { useHistory } from 'react-router-dom';

import { get } from 'lodash';

import useFetchUser from '../../hooks/users/useFetchUser';
import useUpdateUser from '../../hooks/users/useUpdateUser';

import { Container, Row, Column, Title } from '../../theme';

import FormBuilder from '../../components/form/form-builder';

import LoadingWrapper from '../../components/loading-wrapper';

const UsersEdit = ({ userid }) => {
  const { response, loading, error } = useFetchUser(userid, true);
  const updateHook = useUpdateUser(userid);
  const history = useHistory();
  /*
    "name": "User 2",
    "id": 4,
    "gender": "M",
    "birthdate": "2000-02-2"
  */

  return (
    <LoadingWrapper
      loading={loading}
      error={error}
      data={response || updateHook.response}
    >
      <Container>
        <Row direction="column">
          <Column>
            <Title>Edit User:</Title>
          </Column>

          <Column>
            <FormBuilder
              inputs={[
                {
                  type: 'text',
                  name: 'name',
                  label: 'Name',
                  placeholder: 'Fill with your name',
                  validate: ['presence'],
                  initialValue: get(response, ['data', 'name']),
                },
                {
                  type: 'text',
                  name: 'email',
                  label: 'E-mail',
                  placeholder: 'Fill with your email',
                  validate: ['presence'],
                  initialValue: get(response, ['data', 'email']),
                },
                {
                  type: 'calendar',
                  name: 'birthdate',
                  label: 'Birthdate',
                  placeholder: 'Fill with your birthdate',
                  validate: ['presence'],
                  initialValue: get(response, ['data', 'birthdate']),
                },
                {
                  type: 'select',
                  options: [
                    { value: 'M', text: 'Male' },
                    { value: 'F', text: 'Female' },
                    { value: 'N', text: 'Other' },
                  ],
                  name: 'gender',
                  label: 'Gender',
                  placeholder: 'Fill with your gender',
                  validate: ['presence'],
                  initialValue: get(response, ['data', 'gender']),
                },
              ]}
              onSubmit={(body) =>
                updateHook.thrigger(body).then((response) => {
                  if (response.status === 'error') {
                    throw response;
                  }

                  history.push(`/user/${response.data.id}`);
                })
              }
            />
          </Column>
        </Row>
      </Container>
    </LoadingWrapper>
  );
};

export default UsersEdit;
