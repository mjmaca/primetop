import moment from 'moment';

const getDates = (startDate, stopDate, task) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  const currentStopDate = moment(stopDate);
  while (currentDate < currentStopDate) {
    const obj = {
      ...task,
      schedule_id: task.id,
      date: moment(currentDate).format('YYYY-MM-DD'),
    };
    delete obj.id;
    // todo: delete this as used only for testing.
    obj.status = 'in_progress';
    dateArray.push(obj);
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};

export const generateTasks = allTasks => {
  const generatedTask = allTasks.map(task =>
    getDates(task.start_date, task.end_date, task),
  );
  return generatedTask.flat();
};
