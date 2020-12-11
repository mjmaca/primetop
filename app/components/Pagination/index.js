/**
 *
 * Pagination
 *
 */

import React, { memo } from 'react';
import { number, func } from 'prop-types';

import { First, Last, Tiles, Tile } from './styles';

function Pagination(props) {
  const { count, page, perPage, onChange, limit = 10 } = props;
  const pages = Math.ceil(count / perPage);

  const renderItems = () => {
    const items = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pages; ++i) {
      items.push(
        <Tile
          key={i}
          className={i === page ? 'active' : ''}
          onClick={() => onChange(i)}
        >
          {i}
        </Tile>,
      );
    }

    const half = Math.ceil(limit / 2);
    let firstHalf = items.slice(page - half < 1 ? 0 : page - half, page);
    const finalHalf = items.slice(page, page + (limit - firstHalf.length));
    firstHalf =
      finalHalf.length < half
        ? items.slice(page - (limit - finalHalf.length), page)
        : firstHalf;

    return [...firstHalf, ...finalHalf];
  };

  return (
    <Tiles>
      <First onClick={() => onChange(1)}>First</First>
      {renderItems()}
      <Last onClick={() => onChange(pages)}>Last</Last>
    </Tiles>
  );
}

Pagination.propTypes = {
  limit: number,
  count: number.isRequired,
  page: number.isRequired,
  perPage: number.isRequired,
  onChange: func.isRequired,
};

export default memo(Pagination);
