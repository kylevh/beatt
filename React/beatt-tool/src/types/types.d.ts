type RowData = {
    index: number;
    coverageDev: string;
    coverageSat: string;
    api: string;
    functionality: string;
    method: string;
    scenario: string;
    dataMethod: string;
    notes: string;
};

interface TestStep {
    testStepName: string;
    disabled: boolean;
    method: string;
    endpoint: string;
    resource: string;
    pathParams?: any;
    queryParams?: any;
    headers?: any;
    requestBody?: any;
    assertions?: any[];
    statusCode: string;
    debug?: string;
    message?: string;
}

interface TestCase {
    testCaseName: string;
    testSteps: (TestStep | null)[];
    disabled: boolean;
    status: string;
    debug?: string;
}

interface TestSuite {
    testSuiteName: string;
    testCases: TestCase[];
    disabled: boolean;
    status: string;
}

interface ProjectData {
    projectName: string;
    totalTestSuites: number;
    totalTestCases: number;
    totalPassedCases: number;
    totalFailedCases: number;
    totalAssertions: number;
    totalTestSteps: number;
    totalPassedSteps: number;
    totalFailedSteps: number;
    testSuites: TestSuite[];
}

export type { ProjectData, TestStep, TestCase, TestSuite, RowData };
