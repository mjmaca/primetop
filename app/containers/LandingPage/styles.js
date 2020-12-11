import { makeStyles } from '@material-ui/core/styles';
import Background from '../../assets/headerBg.png';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 4,
  },
  logoTitle: {
    color: '#0F6A9F',
    fontFamily: 'Jost',
    fontWeight: 600,
  },
  logoSubTitle: {
    color: '#0F6A9F',
    fontWeight: 300,
  },
  upperTitle: {
    fontFamily: 'Jost',
    color: '#0F6A9F',
    fontWeight: 600,
  },
  mainTitle: {
    fontFamily: 'Jost',
    color: '#0F6A9F',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      padding: 16,
      textAlign: 'center',
    },
  },
  mainSubTitle: {
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      padding: 16,
      fontSize: 16,
      textAlign: 'center',
    },
  },
  appbar: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
  },
  main: {
    height: 'calc(100vh - 74px)',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      backgroundImage: 'none',
    },
  },
  brandName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  headerCol: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  demoButton: {
    margin: 16,
  },
  graySection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
  },
  blueSection: {
    backgroundColor: '#0F6A9F',
    paddingTop: 32,
    paddingBottom: 32,
    color: '#FFFFFF',
  },
  quotationHolder: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  quotationText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  quotationAuthor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  avatarAllan: {
    marginRight: 8,
  },
  paper: {
    width: 300,
    padding: 16,
  },
  featuresGrid: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  footerSection: {
    backgroundColor: '#0F6A9F',
    padding: 8,
    textAlign: 'center',
  },
  footerText: {
    color: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#0F6A9F',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#0F6A9F',
      color: '#0F6A9F',
    },
  },
  testimonialsHolder: {
    textAlign: 'center',
  },
  testimonialsText: {
    fontSize: 16,
  },
  font8: {
    fontSize: 8,
  },
  font12: {
    fontSize: 12,
  },
  font16: {
    fontSize: 16,
  },
  font24: {
    fontSize: 24,
  },
  textCenter: {
    textAlign: 'center',
  },
  illustrationImg: {
    width: '88%',
  },
  featureItem: {
    marginBottom: 40,
  },
  backgroundLightBlue: {
    backgroundColor: '#f5f8fd',
  },
  companyLogo: {
    maxWidth: 150,
    maxHeight: 55,
  },
  companiesHolder: {
    marginBottom: 40,
  },
}));
