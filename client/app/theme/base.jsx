import styled from "styled-components";

import colors from "./configs/colors.json";
import fonts from "./configs/fonts.json";
import sizes from "./configs/sizes.json";

export const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: wrap;
  justify-content: align-center;
  padding: ${(props) => props.padding || ".5rem"};

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
  text-align: ${(props) => props.align || "start"};
`;

export const Subtitle = styled.h3`
  width: 100%;
  font-size: ${sizes.sizeMedium};
  font-family: ${fonts.familyPrimary};
  color: ${(props) => colors[props.theme] || props.color || colors.dark};
  text-align: ${(props) => props.align || "start"};
`;
