import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

export const Date = styled.div`
  width: 80px !important;
  height: 32px !important;
  font-size: 12px !important;
  margin: 4px;
  background-color: ${props => (props.isActive ? '#303f9f' : '#cecece')};
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const TaskCount = styled.span`
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => props.bgColor};
  margin: 4px;
`;

export const WeekHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DayHolder = styled.div`
  width: 80px;
  min-height: 32px;
  display: flex;
  cursor: pointer;
`;

export const WeekNumber = styled.div`
  width: 20%;
  text-align: center;
  align-self: center;
`;

export const StyledPaper = styled(Paper)`
  margin: 8px 8px 16px 8px;
  padding: 16px;
`;

export const DailyTaskContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const StatusPaper = styled(Paper)`
  padding: 16px;
`;

export const StatusChip = styled(Chip)`
  margin: 8px;
  background-color: 'green';
`;
