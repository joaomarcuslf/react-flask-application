import React from 'react';
import { FormInput, FormSelect } from '../../theme';

const DefaultInput = ({
  placeholder = 'Placeholder',
  value = '',
  onChange = (t) => t,
  error = '',
  disabled = false,
  name = '',
}) => {
  return (
    <FormInput
      onFocus={() => {
        if (value === placeholder) {
          onChange('');
        }
      }}
      onBlur={() => {
        if (value === '') {
          onChange(placeholder);
        }
      }}
      onChange={(evt) => onChange(evt.target.value)}
      value={value}
      error={error}
      disabled={disabled}
      name={name}
    />
  );
};

const CalendarInput = ({
  value = '',
  onChange = (t) => t,
  error = '',
  disabled = false,
  name = '',
}) => {
  return (
    <FormInput
      onChange={(evt) => onChange(evt.target.value)}
      value={value}
      error={error}
      disabled={disabled}
      name={name}
      type="date"
    />
  );
};

const SelectInput = ({
  value = '',
  onChange = (t) => t,
  error = '',
  disabled = false,
  name = '',
  options = [],
}) => {
  return (
    <FormSelect
      onChange={(evt) => onChange(evt.target.value)}
      value={value}
      error={error}
      disabled={disabled}
      name={name}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </FormSelect>
  );
};

export default function ControlledInput({
  placeholder = 'Placeholder',
  value = '',
  onChange = (t) => t,
  error = '',
  disabled = false,
  name = '',
  type,
  options,
}) {
  const [inputValue, onChangeText] = React.useState(value || placeholder);

  switch (type) {
    case 'calendar':
      return (
        <CalendarInput
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          onChange={(text) => {
            if (text === placeholder) {
              onChange(value);
            } else {
              onChange(text);
            }

            return onChangeText(text);
          }}
        />
      );
    case 'select':
      return (
        <SelectInput
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          options={options}
          onChange={(text) => {
            if (text === placeholder) {
              onChange(value);
            } else {
              onChange(text);
            }

            return onChangeText(text);
          }}
        />
      );
    case 'text':
    default:
      return (
        <DefaultInput
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          onChange={(text) => {
            if (text === placeholder) {
              onChange(value);
            } else {
              onChange(text);
            }

            return onChangeText(text);
          }}
        />
      );
  }
}
