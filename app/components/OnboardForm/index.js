/**
 *
 * OnboadForm
 *
 */

import React, { useState } from 'react';
import firebase from 'firebase/app';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  FormControl,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  createCompanyAction,
  createUserAction,
  getCompanyByCodeAction,
  updateCompanyByCodeAction,
} from 'containers/OnboardPage/actions';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  stepper: {
    width: '600px',
    marginTop: '40px',
  },
}));

const getSteps = () => [
  'Set your company position',
  'Create or connect your company',
  'Set your profile',
];

function generateId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function OnboardForm(props) {
  const {
    createCompany,
    createUser,
    getCompanyByCode,
    updateCompanyByCode,
  } = props;
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [jobRole, setJobRole] = useState('co');
  const [company, setCompany] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const steps = getSteps();
  const classes = useStyles();
  const { currentUser } = firebase.auth();

  const SubmitOnboarding = async () => {
    const data = {
      code_number: generateId(10),
      members: [],
      name: company,
      owner: currentUser.email,
    };

    const profile = {
      first_name: firstName,
      last_name: lastName,
      mobile,
      province,
      city,
      company,
      email: currentUser.email,
      position: jobRole !== 'co' ? 'free' : 'co',
      is_onboard: true,
      id: currentUser.uid,
    };

    if (jobRole === 'co') {
      await createCompany(data);
      await createUser(profile);
      history.push('/projects');
    } else {
      const companyDetail = await getCompanyByCode(companyCode);
      let memberList = companyDetail[0].data().members;
      profile.company = companyDetail[0].data().name;
      await createUser(profile);
      const user = {
        user: `/users/${profile.id}`,
        status: 'active',
        projects: [],
      };

      if (memberList.length) {
        memberList.push(user);
      } else {
        memberList = [user];
      }

      await updateCompanyByCode(companyDetail[0].id, {
        members: memberList,
      });
      history.push('/projects');
    }
  };

  const handleNext = async () => {
    if (activeStep === 1 && jobRole !== 'co') {
      const response = await getCompanyByCode(companyCode);
      if (!response.length) {
        setErrorMsg('Company code number is not correct');
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      SubmitOnboarding();
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index === 0 && (
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="jobrole"
                    name="gender1"
                    value={jobRole}
                    onChange={event => setJobRole(event.target.value)}
                  >
                    <FormControlLabel
                      value="co"
                      control={<Radio />}
                      label="Contractor"
                    />
                    <FormControlLabel
                      value="pm"
                      control={<Radio />}
                      label="Project Manager"
                    />
                    <FormControlLabel
                      value="qs"
                      control={<Radio />}
                      label="Quantity Surveyor"
                    />
                    <FormControlLabel
                      value="se"
                      control={<Radio />}
                      label="Engineer"
                    />
                  </RadioGroup>
                </FormControl>
              )}

              {index === 1 && (
                <FormControl>
                  {jobRole === 'co' && (
                    <TextField
                      onChange={event => setCompany(event.target.value)}
                      label="Company Name"
                    />
                  )}
                  {jobRole !== 'co' && (
                    <TextField
                      error={!!errorMsg}
                      label="Company Code"
                      helperText={
                        errorMsg
                          ? 'The company code will be provided by your contractor'
                          : errorMsg
                      }
                      onChange={event => setCompanyCode(event.target.value)}
                    />
                  )}
                </FormControl>
              )}

              {index === 2 && (
                <FormControl fullWidth>
                  <TextField
                    onChange={event => setFirstName(event.target.value)}
                    label="First Name"
                  />

                  <TextField
                    onChange={event => setLastName(event.target.value)}
                    label="Last Name"
                  />

                  <TextField
                    onChange={event => setMobile(event.target.value)}
                    label="Mobile"
                  />

                  <TextField
                    onChange={event => setProvince(event.target.value)}
                    label="Province"
                  />

                  <TextField
                    onChange={event => setCity(event.target.value)}
                    label="City"
                  />

                  <TextField
                    label="Email Address"
                    defaultValue={currentUser.email}
                    disabled
                  />
                </FormControl>
              )}

              {index === 3 && <div>step 3</div>}

              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

OnboardForm.propTypes = {
  createCompany: func,
  createUser: func,
  getCompanyByCode: func,
  updateCompanyByCode: func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCompany: createCompanyAction,
      createUser: createUserAction,
      getCompanyByCode: getCompanyByCodeAction,
      updateCompanyByCode: updateCompanyByCodeAction,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(OnboardForm);
