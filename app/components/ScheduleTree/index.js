/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/**
 *
 * ScheduleTree
 *
 */

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { isEmpty } from 'lodash';
import { func, object } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Link as Anchor } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import RowMenuIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';

import { NAMESPACE } from 'containers/SchedulePage/constants';
import {
  setActiveChild,
  setSelectedSchedule,
  deleteCustomSchedule,
} from 'containers/SchedulePage/actions';
import Modal from '../Modal';
import CustomSchedule from './components/custom_schedule';

import { Tree, VoidIcon, StyledAddButton, AddNewWrapper } from './styles';

function ScheduleTree(props) {
  const {
    setActiveChild,
    setSelectedSchedule,
    activeChild,
    selectedSchedule,
    deleteCustomSchedule,
    schedule: { data },
  } = props;
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const CREATE_NEW = 'create-new';
  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(null);
  const [level, setLevel] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [mode, setMode] = useState('');

  const handleSetActiveChild = id => () => {
    setActiveChild({ ...activeChild, [id]: !activeChild[id] });
  };

  const handleOnClickItem = item => () => {
    setSelectedSchedule(item);
  };

  const handleOnMenuOpen = (schedule, level) => e => {
    setSchedule(schedule);
    setLevel(level);
    setMenu(e.currentTarget);
  };

  const handleOnMenuClose = () => {
    setMenu(null);
  };

  const handleOnOpenCreateModal = (schedule, mode) => {
    setSchedule(schedule);
    setMode(mode);
    setModal(CREATE_NEW);
    setMenu(null);
  };

  const handleOnCreateNew = item => {
    const getActiveParent = (parentId, activeParent = {}) => {
      const parent = data.find(({ id }) => id === parentId);

      if (parent) {
        return getActiveParent(parent.parent, {
          ...activeParent,
          [parent.id]: true,
        });
      }

      return activeParent;
    };

    setActiveChild({ ...activeChild, ...getActiveParent(item.parent) });
    setSelectedSchedule(item);
    setModal(null);
  };

  const handleOnDelete = async () => {
    try {
      setMenu(null);
      if (window.confirm(`Are you sure you want to delete ${schedule.text}?`)) {
        await deleteCustomSchedule(projectId, schedule.id);
        setSchedule(null);
        enqueueSnackbar('Success delete', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.toString(), { variant: 'error' });
    }
  };

  // eslint-disable-next-line react/prop-types
  const renderLeftIcon = ({ isActive, hasChildren }) => {
    if (hasChildren) {
      if (isActive) {
        return <KeyboardArrowDown />;
      }
      return <KeyboardArrowRight />;
    }
    return <VoidIcon />;
  };

  const renderTree = (items, level = 0) =>
    items.map(item => {
      const { id, text } = item;
      const children = data.filter(({ parent }) => parent === id);
      const hasChildren = !isEmpty(children);
      const isActive = activeChild[id];
      const isSelected = selectedSchedule.id === id;
      const active = isActive ? 'active' : '';
      const selected = isSelected ? 'selected' : '';
      const marginLeft = level < 2 && !hasChildren && 24; // add margin left to childless item except level 2 items
      const onChildClick = hasChildren
        ? handleSetActiveChild(id)
        : handleOnClickItem(item);

      return (
        <div key={id} className={`child level-${level} ${active} ${selected}`}>
          <div className="label">
            <Anchor
              className="text"
              onClick={onChildClick}
              title={text}
              style={{ marginLeft }}
            >
              {renderLeftIcon({ isActive, hasChildren })}
              {text}
            </Anchor>
            {item.isCustom ? (
              <RowMenuIcon
                className="menu-icon"
                onClick={handleOnMenuOpen(item, level)}
              />
            ) : (
              level < 2 && (
                <AddIcon
                  className="add-icon"
                  onClick={() => handleOnOpenCreateModal(item, 'add')}
                />
              )
            )}
          </div>
          {hasChildren && (
            <CSSTransition in={isActive} timeout={300} unmountOnExit>
              <div className="children">{renderTree(children, level + 1)}</div>
            </CSSTransition>
          )}
        </div>
      );
    });

  return (
    <>
      <AddNewWrapper>
        <StyledAddButton
          variant="outlined"
          color="primary"
          onClick={() => handleOnOpenCreateModal({}, 'add')}
        >
          New
        </StyledAddButton>
      </AddNewWrapper>
      <Tree>{renderTree(data.filter(({ parent }) => !parent))}</Tree>
      <Menu
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleOnMenuClose}
      >
        {level < 2 && (
          <MenuItem
            onClick={() => handleOnOpenCreateModal(schedule, 'add')}
            style={{ fontSize: 12 }}
          >
            Add
          </MenuItem>
        )}
        <MenuItem
          onClick={() => handleOnOpenCreateModal(schedule, 'edit')}
          style={{ fontSize: 12 }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleOnDelete}
          style={{ fontSize: 12, color: 'red' }}
        >
          Delete
        </MenuItem>
      </Menu>
      {modal === CREATE_NEW && (
        <Modal isOpen>
          <CustomSchedule
            mode={mode} // add or edit
            schedule={schedule}
            onCancel={() => setModal(null)}
            onSuccess={handleOnCreateNew}
          />
        </Modal>
      )}
    </>
  );
}

ScheduleTree.propTypes = {
  setActiveChild: func,
  setSelectedSchedule: func,
  activeChild: object,
  selectedSchedule: object,
  schedule: object,
  deleteCustomSchedule: func,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { schedule, activeChild, selectedSchedule },
  } = state;

  return {
    schedule,
    activeChild,
    selectedSchedule,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setActiveChild, setSelectedSchedule, deleteCustomSchedule },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScheduleTree);
