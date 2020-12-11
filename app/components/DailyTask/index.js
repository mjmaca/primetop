/**
 *
 * DailyTask
 *
 */

import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import firebase from 'firebase/app';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { useParams } from 'react-router-dom';
import { getDateRangeOfWeek } from './calendarDates';

import {
  Date,
  WeekHolder,
  DayHolder,
  WeekNumber,
  StyledPaper,
  DailyTaskContainer,
  StatusPaper,
  StatusChip,
} from './styles';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const statusMap = {
  in_progress: 'In Progress',
  overdue: 'Overdue',
  finished: 'Finished',
};

function DailyTask(props) {
  const { projectId } = useParams();
  const [datesInWeek, setDatesInWeek] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [weekNumber, setWeekNumber] = useState(moment().format('w'));
  // const [scheduleData, setScheduleData] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [currentDate, setCurrentDate] = useState({});
  const [currentTasks, setCurrentTasks] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openStatusPopover, setOpenStatusPopover] = useState(false);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTaskList();
  }, []);

  useEffect(() => {
    const rdate = getDateRangeOfWeek(weekNumber, 2020);
    setDatesInWeek(rdate);
  }, [weekNumber]);

  const fetchTaskList = () => {
    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .get()
      .then(querySnapshot => {
        const allTodos = [];
        querySnapshot.forEach(doc => {
          const obj = doc.data();
          delete obj.id;
          obj.id = doc.id;
          allTodos.push(obj);
        });
        setTaskList(allTodos);
      });
  };

  const selectDate = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const filteredTask = taskList.filter(task => task.date === formattedDate);
    setCurrentTasks(filteredTask);
  };

  const handleClickStatus = taskId => event => {
    setAnchorEl(event.currentTarget);
    setOpenStatusPopover(prev => !prev);
    setTodo(taskId);
  };

  const handleUpdateState = newStatus => () => {
    const clonedTaskList = [...currentTasks];
    clonedTaskList.map(t => {
      if (t.id === todo) {
        // eslint-disable-next-line no-param-reassign
        t.status = newStatus;
      }
      return true;
    });

    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('todos')
      .doc(todo)
      .update({
        status: newStatus,
      })
      .then(() => {
        setCurrentTasks(clonedTaskList);
        setOpenStatusPopover(false);
        props.handleSnackBar('Task Updated', 'success');
      });
  };

  return (
    <DailyTaskContainer>
      <Popper
        open={openStatusPopover}
        anchorEl={anchorEl}
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StatusPaper>
              <StatusChip
                size="small"
                onClick={handleUpdateState('in_progress')}
                variant="outlined"
                label="In Progress"
              />
              <StatusChip
                size="small"
                onClick={handleUpdateState('overdue')}
                variant="outlined"
                label="Overdue"
              />
              <StatusChip
                size="small"
                onClick={handleUpdateState('finished')}
                variant="outlined"
                label="Finished"
              />
            </StatusPaper>
          </Fade>
        )}
      </Popper>
      <Grid container>
        <WeekHolder>
          <Grid container direction="row" justify="space-between">
            <Button
              onClick={() => {
                setWeekNumber(weekNumber - 1);
              }}
            >
              Previous
            </Button>
            <WeekNumber>{`Week ${weekNumber}`}</WeekNumber>
            <Button
              onClick={() => {
                setWeekNumber(Number(weekNumber) + 1);
              }}
            >
              Next
            </Button>
          </Grid>
          <Grid container>
            {datesInWeek.map(item => (
              <DayHolder
                key={item.toLocaleDateString()}
                onClick={() => {
                  selectDate(item);
                  setCurrentDate(item.toLocaleDateString());
                }}
              >
                <Date isActive={item.toLocaleDateString() === currentDate}>
                  {`${monthNames[item.getMonth()]} ${item.getDate()}`}
                </Date>
              </DayHolder>
            ))}
          </Grid>
        </WeekHolder>
      </Grid>
      <Grid>
        {!currentTasks.length && <StyledPaper>No Task</StyledPaper>}
        {currentTasks.map(task => (
          <StyledPaper key={task.id}>
            <Grid container justify="space-between">
              <Grid item xs={10}>
                <Typography>
                  <b>{`Task Name: ${task.text}`}</b>
                </Typography>
                <Box>
                  <Typography component="p">
                    <b>Comments:</b>
                  </Typography>
                  <Box
                    style={{
                      border: '1px solid #cecece',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography component="p">
                      This is the comment from somewhere
                    </Typography>
                    <Typography component="p">- Stephel</Typography>
                  </Box>
                  <Box>
                    <TextField
                      style={{ margin: 8 }}
                      placeholder="Type your comment here"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center" alignItems="center">
                  <StatusChip
                    onClick={handleClickStatus(task.id)}
                    label={`${statusMap[task.status]}`}
                    styled={{ backgroundColor: 'green' }}
                  />
                </Grid>
              </Grid>
              <Grid />
            </Grid>
          </StyledPaper>
        ))}
      </Grid>
    </DailyTaskContainer>
  );
}

DailyTask.propTypes = {
  handleSnackBar: func,
};

export default DailyTask;
