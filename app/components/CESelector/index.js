/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { array, func, bool, object } from 'prop-types';

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

import { getCostBreakdown, truncateDecimal } from '../../helpers';

function CESelector(props) {
  const { items, onChange, disabled, disabledFields, hiddenFields } = props;
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
      case 'actual_price_per_unit':
      case 'discount': {
        item[field] = value ? valueAsNumber : '';
        const { actual_amount, discount } = getCostBreakdown(item);

        item.amount = truncateDecimal(actual_amount - discount);
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
        name,
        description,
        quantity,
        unit,
        actual_price_per_unit,
        discount,
        amount,
      } = item;

      return (
        <TableRow key={id}>
          <TableCell align="center">{index + 1}</TableCell>
          {!hiddenFields['name'] && <TableCell>{name}</TableCell>}
          {!hiddenFields['description'] && <TableCell>{description}</TableCell>}
          {!hiddenFields['quantity'] && (
            <TableCell align="center">
              {disabled || disabledFields['quantity'] ? (
                quantity.toLocaleString()
              ) : (
                <Editable
                  type="number"
                  value={quantity}
                  onChange={handleItemOnChange('quantity', index)}
                />
              )}
            </TableCell>
          )}
          {!hiddenFields['unit'] && (
            <TableCell align="center">{unit}</TableCell>
          )}
          {!hiddenFields['actual_price_per_unit'] && (
            <TableCell align="center">
              {disabled || disabledFields['actual_price_per_unit'] ? (
                `₱ ${actual_price_per_unit.toLocaleString()}`
              ) : (
                <Editable
                  type="number"
                  value={actual_price_per_unit}
                  onChange={handleItemOnChange('actual_price_per_unit', index)}
                />
              )}
            </TableCell>
          )}
          {!hiddenFields['discount'] && (
            <TableCell align="center">
              {disabled || disabledFields['discount'] ? (
                `${discount}%`
              ) : (
                <Editable
                  type="number"
                  value={discount}
                  onChange={handleItemOnChange('discount', index)}
                />
              )}
            </TableCell>
          )}
          {!hiddenFields['amount'] && (
            <TableCell align="center">₱ {amount.toLocaleString()}</TableCell>
          )}
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
          hiddenFields={hiddenFields}
          items={items}
          onChange={handleOnChange}
          onCancel={handleOnCancel}
        />
      </Modal>
      <TableTitle>
        <h6 style={{ margin: 8 }}>Item(s)</h6>
        {/* {!disabled && (
          <StyledAddItemButton
            variant="contained"
            size="small"
            onClick={() => setMode('add')}
          >
            Add item
          </StyledAddItemButton>
        )} */}
      </TableTitle>
      <TableWrapper>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <StyledTableHeadCell align="center" style={{ minWidth: 64 }}>
                No.
              </StyledTableHeadCell>
              {!hiddenFields['name'] && (
                <StyledTableHeadCell>Item Name</StyledTableHeadCell>
              )}
              {!hiddenFields['description'] && (
                <StyledTableHeadCell>Description</StyledTableHeadCell>
              )}
              {!hiddenFields['quantity'] && (
                <StyledTableHeadCell align="center">
                  Quantity
                </StyledTableHeadCell>
              )}
              {!hiddenFields['unit'] && (
                <StyledTableHeadCell align="center" style={{ minWidth: 100 }}>
                  Unit
                </StyledTableHeadCell>
              )}
              {!hiddenFields['actual_price_per_unit'] && (
                <StyledTableHeadCell align="center">
                  Unit Price
                </StyledTableHeadCell>
              )}
              {!hiddenFields['discount'] && (
                <StyledTableHeadCell align="center">
                  Discount (%)
                </StyledTableHeadCell>
              )}
              {!hiddenFields['amount'] && (
                <StyledTableHeadCell align="center" style={{ minWidth: 120 }}>
                  Amount
                </StyledTableHeadCell>
              )}
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
  disabledFields: object,
  hiddenFields: object,
};

CESelector.defaultProps = {
  disabledFields: {},
  hiddenFields: {},
};

export default CESelector;
