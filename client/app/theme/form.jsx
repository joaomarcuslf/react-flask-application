import styled from 'styled-components';

import colors from './configs/colors.json';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) => {
    if (props.error) {
      return `
        font-weight: 500;
        color: ${colors.danger};
      `;
    } else {
      return `
        font-weight: 400;
        color: ${colors.dark};
      `;
    }
  }}
`;

export const FormInput = styled.input`
  border: none;
  background: transparent;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;

  width: 100%;

  transition: border-bottom 0.5s ease;
  transition: background 0.5s ease;

  ${(props) => {
    if (props.error) {
      return `
        background: ${colors.danger}88;
        border-bottom: 2px solid ${colors.danger}EE;
        font-weight: 500;
        color: ${colors.primary};

        :focus {
          border-bottom: 2px solid ${colors.danger};
          transition: border-bottom 0.5s ease;
        }
      `;
    } else {
      return `
        background: ${colors.light};
        border-bottom: 2px solid ${colors.primary}CA;
        font-weight: 400;
        color: ${colors.dark};

        :focus {
          border-bottom: 2px solid ${colors.dark};
          transition: border-bottom 0.5s ease;
        }
      `;
    }
  }}
`;

export const FormSelect = styled.select`
  border: none;
  background: transparent;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;

  width: 100

  transition: border-bottom 0.5s ease;
  transition: background 0.5s ease;

  ${(props) => {
    if (props.error) {
      return `
        background: ${colors.danger}88;
        border-bottom: 2px solid ${colors.danger}EE;
        font-weight: 500;
        color: ${colors.primary};

        :focus {
          border-bottom: 2px solid ${colors.danger};
          transition: border-bottom 0.5s ease;
        }
      `;
    } else {
      return `
        background: ${colors.light};
        border-bottom: 2px solid ${colors.primary}CA;
        font-weight: 400;
        color: ${colors.dark};

        :focus {
          border-bottom: 2px solid ${colors.dark};
          transition: border-bottom 0.5s ease;
        }
      `;
    }
  }}
`;

export const ExternalButton = styled.a`
  background: ${(props) =>
    props.isDanger
      ? colors.danger
      : colors[props.background] || colors.success};
  border: none;
  color: ${colors.light};
  opacity: ${(props) => (props.disabled ? '.3' : '.9')};
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  height: 3rem;
  width: ${(props) => props.width || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0.25rem 0'};

  transition: opacity 0.5s ease;

  :hover {
    opacity: ${(props) => (props.disabled ? '.3' : '1')};
    transition: opacity 0.5s ease;
    color: ${colors.light};
  }
`;

export const FormButton = styled.button`
  background: ${(props) =>
    props.isDanger ? colors.danger : colors[props.theme] || colors.success};
  border: none;
  color: ${colors.light};
  opacity: ${(props) => (props.disabled ? '.3' : '.9')};
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  height: 3rem;
  width: ${(props) => props.width || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0.25rem 0'};

  transition: opacity 0.5s ease;

  :hover {
    opacity: ${(props) => (props.disabled ? '.3' : '1')};
    transition: opacity 0.5s ease;
  }
`;
