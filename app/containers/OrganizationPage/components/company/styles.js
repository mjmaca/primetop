import styled from 'styled-components';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

export const StyledCompany = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0px;
`;

export const LogoWrapper = styled.div`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-top: 32px;
  position: relative;

  background: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UploadTrigger = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #3f51b5;
  bottom: 0px;
  right: 0px;
  background-color: #fff;
  cursor: pointer;
  color: #3f51b5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 500px;
`;

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  position: relative;
  margin-top: 8px;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: -8px;
  right: 16px;
  font-size: 12px;
  color: #ec4c47;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const StyledInputLabel = withStyles(() => ({
  root: {
    marginRight: 8,
    width: '100px',
    fontSize: 12,
    fontWeight: 500,
    flexShrink: 0,
  },
}))(InputLabel);

export const StyledTextField = withStyles(() => ({
  root: {
    width: '100%',
  },
}))(TextField);
