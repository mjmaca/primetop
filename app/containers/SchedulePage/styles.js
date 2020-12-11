import styled from 'styled-components';

export const LegendStatus = styled.div`
  display: inline-flex;
  padding: 4px;
  font-size: 13px;
  align-items: center;
`;

export const LegendDots = styled.div`
  background-color: ${props => props.color};
  border-radius: 25px;
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;
