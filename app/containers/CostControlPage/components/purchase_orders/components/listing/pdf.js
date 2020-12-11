/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import {
  pdf,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

import { truncateDecimal, getCostBreakdown } from '../../../../../../helpers';
import PrimetopLogo from '../../../../../../assets/logo.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  company: {
    width: 240,
    paddingRight: 8,
  },
  companyName: {
    fontSize: 14,
  },
  companyInfo: {
    fontSize: 10,
    fontWeight: 'normal',
    marginTop: 4,
  },
  label: {
    width: 200,
  },
  labelText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 28,
  },

  body: {
    flexDirection: 'row',
    marginTop: 24,
  },
  supplier: {
    width: 200,
  },
  delivery: {
    width: 200,
  },
  poInfo: {
    width: 140,
    fontSize: 10,
  },
  poField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  poLabel: {
    fontWeight: 'bold',
    textAlign: 'right',
    width: 80,
  },
  grayText: {
    fontSize: 12,
    color: '#818181',
  },
  regularText: {
    fontSize: 10,
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#373c4d',
    color: '#fff',
    fontSize: 10,
    width: 545,
  },
  tableHeaderCell: override => ({
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...override,
  }),
  tableRow: {
    flexDirection: 'row',
    fontSize: 10,
    width: 545,
    borderBottom: 1,
  },
  tableTotal: {
    flexDirection: 'row',
    fontSize: 10,
    width: 545,
  },
});

