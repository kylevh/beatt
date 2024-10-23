class Portal {
    String portalName
    List<Project> projects
}

class Project {
    String projectName
    List<TestSuite> testSuites
}

class TestSuite {
    String testSuiteName
    List<TestCase> testCases
}

class TestCase {
    String testCaseName //getName()
    String status
    Boolean isDisabled //isDisabled() 
    List<TestStep> testSteps //getTestStepList()
}

class TestStep {
    String testStepName
    TestStepResult testStepResult
}

class TestStepResult {
    String status
    String responseTime
    String response
}