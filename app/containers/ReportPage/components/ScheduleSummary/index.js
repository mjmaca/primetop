/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import { connect } from 'react-redux';
import { array } from 'prop-types';

import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';

import { SCHEDULE_LEGEND, CHART_OPTIONS } from '../../constants';

import {
  StyledScheduleSummary,
  Title,
  ChartWrapper,
  ChartContainer,
  LegendWrapper,
  Legend,
  LegendColor,
} from './styles';

function ScheduleSummary(props) {
  const { schedules } = props;

  const data = {
    datasets: [
      {
        data: SCHEDULE_LEGEND.map(({ key }) =>
          schedules
            .map(({ status, duration }) => (status === key ? duration : 0))
            .reduce((total, duration) => (total += duration), 0),
        ),
        backgroundColor: SCHEDULE_LEGEND.map(({ color }) => color),
      },
    ],
    labels: SCHEDULE_LEGEND.map(({ label }) => label),
  };

  useEffect(() => {
    // And for a doughnut chart
    // eslint-disable-next-line no-new
    new Chart('schedule-summary', {
      type: 'doughnut',
      data,
      options: CHART_OPTIONS,
    });
  }, []);

  return (
    <StyledScheduleSummary>
      <Title>Schedule Status Summary</Title>
      <ChartWrapper>
        <ChartContainer>
          <canvas id="schedule-summary" />
        </ChartContainer>
        <LegendWrapper>
          {SCHEDULE_LEGEND.map((legend, index) => (
            <Legend key={index}>
              <LegendColor color={legend.color} />
              {legend.label}
            </Legend>
          ))}
        </LegendWrapper>
      </ChartWrapper>
    </StyledScheduleSummary>
  );
}

ScheduleSummary.propTypes = {
  schedules: array,
};

const mapStateToProps = state => {
  const {
    [SCHEDULE]: {
      schedule: { data: schedules },
    },
  } = state;

  return {
    schedules,
  };
};

export default connect(
  mapStateToProps,
  null,
)(ScheduleSummary);
