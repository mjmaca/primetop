/**
 *
 * Gantt
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Gantt from './Gantt';
import '../../assets/api';

function index(props) {
  const { scheduleData } = props;
  return <Gantt {...props} tasks={scheduleData} />;
}

index.propTypes = {
  scheduleData: PropTypes.object,
};

export default index;
