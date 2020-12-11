import styled from 'styled-components';
import {
  Grid,
  TextField,
  Select,
  Button,
  FormControlLabel,
  Link as Anchor,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const BoxWrapper = styled(Grid)`
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

export const Box = styled(Grid)`
  width: 50%;
`;

export const Title = styled(Grid)`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
`;

export const Description = styled(Grid)`
  font-size: 12px;
  margin-top: 24px;
`;

export const Error = styled(Grid)`
  font-size: 12px;
  color: #ec4c47;
  margin-top: 24px;
  height: 14px;
`;

export const FormInput = styled(Grid)`
  margin-top: 24px;
  svg {
    position: absolute;
    z-index: 5;
    margin: -4px 8px;
  }
  .MuiFormLabel-root {
    margin-left: 32px;
    font-size: 14px;
  }
  .MuiFormLabel-filled,
  .Mui-focused {
    margin-left: 0px;
  }
  input {
    padding-left: 32px;
    font-size: 14px;
  }
`;

export const FormSelect = styled(Grid)`
  margin-top: 35px;
  svg {
    position: absolute;
    z-index: 5;
    margin: -4px 8px;
  }

  .MuiInputBase-root {
    width: 100%;
  }
  .MuiSelect-select {
    padding-left: 32px;
    font-size: 14px;
  }
  .awwDL .MuiSelect-select option {
    color: ${props => (props.gas ? 'red' : 'green')};
  }
`;

export const TopRightTeaser = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
  color: #234361;
`;

export const StyledTextField = withStyles(() => ({
  root: {
    width: '100%',
  },
}))(TextField);

export const StyledSelect = withStyles(() => ({}))(Select);

export const StyledButton = withStyles(() => ({
  root: {
    width: 200,
    borderRadius: 24,
    fontSize: 10,
    textTransform: 'none',
    fontWeight: 'normal',
    color: '#fff',
    backgroundColor: '#BF0E08',
    '&:hover': {
      backgroundColor: '#EC4C47',
    },
  },
}))(Button);

export const StyledBackButton = withStyles(() => ({
  root: {
    fontSize: 10,
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  label: {
    color: '#1070CA',
  },
}))(Button);

export const StyledFormControlLabel = withStyles(() => ({
  label: {
    fontSize: 10,
  },
}))(FormControlLabel);

export const StyledAnchor = withStyles(() => ({
  root: {
    color: '#1070CA',
  },
}))(Anchor);
