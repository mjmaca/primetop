import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export const Loading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .MuiCircularProgress-root {
    margin-bottom: 16px;
    color: #3f51b5 !important;
  }
`;

export const StyledReports = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 16px;
`;

export const FinancialReportSummary = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Summary = styled.div`
  display: flex;
  flex-grow: 1;

  margin: 16px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 4px 1px #ddd;
  position: relative;

  .title {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const SummaryItem = styled.div`
  height: 140px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    > div {
      border: none;
    }
  }
`;

export const SummaryWrapper = styled.div`
  width: 100%;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

export const Label = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  svg {
    margin-left: 4px;
  }
`;

export const NumberCurrency = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;

export const GraphWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
`;

export const GraphItem = styled.div`
  min-width: 400px;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 16px;
`;

export const StyledButton = withStyles(() => ({
  root: {
    width: 120,
    borderRadius: 4,
    fontSize: 10,
    textTransform: 'none',
    fontWeight: 'normal',
    color: props => (props.variant === 'contained' ? '#fff' : '#BF0E08'),
    backgroundColor: props => (props.variant === 'contained' ? '#BF0E08' : ''),
    borderColor: '#BF0E08',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#EC4C47',
    },
  },
  disabled: {
    backgroundColor: `#eaeaea`,
  },
}))(Button);

export const StyledTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 12,
    padding: 10,
    textAlign: 'center',
  },
  arrow: {
    color: '#000',
  },
}))(Tooltip);
