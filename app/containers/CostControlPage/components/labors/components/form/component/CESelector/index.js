/* eslint-disable no-nested-ternary */
/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { array, func, bool } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RowMenuIcon from '@material-ui/icons/MoreHoriz';

import Modal from 'components/Modal';
import SelectorModal from './SelectorModal';

import {
  StyledCESelector,
  TableTitle,
  Editable,
  StyledTableHead,
  StyledTableHeadCell,
  StyledAddItemButton,
  TableWrapper,
} from './styles';

import {
  getCostBreakdown,
  truncateDecimal,
} from '../../../../../../../../helpers';

function CESelector(props) {
  const { items, onChange, disabled } = props;
  const [item, setItem] = useState({}); // item of items
  const [mode, setMode] = useState('view'); // view or add
  const [menu, setMenu] = useState(null); // e.currentTarget or null

  const handleOnChange = selectedItems => {
    onChange('items')(selectedItems);
    setMode('view');
  };

  const handleOnCancel = () => {
    setMode('view');
  };

  const handleOnDelete = () => {
    const index = items.findIndex(({ id }) => id === item.id);
    onChange('items')([...items.slice(0, index), ...items.slice(index + 1)]);
    setItem({});
    setMenu(null);
  };

  const handleOnMenuOpen = item => e => {
    setItem(item);
    setMenu(e.currentTarget);
  };

  const handleItemOnChange = (field, index) => e => {
    const { value, valueAsNumber } = e.target;
    const item = items[index];

    switch (field) {
      case 'quantity':
      case 'working_days':
      case 'rate': {
        item[field] = value ? valueAsNumber : '';
        const { quantity, working_days, rate } = getCostBreakdown(item);

        item.amount = truncateDecimal(quantity * working_days * rate);
        break;
      }
      default:
        item[field] = value ? valueAsNumber : '';
    }

    onChange('items')([
      ...items.slice(0, index),
      { ...item },
      ...items.slice(index + 1),
    ]);
  };

  // eslint-disable-next-line arrow-body-style
  const renderCESelector = () => {
    return items.map((item, index) => {
      const {
        id,
        personnel,
        type,
        quantity,
        working_days,
        rate,
        amount,
      } = item;
      const isRegular = type === 'regular';

      return (
        <TableRow key={id}>
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell>{personnel}</TableCell>
          <TableCell>{type}</TableCell>
          <TableCell align="center">
            {isRegular ? (
              disabled ? (
                quantity
              ) : (
                <Editable
                  type="number"
                  value={quantity}
                  onChange={handleItemOnChange('quantity', index)}
                />
              )
            ) : null}
          </TableCell>
          <TableCell align="center">
            {isRegular ? (
              disabled ? (
                working_days
              ) : (
                <Editable
                  type="number"
                  value={working_days}
                  onChange={handleItemOnChange('working_days', index)}
                />
              )
            ) : null}
          </TableCell>
          <TableCell align="center">
            {isRegular ? (
              disabled ? (
                `₱ ${rate.toLocaleString()}`
              ) : (
                <Editable
                  type="number"
                  value={rate}
                  onChange={handleItemOnChange('rate', index)}
                />
              )
            ) : null}
          </TableCell>
          <TableCell align="center">
            {disabled ? (
              `₱ ${amount.toLocaleString()}`
            ) : (
              <Editable
                type="number"
                value={amount}
                onChange={handleItemOnChange('amount', index)}
              />
            )}
          </TableCell>
          <TableCell align="center">
            {!disabled && <RowMenuIcon onClick={handleOnMenuOpen(item)} />}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <StyledCESelector>
      <Menu
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={() => setMenu(null)}
      >
        <MenuItem
          style={{ fontSize: 12, color: 'red' }}
          onClick={handleOnDelete}
        >
          Delete
        </MenuItem>
      </Menu>
      <Modal
        isOpen={mode === 'add'}
        boxProps={{
          style: { width: '80%', minWidth: 600, minHeight: 200 },
        }}
      >
        <SelectorModal
          items={items}
          onChange={handleOnChange}
          onCancel={handleOnCancel}
        />
      </Modal>
      <TableTitle>
        <h6 style={{ margin: 8 }}>Item(s)</h6>
        {!disabled && (
          <StyledAddItemButton
            variant="contained"
            size="small"
            onClick={() => setMode('add')}
          >
            Add item
          </StyledAddItemButton>
        )}
      </TableTitle>
      <TableWrapper>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <StyledTableHeadCell align="center" style={{ minWidth: 64 }}>
                No.
              </StyledTableHeadCell>
              <StyledTableHeadCell>Personnel</StyledTableHeadCell>
              <StyledTableHeadCell>Type</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                # of Personnel
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Working Days
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Rate per Day
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">Amount</StyledTableHeadCell>
              <StyledTableHeadCell width={40} />
            </TableRow>
          </StyledTableHead>
          <TableBody>{renderCESelector()}</TableBody>
        </Table>
      </TableWrapper>
    </StyledCESelector>
  );
}

CESelector.propTypes = {
  items: array.isRequired,
  onChange: func,
  disabled: bool,
};

export default CESelector;
