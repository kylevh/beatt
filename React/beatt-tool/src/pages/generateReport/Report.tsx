import './Report.scss'
import { GridItem } from 'src/components/GridItem/GridItem'
import { useEffect, useState } from 'react'
import { ProjectData } from 'src/types/types'
import { ProjectTable } from './ProjectTable'
import { exportToExcel } from './excelExport'

const Report = () => {
    const [latestData, setLatestData] = useState<ProjectData | null>(null);

    useEffect(() => {
        fetch('/api/latest')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLatestData(data)
            })
    })

    // const TaxProData: ProjectData = {
    //     "projectName": "Tax-Pro",
    //     "testSuites": [
    //         {
    //             "testSuiteName": "DEV",
    //             "disabled": false,
    //             "status": "unknown",
    //             "testCases": [
    //                 {
    //                     "testCaseName": "TestCase 1",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "User request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {
    //                                 "myheaderName": [
    //                                     "headerVALUE"
    //                                 ]
    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "Valid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] in Response, [Contains] Missing token [ryuu] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Me Request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/me",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "User Feed",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}/feed",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Check count of [actions]"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "THISSHOULDBEDISABLED (disabled)"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Check count of [actions]] XPathContains comparison failed for path [declare namespace ns1='https://graph.facebook.com/olensmar/feed';\ncount( //ns1:Response/ns1:data/ns1:e)>10], expecting [true], actual was [false], [Contains] Missing token [Test232] in Response]"
    //                         },
    //                         null
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@4d94dfcd"
    //                 },
    //                 {
    //                     "testCaseName": "SPECIAL Test case",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"ooooh\"\n}\n",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Contains"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Contains] Missing token [22] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Copy of REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"stup\"\n}\n",
    //                             "assertions": [

    //                             ],
    //                             "statusCode": "UNKNOWN",
    //                             "message": "[]"
    //                         }
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@6a5b0ece"
    //                 }
    //             ]
    //         },
    //         {
    //             "testSuiteName": "SAT",
    //             "disabled": false,
    //             "status": "unknown",
    //             "testCases": [
    //                 {
    //                     "testCaseName": "TestCase 1",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "User request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {
    //                                 "myheaderName": [
    //                                     "headerVALUE"
    //                                 ]
    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "Valid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] in Response, [Contains] Missing token [ryuu] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Me Request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/me",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "User Feed",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}/feed",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Check count of [actions]"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "THISSHOULDBEDISABLED (disabled)"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Check count of [actions]] XPathContains comparison failed for path [declare namespace ns1='https://graph.facebook.com/olensmar/feed';\ncount( //ns1:Response/ns1:data/ns1:e)>10], expecting [true], actual was [false], [Contains] Missing token [Test232] in Response]"
    //                         },
    //                         null
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@4edf0c44"
    //                 },
    //                 {
    //                     "testCaseName": "SPECIAL Test case",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"ooooh\"\n}\n",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Contains"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Contains] Missing token [22] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Copy of REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"stup\"\n}\n",
    //                             "assertions": [

    //                             ],
    //                             "statusCode": "UNKNOWN",
    //                             "message": "[]"
    //                         }
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@283691b6"
    //                 }
    //             ]
    //         },
    //         {
    //             "testSuiteName": "DEV (OLD)",
    //             "disabled": false,
    //             "status": "unknown",
    //             "testCases": [
    //                 {
    //                     "testCaseName": "TestCase 1",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "User request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {
    //                                 "myheaderName": [
    //                                     "headerVALUE"
    //                                 ]
    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "Valid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/olensmar';\n//ns1:Response[1]/ns1:link[1]/text()] in Response, [Contains] Missing token [ryuu] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Me Request",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/me",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Match content of [link]"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Match content of [link]] XPathContains assertion failed for path [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] : Exception:Missing content for xpath [declare namespace ns1='https://graph.facebook.com/me';\n//ns1:Response[1]/ns1:link[1]/text()] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "User Feed",
    //                             "disabled": false,
    //                             "method": "GET",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/{user}/feed",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Check count of [actions]"
    //                                 },
    //                                 {
    //                                     "type": "Invalid HTTP Status Codes"
    //                                 },
    //                                 {
    //                                     "type": "Contains"
    //                                 },
    //                                 {
    //                                     "type": "THISSHOULDBEDISABLED (disabled)"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Check count of [actions]] XPathContains comparison failed for path [declare namespace ns1='https://graph.facebook.com/olensmar/feed';\ncount( //ns1:Response/ns1:data/ns1:e)>10], expecting [true], actual was [false], [Contains] Missing token [Test232] in Response]"
    //                         },
    //                         null
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@c86471f"
    //                 },
    //                 {
    //                     "testCaseName": "SPECIAL Test case",
    //                     "disabled": false,
    //                     "status": "unknown",
    //                     "testSteps": [
    //                         {
    //                             "testStepName": "REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"ooooh\"\n}\n",
    //                             "assertions": [
    //                                 {
    //                                     "type": "Contains"
    //                                 }
    //                             ],
    //                             "statusCode": "FAILED",
    //                             "message": "[[Contains] Missing token [22] in Response]"
    //                         },
    //                         {
    //                             "testStepName": "Copy of REST Request",
    //                             "disabled": false,
    //                             "method": "POST",
    //                             "endpoint": "https://graph.facebook.com",
    //                             "resource": "/taxStuff",
    //                             "pathParams": {

    //                             },
    //                             "queryParams": {

    //                             },
    //                             "headers": {

    //                             },
    //                             "requestBody": "{\n\tmyJsonStuff: \"stup\"\n}\n",
    //                             "assertions": [

    //                             ],
    //                             "statusCode": "UNKNOWN",
    //                             "message": "[]"
    //                         }
    //                     ],
    //                     "debug": "com.eviware.soapui.impl.wsdl.testcase.WsdlTestCase@6ae0dc20"
    //                 }
    //             ]
    //         }
    //     ],
    //     "totalTestSuites": 3,
    //     "totalTestCases": 6,
    //     "totalPassedCases": 0,
    //     "totalFailedCases": 0,
    //     "totalAssertions": 30,
    //     "totalTestSteps": 18,
    //     "totalPassedSteps": 0,
    //     "totalFailedSteps": 0
    // }

    return (
        <>
            <GridItem style={{ minHeight: '100px', maxHeight: '100px' }} colStart={1} colSpan={4} rowStart={1} rowSpan={1}>
                <div className="report-container">
                    <h1>Generate Report</h1>
                    <div className="report-container__select-container">
                        <select>
                            <option value="option1">Tax-Pro</option>
                            <option value="option2">DEBUG</option>
                            <option value="option3">DEBUG 2</option>
                        </select>
                        <button onClick={() => latestData && exportToExcel(latestData)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z" /></svg>
                            Generate
                        </button>
                    </div>
                </div>
            </GridItem>

            <GridItem colStart={1} colSpan={4} rowStart={2} rowSpan={3}>
                {latestData && <ProjectTable data={latestData} />}
            </GridItem>
        </>
    )
}

export default Report