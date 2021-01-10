import React from 'react';

import { useHistory } from 'react-router-dom';

import { FormButton, Container } from '../../theme';

import FormGroup from './form-group';
import ControlledInput from './controlled-input';

const defaultInputProps = {
  name: '',
  label: '',
  initialValue: '',
  placeholder: '',
  type: '',
  onChange: (r) => r,
};

const validationStrategy = {
  presence: (val) => !!val,
  minLength: (val, checkValue) =>
    typeof val === 'string' && val.length >= checkValue,
  maxLength: (val, checkValue) =>
    typeof val === 'string' && val.length <= checkValue,
};

const messageStrategy = {
  presence: () => 'Required field',
  minLength: (checkValue) => `Min length: ${checkValue}`,
  maxLength: (checkValue) => `Max length: ${checkValue}`,
};

const hasError = (input, value) => {
  if (!input.validate) return true;

  for (let i = 0; i < input.validate.length; i += 1) {
    let rule = input.validate[i];
    let checkValue;

    if (rule.includes(':')) {
      const splitted = rule.split(':');

      rule = splitted[0];
      checkValue = parseInt(splitted[1]);
    }

    if (!validationStrategy[rule](value, checkValue)) {
      return messageStrategy[rule];
    }
  }

  return '';
};

export default function FormBuilder({
  inputs = [],
  onSubmit = (t) => t,
  config = {
    backButton: true,
  },
}) {
  const [isLoading, onLoadChange] = React.useState(false);
  const [invalidFields, setInvalidFields] = React.useState([]);

  const history = useHistory();

  const inputsControl = inputs.map((props = defaultInputProps) => {
    const [value, onChange] = React.useState(props.initialValue);

    return [value, onChange];
  });

  return (
    <Container>
      <Container>
        {inputs.map((props = defaultInputProps, index) => {
          const [value, onChange] = inputsControl[index];

          const error =
            (value !== undefined && hasError(props, value)) ||
            invalidFields.includes(props.name);

          return (
            <FormGroup label={props.label} name={props.name} error={error}>
              <ControlledInput
                disabled={isLoading}
                key={props.name}
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                options={props.options}
                value={value}
                error={error}
                onChange={(t) => {
                  if (props.onChange) {
                    props.onChange(t);
                  }
                  onChange(t);
                }}
              />
            </FormGroup>
          );
        })}
      </Container>

      {config.backButton && (
        <FormButton
          theme="warning"
          disabled={isLoading}
          onClick={() => {
            history.goBack();
          }}
        >
          Voltar
        </FormButton>
      )}

      <FormButton
        type="submit"
        disabled={
          isLoading ||
          !inputs.reduce(
            (acc, elm = defaultInputProps, index) =>
              acc && !hasError(elm, inputsControl[index][0]),
            true
          )
        }
        onClick={() => {
          onLoadChange(true);

          onSubmit(
            inputs.reduce(
              (acc, elm = defaultInputProps, index) => ({
                ...acc,
                [elm.name]: inputsControl[index][0],
              }),
              {}
            )
          )
            .then(() => onLoadChange(false))
            .catch((data) => {
              setInvalidFields([data.invalid_field]);

              onLoadChange(false);
            });
        }}
      >
        {isLoading ? 'Carregando' : 'Entrar'}
      </FormButton>
    </Container>
  );
}
