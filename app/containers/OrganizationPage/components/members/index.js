/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { object, array, func, boolean } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { NAMESPACE, ROLE_MAPPING, STATUS_MAPPING } from '../../constants';

import { Status, StatusIndicator } from './styles';

function Members(props) {
  const {
    company,
    owner,
    members,
    isUpdating,
    setIsUpdating,
    updateUser,
    fetchData,
  } = props;

  const renderRole = (position, id) => {
    if (isUpdating) {
      return (
        <Select
          id="role-select"
          value={position}
          onChange={e => {
            updateUser(id, e.target.value);
            fetchData();
          }}
        >
          {Object.entries(ROLE_MAPPING).map(role => (
            <MenuItem value={role[0]}>{role[1]}</MenuItem>
          ))}
        </Select>
      );
    }
    return ROLE_MAPPING[position];
  };

  const renderUpdateButton = () => {
    const isPaid = company.subscription_type === 'premium';
    const isContractor = owner.position === 'co';
    if (isPaid && isContractor) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsUpdating(!isUpdating);
          }}
        >
          {isUpdating ? 'Save' : 'Update'}
        </Button>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <Table style={{ marginTop: 32 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {owner.first_name} {owner.last_name}
            </TableCell>
            <TableCell>{owner.mobile}</TableCell>
            <TableCell>{owner.email}</TableCell>
            <TableCell>{ROLE_MAPPING[owner.position]}</TableCell>
            <TableCell align="center">
              <Status>
                <StatusIndicator color={STATUS_MAPPING.active.color} />
                Active
              </Status>
            </TableCell>
          </TableRow>
          {members.map(member => {
            const {
              id,
              first_name,
              last_name,
              mobile,
              email,
              position,
            } = member;
            const { status } = company.members.find(
              ({ user }) => user.split('users/')[1] === id,
            );

            const { color, name } = STATUS_MAPPING[status];

            return (
              <TableRow key={id}>
                <TableCell>
                  {first_name} {last_name}
                </TableCell>
                <TableCell>{mobile}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{renderRole(position, id)}</TableCell>
                <TableCell align="center">
                  <Status>
                    <StatusIndicator color={color} />
                    {name}
                  </Status>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Grid container justify="flex-end">
        <Box mt={2}>{renderUpdateButton()}</Box>
      </Grid>
    </React.Fragment>
  );
}

Members.propTypes = {
  company: object,
  owner: object,
  members: array,
  setIsUpdating: func,
  updateUser: func,
  fetchData: func,
  isUpdating: boolean,
};

const mapStateToProps = state => {
  const {
    [NAMESPACE]: { company, owner, members },
  } = state;

  return {
    company,
    owner,
    members,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Members);
