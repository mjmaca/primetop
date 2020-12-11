export const NAMESPACE = 'REPORTS';

export const SCHEDULE_LEGEND = [
  { key: 'finished', label: 'Finished', color: '#55d8fe' },
  { key: 'overdue', label: 'Overdue', color: '#ff8273' },
  { key: 'not_started', label: 'Not Started', color: '#ffdb82' },
  { key: 'on_going', label: 'Ongoing', color: '#44d160' },
];

export const COST_BREAKDOWN_LEGEND = [
  { label: 'Total Material Cost', color: '#a3a0fb' },
  { label: 'Total Labor Cost', color: '#ffdb82' },
  { label: 'Total Equipment Cost', color: '#55d8fe' },
];

export const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
};
