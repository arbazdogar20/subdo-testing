import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { pdfStyles } from '@/shared/constants/pdfStyles';
import { PDF_CONSTANTS, TABLE_HEADERS } from '@/constants/pdfConstants';
import { generateAndDownloadPDF, generateTopTableHeaders, getBase64ImageFromURL } from '@/utils/pdfHandleUtil';
import { MAIN_TABLE_XANDYCOORDINATES } from '@/constants/pdfCoordinates';

// Create a new instance of pdfMake and register fonts
const pdfMakeInstance = { ...pdfMake };
pdfMakeInstance.vfs = pdfFonts.pdfMake.vfs;

export const generateSummaryPdfReport = async (dynamicData, startDate, endDate) => {
    const logoBase64 = await getBase64ImageFromURL(PDF_CONSTANTS.pdfLogoPath);

    const usersData = Array.isArray(dynamicData.users) ? dynamicData.users : [];

    const tableBody = [
        generateTopTableHeaders(TABLE_HEADERS.summary, 'summaryTableHeader'),
        ...usersData.map(user => 
            generateTopTableHeaders([user.employeeName || 'N/A', user.employeeNumber || 'N/A', user.employeeType || 'N/A', user.totalHoursWorked || '0:00', `$${(user.totalWages || 0).toFixed(2)}`], 'summaryTableData')
        ),
        [
            { text: 'Total', colSpan: 0, alignment: 'left', style: 'summaryTotals', border: [false, true, false, false] }, {text: '', style: 'summaryTotals'}, {text: '', style: 'summaryTotals'},
            { text: dynamicData.totalHoursWorked || '0:00', style: 'summaryTotals' },
            { text: `$${(dynamicData.totalWages || 0)}`, style: 'summaryTotals', border: [false, true, false, false] } // Apply bottom border
        ]
    ];

    const documentDefinition = {
        content: [
            {
                image: logoBase64,
                width: MAIN_TABLE_XANDYCOORDINATES.logo.width,
                height: MAIN_TABLE_XANDYCOORDINATES.logo.height,
            },
            {
                text: TABLE_HEADERS.summaryTitle,
                style: 'summaryHeader',
            },
            {
                text: `Period: ${startDate} to ${endDate}`,
                style: 'summarySubheader',
            },
            {
                table: {
                    headerRows: 1,
                    widths: TABLE_HEADERS.totalColumns,
                    body: tableBody,
                },
                layout: {
                    vLineWidth: function (i) {
                        return 0;
                    },
                    hLineWidth: function (i, node) {
                        return (i === 1 || i === node.table.body.length - 1) ? 1 : 0; // Apply top border below the first row and bottom border to the last row
                    },
                    hLineColor: function (i) {
                        return 'black'; // Border color
                    }
                },
                margin: [0, 20, 0, 20],
            }
        ],
        styles: pdfStyles,
        pageMargins: PDF_CONSTANTS.pageMargins,
        pageSize: PDF_CONSTANTS.pageSize,
        pageOrientation: PDF_CONSTANTS.pageOrientationPortrait,
    };

    generateAndDownloadPDF(
        documentDefinition,
        `Payroll_Summary_${startDate}_to_${endDate}.pdf`
    );
};
