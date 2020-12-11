/* eslint-disable no-param-reassign */
/**
 *
 * Gantt
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './customGantt.css';

const getComments = task => (task.comments ? task.comments : 'No Information');

function Gantt(props) {
  const { tasks, gantt, permission } = props;
  let ganttContainer;

  const forceHideTooltip = () => {
    /** force delete tooltip */
    document.querySelectorAll('.gantt_tooltip').forEach(tooltip => {
      const parent = tooltip.parentNode;
      parent.removeChild(tooltip);
    });
  };

  useEffect(() => {
    gantt.config.xml_date = '%Y-%m-%d %H:%i';
    gantt.config.open_tree_initially = true;
    gantt.config.drag_resize = permission.edit || false;
    gantt.config.drag_move = permission.edit || false;
    gantt.config.drag_create = permission.edit || false;
    gantt.config.details_on_dblclick = permission.status || false;
    gantt.plugins({ marker: true, tooltip: true });

    // tooltip setup
    gantt.locale.labels.section_comments = 'Comments';
    gantt.templates.tooltip_text = (start, end, task) =>
      `<b>Task:</b> ${
        task.text
      }<br/><b>Start date:</b> ${gantt.templates.tooltip_date_format(
        start,
      )}<br/><b>End date:</b> ${gantt.templates.tooltip_date_format(
        end,
      )}<br/><b>Comments:</b> ${getComments(task)}`;

    // setup the modal
    gantt.locale.labels.section_status = 'Status';
    gantt.config.lightbox.sections = [
      {
        name: 'description',
        height: 38,
        map_to: 'text',
        type: 'textarea',
        focus: true,
      },
      {
        name: 'status',
        height: 22,
        map_to: 'status',
        type: 'select',
        options: [
          { key: 'not_started', label: 'Not Started' },
          { key: 'on_going', label: 'On Going' },
          { key: 'finished', label: 'Finished' },
          { key: 'overdue', label: 'Overdue' },
        ],
      },
      {
        name: 'comments',
        height: 38,
        map_to: 'comments',
        type: 'textarea',
      },
      { name: 'time', height: 72, type: 'duration', map_to: 'auto' },
    ];

    gantt.config.columns = [
      {
        name: 'text',
        label: 'Task name',
        align: 'left',
        tree: true,
        width: '*',
      },
      {
        name: 'start_date',
        label: 'Start time',
        align: 'center',
        hide: true,
      },
      {
        name: 'duration',
        label: 'Duration',
        align: 'center',
        width: 50,
      },
      { name: 'status', label: 'Status', align: 'center', hide: true },
      { name: 'add', label: '', hide: !permission.add },
    ];

    gantt.init(ganttContainer);
    gantt.clearAll();

    function taskColorUpdate(task) {
      switch (task.status) {
        case 'on_going':
          task.color = '#4caf50';
          break;
        case 'finished':
          task.color = '#2196f3';
          break;
        case 'overdue':
          task.color = '#f44336';
          break;
        default:
          task.color = '#ffeb3b';
      }
    }

    gantt.attachEvent('onTaskLoading', task => {
      taskColorUpdate(task);
      return true;
    });

    gantt.attachEvent('onBeforeTaskAdd', (id, item) => {
      taskColorUpdate(item);
      return true;
    });

    gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
      taskColorUpdate(item);
      return true;
    });

    gantt.templates.grid_row_class = (start, end, task) => {
      if (task.$level > 1) {
        return 'hidden-add-button';
      }
      return '';
    };

    gantt.attachEvent('onTaskDrag', (id, mode, task) => {
      const formatFunc = gantt.date.date_to_str('%d/%m/%Y');
      if (
        formatFunc(task.start_date) === formatFunc(gantt.getState().min_date)
      ) {
        gantt.getState().min_date = gantt.date.add(
          gantt.getState().min_date,
          -1,
          'day',
        );
        gantt.render();
        gantt.showDate(gantt.getState().min_date);
      } else if (
        formatFunc(task.end_date) === formatFunc(gantt.getState().max_date)
      ) {
        gantt.getState().max_date = gantt.date.add(
          gantt.getState().max_date,
          1,
          'day',
        );
        gantt.render();
        gantt.showDate(gantt.getState().max_date);
      }
    });

    const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    gantt.addMarker({
      start_date: new Date(),
      css: 'today',
      text: 'Today',
      title: dateToStr(new Date()),
    });

    gantt.parse(tasks);

    return () => {
      forceHideTooltip();
    };
  }, []);

  return (
    <Grid>
      <div
        ref={input => {
          ganttContainer = input;
        }}
        style={{ width: '100%', height: '500px' }}
      />
    </Grid>
  );
}

Gantt.propTypes = {
  permission: PropTypes.object,
  tasks: PropTypes.object,
  gantt: PropTypes.object,
};

export default Gantt;
