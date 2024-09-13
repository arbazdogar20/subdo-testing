import writeXlsxFile from 'write-excel-file';
import * as Sentry from '@sentry/nextjs';

export const generateSummaryExcelReport = async (userData, startDate, endDate) => {
    const { users } = userData;

    const schema = [
        {
            column: 'Employee Name',
            type: String,
            value: user => user.employeeName
        },
        {
            column: 'Employee Type',
            type: String,
            value: user => user.employeeType
        },
        {
            column: 'Employee Number',
            type: String,
            value: user => user.employeeNumber
        },
        {
            column: 'Time Worked',
            type: String,
            value: user => user.totalHoursWorked
        },
        {
            column: 'Wages',
            type: String, // Changed to String to include '$' prefix
            value: user => `$${user.totalWages}`
        }
    ];

    const data = users.map(user => ({
        employeeName: user.employeeName,
        employeeNumber: user.employeeNumber,
        employeeType: user.employeeType,
        totalHoursWorked: user.totalHoursWorked,
        totalWages: `$${user.totalWages}`
    }));

    const footer = [
        {
            employeeName: 'Total',
            employeeNumber: '', // No need to show employee number in total row
            employeeType: '',
            totalHoursWorked: userData.totalHoursWorked,
            totalWages: `$${userData.totalWages}`
        }
    ];

    // Calculate maximum content length for each column
    const maxColumnLengths = {};
    schema.forEach(field => {
        maxColumnLengths[field.column] = field.column.length; // Start with the header length
    });

    data.forEach(user => {
        schema.forEach(field => {
            const value = String(field.value(user));
            if (value.length > maxColumnLengths[field.column]) {
                maxColumnLengths[field.column] = value.length;
            }
        });
    });

    // Constructing the rows array
    const rows = [
        [{ value: null }, { value: 'Payroll Summary', colSpan: schema.length, align: 'center', fontWeight: 'bold' }], // Payroll Summary row
        [{ value: null }],
        [{ value: null }, { value: 'Start Date', align: 'center', fontWeight: 'bold' }, { value: startDate, align: 'center' }, { value: 'End Date', align: 'center', fontWeight: 'bold' }, { value: endDate, align: 'center' }],
        schema.map(field => ({ value: field.column, fontWeight: 'bold' })), // Column headers
        ...data.map(user => [
            { value: user.employeeName },
            { value: user.employeeType },
            { value: user.employeeNumber },
            { value: user.totalHoursWorked },
            { value: user.totalWages }
        ]), // Data rows
        [], // Empty row before the total row
        [
            { value: footer[0].employeeName, align: 'right', fontWeight: 'bold', backgroundColor: '#FFFF00' }, // Total row with yellow background
            { value: '', backgroundColor: '#FFFF00' }, // Placeholder for Employee Type
            { value: '', backgroundColor: '#FFFF00' }, // Placeholder for Employee Number
            { value: footer[0].totalHoursWorked, align: 'center', fontWeight: 'bold', backgroundColor: '#FFFF00' },
            { value: footer[0].totalWages, align: 'center', fontWeight: 'bold', backgroundColor: '#FFFF00' }
        ]
    ];

    // Set column widths based on maximum content length
    const columnWidths = schema.map(field => ({ width: maxColumnLengths[field.column] * 1.2 })); // Multiply by a factor to ensure content fits comfortably

    try {
        await writeXlsxFile(rows, {
            fileName: `Payroll_Summary_${startDate}_to_${endDate}.xlsx`,
            sheet: `Payroll_Summary`,
            columns: columnWidths  // Assign calculated column widths to the sheet
        });
    } catch (error) {
        Sentry.captureException(error);
    }
};
