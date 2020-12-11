import { StyleSheet } from '@react-pdf/renderer';

export const StyledPage = StyleSheet.create({
  paddingTop: 24,
  paddingBottom: 50,
});

export const PageWrapper = StyleSheet.create({
  margin: '0px 24px',
  overflow: 'hidden',
});

export const Banner = StyleSheet.create({
  flexDirection: 'row',
});

export const LogoWrapper = StyleSheet.create({
  width: 100,
  height: 100,
  paddingRight: 8,
  alignItems: 'center',
  justifyContent: 'center',
});

export const CompanyInfoWrapper = StyleSheet.create({
  width: 240,
  paddingRight: 8,
});

export const DisplayName = StyleSheet.create({
  fontSize: 14,
});

export const CompanyInfo = StyleSheet.create({
  fontSize: 10,
  fontWeight: 'normal',
  marginTop: 4,
});

export const PageTitleWrapper = StyleSheet.create({
  width: 200,
});

export const PageTitle = StyleSheet.create({
  textAlign: 'right',
  fontWeight: 'bold',
  fontSize: 28,
});

export const ProjectWrappper = StyleSheet.create({
  flexDirection: 'row',
  marginTop: 24,
  justifyContent: 'space-between',
});

export const ProjectInfoWrapper = StyleSheet.create({
  width: '60%',
});

export const ProjectLabel = StyleSheet.create({
  fontSize: 12,
  color: '#818181',
});

export const ProjectInfo = StyleSheet.create({
  fontSize: 10,
  marginTop: 4,
});

export const ProjectEstimatesWrapper = StyleSheet.create({
  width: '40%',
  fontSize: 10,
});

export const EstimatesInfoWrapper = StyleSheet.create({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const EstimatesLabel = StyleSheet.create({
  fontWeight: 'bold',
  textAlign: 'right',
  width: 80,
});

export const EstimatesWrapper = StyleSheet.create({
  marginTop: 16,
});

export const Level0 = StyleSheet.create({
  backgroundColor: '#515151',
  fontSize: 14,
  padding: 4,
  color: '#ddd',
});

export const Level1 = StyleSheet.create({
  backgroundColor: '#747474',
  fontSize: 12,
  padding: 4,
  color: '#ddd',
});

export const Level2 = StyleSheet.create({
  backgroundColor: '#8b8b8b',
  fontSize: 10,
  padding: 4,
  color: '#ddd',
  borderBottom: 0.2,
  borderColor: '#fff',
});

export const EstimatesItems = StyleSheet.create({
  padding: '0px 16px',
  fontSize: 10,
});

export const EstimateItem = StyleSheet.create({
  flexDirection: 'row',
  borderBottom: 0.2,
  borderColor: '#000',
  padding: 4,
});

export const FooterWrapper = StyleSheet.create({
  position: 'absolute',
  bottom: 16,
  width: '100%',
  borderTop: 1,
  paddingTop: 4,
  borderColor: '#ccc',
});
