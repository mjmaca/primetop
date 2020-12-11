/**
 *
 * ProjectPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import firebase from 'firebase/app';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ProjectCard from 'components/ProjectCard';
import CreateProjectModal from 'components/CreateProjectModal';
import { fetchProfileAction } from './actions';
import { NAMESPACE } from './constants';
import getPermission from '../../helpers/userRoles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
  },
  emptyContainer: {
    height: '80vh',
  },
  grid: {
    padding: '16px',
  },
});

export function ProjectPage(props) {
  const classes = useStyles();
  const { fetchProfile, profile } = props;
  const [isModalShow, setIsModalShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState([false, null]);
  const permission = getPermission(profile.position, 'project');

  const getProject = async projectId => {
    const response = await firebase
      .firestore()
      .collection('projects')
      .doc(projectId)
      .get()
      .then(doc => {
        const data = doc.data();
        setSelectedProject({ id: doc.id, ...data });
        return { id: doc.id, ...data };
      });
    return response;
  };

  const fetchAllProjects = async () => {
    const projectsList = [];

    const userProfile = await fetchProfile();

    await firebase
      .firestore()
      .collection('projects')
      .where('company', '==', userProfile.company)
      .where('isDeleted', '==', false)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const item = doc.data();
          item.id = doc.id;
          projectsList.push(item);
        });
        setProjects(projectsList);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  const createProject = async payload => {
    firebase
      .firestore()
      .collection('projects')
      .add(payload)
      .then(() => {
        fetchAllProjects();
        setIsModalShow(false);
      });
  };

  const updateProject = async payload => {
    firebase
      .firestore()
      .collection('projects')
      .doc(payload.id)
      .set(payload)
      .then(() => {
        fetchAllProjects();
        setIsModalShow(false);
      });
  };

  const deleteProject = async projectId => {
    const data = await getProject(projectId);
    if (data) {
      const obj = Object.assign({}, data);
      obj.isDeleted = true;
      updateProject(obj);
    }
  };

  const handleEditProject = async projectId => {
    await getProject(projectId);
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalShow(false);
  };

  const handleDeleteProject = async projectId => {
    setDeleteModalOpen([true, projectId]);
  };

  const renderProjectCard = () => {
    if (!projects.length) {
      return (
        <Grid
          className={classes.emptyContainer}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <DomainDisabledIcon color="error" fontSize="large" />
          <Typography variant="h4" gutterBottom>
            No Projects Yet?
          </Typography>
          <Typography>
            Do not worry! We got you, we can help you with that!
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsModalShow(true);
            }}
          >
            Start your first project
          </Button>
        </Grid>
      );
    }

    return (
      <ProjectCard
        profile={profile}
        projects={projects}
        handleEditProject={handleEditProject}
        handleDeleteProject={handleDeleteProject}
      />
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchAllProjects();
  }, []);

  return (
    <Grid>
      <Dialog open={isDeleteModalOpen[0]}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete this project.
          </DialogContentText>
          <DialogContentText>
            Please be aware that deleting a project cannot be undone and that by
            by doing so, <b>you will not be able to retrieve this data.</b>
          </DialogContentText>
          <DialogContentText>
            Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteProject(isDeleteModalOpen[1]);
              setDeleteModalOpen([false, null]);
            }}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setDeleteModalOpen([false, null]);
            }}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <CreateProjectModal
        createProject={createProject}
        updateProject={updateProject}
        selectedProject={selectedProject}
        profile={profile}
        isModalShow={isModalShow}
        handleCloseModal={handleCloseModal}
      />
      <Grid className={classes.grid}>
        {!!projects.length && permission.add && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsModalShow(true);
            }}
          >
            Create New Projects
          </Button>
        )}
      </Grid>
      <Grid>
        {loading ? (
          <Backdrop open style={{ zIndex: 5 }}>
            <CircularProgress style={{ color: '#fff' }} />
          </Backdrop>
        ) : (
          renderProjectCard()
        )}
      </Grid>
    </Grid>
  );
}

ProjectPage.propTypes = {
  fetchProfile: func,
  profile: object,
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
  bindActionCreators({ fetchProfile: fetchProfileAction }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectPage);
