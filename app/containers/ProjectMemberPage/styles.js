import styled from 'styled-components';

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .MuiCircularProgress-root {
    margin-bottom: 16px;
    color: #3f51b5 !important;
  }
`;
