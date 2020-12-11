/* eslint-disable camelcase */
import XLSX from 'xlsx';
import moment from 'moment';
import { truncateDecimal, getCostBreakdown } from '../../../../../../helpers';

export default props => {
  const { type, purchaseOrder, project } = props;
  const {
    po_no,
    delivery_date,
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
  const isReport = type === 'report';

  const project_worksheet_cols = [{ wpx: 150 }, { wpx: 300 }];
  const project_data = [
    ['Project', project.name],
    ['Site Address', delivery_address],
    ['Contact Person', delivery.contact_person],
    ['Contact #', delivery.contact_number],
    [
      'Delivery Date',
      moment(
        delivery_date.toDate ? delivery_date.toDate() : delivery_date,
      ).format('MM-DD-YYYY'),
    ],
    [],
    ['Supplier', supplier.name],
    ['Address', supplier_address],
    ['Contact Person', supplier.contact_person],
    ['Contact #', supplier.contact_number],
    [],
    ['Payment method', payment_method],
    ['Payment terms', payment_terms],
    ['Comments/Instructions', comments],
  ];

  const purchase_orders_worksheet_cols = [
    { wpx: 30 },
    { wpx: 300 },
    { wpx: 300 },
    { wpx: 150 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
  ];
  const purchase_orders_data = [
    // eslint-disable-next-line prettier/prettier
    ['No.', 'Item Name', 'Description', 'Quantity', 'Price per unit', 'Discount', 'Amount'],
    ...items.map((item, key) => {
      const { name, description, quantity, unit } = item;

      return [
        key,
        name,
        description,
        `${quantity.toLocaleString()} ${unit}`,
        '',
        '',
        '',
      ];
    }),
  ];

  let sub_total = 0;
  let total_discount = 0;
  const purchase_orders_report = [
    // eslint-disable-next-line prettier/prettier
    ['No.', 'Item Name', 'Description', 'Quantity', 'Price per unit', 'Discount %', 'Discount Amount', 'Total Amount', 'Estimated Amount', 'Difference'],
    ...items.map((item, key) => {
      const { name, description, unit } = item;
      const {
        actual_amount,
        discount,
        discount_percent,
        quantity,
        actual_price_per_unit,
        total_amount,
        estimated_amount,
        diff,
      } = getCostBreakdown(item);

      sub_total += actual_amount;
      total_discount += discount;

      return [
        key,
        name,
        description,
        `${quantity.toLocaleString()} ${unit}`,
        actual_price_per_unit.toLocaleString(),
        `${truncateDecimal(discount_percent)}%`,
        `${discount}`,
        total_amount.toLocaleString(),
        estimated_amount.toLocaleString(),
        diff === 0 ? '' : diff.toLocaleString(),
      ];
    }),
    // eslint-disable-next-line prettier/prettier
    ['', '', '', '', '', '', '---------------', '---------------',],
    [
      '',
      '',
      '',
      '',
      '',
      '',
      truncateDecimal(total_discount).toLocaleString(),
      truncateDecimal(sub_total - total_discount).toLocaleString(),
    ],
  ];

  const project_worksheet = XLSX.utils.aoa_to_sheet(project_data);
  project_worksheet['!cols'] = project_worksheet_cols;

  const purchase_orders_worksheet = XLSX.utils.aoa_to_sheet(
    isReport ? purchase_orders_report : purchase_orders_data,
  );
  purchase_orders_worksheet['!cols'] = purchase_orders_worksheet_cols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, project_worksheet, project.name);
  XLSX.utils.book_append_sheet(
    workbook,
    purchase_orders_worksheet,
    'Purchase Order',
  );

  XLSX.writeFile(workbook, `${project.name} - ${type} - ${po_no}.xlsx`, {});
};
