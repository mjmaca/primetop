/**
 *
 * ProjectMember
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectMember() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ProjectMember.propTypes = {};

export default ProjectMember;
