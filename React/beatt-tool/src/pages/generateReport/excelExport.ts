import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ProjectData } from 'src/types/types';

export const exportToExcel = (data: ProjectData) => {
    const workbook = new ExcelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet('Project Data'); // Add a new worksheet
    let cumulativeTestSteps = 0;
    // Define header row
    worksheet.addRow([
        '#',
        'DEV Coverage',
        'SAT Coverage',
        'API',
        'Functionality',
        'Method',
        'Scenario',
        'Data Method',
        'Notes'
    ]).font = { bold: true }; // Make header bold

    // Populate rows with data
    data.testSuites.forEach((suite) => {
        // Add suite name as a header and merge cells
        const suiteRow = worksheet.addRow([suite.testSuiteName, '', '', '', '', '', '', '', '']);
        worksheet.mergeCells(suiteRow.number, 1, suiteRow.number, 9); // Merge cells from column 1 to 9
        suiteRow.font = { bold: true }; // Make suite name bold
        suiteRow.fill = { // Set background color for the merged cell
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' } // Bright yellow
        };

        suite.testCases.forEach((testCase) => {
            testCase.testSteps.forEach((step) => {
                if (!step) return;

                cumulativeTestSteps++;
                const isDevSuite = suite.testSuiteName === 'DEV';
                const isSatSuite = suite.testSuiteName === 'SAT';

                const coverageDev = isDevSuite ? (step.statusCode === 'FAILED' ? 'No' : (step.disabled ? 'Disabled' : 'Yes')) : '';
                const coverageSat = isSatSuite ? (step.statusCode === 'FAILED' ? 'No' : (step.disabled ? 'Disabled' : 'Yes')) : '';

                const finalCoverageDev = (coverageDev === 'Yes' && coverageSat === '') ? 'Yes' : (coverageDev === 'No' ? 'No' : '');
                const finalCoverageSat = (coverageSat === 'Yes' && coverageDev === '') ? 'Yes' : (coverageSat === 'No' ? 'No' : '');

                const dataMethod = step.requestBody ? 'JSON Body' : step.queryParams ? 'Query Params' : step.pathParams ? 'Request Params' : '';

                // Push the row data
                const row = worksheet.addRow([
                    cumulativeTestSteps,
                    finalCoverageDev,
                    finalCoverageSat,
                    step.resource,
                    testCase.testCaseName,
                    step.method,
                    step.testStepName,
                    dataMethod,
                    '' // Notes can be added here if needed
                ]);

                // Apply background color based on coverage status
                const devCell = row.getCell(2);
                const satCell = row.getCell(3);

                if (finalCoverageDev === 'Yes') {
                    devCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '00B050' } // Green
                    };
                } else if (finalCoverageDev === 'No') {
                    devCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF0000' } // Red
                    };
                } else if (finalCoverageDev as string === 'Disabled') {
                    devCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFA500' } // Orange
                    };
                }

                if (finalCoverageSat === 'Yes') {
                    satCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '00B050' } // Green
                    };
                } else if (finalCoverageSat === 'No') {
                    satCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF0000' } // Red
                    };
                } else if (finalCoverageSat as string === 'Disabled') {
                    satCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFA500' } // Orange
                    };
                }
            });
        });
    });

    // Apply additional styling if needed
    worksheet.getColumn(1).width = 5; // Set width for the first column
    worksheet.getColumn(2).width = 15; // Set width for DEV Coverage
    worksheet.getColumn(3).width = 15; // Set width for SAT Coverage
    worksheet.getColumn(4).width = 20; // Set width for API
    worksheet.getColumn(5).width = 25; // Set width for Functionality
    worksheet.getColumn(6).width = 15; // Set width for Method
    worksheet.getColumn(7).width = 20; // Set width for Scenario
    worksheet.getColumn(8).width = 20; // Set width for Data Method
    worksheet.getColumn(9).width = 20; // Set width for Notes

    // Save the workbook
    workbook.xlsx.writeBuffer().then((excelBuffer) => {
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'project_data.xlsx');
    });
};

