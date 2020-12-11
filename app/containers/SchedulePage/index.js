/**
 *
 * Schedule
 *
 */

import React, { memo, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { gantt } from 'dhtmlx-gantt';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { func, object } from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { useParams, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from 'components/Sidebar';
import DailyTask from 'components/DailyTask';
import Gantt from 'components/Gantt';
import { generateTasks } from 'components/DailyTask/generateTasks';
import { syncTimelineAndTask, fetchProfile } from './actions';
import { LegendStatus, LegendDots } from './styles';
import { NAMESPACE } from './constants';
import getPermission from '../../helpers/userRoles';

const generateId = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const useStyles = makeStyles({
  button: {
    marginLeft: 8,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyContainer: {
    height: '80vh',
  },
  ganttContainer: {
    width: 'calc(100% - 210px)',
    padding: 0,
  },
  buttonProgress: {
    color: '#FFFFFF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  tab: {
    backgroundColor: '#ffffff',
    marginLeft: '-1px',
    padding: '8px 16px',
    borderBottom: '1px solid #cecece',
  },
});

export function Schedule(props) {
  const { profile } = props;
  const classes = useStyles();
  const history = useHistory();
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [scheduleData, setScheduleData] = useState({
    id: null,
    data: [],
    links: [],
  });
  const [projectData, setProjectData] = useState({});
  const [zoomLevel, setZoomLevel] = useState('day');
  const [isLoading, setLoading] = useState(false);
  const permission = getPermission(profile.position, 'schedule');
  const {
    location: { hash },
  } = history;

  const zoomModule = gantt.ext.zoom;
  zoomModule.init({
    levels: [
      {
        name: 'day',
        scale_height: 27,
        min_column_width: 80,
        scales: [{ unit: 'day', step: 1, format: '%d %M' }],
      },
      {
        name: 'week',
        scale_height: 50,
        min_column_width: 50,
        scales: [
          {
            unit: 'week',
            step: 1,
            format: date => {
              const weekNum = gantt.date.date_to_str('%W')(date);
              return `Week #${weekNum}`;
            },
          },
          { unit: 'day', step: 1, format: '%j %D' },
        ],
      },
      {
        name: 'month',
        scale_height: 50,
        min_column_width: 120,
        scales: [
          { unit: 'month', format: '%F, %Y' },
          { unit: 'week', format: 'Week #%W' },
        ],
      },
    ],
  });

  // fetch profile
  useEffect(() => {
    props.fetchProfile();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .collection('schedule')
      .get()
      .then(snapshots => {
        if (snapshots.docs.length) {
          const doc = snapshots.docs[0];
          setScheduleData({
            id: doc.id,
            ...doc.data(),
          });
        }
      });

    firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .get()
      .then(snapshots => {
        if (snapshots.exists) {
          setProjectData(snapshots.data());
        }
      });
  }, []);

  const handleSyncWithTimeline = () => {
    const tList = generateTasks(scheduleData.data);
    props.syncTimelineAndTask(tList, projectId);
  };

  const handleExport = () => {
    gantt.exportToPDF({
      name: `${projectId}.pdf`,
    });
  };

  const handleSnackBar = (message, status) => {
    enqueueSnackbar(message, { variant: status });
  };

  const handleClickSave = () => {
    setLoading(true);
    const allTaskData = Object.assign({}, gantt.serialize());
    allTaskData.update_date = new Date().toISOString();

    if (scheduleData.id) {
      firebase
        .firestore()
        .collection('projects')
        .doc(projectId)
        .collection('schedule')
        .doc(scheduleData.id)
        .set(allTaskData)
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            handleSnackBar('Progress saved!', 'success');
          }, 2000);
        });
    } else {
      firebase
        .firestore()
        .collection('projects')
        .doc(projectId)
        .collection('schedule')
        .add(allTaskData)
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            handleSnackBar('Progress saved!', 'success');
          }, 2000);
        });
    }
  };

  const handleClickCreateSchedule = () => {
    setScheduleData({
      id: generateId(20),
      data: [],
      links: [],
    });
  };

  const renderGanttChart = () => {
    if (scheduleData.id) {
      return (
        <Grid container direction="column">
          <Grid container justify="space-between">
            <Box p={1}>
              <LegendStatus>
                <LegendDots color="#4caf50" />
                <span>Ongoing</span>
              </LegendStatus>
              <LegendStatus>
                <LegendDots color="#2196f3" />
                <span>Finished</span>
              </LegendStatus>
              <LegendStatus>
                <LegendDots color="#ffeb3b" />
                <span>Not Started</span>
              </LegendStatus>
              <LegendStatus>
                <LegendDots color="#f44336" />
                <span>Overdue</span>
              </LegendStatus>
            </Box>
            <Box p={1}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  variant={zoomLevel === 'day' ? 'contained' : 'outlined'}
                  onClick={() => {
                    zoomModule.setLevel('day');
                    setZoomLevel('day');
                  }}
                >
                  Daily
                </Button>
                <Button
                  variant={zoomLevel === 'week' ? 'contained' : 'outlined'}
                  onClick={() => {
                    zoomModule.setLevel('week');
                    setZoomLevel('week');
                  }}
                >
                  Weekly
                </Button>
                <Button
                  variant={zoomLevel === 'month' ? 'contained' : 'outlined'}
                  onClick={() => {
                    zoomModule.setLevel('month');
                    setZoomLevel('month');
                  }}
                >
                  Monthly
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Box p={1}>
            <Gantt
              permission={permission}
              gantt={gantt}
              scheduleData={scheduleData}
            />
          </Box>
        </Grid>
      );
    }

    return <div />;
  };

  const renderEmptyChart = () => {
    if (!scheduleData.id) {
      return (
        <Grid
          className={classes.emptyContainer}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <DateRangeIcon color="secondary" fontSize="large" />
          <Typography className={classes.emptyTitle} gutterBottom>
            No schedule yet? Click the button to create one.
          </Typography>
          <Button
            onClick={handleClickCreateSchedule}
            variant="outlined"
            color="primary"
          >
            Start creating schedule
          </Button>
        </Grid>
      );
    }

    return <div />;
  };

  return (
    <Grid container direction="row">
      <Sidebar />
      <Grid className={classes.ganttContainer}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.tab}
        >
          <Grid>
            <Typography variant="h5">{projectData.name}</Typography>
          </Grid>
          <Grid>
            {hash === '#schedule' && (
              <React.Fragment>
                <Button className={classes.button} onClick={handleExport}>
                  Download Schedule
                </Button>
                {permission.save && (
                  <Button
                    className={classes.button}
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={handleClickSave}
                  >
                    Save your Progress
                    {isLoading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                )}
              </React.Fragment>
            )}
            {hash === '#daily_task' && (
              <React.Fragment>
                <Button
                  onClick={handleSyncWithTimeline}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Sync With Timeline
                </Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        {hash === '#schedule' && (
          <Grid>
            {renderEmptyChart()}
            {renderGanttChart()}
          </Grid>
        )}
        {hash === '#daily_task' && (
          <Grid style={{ width: '100%', padding: 16 }}>
            <DailyTask handleSnackBar={handleSnackBar} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

Schedule.propTypes = {
  profile: object,
  syncTimelineAndTask: func,
  fetchProfile: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { profile },
  } = state;

  return {
    profile,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ syncTimelineAndTask, fetchProfile }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Schedule);
