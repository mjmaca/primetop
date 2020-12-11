/**
 *
 * ProjectCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Card,
  Menu,
  MenuItem,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import getPermission from '../../helpers/userRoles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    margin: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#616161',
  },
  grid: {
    padding: '16px',
  },
});

function ProjectCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { projects, profile } = props;
  const permission = getPermission(profile.position, 'project');

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container className={classes.grid}>
      {projects.map(project => (
        <Card className={classes.root} key={project.id} id={project.id}>
          <CardContent>
            <Typography color="primary" variant="h5" gutterBottom>
              {project.name}
            </Typography>

            <Typography variant="caption" component="p">
              <Typography className={classes.title}>Timeline:</Typography>
              <Typography className={classes.subtitle}>{`${moment(
                project.startDate,
              ).format('MM/DD/YYYY')} - ${moment(project.endDate).format(
                'MM/DD/YYYY',
              )}`}</Typography>
            </Typography>

            {profile.position === 'co' && (
              <Typography variant="caption" component="p">
                <Typography className={classes.title}>Project Cost:</Typography>
                <Typography className={classes.subtitle}>{`₱ ${numeral(
                  project.amount,
                ).format('0,0')}`}</Typography>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push(`/schedule/${project.id}#schedule`);
              }}
            >
              View Details
            </Button>
            <IconButton
              id={project.id}
              aria-controls="simple-menu"
              aria-haspopup="true"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={event => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {permission.edit && (
                <MenuItem
                  onClick={() => {
                    props.handleEditProject(anchorEl.id);
                    setAnchorEl(null);
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {permission.delete && (
                <MenuItem
                  onClick={() => {
                    props.handleDeleteProject(anchorEl.id);
                    setAnchorEl(null);
                  }}
                >
                  Delete
                </MenuItem>
              )}
            </Menu>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

ProjectCard.propTypes = {
  projects: PropTypes.array,
  profile: PropTypes.object,
  handleEditProject: PropTypes.func,
  handleDeleteProject: PropTypes.func,
};

export default ProjectCard;
