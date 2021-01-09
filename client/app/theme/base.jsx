import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from './configs/colors.json';
import fonts from './configs/fonts.json';
import sizes from './configs/sizes.json';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  flex-wrap: wrap;
  justify-content: align-center;
  padding: ${(props) => props.padding || '.5rem'};

  :first-child {
    padding-top: 0;
  }

  :last-child {
    padding-bottom: 0;
  }
`;

export const Column = styled.div`
  flex: 1;
  padding: 0.5rem;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: ${sizes.sizeLarge};
  font-family: ${fonts.familyPrimary};
  color: ${(props) => colors[props.theme] || props.color || colors.dark};
  text-align: ${(props) => props.align || 'start'};
`;

export const Subtitle = styled.h3`
  width: 100%;
  font-size: ${sizes.sizeMedium};
  font-family: ${fonts.familyPrimary};
  color: ${(props) => colors[props.theme] || props.color || colors.dark};
  text-align: ${(props) => props.align || 'start'};
`;

export const NavigateButton = styled(Link)`
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
  text-decoration: none;

  transition: opacity 0.5s ease;

  :hover {
    opacity: ${(props) => (props.disabled ? '.3' : '1')};
    transition: opacity 0.5s ease;
    color: ${colors.light};
  }
`;
