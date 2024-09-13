import writeXlsxFile from 'write-excel-file';
import * as Sentry from '@sentry/nextjs';

export const generateDetailedExcelReport = async (
  userData,
  startDate,
  endDate
) => {
  const sheets = Object.values(userData).map((item) => {
    const sheetName = `${item.employeeName}`;

    const sheetData = [
      // Title row with vertical merge
      [
        {value: null}, // Vertical merge for 4 rows
        {value: 'Payroll Details', fontWeight: 'bold'},
      ],
      [
        {value: null},
        {value: 'Start Date', fontWeight: 'bold', align: 'center'},
        {value: startDate},
        {value: null},
        {value: 'End Date', fontWeight: 'bold', align: 'center'},
        {value: endDate},
      ],
      [],
      [
        {value: null},
        {value: 'Employee Name', fontWeight: 'bold', align: 'center'},
        {value: 'Employee Type', fontWeight: 'bold', align: 'center'},
        {value: 'Employee Number', fontWeight: 'bold', align: 'center'},
        {value: 'RATE', fontWeight: 'bold', align: 'center'},
        {value: 'Total Tracked Hours', fontWeight: 'bold', align: 'center'},
        // { value: 'Total Break Hours', fontWeight: 'bold', align: 'center' },
        {value: 'Total Wage', fontWeight: 'bold', align: 'center'},
      ],
      [
        {value: null},
        {value: item.employeeName, align: 'center'},
        {value: item.designation, align: 'center'},
        {value: item.employeeId, align: 'center'},
        {value: `$${item.hourlyRate}`, align: 'center'},
        {value: item.totalTrackedHours, align: 'center'},
        // { value: item.totalBreakHours !== undefined ? item.totalBreakHours : '', align: 'center' }, // Include total break hours for the employee
        {value: `$${item.totalWageOfEmployee}`, align: 'center'},
      ],
      [],
      [
        {value: 'WEEK', fontWeight: 'bold', align: 'center'},
        {value: 'DAY', fontWeight: 'bold', align: 'center'},
        {value: 'DATE IN', fontWeight: 'bold', align: 'center'},
        {value: 'TIME IN', fontWeight: 'bold', align: 'center'},
        {value: 'DATE OUT', fontWeight: 'bold', align: 'center'},
        {value: 'TIME OUT', fontWeight: 'bold', align: 'center'},
        {value: 'Department', fontWeight: 'bold', align: 'center'},
        {value: 'Type', fontWeight: 'bold', align: 'center'},
        {value: 'Hrs:Minutes', fontWeight: 'bold', align: 'center'},
        {value: 'Hours', fontWeight: 'bold', align: 'center'},
        {value: 'WAGES', fontWeight: 'bold', align: 'center'},
        {value: 'Total Tracked Hours', fontWeight: 'bold', align: 'center'},
        {value: 'Total Wages', fontWeight: 'bold', align: 'center'},
        {value: 'Total Break Hours', fontWeight: 'bold', align: 'center'},
      ],
    ];

    const weekNumberSpanInfo = {}; // Track week number spans
    const dateInSpanInfo = {}; // Track row spans for "Date In"
    const dateOutSpanInfo = {}; // Track row spans for "Date Out"
    const daySpanInfo = {}; // Track row spans for "Day"
    let currentRow = sheetData.length;

    item.weeks.forEach((week) => {
      let isFirstRowOfWeek = true;

      week.days.forEach((day) => {
        let dayStartRow = currentRow;
        const isEdited = day.isEdited;
        const dayName = `${day.day} ${isEdited ? '*' : ''}`;
        const dayWage = day.dayWage === '-' ? '-' : `$${day.dayWage}`;

        day.logs.forEach((log, logIndex) => {
          const logWage = log.wage === '-' ? '-' : log.wage;
          sheetData.push([
            {value: isFirstRowOfWeek ? week.weekNumber : null, align: 'center'},
            {value: logIndex === 0 ? dayName : null, align: 'center'},
            {value: logIndex === 0 ? day.dateIn : null, align: 'center'},
            {value: log.startTime, align: 'center'},
            {value: logIndex === 0 ? day.dateOut : null, align: 'center'},
            {value: log.endTime, align: 'center'},
            {value: log.department, align: 'center'},
            {value: log.status, align: 'center'},
            {value: log.hoursAndMinutes, align: 'center'},
            {value: log.hours, align: 'center'},
            {value: logWage, align: 'center'},
            {
              value: logIndex === 0 ? day.dayTrackedHours : null,
              align: 'center',
            }, // Only show total tracked hours if it's the first log entry
            {value: logIndex === 0 ? `${dayWage}` : null, align: 'center'},
            {value: logIndex === 0 ? day.dayBreakHours : null, align: 'center'},
          ]);
          isFirstRowOfWeek = false;
          currentRow++;
        });

        // Track the span for the "Week Number"
        if (!weekNumberSpanInfo[week.weekNumber]) {
          weekNumberSpanInfo[week.weekNumber] = [];
        }
        weekNumberSpanInfo[week.weekNumber].push({
          startRow: dayStartRow,
          rowSpan: currentRow - dayStartRow,
        });

        // Track the span for the "Date In"
        if (!dateInSpanInfo[day.dateIn]) {
          dateInSpanInfo[day.dateIn] = [];
        }
        dateInSpanInfo[day.dateIn].push({
          startRow: dayStartRow,
          rowSpan: currentRow - dayStartRow,
        });

        // Track the span for the "Date Out"
        if (!dateOutSpanInfo[day.dateOut]) {
          dateOutSpanInfo[day.dateOut] = [];
        }
        dateOutSpanInfo[day.dateOut].push({
          startRow: dayStartRow,
          rowSpan: currentRow - dayStartRow,
        });

        // Track the span for the "Day"
        if (!daySpanInfo[day.day]) {
          daySpanInfo[day.day] = [];
        }
        daySpanInfo[day.day].push({
          startRow: dayStartRow,
          rowSpan: currentRow - dayStartRow,
        });
      });

      const totalWeekWage = week.weekWage === '-' ? '-' : `$${week.weekWage}`;

      // Add weekly totals
      sheetData.push([
        {
          value: 'WK Totals',
          backgroundColor: '#FFFF00',
          fontWeight: 'bold',
          align: 'center',
        },
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {backgroundColor: '#FFFF00'},
        {
          value: week.weekTotalHours,
          backgroundColor: '#FFFF00',
          align: 'center',
          fontWeight: 'bold',
        },
        {
          value: `${totalWeekWage}`,
          backgroundColor: '#FFFF00',
          align: 'center',
          fontWeight: 'bold',
        },
        {
          value: week.weeklyBreakHours,
          fontWeight: 'bold',
          backgroundColor: '#FFFF00',
          align: 'center',
        },
      ]);
      currentRow++;
    });

    // Apply the rowSpan to the relevant cells for "Week Number"
    Object.keys(weekNumberSpanInfo).forEach((weekNumber) => {
      weekNumberSpanInfo[weekNumber].forEach((span) => {
        if (span.rowSpan > 1) {
          sheetData[span.startRow][0] = {
            ...sheetData[span.startRow][0],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          for (let i = 1; i < span.rowSpan; i++) {
            sheetData[span.startRow + i][0] = null; // Set spanned cells to null
          }
        }
      });
    });

    // Apply the rowSpan to the relevant cells for "Date In"
    Object.keys(dateInSpanInfo).forEach((dateIn) => {
      dateInSpanInfo[dateIn].forEach((span) => {
        if (span.rowSpan > 1) {
          sheetData[span.startRow][2] = {
            ...sheetData[span.startRow][2],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          for (let i = 1; i < span.rowSpan; i++) {
            sheetData[span.startRow + i][2] = null; // Set spanned cells to null
          }
        }
      });
    });

    // Apply the rowSpan to the relevant cells for "Date Out"
    Object.keys(dateOutSpanInfo).forEach((dateOut) => {
      dateOutSpanInfo[dateOut].forEach((span) => {
        if (span.rowSpan > 1) {
          sheetData[span.startRow][4] = {
            ...sheetData[span.startRow][4],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          for (let i = 1; i < span.rowSpan; i++) {
            sheetData[span.startRow + i][4] = null; // Set spanned cells to null
          }
        }
      });
    });

    // Apply the rowSpan to the relevant cells for "Day"
    Object.keys(daySpanInfo).forEach((day) => {
      daySpanInfo[day].forEach((span) => {
        if (span.rowSpan > 1) {
          sheetData[span.startRow][1] = {
            ...sheetData[span.startRow][1],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          for (let i = 1; i < span.rowSpan; i++) {
            sheetData[span.startRow + i][1] = null; // Set spanned cells to null
          }
        }
      });
    });

    // Apply rowSpan to "Total Tracked Hours", "Total Break Hours", and "Total Wages" cells for each day
    Object.keys(daySpanInfo).forEach((day) => {
      daySpanInfo[day].forEach((span) => {
        if (span.rowSpan > 1) {
          sheetData[span.startRow][11] = {
            ...sheetData[span.startRow][11],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          sheetData[span.startRow][12] = {
            ...sheetData[span.startRow][12],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          sheetData[span.startRow][13] = {
            ...sheetData[span.startRow][13],
            rowSpan: span.rowSpan,
            align: 'center', // Center align
            alignVertical: 'center',
          };
          for (let i = 1; i < span.rowSpan; i++) {
            sheetData[span.startRow + i][11] = null; // Set spanned cells to null
            sheetData[span.startRow + i][12] = null; // Set spanned cells to null
            sheetData[span.startRow + i][13] = null; // Set spanned cells to null
          }
        }
      });
    });

    const maxColumnLengths = {};
    sheetData.forEach((row) => {
      row.forEach((cell) => {
        if (cell?.value !== null && cell?.value !== undefined) {
          const value = String(cell.value);
          const column = cell.column || ''; // Assuming column name is stored in cell.column
          if (
            !maxColumnLengths[column] ||
            value.length > maxColumnLengths[column]
          ) {
            maxColumnLengths[column] = value.length;
          }
        }
      });
    });

    // Calculate column widths based on content
    const maxColumnWidths = {};
    sheetData.forEach((row) => {
      row.forEach((cell, columnIndex) => {
        // Check if cell is defined and has a value property
        if (cell?.value) {
          const contentLength = String(cell.value).length;
          if (
            !maxColumnWidths[columnIndex] ||
            contentLength > maxColumnWidths[columnIndex]
          ) {
            maxColumnWidths[columnIndex] = contentLength;
          }
        }
      });
    });

    // Convert maxColumnWidths to columnWidths array
    const columnWidths = Object.keys(maxColumnWidths).map((columnIndex) => ({
      width: (maxColumnWidths[columnIndex] + 2) * 1, // Adjust multiplier as needed
    }));

    return {name: sheetName, data: sheetData, columnWidths};
  });

  // Extract data arrays from each sheet object
  const sheetData = sheets.map((sheet) => sheet.data);
  const sheetNames = sheets.map((sheet) => sheet.name);
  const columnWidths = sheets.map((sheet) => sheet.columnWidths);

  try {
    await writeXlsxFile(sheetData, {
      fileName: `Payroll_Detail_${startDate}_to_${endDate}.xlsx`,
      sheets: sheetNames,
      columns: columnWidths,
    });
  } catch (error) {
    Sentry.captureException(error);
  }
};
