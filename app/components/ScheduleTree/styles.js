import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const Tree = styled.div`
  overflow-y: hidden;
  width: 200px;

  .child {
    margin-top: 4px;
    .label {
      display: flex;
      align-items: center;
      .text {
        width: calc(100% - 16px);
        display: block;
        text-decoration: none;
        cursor: pointer;
        color: initial;
        text-transform: capitalize;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .menu-icon,
      .add-icon {
        font-size: 16px;
        cursor: pointer;
      }
      .menu-icon {
        visibility: hidden;
      }

      &:hover {
        .menu-icon {
          visibility: visible;
        }
      }
    }
    .children {
      margin: 8px;
      margin-left: 16px;
      margin-right: 0px;
    }
  }
  .child.selected {
    .text {
      background-color: #e4e7eb;
    }
  }
  .child.level-0 {
    .text {
      font-weight: 500;
      font-size: 14px;
    }
  }
  .child.level-1 {
    .text {
      font-weight: 500;
      font-size: 14px;
    }
    .children {
      border-left: 1px solid #425a70;
      padding-left: 4px;
    }
  }
  .child.level-2 {
    .text {
      font-size: 12px;
      color: #1070ca;
      padding: 8px;
    }
  }

  //CSSTransition Animations

  .enter {
    opacity: 0.01;
    transform: scaleY(0.9) translateY(-25%);
  }

  .enter-active {
    opacity: 1;
    transform: scaleY(1) translateY(0%);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .exit {
    opacity: 1;
    transform: scaleY(1) translateY(0%);
  }

  .exit-active {
    opacity: 0.01;
    transform: scaleY(0.9) translateY(-25%);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

export const VoidIcon = styled.div`
  margin-right: 16px;
`;

export const AddNewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const StyledAddButton = withStyles(() => ({
  root: {
    width: 120,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 500,
    color: '#47B881',
    borderColor: '#47B881',
    '&:hover': {
      borderColor: '#D4EEE2',
      backgroundColor: '#D4EEE2',
    },
  },
}))(Button);
