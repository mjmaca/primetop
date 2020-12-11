import styled from 'styled-components';

export const StyledCostBreakdown = styled.div``;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 24px;
`;

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const Doughnut = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  .title {
    position: absolute;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const TableWrapper = styled.div`
  flex-grow: 1;
`;

export const LegendWrapper = styled.div`
  margin-top: 16px;
  width: 150px;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 4px 0px;
`;

export const LegendColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 4px;
`;
