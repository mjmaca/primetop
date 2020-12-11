/**
 *
 * Sidebar
 *
 */

import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import PieChartIcon from '@material-ui/icons/PieChart';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ListtOutlinedIcon from '@material-ui/icons/ListOutlined';

import { StyledCollapse, SecondaryListItemText } from './styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 200,
    minWidth: 200,
    height: '100vh',
    borderRight: '1px solid #cecece',
    backgroundColor: '#FFFFFF',
    marginRight: '1px',
  },
}));

function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const [toggleOpen, setToggleOpen] = useState('Cost Control');
  const { projectId } = useParams();

  const handleToggleOpen = toggleName => {
    setToggleOpen(!toggleOpen ? toggleName : '');
  };

  const isSelected = url => {
    const {
      location: { pathname, hash },
    } = history;

    return [pathname, hash].join(' ').includes(url);
  };

  const isCostControlToggleOpen =
    isSelected('#cost_estimates') ||
    isSelected('#purchase_orders') ||
    isSelected('#requests') ||
    isSelected('#received') ||
    isSelected('#labors');

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          selected={isSelected('/projects')}
          onClick={() => {
            history.push('/projects');
          }}
          button
        >
          <ListItemIcon>
            <FolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {/* <ListItem
          selected={isSelected('/schedule')}
          onClick={() => {
            history.push(`/schedule/${projectId}#schedule`);
          }}
          button
        >
          <ListItemIcon>
            <DateRangeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItem> */}

        <ListItem onClick={() => handleToggleOpen('Cost Control')} button>
          <ListItemIcon>
            <AttachMoneyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Cost Control" />
        </ListItem>

        <StyledCollapse
          in={toggleOpen === 'Cost Control' || isCostControlToggleOpen}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem
              selected={isSelected('#cost_estimates')}
              onClick={() => {
                history.push(`/cost_control/${projectId}#cost_estimates`);
              }}
              button
            >
              <SecondaryListItemText primary="Cost Estimation" />
            </ListItem>
            <ListItem
              selected={isSelected('#purchase_orders')}
              onClick={() => {
                history.push(`/cost_control/${projectId}#purchase_orders`);
              }}
              button
            >
              <SecondaryListItemText primary="Purchase Order" />
            </ListItem>
            <ListItem
              selected={isSelected('#requests')}
              onClick={() => {
                history.push(`/cost_control/${projectId}#requests`);
              }}
              button
            >
              <SecondaryListItemText primary="Request Order" />
            </ListItem>
            <ListItem
              selected={isSelected('#received')}
              onClick={() => {
                history.push(`/cost_control/${projectId}#received`);
              }}
              button
            >
              <SecondaryListItemText primary="Received Order" />
            </ListItem>
            <ListItem
              selected={isSelected('#labors')}
              onClick={() => {
                history.push(`/cost_control/${projectId}#labors`);
              }}
              button
            >
              <SecondaryListItemText primary="Add Labor" />
            </ListItem>
          </List>
        </StyledCollapse>

        {/* <ListItem
          selected={isSelected('/files')}
          onClick={() => {
            history.push(`/files/${projectId}`);
          }}
          button
        >
          <ListItemIcon>
            <FolderOpenOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Files" />
        </ListItem> */}

        {/* <ListItem
          selected={isSelected('/chat')}
          onClick={() => {
            history.push(`/chat/${projectId}`);
          }}
          button
        >
          <ListItemIcon>
            <ChatOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem> */}

        <ListItem
          selected={isSelected('/supplierlist')}
          onClick={() => {
            history.push(`/supplierlist/${projectId}`);
          }}
          button
        >
          <ListItemIcon>
            <ListtOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers List" />
        </ListItem>

        <Divider />
        <ListItem
          selected={isSelected('/organization')}
          onClick={() => {
            history.push(`/members/${projectId}`);
          }}
          button
        >
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="User Access" />
        </ListItem>

        <ListItem
          selected={isSelected('/reports')}
          onClick={() => {
            history.push(`/reports/${projectId}`);
          }}
          button
        >
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
