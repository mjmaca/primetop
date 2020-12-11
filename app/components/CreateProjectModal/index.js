/**
 *
 * CreateProjectModal
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Grid,
  Drawer,
  Typography,
  Divider,
} from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    width: 300,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {},
  dialogcontent: {
    display: 'flex',
    flexDirection: 'column',
    width: 450,
  },
  button: {
    marginTop: 16,
  },
}));

function CreateProjectModal(props) {
  const { profile } = props;
  const classes = useStyles();
  const initStartDate = moment().format();
  const initEndDate = moment()
    .add(1, 'months')
    .format();
  const [projectName, setProjectName] = useState('');
  const [projectCost, setProjectCost] = useState(0);
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    if (props.selectedProject) {
      setProjectName(props.selectedProject.name);
      setProjectCost(props.selectedProject.amount);
      setStartDate(props.selectedProject.startDate);
      setEndDate(props.selectedProject.endDate);
      setProvince(props.selectedProject.province);
      setCity(props.selectedProject.city);
      setStreet(props.selectedProject.street);
      setZipcode(props.selectedProject.zipcode);
    }
  }, [props.selectedProject]);

  useEffect(() => {
    if (!props.isModalShow) {
      setProjectName('');
      setProjectCost(0);
      setStartDate(initStartDate);
      setEndDate(initEndDate);
      setProvince('');
      setCity('');
      setStreet('');
      setZipcode('');
    }
  }, [props.isModalShow]);

  const handleCreateProject = () => {
    const data = {
      name: projectName,
      isDeleted: false,
      amount: projectCost,
      startDate,
      endDate,
      company: profile.company,
      province,
      city,
      street,
      zipcode,
    };

    if (props.selectedProject) {
      data.id = props.selectedProject.id;
      props.updateProject(data);
    } else {
      props.createProject(data);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={props.isModalShow}
      onClose={() => props.handleCloseModal()}
    >
      <Grid container direction="column" className={classes.root}>
        <Typography>Create Project</Typography>
        <Divider />
        <TextField
          className={classes.textField}
          label="Project Name"
          value={projectName}
          onChange={event => {
            setProjectName(event.target.value);
          }}
        />

        <TextField
          className={classes.textField}
          label="Project Cost (PHP)"
          value={numeral(projectCost).format('0,0')}
          onChange={event => {
            setProjectCost(event.target.value);
          }}
        />

        <TextField
          label="Start Date"
          type="date"
          className={classes.textField}
          fullWidth
          defaultValue={moment(startDate).format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={event => {
            setStartDate(event.target.value);
          }}
        />

        <TextField
          label="Finish Date"
          type="date"
          className={classes.textField}
          fullWidth
          defaultValue={moment(endDate).format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={event => {
            setEndDate(event.target.value);
          }}
        />

        <TextField
          label="Province"
          className={classes.textField}
          value={province}
          onChange={event => setProvince(event.target.value)}
        />

        <TextField
          label="City"
          className={classes.textField}
          value={city}
          onChange={event => setCity(event.target.value)}
        />

        <TextField
          label="Street"
          className={classes.textField}
          value={street}
          onChange={event => setStreet(event.target.value)}
        />

        <TextField
          label="Zip Code"
          className={classes.textField}
          type="number"
          value={zipcode}
          onChange={event => setZipcode(event.target.value)}
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleCreateProject}
        >
          {props.selectedProject ? 'Update Project' : 'Add Project'}
        </Button>
        <Button
          className={classes.button}
          color="secondary"
          onClick={() => props.handleCloseModal()}
        >
          Cancel
        </Button>
      </Grid>
    </Drawer>
  );
}

CreateProjectModal.propTypes = {
  handleCloseModal: PropTypes.func,
  isModalShow: PropTypes.bool,
  profile: PropTypes.object,
  selectedProject: PropTypes.object,
  updateProject: PropTypes.func,
  createProject: PropTypes.func,
};

export default CreateProjectModal;
