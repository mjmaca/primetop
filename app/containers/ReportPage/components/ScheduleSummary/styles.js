import styled from 'styled-components';

export const StyledScheduleSummary = styled.div``;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const ChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-right: 32px;
`;

export const LegendWrapper = styled.div`
  width: 150px;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 8px 0px;
`;

export const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid ${props => props.color};
  background-color: #fff;
  border-radius: 50%;
  margin-right: 4px;
`;