// Create Document Component
export const PDFDocument = props => {
  const { project, company, purchaseOrder } = props;
  const {
    po_no,
    delivery_date,
    created_date,
    delivery,
    supplier,
    payment_method,
    payment_terms,
    comments,
    items,
  } = purchaseOrder;
  // eslint-disable-next-line prettier/prettier
  const delivery_address = `${delivery.street || ''} ${delivery.city || ''} ${delivery.province || ''} ${delivery.zip || ''}`;
  // eslint-disable-next-line prettier/prettier
  const supplier_address = `${supplier.street || ''} ${supplier.city || ''} ${supplier.province || ''} ${supplier.zip || ''}`;

  let sub_total = 0;
  let total_discount = 0;

  items.forEach(item => {
    const { actual_amount, discount } = getCostBreakdown(item);

    sub_total += actual_amount;
    total_discount += discount;
  });

  return (
    <Document title={po_no} fileName={po_no}>
      <Page size="A4" style={styles.page}>
        <View style={{ margin: '0px 24px', overflow: 'hidden' }}>
          <View style={styles.header}>
            <View style={styles.logo}>
              {company.logo && <Image src={company.logo} />}
            </View>
            <View style={styles.company}>
              <Text style={styles.companyName}>{company.display_name}</Text>
              <Text style={styles.companyInfo}>{company.address || '-'}</Text>
              <Text style={styles.companyInfo}>
                Tax ID: {company.tin || '-'}
              </Text>
              <Text style={styles.companyInfo}>
                Phone: {company.contact_no || '-'}
              </Text>
              <Text style={styles.companyInfo}>Fax: {company.fax || '-'}</Text>
              <Text style={styles.companyInfo}>Email: {company.owner}</Text>
            </View>
            <View style={styles.label}>
              <Text style={styles.labelText}>Purchase Order</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.supplier}>
              <Text style={styles.grayText}>Supplier</Text>
              <View style={{ paddingRight: 8 }}>
                <Text style={styles.regularText}>{supplier.name}</Text>
                <Text style={styles.regularText}>{supplier_address}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.regularText, width: 50 }}>
                    Contact:
                  </Text>
                  <Text style={styles.regularText}>
                    {supplier.contact_person}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.regularText, width: 50 }}>
                    Phone:
                  </Text>
                  <Text style={styles.regularText}>
                    {supplier.contact_number}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.delivery}>
              <Text style={styles.grayText}>Delivery</Text>
              <View style={{ paddingRight: 8 }}>
                <Text style={styles.regularText}>{project.name}</Text>
                <Text style={styles.regularText}>{delivery_address}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.regularText, width: 50 }}>
                    Contact:
                  </Text>
                  <Text style={styles.regularText}>
                    {delivery.contact_person}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.regularText, width: 50 }}>
                    Phone:
                  </Text>
                  <Text style={styles.regularText}>
                    {delivery.contact_number}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.poInfo}>
              <View style={styles.poField}>
                <Text style={styles.poLabel}>PO:</Text>
                <Text style={{ marginLeft: 10, fontSize: 12 }}>{po_no}</Text>
              </View>
              <View style={styles.poField}>
                <Text style={styles.poLabel}>Doc Date:</Text>
                <Text style={{ marginLeft: 10 }}>
                  {moment(
                    created_date.toDate ? created_date.toDate() : created_date,
                  ).format('MM-DD-YYYY')}
                </Text>
              </View>
              <View style={styles.poField}>
                <Text style={styles.poLabel}>Delivery Date:</Text>
                <Text style={{ marginLeft: 10 }}>
                  {moment(
                    delivery_date.toDate
                      ? delivery_date.toDate()
                      : delivery_date,
                  ).format('MM-DD-YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 24 }}>
            <View style={styles.tableHeader}>
              <View style={styles.tableHeaderCell({ width: 20 })}>
                <Text>No</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 120 })}>
                <Text>Item</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 110 })}>
                <Text>Description</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 60 })}>
                <Text>QTY</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 75 })}>
                <Text>Unit Price</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 80 })}>
                <Text>Discount</Text>
              </View>
              <View style={styles.tableHeaderCell({ width: 80 })}>
                <Text>Amount</Text>
              </View>
            </View>
            <View
              render={() => {
                return items.map((item, index) => {
                  const { name, description, unit } = item;
                  const {
                    quantity,
                    actual_price_per_unit,
                    discount_percent,
                    actual_amount,
                  } = getCostBreakdown(item);

                  return (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.tableHeaderCell({ width: 20 })}>
                        <Text>{`${index + 1}`}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 120 })}>
                        <Text>{name}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 110 })}>
                        <Text>{description}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 60 })}>
                        <Text>{`${quantity} ${unit}`}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 75 })}>
                        <Text>{`P ${actual_price_per_unit.toLocaleString()}`}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 80 })}>
                        <Text>{`${discount_percent}%`}</Text>
                      </View>
                      <View style={styles.tableHeaderCell({ width: 80 })}>
                        <Text>{`P ${actual_amount.toLocaleString()}`}</Text>
                      </View>
                    </View>
                  );
                });
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <View
              style={{ width: '50%', flexShrink: 0, fontSize: 10, padding: 8 }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.grayText, fontSize: 10 }}>
                  Payment Method
                </Text>
                <Text style={{ marginLeft: 8 }}>
                  {payment_method.toUpperCase()}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.grayText, fontSize: 10 }}>
                  Payment Terms:
                </Text>
                <View
                  style={{
                    border: 1,
                    borderRadius: 2,
                    borderColor: '#ddd',
                    minHeight: 40,
                    padding: 4,
                  }}
                >
                  <Text>{payment_terms}</Text>
                </View>
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ ...styles.grayText, fontSize: 10 }}>
                  Comments or Special Instructions:
                </Text>
                <View
                  style={{
                    border: 1,
                    borderRadius: 2,
                    borderColor: '#ddd',
                    minHeight: 40,
                    padding: 4,
                  }}
                >
                  <Text>{comments}</Text>
                </View>
              </View>
            </View>
            <View
              style={{ width: '50%', flexShrink: 0, fontSize: 10, padding: 8 }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text>SUBTOTAL: </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text>{`P ${truncateDecimal(sub_total).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    },
                  )}`}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', color: '#EC4C47', marginTop: 4 }}
              >
                <View style={{ width: '50%' }}>
                  <Text>DISCOUNT: </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text>{`P ${truncateDecimal(total_discount).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    },
                  )}`}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <View style={{ width: '50%' }}>
                  <Text>GRAND TOTAL: </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontSize: 12 }}>{`P ${truncateDecimal(
                    sub_total - total_discount,
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          fixed
          style={{
            position: 'absolute',
            bottom: 16,
            width: '100%',
            borderTop: 1,
            paddingTop: 4,
            borderColor: '#ccc',
          }}
        >
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
  const { project, purchaseOrder, type } = props;
  const blob = await pdf(<PDFDocument {...props} />).toBlob();
  const fileName = `${project.name} - ${type} - ${purchaseOrder.po_no}.pdf`;
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
