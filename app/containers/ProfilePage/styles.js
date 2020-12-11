import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

export const AvatarWrapper = styled.div`
  position: relative;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.8);
  border-radius: 100%;
  .uploader {
    border: 1px solid #425a70;
  }
  &:hover {
    .uploader {
      opacity: 1;
    }
  }
`;

export const UploaderIconWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: -8px;
  background: white;
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s;
`;

export const FieldInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  border-bottom: 1px solid #425a70;
  &.Combobox {
    > div {
      > div {
        width: 100%;
        > input {
          box-shadow: none;
        }
        > button {
          box-shadow: none;
          background: white;
          &: hover {
            background: white !important;
          }
          &: focus {
            box-shadow: none !important;
          }
        }
      }
    }
  }
`;

export const StyledProfile = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #fff;
  min-height: 100vh;
`;

export const ProfileWrapper = styled.div`
  width: 328px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ProfileTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #234361;
`;

export const FormWrapper = styled.div`
  width: 328px;
  display: flex;
  flex-flow: column;
  margin: 24px 0px;
`;

export const FormActionWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

export const StyledSubmitButton = withStyles(() => ({
  root: {
    width: 80,
    margin: '0px 8px',
    color: 'white',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(rgb(7, 136, 222), rgb(17, 106, 184))',
    boxShadow:
      'rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset',
    textTransform: 'none',
  },
}))(Button);

export const StyledCancelButton = withStyles(() => ({
  root: {
    width: 80,
    margin: '0px 8px',
    color: 'rgb(66, 90, 112)',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(rgb(255, 255, 255), rgb(244, 245, 247))',
    boxShadow:
      'rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset',
    textTransform: 'none',
  },
}))(Button);

export const StyledInput = withStyles(() => ({
  root: {
    width: '100%',
    marginLeft: 8,
  },
}))(InputBase);
