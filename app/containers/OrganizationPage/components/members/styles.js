import styled from 'styled-components';

export const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${props => props.color};
  border-radius: 100%;
  margin-right: 4px;
`;
