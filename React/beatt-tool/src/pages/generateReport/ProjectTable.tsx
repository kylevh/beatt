import { ProjectData, RowData } from 'src/types/types';
import React from 'react';
import './ProjectTable.scss';
import { exportToExcel } from './excelExport';
export const ProjectTable = ({ data }: { data: ProjectData }) => {
    let cumulativeTestSteps = 0;
    return (
        <div className="table-container">
            <button onClick={() => exportToExcel(data)}>Export to Excel</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>DEV Coverage</th>
                        <th>SAT Coverage</th>
                        <th>API</th>
                        <th>Functionality</th>
                        <th>Method</th>
                        <th>Scenario</th>
                        <th>Data Method</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {data.testSuites.map((suite, suiteIndex) => (
                        <React.Fragment key={suiteIndex}>
                            <tr>
                                <td colSpan={9} className="full-width-header">
                                    {suite.testSuiteName}
                                </td>
                            </tr>
                            {suite.testCases.flatMap(testCase => {
                                return testCase.testSteps.map((step) => {
                                    if (!step) return null;
                                    cumulativeTestSteps++;
                                    const isDevSuite = suite.testSuiteName === 'DEV';
                                    const isSatSuite = suite.testSuiteName === 'SAT';

                                    const coverageDev = isDevSuite ? (step.statusCode === 'FAILED' ? 'No' : (step.disabled ? 'Disabled' : 'Yes')) : '';
                                    const coverageSat = isSatSuite ? (step.statusCode === 'FAILED' ? 'No' : (step.disabled ? 'Disabled' : 'Yes')) : '';

                                    const finalCoverageDev = (coverageDev === 'Yes' && coverageSat === '') ? 'Yes' : (coverageDev === 'No' ? 'No' : '');
                                    const finalCoverageSat = (coverageSat === 'Yes' && coverageDev === '') ? 'Yes' : (coverageSat === 'No' ? 'No' : '');

                                    const dataMethod = step.requestBody ? 'JSON Body' : step.queryParams ? 'Query Params' : step.pathParams ? 'Request Params' : '';
                                    return {
                                        index: cumulativeTestSteps,
                                        coverageDev: finalCoverageDev,
                                        coverageSat: finalCoverageSat,
                                        api: step.resource,
                                        functionality: testCase.testCaseName,
                                        method: step.method,
                                        scenario: step.testStepName,
                                        dataMethod,
                                        notes: ''
                                    };
                                }).filter((row): row is RowData => row !== null);
                            }).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{row.index}</td>
                                    <td className={`dev-coverage ${row.coverageDev === 'Yes' ? 'highlight-green' : row.coverageDev === 'No' ? 'highlight-red' : row.coverageDev === 'Disabled' ? 'highlight-orange' : ''}`}>
                                        {row.coverageDev}
                                    </td>
                                    <td className={`sat-coverage ${row.coverageSat === 'Yes' ? 'highlight-green' : row.coverageSat === 'No' ? 'highlight-red' : row.coverageSat === 'Disabled' ? 'highlight-orange' : ''}`}>
                                        {row.coverageSat}
                                    </td>
                                    <td>{row.api}</td>
                                    <td>{row.functionality}</td>
                                    <td>{row.method}</td>
                                    <td>{row.scenario}</td>
                                    <td>{row.dataMethod}</td>
                                    <td>{row.notes}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};