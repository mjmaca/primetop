import withStyles from '@material-ui/core/styles/withStyles';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';

export const StyledCollapse = withStyles(() => ({
  container: {
    marginLeft: 56,
    borderLeft: '1px solid #ddd',
  },
}))(Collapse);

export const SecondaryListItemText = withStyles(() => ({
  primary: {
    fontSize: 14,
  },
}))(ListItemText);
