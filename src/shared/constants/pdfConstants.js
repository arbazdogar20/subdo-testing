export const PDF_CONSTANTS = {
  pdfLogoPath: '/images/logo_transparent_background.png',
  mainRectangeAbsoluteX: 40,
  mainRectangeAbsoluteY: 20,
  pageMargins: [40, 20, 40, 20],
  pageSize: 'A4',
  pageOrientation: 'Landscape',
  pageOrientationPortrait: 'Portrait',
  canvasType: 'rect',
  style: 'heading'
};

export const TABLE_HEADERS = {
  summary: [
    'Employee Name',
    'Employee Number',
    'Employee Type',
    'TTLH Worked',
    'Total Wages'
  ],
  totalColumns: ['*', '*', '*', '*', '*'],
  summaryTitle: 'Payroll Summary Report'
};

export const SPECIAL_HEADERS = ['Department', 'Wage'];
export const SPECIAL_STYLES = ['departmentData', 'wageData'];