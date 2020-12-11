import styled from 'styled-components';

export const success = '#47B881';
export const warning = '#D9822B';

export const Legends = styled.div`
  display: flex;
  margin-top: 32px;
`;

export const Legend = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  &:before {
    content: ' ';
    width: 16px;
    height: 16px;
    display: block;
    background-color: ${props => props.color};
    border: 1px solid #66788a;
    margin-right: 8px;
  }
`;
