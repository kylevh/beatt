import groovy.json.JsonOutput
import com.eviware.soapui.support.UISupport

def outputFolder = new File(context.testCase.testSuite.project.path).getParentFile()
outputFolder = new File(outputFolder, 'snapshots')

def dateFolder = new File(outputFolder, new Date().format('yyyy-MM-dd', TimeZone.getTimeZone('UTC')))
initializeFolder(dateFolder, false)

def main(outputFolder) {
    // Process projects and generate snapshots
    processProjects(outputFolder)
}

def initializeFolder(File folder, Boolean clear = false) {
    if (folder.exists()) {
        if (clear) {
            // Clear the folder if it exists and clear is true
            folder.eachFile { file ->
                if (file.isDirectory()) {
                    clearFolder(file)
                }
                file.delete()
            }
            log.info("Cleared folder: ${folder.getName()}")
        }
    } else {
        // Create the folder if it does not exist
        folder.mkdirs()
        log.info("Created folder: ${folder.getName()}")
    }
}

def processProjects(outputFolder) {
    def allProjects = com.eviware.soapui.SoapUI.getWorkspace().getProjectList()
    def currentProjectName = context.testCase.testSuite.project.name
    def targetProjectNames = ['Tax-Pro'] // List of projects to process

    // Filter out the current project and process the target projects
    allProjects.findAll { project ->
        project.name != currentProjectName && targetProjectNames.contains(project.name)
    }.each { project ->
        def projectData = createProjectData(project)

        // Create output file structure
        def timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss', TimeZone.getTimeZone('UTC'))
        def jsonOutput = JsonOutput.prettyPrint(JsonOutput.toJson(projectData))
        writeOutputFile(outputFolder, project, timestamp, jsonOutput)
    }
}

def createProjectData(project) {
    def projectData = [
        projectName: project.name,
        testSuites: [],
        totalTestSuites: 0,
        totalTestCases: 0,
        totalPassedCases: 0,
        totalFailedCases: 0,
        totalAssertions: 0,
        totalTestSteps: 0,
        totalPassedSteps: 0,
        totalFailedSteps: 0,
    ]

    // Loop through all test suites in the current project
    project.getTestSuiteList().each { testSuite ->
        def suiteData = createTestSuiteData(testSuite, projectData)
        projectData.totalTestSuites++
        projectData.testSuites << suiteData
    }

    return projectData
}

def createTestSuiteData(testSuite, projectData) {
    if (testSuite.name in ['DEV', 'SAT']) {
        def suiteData = [
        testSuiteName: testSuite.name,
        disabled: testSuite.isDisabled(),
        status: 'unknown',
        testCases: []
    ]

        // Loop through all test cases in the current test suite
        testSuite.getTestCaseList().each { testCase ->
            def testCaseData = createTestCaseData(testCase, projectData, suiteData)
            projectData.totalTestCases++
            suiteData.testCases << testCaseData
        }

        return suiteData
    }
}

def createTestCaseData(testCase, projectData, suiteData) {
    def testCaseData = [
        testCaseName: testCase.name,
        disabled: testCase.isDisabled() || suiteData.disabled || projectData.disabled ? true : false,
        status: 'unknown',
        testSteps: [],
        debug: testCase.toString()
    ]

    // Loop through all test steps in the current test case
    testCase.getTestStepList().each { testStep ->
        def stepData = createTestStepData(testStep, projectData, suiteData, testCaseData)
        projectData.totalTestSteps++
        testCaseData.testSteps << stepData
    }

    return testCaseData
}

def createTestStepData(testStep, projectData, suiteData, testCaseData) {
    def stepData = [
        testStepName: testStep.getName(),
        disabled: testStep.isDisabled() || testCaseData.disabled || suiteData.disabled || projectData.disabled ? true : false,
        method: null, // Placeholder, update with actual method
        endpoint: null, // Placeholder, update with actual URL
        resource: null, // Placeholder, update with actual URL
        pathParams: [:], // Placeholder, update with actual path params
        queryParams: [:], // Placeholder, update with actual query params
        headers: [:], // Placeholder, update with actual headers
        requestBody: [:], // Placeholder, update with actual request body
        assertions: [],
        statusCode: 'unknown', // Placeholder, update with actual status
        message: null,
    ]

    if (testStep instanceof com.eviware.soapui.impl.wsdl.teststeps.RestTestRequestStep) {
        if (!stepData.disabled) {
            def result =  testStep.run(testRunner, context)
            stepData.statusCode = result.getStatus().toString()
            stepData.message = result.getMessages().toString()
        }
        stepData.method = testStep.getHttpRequest().method.toString()
        stepData.resource = testStep.getResourcePath()
        stepData.endpoint = testStep.getHttpRequest().getEndpoint()
        stepData.pathParams = testStep.getRestMethod().getParams().getPropertyNames().collectEntries { name ->
            [(name): testStep.getRestMethod().getPropertyValue(name)]
        }
        // stepData.queryParams = testStep.getRestMethod().getQueryParams().getPropertyNames().collectEntries { name ->
        //     [(name): testStep.getRestMethod().getPropertyValue(name)]
        // }
        stepData.headers = testStep.getHttpRequest().getRequestHeaders()
        stepData.requestBody = testStep.getHttpRequest().getRequestContent()

        testStep.getAssertionList().collect { assertion ->
            def assertionData = createAssertionsData(assertion, stepData, projectData, suiteData, testCaseData)
            projectData.totalAssertions++
            stepData.assertions << assertionData
        }
    }
    else {
        return null
    }

    return stepData
}

def createAssertionsData(assertion, stepData, projectData, suiteData, testCaseData) {
    def assertionData = [
    type: assertion.getLabel(),
    ]
    return assertionData
}

def writeOutputFile(outputFolder, project, timestamp, jsonOutput) {
    def dateFolder = new File(outputFolder, new Date().format('yyyy-MM-dd', TimeZone.getTimeZone('UTC'))) // Create date folder
    dateFolder.mkdirs() // Ensure the date folder exists

    def projectFolder = new File(dateFolder, project.name) // Create project folder within the date folder
    projectFolder.mkdirs() // Ensure the project folder exists

    def outputFilePath = "${projectFolder}/${project.name}_${timestamp}.json" // Update the output file path
    new File(outputFilePath).text = jsonOutput
    log.info("JSON export written to: ${outputFilePath}")
}

def getTestStepData(testStep) {
    def request = testStep.getHttpRequest()
    def requestData = [
        testStepName: testStep.name,
        method: request.method.toString(),
        url: request.path,
        pathParams: request.getParams(),
        headers: request.getRequestHeaders(),
        requestBody: request.getRequestContent(),
        assertions: getAssertions(testStep)
    ]
}

main(outputFolder)
