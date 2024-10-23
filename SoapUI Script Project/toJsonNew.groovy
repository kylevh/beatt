import groovy.json.JsonOutput
import com.eviware.soapui.support.UISupport

def outputFolder = new File(context.testCase.testSuite.project.path).getParentFile()
outputFolder = new File(outputFolder, 'output')
initializeFolder(outputFolder, true)

def main(outputFolder) {
    processProjects(outputFolder)
}

def initializeFolder(File folder, Boolean clear = false) {
    if (folder.exists()) {
        if (clear) {
            folder.eachFile { file ->
                if (file.isDirectory()) clearFolder(file)
                file.delete()
            }
            log.info("Cleared folder: ${folder.getName()}")
        }
    } else {
        folder.mkdirs()
        log.info("Created folder: ${folder.getName()}")
    }
}

def processProjects(outputFolder) {
    def projects = com.eviware.soapui.SoapUI.getWorkspace().getProjectList()
    def currentProjectName = context.testCase.testSuite.project.name
    def projectNames = ['Tax-Pro']

    // Loop through all projects and exclude the current project
    projects.findAll { project ->
        project.name != currentProjectName && projectNames.contains(project.name)
    }.each { project ->
        def projectData = [
            projectName: project.name,
            testSuites: []
        ]

        // Loop through all test suites in the current project
        project.getTestSuiteList().each { testSuite ->
            def suiteData = [
                testSuiteName: testSuite.name,
                testCases: []
            ]

            // Loop through all test cases in the current test suite
            testSuite.getTestCaseList().each { testCase ->
                def testCaseData = [
                    testCaseName: testCase.name,
                    executionTime: '0', // Placeholder, update with actual execution time
                    startTime: '0', // Placeholder, update with actual start time
                    endTime: '0', // Placeholder, update with actual end time
                    status: 'unknown', // Placeholder, update with actual status
                    testSteps: []
                ]

                // Loop through all test steps in the current test case
                testCase.getTestStepList().each { testStep ->
                    def stepData = [
                        testStepName: testStep.getName(),
                        method: 'GET', // Placeholder, update with actual method
                        url: 'http://example.com', // Placeholder, update with actual URL
                        pathParams: [:], // Placeholder, update with actual path params
                        queryParams: [:], // Placeholder, update with actual query params
                        headers: [:], // Placeholder, update with actual headers
                        requestBody: [:], // Placeholder, update with actual request body
                        assertions: 'test',//getAssertions(testStep),
                        status: 'unknown', // Placeholder, update with actual status
                        executionTime: '0', // Placeholder, update with actual execution time
                        startTime: '0', // Placeholder, update with actual start time
                        endTime: '0' // Placeholder, update with actual end time
                    ]
                    testCaseData.testSteps << stepData
                }
                suiteData.testCases << testCaseData
            }
            projectData.testSuites << suiteData
        }

        def jsonOutput = JsonOutput.prettyPrint(JsonOutput.toJson(projectData))
        def outputFilePath = "${outputFolder}/${project.name}.json"
        new File(outputFilePath).text = jsonOutput
        log.info("JSON export written to: ${outputFilePath}")
    }
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

def getAssertions(testStep) {
    testStep.getAssertionList().collect { assertion ->
        [
            type    : 'type', //assertion.getName(),
            expected: 'expected', //assertion.getExpectedResult(),
            actual  : 'actual', //assertion.getActualResult(),
            status  : 'status' //assertion.getStatus().toString()
        ]
    }
}

main(outputFolder)
