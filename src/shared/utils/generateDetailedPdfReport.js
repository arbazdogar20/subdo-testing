import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {pdfStyles} from '@/shared/constants/pdfStyles';
import {
  generateAndDownloadPDF,
  generateAutoArray,
  generateTableData,
  generateTopTableHeaders,
  getBase64ImageFromURL,
  truncateText,
} from '@/shared/utils/pdfHandleUtil';
import {
  detailedTableHeaders,
  employeeBasicInfoTableHeaders,
  topColumnHeader,
} from '@/shared/constants/tableHeaders';
import {MAIN_TABLE_XANDYCOORDINATES} from '@/shared/constants/pdfCoordinates';
import {
  PDF_CONSTANTS,
  SPECIAL_HEADERS,
  SPECIAL_STYLES,
} from '@/shared/constants/pdfConstants';

// Create a new instance of pdfMake and register fonts
const pdfMakeInstance = {...pdfMake};
pdfMakeInstance.vfs = pdfFonts.pdfMake.vfs;

export const generateDetailedPdfReport = async (
  dynamicData,
  startDate,
  endDate
) => {
  const logoBase64 = await getBase64ImageFromURL(PDF_CONSTANTS.pdfLogoPath);
  const documentDefinition = {
    content: [
      {
        image: logoBase64,
        width: MAIN_TABLE_XANDYCOORDINATES.logo.width,
        height: MAIN_TABLE_XANDYCOORDINATES.logo.height,
      },
      {
        canvas: [
          {
            type: PDF_CONSTANTS.canvasType,
            x: MAIN_TABLE_XANDYCOORDINATES.mainRectangle.x,
            y: MAIN_TABLE_XANDYCOORDINATES.mainRectangle.y,
            w: MAIN_TABLE_XANDYCOORDINATES.mainRectangle.width,
            h: MAIN_TABLE_XANDYCOORDINATES.mainRectangle.height,
            color: MAIN_TABLE_XANDYCOORDINATES.mainRectangle.color,
          },
        ],
        absolutePosition: {
          x: PDF_CONSTANTS.mainRectangeAbsoluteX,
          y: PDF_CONSTANTS.mainRectangeAbsoluteY,
        },
      },
      {
        text: MAIN_TABLE_XANDYCOORDINATES.pdfHeaderText.text,
        style: PDF_CONSTANTS.style,
        absolutePosition: {
          x: MAIN_TABLE_XANDYCOORDINATES.pdfHeaderText.x,
          y: MAIN_TABLE_XANDYCOORDINATES.pdfHeaderText.y,
        },
      },
    ],
    styles: pdfStyles,
    pageMargins: PDF_CONSTANTS.pageMargins,
    pageSize: PDF_CONSTANTS.pageSize,
    pageOrientation: PDF_CONSTANTS.pageOrientation,
  };

  const userKeys = Object.keys(dynamicData);
  userKeys.forEach((userKey, index) => {
    if (dynamicData.hasOwnProperty(userKey)) {
      const userData = dynamicData[userKey];
      const fullName = userData.employeeName;
      const employeeID = userData.employeeId;
      const designation = userData.designation;
      const hourlyRate = userData.hourlyRate;
      const reportStartDate = startDate;
      const reportEndDate = endDate;
      const weeks = userData.weeks;
      const totalTrackedHours = userData.totalTrackedHours;
      const totalWageOfEmployee = userData.totalWageOfEmployee;

      const fullNameTable = [
        {
          table: {
            headerRows: 1,
            widths: generateAutoArray(4),
            body: [
              generateTopTableHeaders(
                employeeBasicInfoTableHeaders,
                'columnText'
              ),
              generateTopTableHeaders(
                [fullName, employeeID, designation, `$${hourlyRate}`],
                'firstNameHeader'
              ),
            ],
          },
          layout: {
            hLineWidth: () => 0, // Hide horizontal lines for rows except header
            vLineWidth: () => 0, // Hide vertical lines
          },
        },
      ];
      documentDefinition.content.push(...fullNameTable);

      const initialDetailsTable = [
        {
          table: {
            headerRows: 1,
            widths: generateAutoArray(4),
            body: [
              generateTopTableHeaders(topColumnHeader, 'employeeSecondTable'),
              generateTopTableHeaders(
                [
                  `${reportStartDate} to ${reportEndDate}`,
                  totalTrackedHours,
                  `$${totalWageOfEmployee}`,
                  '',
                ],
                'columnHeader'
              ),
            ],
          },
          layout: {
            hLineWidth: () => 0, // Hide horizontal lines
            vLineWidth: () => 0, // Hide vertical lines
          },
        },
      ];
      documentDefinition.content.push(...initialDetailsTable);

      weeks?.forEach((week) => {
        let previousWeekNumber = null;
        const weekTotalWage =
          week.weekWage === '-' ? '-' : `$${Number(week.weekWage) || ''}`;
        const weekTableBody = [
          generateTopTableHeaders(
            detailedTableHeaders,
            'employeeTableHeader',
            SPECIAL_HEADERS,
            SPECIAL_STYLES
          ),
          ...week.days.reduce((acc, day) => {
            const isEdited = day?.isEdited;
            const dayName = `${day.day} ${isEdited ? '*' : ''}`;
            const weekNumber =
              previousWeekNumber === week.weekNumber ? '' : week.weekNumber;
            previousWeekNumber = week.weekNumber;
            const dayWage = day.dayWage === '-' ? '-' : `$${day.dayWage}`;

            acc.push(
              generateTableData(
                [
                  weekNumber,
                  dayName,
                  day.dateIn || '-',
                  day.logs.map((log) => log.startTime).join('\n') || '-',
                  day.dateOut || '-',
                  day.logs.map((log) => log.endTime).join('\n') || '-',
                  day.logs
                    .map((log) => truncateText(log.department, 15))
                    .join('\n') || '-',
                  day.logs.map((log) => log.status).join('\n') || '-',
                  day.logs.map((log) => log.hoursAndMinutes).join('\n') || '-',
                  day.logs.map((log) => log.hours).join('\n') || '-',
                  day.logs.map((log) => log.wage).join('\n') || '-',
                  day.dayTrackedHours,
                  dayWage,
                  day.dayBreakHours,
                ],
                [
                  ...Array.from({length: 12}, () => 'employeeTableData'),
                  {
                    fillColor: '#DFEEF9',
                    fontSize: 9,
                    bold: true,
                    color: '#040404',
                    margin: [0, 0, 0, 0],
                    alignment: 'center',
                  },
                  {
                    fillColor: '#DFEEF9',
                    fontSize: 9,
                    bold: true,
                    color: '#040404',
                    margin: [0, 0, 0, 0],
                    alignment: 'center',
                  },
                  {
                    fillColor: '#DFEEF9',
                    fontSize: 9,
                    bold: true,
                    color: '#040404',
                    margin: [0, 0, 0, 0],
                    alignment: 'center',
                  },
                ]
              )
            );
            return acc;
          }, []),
          generateTableData(
            [
              'WK Totals',
              ...Array.from({length: 10}, () => '-'),
              week.weekTotalHours,
              `${weekTotalWage}`,
              week.weeklyBreakHours,
            ],
            [...Array.from({length: 14}, () => 'weeklyTotalRow')]
          ),
        ];

        const userTable = [
          {
            margin: [0, 20, 0, 0],
            table: {
              headerRows: 1,
              dontBreakRows: true,
              keepWithHeaderRows: 1,
              widths: generateAutoArray(14),
              body: weekTableBody,
            },
            layout: {
              hLineWidth: () => 0.2,
              vLineWidth: () => 0.2,
              vLineColor: () => '#CCCCCC',
              hLineColor: () => '#CCCCCC',
            },
          },
        ];
        documentDefinition.content.push(...userTable);
      });

      if (index < userKeys.length - 1) {
        documentDefinition.content.push({text: '', pageBreak: 'before'});
      }
    }
  });

  // Generating and downloading PDF file
  generateAndDownloadPDF(
    documentDefinition,
    `Payroll_Detail_${startDate}_to_${endDate}.pdf`
  );
};
