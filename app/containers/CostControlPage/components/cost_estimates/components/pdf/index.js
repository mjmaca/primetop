/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { pdf, Page, Text, View, Image, Document } from '@react-pdf/renderer';

// import { truncateDecimal, getCostBreakdown } from '../../../../helpers';
import PrimetopLogo from '../../../../../../assets/logo.png';

import {
  StyledPage,
  PageWrapper,
  Banner,
  LogoWrapper,
  CompanyInfoWrapper,
  DisplayName,
  CompanyInfo,
  PageTitleWrapper,
  PageTitle,
  ProjectWrappper,
  ProjectInfoWrapper,
  ProjectLabel,
  ProjectInfo,
  ProjectEstimatesWrapper,
  EstimatesInfoWrapper,
  EstimatesLabel,
  EstimatesWrapper,
  Level0,
  Level1,
  Level2,
  EstimatesItems,
  EstimateItem,
  FooterWrapper,
} from './styles';

// Create Document Component
export const PDFDocument = props => {
  const { project, company, schedules, estimates, totalEstimates } = props;
  // eslint-disable-next-line prettier/prettier
  const project_address = `${project.street || ''} ${project.city || ''} ${project.province || ''} ${project.zipcode || ''}`;

  const toMoneyFormat = num =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });

  const renderEstimateItems = (items, type) => {
    return items.map(item => {
      switch (type) {
        case 'material_cost': {
          const {
            id,
            name,
            description,
            amount,
            unit,
            quantity,
            price_per_unit,
          } = item;

          return (
            <View key={id} style={EstimateItem}>
              <View style={{ width: '30%' }}>
                <Text>{name}</Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text>{description}</Text>
                <Text>
                  {`${quantity}${unit} ${toMoneyFormat(
                    price_per_unit,
                  )} per ${unit}`}
                </Text>
              </View>
              <View style={{ width: '30%', textAlign: 'right' }}>
                <Text>P {toMoneyFormat(amount)}</Text>
              </View>
            </View>
          );
        }
        case 'labor_cost': {
          const {
            id,
            personnel,
            type,
            working_days,
            rate,
            quantity,
            amount,
          } = item;

          return (
            <View key={id} style={EstimateItem}>
              <View style={{ width: '30%' }}>
                <Text>
                  {quantity} {personnel}
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                {type === 'regular' ? (
                  <Text>{`${working_days} day(s) ${toMoneyFormat(
                    rate,
                  )} per day`}</Text>
                ) : (
                  <Text>{type}</Text>
                )}
              </View>
              <View style={{ width: '30%', textAlign: 'right' }}>
                <Text>P {toMoneyFormat(amount)}</Text>
              </View>
            </View>
          );
        }
        case 'equipment_cost': {
          const {
            id,
            name,
            acquisition_type,
            quantity,
            usage,
            unit,
            price_per_unit,
            amount,
          } = item;
          const isRent = acquisition_type === 'rent';

          return (
            <View key={id} style={EstimateItem}>
              <View style={{ width: '30%' }}>
                <Text>
                  {quantity} {name}
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text>
                  {`${toMoneyFormat(price_per_unit)} ${
                    isRent ? 'of' : 'per'
                  } ${usage}${unit} ${isRent ? 'rent' : 'unit'} `}
                </Text>
              </View>
              <View style={{ width: '30%', textAlign: 'right' }}>
                <Text>P {toMoneyFormat(amount)}</Text>
              </View>
            </View>
          );
        }
      }
    });
  };

  const renderEstimates = (items, level = 0) => {
    return items.map((item, index) => {
      const children = schedules.filter(({ parent }) => parent === item.id);
      const hasChildren = !isEmpty(children);
      const LabelStyle = [Level0, Level1, Level2][level];
      const cost_estimates = estimates.filter(
        ({ schedule_id }) => schedule_id == item.id,
      );

      return (
        <View key={`schedule-${level}-${index}`}>
          <View style={LabelStyle}>
            <Text style={{ marginLeft: level * 4 }}>
              {level > 0 && '-'}
              {item.text}
            </Text>
          </View>
          <View style={EstimatesItems}>
            {cost_estimates.map(estimate => {
              const {
                id,
                material_cost,
                labor_cost,
                equipment_cost,
              } = estimate;

              return (
                <View key={id}>
                  {renderEstimateItems(material_cost, 'material_cost')}
                  {renderEstimateItems(labor_cost, 'labor_cost')}
                  {renderEstimateItems(equipment_cost, 'equipment_cost')}
                </View>
              );
            })}
          </View>
          {hasChildren && renderEstimates(children, level + 1)}
        </View>
      );
    });
  };

  return (
    <Document title="Cost Estimates" fileName="Estimates">
      <Page size="A4" style={StyledPage}>
        <View style={PageWrapper}>
          <View style={Banner}>
            <View style={LogoWrapper}>
              {company.logo && <Image src={company.logo} />}
            </View>
            <View style={CompanyInfoWrapper}>
              <Text style={DisplayName}>{company.display_name}</Text>
              <Text style={CompanyInfo}>{company.address || '-'}</Text>
              <Text style={CompanyInfo}>Tax ID: {company.tin || '-'}</Text>
              <Text style={CompanyInfo}>
                Phone: {company.contact_no || '-'}
              </Text>
              <Text style={CompanyInfo}>Fax: {company.fax || '-'}</Text>
              <Text style={CompanyInfo}>Email: {company.owner}</Text>
            </View>
            <View style={PageTitleWrapper}>
              <Text style={PageTitle}>Cost Estimates</Text>
            </View>
          </View>

          <View style={ProjectWrappper}>
            <View style={ProjectInfoWrapper}>
              <Text style={ProjectLabel}>Project</Text>
              <View style={{ paddingRight: 8 }}>
                <Text style={ProjectInfo}>{project.name}</Text>
                <Text style={ProjectInfo}>{project_address}</Text>
              </View>
            </View>

            <View style={ProjectEstimatesWrapper}>
              <View style={EstimatesInfoWrapper}>
                <Text style={EstimatesLabel}>Total</Text>
                <Text style={ProjectLabel}>
                  P {toMoneyFormat(totalEstimates)}
                </Text>
              </View>
              <View style={EstimatesInfoWrapper}>
                <Text style={EstimatesLabel}>Doc Date:</Text>
                <Text style={{ marginLeft: 10 }}>
                  {moment().format('MM-DD-YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View style={EstimatesWrapper}>
            {renderEstimates(schedules.filter(({ parent }) => !parent))}
          </View>
        </View>
        <View fixed style={FooterWrapper}>
          <View style={{ textAlign: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: 50 }}>
                <Text style={{ fontSize: 8 }}>Powered by:</Text>
              </View>
              <View>
                <Image src={PrimetopLogo} style={{ width: 12, height: 12 }} />
              </View>
              <View style={{ width: 40 }}>
                <Text style={{ fontSize: 8 }}>Primetop</Text>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 8, color: '#0091FF' }}>
                www.primetop.app
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default async props => {
  const { project } = props;
  const blob = await pdf(<PDFDocument {...props} />).toBlob();
  const fileName = `${project.name} - Cost Estimates.pdf`;
  const link = document.createElement('a');
  // create a blobURI pointing to our Blob
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  window.addEventListener('focus', () => URL.revokeObjectURL(link.href), {
    once: true,
  });
};
