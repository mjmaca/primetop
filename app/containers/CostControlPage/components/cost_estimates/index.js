/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { object, func } from 'prop-types';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import RowMenuIcon from '@material-ui/icons/MoreHoriz';
import Modal from 'components/Modal';
import { useSnackbar } from 'notistack';

import { NAMESPACE as SCHEDULE } from 'containers/SchedulePage/constants';
import EmptyState from './EmptyState';

import MaterialCostForm from './components/material_cost_form';
import LaborCostForm from './components/labor_cost_form';
import EquipmentCostForm from './components/equipment_cost_form';

import {
  fetchCostEstimates,
  fetchEstimates,
  setCostEstimate,
  updateCostEstimates,
} from './actions';
import { NAMESPACE as COST_CONTROL } from '../../constants';

import { EXPANSION_PANEL } from './constants';
import {
  CEHeader,
  CETitle,
  CETotal,
  StyledAddButton,
  StyledExpansionPanel,
  StyledExpansionPanelSummary,
  StyledExpansionPanelDetails,
} from './styles';

import { Loading } from '../../styles';

function CostEstimates(props) {
  const {
    selectedSchedule: { id, text },
    costEstimates: { fetching, costEstimate, costEstimates },
    fetchCostEstimates,
    fetchEstimates,
    setCostEstimate,
    updateCostEstimates,
    permission,
  } = props;
  const { projectId } = useParams();

  useEffect(() => {
    /** fetch cost_estimates whenever the id get updated */
    if (id) {
      fetchCostEstimates(projectId, id);
    }
  }, [id]);

  const { enqueueSnackbar } = useSnackbar();

  const [mode, setMode] = useState(''); // add, edit, delete
  const [table, setTable] = useState(''); // material_cost, labor_cost, equipment_cost
  const [modal, setModal] = useState(false); // true or false
  const [menu, setMenu] = useState(null); // e.currentTarget or null

  const [expanded, setExpanded] = useState({
    material_cost: true,
    labor_cost: false,
    equipment_cost: false,
  });

  const getTotal = table => {
    return EXPANSION_PANEL.filter(({ key }) => {
      if (table) {
        return table === key;
      }
      return true;
    })
      .map(({ key }) => {
        return costEstimates[key]
          .map(({ amount }) => amount)
          .reduce((total, value) => total + value, 0);
      })
      .reduce((total, value) => total + value, 0);
  };

  const handleOnMenuOpen = ({ table, row }) => e => {
    setCostEstimate(row);
    setTable(table);
    setMenu(e.currentTarget);
  };

  const handleOnMenuClose = () => {
    setCostEstimate({});
    setTable('');
    setMenu(null);
  };

  const handleOnDelete = async () => {
    setMenu(null);
    await updateCostEstimates({
      table,
      mode: 'delete',
      payload: costEstimate,
      projectId,
      scheduleId: id,
    });
    enqueueSnackbar('Deleted', { variant: 'success' });
    setCostEstimate({});
    fetchEstimates(projectId);
  };

  const handleOnEdit = () => {
    setMenu(null);
    setMode('edit');
    setModal(true);
  };

  const handleOnAdd = table => () => {
    setTable(table);
    setMode('add');
    setModal(true);
  };

  const handleOnSave = table => async payload => {
    try {
      await updateCostEstimates({
        table,
        mode,
        payload,
        projectId,
        scheduleId: id,
      });
      fetchEstimates(projectId);

      setCostEstimate({});
      setModal(false);
      setMode('');
      setTable('');
      enqueueSnackbar('Success', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.toString(), { variant: 'error' });
    }
  };

  const handleOnCancel = () => {
    setCostEstimate({});
    setModal(false);
    setTable('');
    setMode('');
  };

  const handleOnExpand = panel => {
    setExpanded({ ...expanded, [panel]: !expanded[panel] });
  };

  const renderTableHeader = COLUMNS => {
    return (
      <TableRow>
        {COLUMNS.map(({ dataKey, label, cellProps }) => {
          return (
            <TableCell key={dataKey} {...cellProps}>
              {label}
            </TableCell>
          );
        })}
        <TableCell width={40} />
      </TableRow>
    );
  };

  const renderTableContent = (COLUMNS, rows, table) => {
    return rows.map(row => {
      return (
        <TableRow key={row.id}>
          {COLUMNS.map(({ dataKey, cellProps }) => {
            switch (dataKey) {
              case 'rate':
              case 'quantity':
              case 'price_per_unit':
              case 'amount':
                return (
                  <TableCell key={dataKey} {...cellProps}>
                    {row[dataKey].toLocaleString()}
                  </TableCell>
                );
              case 'usage':
                return (
                  <TableCell key={dataKey} {...cellProps}>
                    {row[dataKey] && `${row[dataKey]} ${row.unit}(s)`}
                  </TableCell>
                );
              default:
                return (
                  <TableCell key={dataKey} {...cellProps}>
                    {row[dataKey]}
                  </TableCell>
                );
            }
          })}
          <TableCell align="center">
            <RowMenuIcon onClick={handleOnMenuOpen({ table, row })} />
          </TableCell>
        </TableRow>
      );
    });
  };

  // eslint-disable-next-line react/prop-types
  const renderExpansionPanel = ({ key, COLUMNS, label }) => {
    const data = costEstimates[key];

    return (
      <StyledExpansionPanel
        key={key}
        square
        expanded={expanded[key]}
        onChange={() => handleOnExpand(key)}
      >
        <StyledExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls={`${key}-content`}
          id={`${key}-header`}
        >
          <Grid container>
            <Grid item xs={6}>
              {label}
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              Total amount: ₱{' '}
              {getTotal(key).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Grid>
          </Grid>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetails>
          <Grid container>
            {!isEmpty(data) ? (
              <Table size="small">
                <TableHead>{renderTableHeader(COLUMNS)}</TableHead>
                <TableBody>{renderTableContent(COLUMNS, data, key)}</TableBody>
              </Table>
            ) : (
              <EmptyState />
            )}
            <Grid container style={{ marginTop: 16 }}>
              {permission.add && (
                <StyledAddButton
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOnAdd(key)}
                >
                  Add new
                </StyledAddButton>
              )}
            </Grid>
          </Grid>
        </StyledExpansionPanelDetails>
      </StyledExpansionPanel>
    );
  };

  const renderModalContent = () => {
    switch (table) {
      case 'material_cost':
        return (
          <MaterialCostForm
            mode={mode}
            onSave={handleOnSave('material_cost')}
            onCancel={handleOnCancel}
          />
        );
      case 'labor_cost':
        return (
          <LaborCostForm
            mode={mode}
            onSave={handleOnSave('labor_cost')}
            onCancel={handleOnCancel}
          />
        );
      case 'equipment_cost':
        return (
          <EquipmentCostForm
            mode={mode}
            onSave={handleOnSave('equipment_cost')}
            onCancel={handleOnCancel}
          />
        );
      default:
        return 'invalid form';
    }
  };

  return fetching ? (
    <Loading style={{ height: '100%' }}>
      <CircularProgress style={{ color: '#3f51b5' }} />
    </Loading>
  ) : (
    <Grid style={{ padding: 4, backgroundColor: '#ddd' }}>
      <Modal isOpen={modal}>{renderModalContent()}</Modal>
      <Menu
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleOnMenuClose}
      >
        {permission.edit && (
          <MenuItem onClick={handleOnEdit} style={{ fontSize: 12 }}>
            Edit
          </MenuItem>
        )}
        {permission.delete && (
          <MenuItem
            onClick={handleOnDelete}
            style={{ fontSize: 12, color: 'red' }}
          >
            Delete
          </MenuItem>
        )}
      </Menu>
      <CEHeader container>
        <Grid item xs={6}>
          <CETitle>{text}</CETitle>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <CETotal>
            Grand Total: ₱
            {getTotal().toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </CETotal>
        </Grid>
      </CEHeader>
      <Grid container>
        <Grid item xs={12}>
          {EXPANSION_PANEL.map(panel => renderExpansionPanel(panel))}
        </Grid>
      </Grid>
    </Grid>
  );
}

CostEstimates.propTypes = {
  selectedSchedule: object,
  costEstimates: object,
  fetchCostEstimates: func,
  fetchEstimates: func,
  setCostEstimate: func,
  updateCostEstimates: func,
  permission: object,
};

const mapStateToProps = state => {
  const {
    [SCHEDULE]: { selectedSchedule },
    [COST_CONTROL]: { costEstimates },
  } = state;

  return {
    selectedSchedule,
    costEstimates,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCostEstimates,
      fetchEstimates,
      setCostEstimate,
      updateCostEstimates,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CostEstimates);
