import styled from 'styled-components';

const borderColor = '#E4E7EB';

export const Tiles = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  font-size: 12px;
`;

export const Tile = styled.div`
  min-width: 24px;
  height: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-right: 1px solid ${borderColor};
  &.active {
    background-color: #3d8bd4;
    color: #fff;
  }
`;

export const First = styled.div`
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${borderColor};
`;

export const Last = styled(First)`
  border-right: none;
`;
