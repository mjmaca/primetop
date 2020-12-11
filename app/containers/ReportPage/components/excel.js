/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import XLSX from 'xlsx';
import { isEmpty } from 'lodash';

import { SCHEDULE_LEGEND } from '../constants';

export default props => {
  const {
    project,
    schedules,
    total_project_cost,
    total_estimated_cost,
    total_actual_cost,
    total_savings,
    total_profit,
    total_material_cost,
    total_equipment_cost,
    estimated_material_cost,
    estimated_equipment_cost,
  } = props;

  const toMoneyFormat = num =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

  const schedule_breakdown = [];

  SCHEDULE_LEGEND.forEach(({ key, label }) => {
    const items = schedules.filter(({ status }) => status === key);
    schedule_breakdown.push([label]);

    if (!isEmpty(items)) {
      items.forEach(({ text, duration }) => {
        schedule_breakdown.push([` - ${text} (${duration} day[s])`]);
      });
    } else {
      schedule_breakdown.push([' - none']);
    }
  });

  const data = [
    ['Financial Report Summary', project.name],
    [],
    ['Total Project Cost', toMoneyFormat(total_project_cost)],
    ['Profit', toMoneyFormat(total_profit)],
    ['Total Estimated Cost', toMoneyFormat(total_estimated_cost)],
    ['Total Actual Cost', toMoneyFormat(total_actual_cost)],
    ['Savings', toMoneyFormat(total_savings)],
    [],
    ['Schedule Status Summary'],
    [],
    ...schedule_breakdown,
    [],
    ['Cost Breakdown'],
    [],
    ['Actual Cost Breakdown'],
    [' - Material Cost', toMoneyFormat(total_material_cost)],
    [' - Equipment Cost', toMoneyFormat(total_equipment_cost)],
    [],
    ['Extimated Cost Breakdown'],
    [' - Material Cost', toMoneyFormat(estimated_material_cost)],
    [' - Equipment Cost', toMoneyFormat(estimated_equipment_cost)],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  worksheet['!cols'] = [{ wpx: 200 }, { wpx: 300 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, project.name);
  XLSX.writeFile(workbook, `${project.name} - report.xlsx`, {});
};
