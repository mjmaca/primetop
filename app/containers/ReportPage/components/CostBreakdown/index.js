/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import { number } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { COST_BREAKDOWN_LEGEND, CHART_OPTIONS } from '../../constants';

import {
  StyledCostBreakdown,
  Title,
  ChartWrapper,
  ChartContainer,
  Doughnut,
  TableWrapper,
  LegendWrapper,
  Legend,
  LegendColor,
} from './styles';

function CostBreakdown(props) {
  const {
    total_material_cost,
    total_labor_cost,
    total_equipment_cost,
    estimated_material_cost,
    estimated_labor_cost,
    estimated_equipment_cost,
  } = props;

  const toMoneyFormat = num =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

  const data = {
    datasets: [
      {
        data: [total_material_cost, total_labor_cost, total_equipment_cost],
        backgroundColor: COST_BREAKDOWN_LEGEND.map(({ color }) => color),
      },
    ],
    labels: COST_BREAKDOWN_LEGEND.map(({ label }) => label),
  };

  useEffect(() => {
    // And for a doughnut chart
    // eslint-disable-next-line no-new
    new Chart('cost-breakdown', {
      type: 'doughnut',
      data,
      options: CHART_OPTIONS,
    });
  }, []);

  return (
    <StyledCostBreakdown>
      <Title>Cost Breakdown</Title>
      <ChartWrapper>
        <ChartContainer>
          <Doughnut>
            <canvas id="cost-breakdown" />
            <div className="title">Actual Cost</div>
          </Doughnut>
          <LegendWrapper>
            {COST_BREAKDOWN_LEGEND.map((legend, index) => (
              <Legend key={index}>
                <LegendColor color={legend.color} />
                {legend.label}
              </Legend>
            ))}
          </LegendWrapper>
        </ChartContainer>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <b>Actual</b>
                </TableCell>
                <TableCell>
                  <b>Estimated</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b>Total Material Cost</b>
                </TableCell>
                <TableCell>₱ {toMoneyFormat(total_material_cost)}</TableCell>
                <TableCell>
                  ₱ {toMoneyFormat(estimated_material_cost)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b>Total Labor Cost</b>
                </TableCell>
                <TableCell>₱ {toMoneyFormat(total_labor_cost)}</TableCell>
                <TableCell>₱ {toMoneyFormat(estimated_labor_cost)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b>Total Equipment Cost</b>
                </TableCell>
                <TableCell>₱ {toMoneyFormat(total_equipment_cost)}</TableCell>
                <TableCell>
                  ₱ {toMoneyFormat(estimated_equipment_cost)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </ChartWrapper>
    </StyledCostBreakdown>
  );
}

CostBreakdown.propTypes = {
  total_material_cost: number,
  total_labor_cost: number,
  total_equipment_cost: number,
  estimated_material_cost: number,
  estimated_labor_cost: number,
  estimated_equipment_cost: number,
};

export default CostBreakdown;
