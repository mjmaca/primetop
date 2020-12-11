import styled from 'styled-components';

export const Preview = styled.div`
  width: 50%;
  height: 300px;
  border-radius: 4px;
  cursor: pointer;

  background: ${props => (props.url ? `url(${props.url})` : '#fafafa')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const EmptyHolder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
