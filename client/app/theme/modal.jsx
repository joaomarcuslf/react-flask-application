import styled from 'styled-components';

import colors from './configs/colors.json';
import sizes from './configs/sizes.json';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: ${(props) => (props.isOpen ? '100vw' : '')};
  height: ${(props) => (props.isOpen ? '100vh' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(50, 50, 50, 0.2);
`;

export const ModalView = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;

  background: #f1f1f1;
  z-index: 1;

  border-radius: 5p;

  ${(props) => {
    switch (props.size) {
      case 'large':
        return `
          max-width: 80vw;
          max-height: 80vh;
        `;
      case 'medium':
        return `
          max-width: 70vw;
          max-height: 70vh;
        `;
      case 'small':
      default:
        return `
          max-width: 50vw;
          max-height: 50vh;
        `;
    }
  }}

  ${(props) => (props.width ? `width: ${props.width};` : '')}
`;

export const ModalTitle = styled.h2`
  background: #e1e1e1;
  border-bottom: 2px solid ${colors.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  width: 100%;
  padding: 15px;
  font-size: ${sizes.sizeMedium};
`;

export const ModalAction = styled.button`
  margin: 0 .25rem;
  background: transparent;
  border: none;
  color: ${(props) => (props.isError ? colors.danger : colors.dark)};
  color: ${(props) => (props.isError ? colors.danger : colors.dark)};
  opacity: ${(props) => (props.disabled ? '.3' : '1')};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const ModalContent = styled.div`
  padding: 15px;
  font-size: ${sizes.sizeMedium};
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;
