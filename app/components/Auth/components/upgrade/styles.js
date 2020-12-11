import styled from 'styled-components';
import LoginBackground from '../../../../images/Construction Image-No Alpha.png';

export const Background = styled.div`
  height: 100%;
  background: url(${LoginBackground}) center center no-repeat;
`;

export const Smoke = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  transition: background-color 0.2s ease-in;
  color: #fff;
`;

export const Text = styled.div`
  text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.8);
  text-align: center;
`;
