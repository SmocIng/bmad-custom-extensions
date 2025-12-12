# Execute UAT - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow automates UAT execution for an epic and generates results. It should be executed after create-uat-scenario workflow.</critical>
<critical>DOCUMENT OUTPUT: The UAT results will be saved to {uat_results_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: sprint_artifacts, output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, uat_results_template</action>
    <action>Load epics_file: Read {epics_file} completely to understand epic structure</action>
    <action>Load reference UAT results: Search for {reference_uat_results} to understand UAT results structure</action>
  </step>

  <step n="2" goal="Get epic number and validate files exist">
    <action>ELICIT from user: {{epic_number}} (required) - The epic number for which to execute UAT (e.g., "4" for Epic 4)</action>
    
    <action>Search {epics_file} for epic section matching "## Epic {{epic_number}}:" or "## Epic {{epic_number}}: " pattern</action>
    <check if="epic not found">
      <output>❌ Epic {{epic_number}} not found in epics.md

Please verify the epic number and ensure the epic exists in the epics.md file.
      </output>
      <action>HALT</action>
    </check>
    
    <action>Extract epic information:
      - Epic title from "## Epic {{epic_number}}: {{epic_title}}"
      - Epic description and stories from the epic section
    </action>
    <action>Store epic_title for later use</action>
    
    <action>Check if UAT plan file exists: {uat_plan_file}</action>
    <check if="uat_plan_file does not exist">
      <output>❌ UAT plan file not found: {uat_plan_file}

Please run create-uat-scenario workflow first to generate the UAT plan.
Command: @.bmad-custom/workflows/create-uat-scenario
      </output>
      <action>HALT</action>
    </check>
    
    <action>Check if verification scenario file exists: {verification_scenario_file}</action>
    <check if="verification_scenario_file does not exist">
      <output>⚠️ Verification scenario file not found: {verification_scenario_file}

UAT can still be executed, but manual verification scenario execution is recommended.
      </output>
    </check>
  </step>

  <step n="3" goal="Load UAT plan and verification scenario">
    <action>Read {uat_plan_file} completely to understand:
      - UAT概要（目的、対象範囲、受け入れ基準）
      - テストケース（各Storyに対応するテストケースID、名前、前提条件、手順、期待結果）
      - テスト実行手順（事前準備チェックリスト、テスト実行）
    </action>
    
    <action>Extract test cases from UAT plan:
      - Test case IDs (e.g., TC-401, TC-402)
      - Test case names
      - Prerequisites
      - Steps
      - Expected results
    </action>
    
    <check if="verification_scenario_file exists">
      <action>Read {verification_scenario_file} completely to understand:
        - 事前準備チェックリスト
        - シナリオ1: 基本的な動作確認（各Storyに対応するステップ）
        - シナリオ2: ブラウザでの動作確認（オプション）
        - 確認チェックリスト
        - トラブルシューティング
      </action>
    </check>
    
    <action>Load reference UAT results to understand structure:
      - テスト実行サマリー（テーブル形式）
      - 成功率
      - 発見された問題
      - パフォーマンス指標
      - 機能品質指標
      - 受け入れ判定
      - 次のステップ
    </action>
  </step>

  <step n="4" goal="Execute UAT test cases">
    <action>For each test case in UAT plan, execute the test:
      - Parse test case steps from UAT plan
      - Execute commands (curl, npm, etc.) as specified
      - Capture output and response
      - Compare with expected results
      - Record test result (success/failure/not executed)
      - Record execution time
      - Record any errors or issues
    </action>
    
    <action>For API test cases:
      - Execute curl commands or API calls
      - Check HTTP status codes
      - Validate response structure
      - Check response times
      - Record performance metrics
    </action>
    
    <action>For UI test cases:
      - Check if UI pages are accessible
      - Validate UI elements
      - Check loading times
      - Record UI test results
    </action>
    
    <action>For integration test cases:
      - Execute end-to-end flows
      - Check data consistency
      - Validate integration points
      - Record integration test results
    </action>
    
    <action>For performance test cases:
      - Execute multiple requests
      - Measure response times
      - Calculate percentiles (95th percentile)
      - Record performance metrics
    </action>
    
    <action>Collect all test results:
      - Test case ID
      - Test case name
      - Status (success/failure/not executed)
      - Execution time
      - Notes/remarks
      - Errors (if any)
    </action>
  </step>

  <step n="5" goal="Analyze results and identify issues">
    <action>Calculate success rate:
      - Total test cases
      - Successful test cases
      - Failed test cases
      - Not executed test cases
      - Success rate percentage
    </action>
    
    <action>Identify issues:
      - Failed test cases and reasons
      - Performance issues (response times exceeding targets)
      - Functional issues (features not working as expected)
      - Integration issues (components not working together)
      - Error messages and stack traces
    </action>
    
    <action>Analyze performance metrics:
      - Response times vs targets
      - Percentiles (95th percentile)
      - Throughput
      - Error rates
    </action>
    
    <action>Categorize issues by:
      - Impact (high/medium/low)
      - Priority (high/medium/low)
      - Type (functional/performance/integration/error)
    </action>
  </step>

  <step n="6" goal="Generate UAT results document">
    <action>Construct uat_results_file path: "{sprint_artifacts}/epic-{{epic_number}}-uat-results.md"</action>
    <action>Check if {uat_results_file} already exists</action>
    <check if="uat_results_file exists">
      <action>ELICIT from user: UAT results file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ UAT results file already exists. Appending new results instead of overwriting.

Please review the existing file: {uat_results_file}
        </output>
        <action>Append new results to existing file</action>
      </check>
    </check>
    
    <action>Generate UAT results content based on:
      - Test results from step 4
      - Issue analysis from step 5
      - Reference UAT results structure from step 3
      - Template: {uat_results_template}
    </action>
    
    <action>Create UAT results with following sections:
      1. **Header**: Date, Epic ID, Status, Tester
      2. **1. テスト実行サマリー**: 
         - Table with test case ID, name, status, execution time, remarks
         - Success rate calculation
      3. **2. 発見された問題**:
         - Problem descriptions
         - Impact and priority
         - Status (fixed/investigation needed)
         - Resolution plan
      4. **3. パフォーマンス指標**:
         - Response times
         - Percentiles
         - Throughput
         - Error rates
      5. **4. 機能品質指標**:
         - Functional requirements coverage
         - Acceptance criteria coverage
         - Quality metrics
      6. **5. 受け入れ判定**:
         - Judgment criteria
         - Judgment result (pass/conditional pass/fail)
         - Judgment reason
         - Approver and approval date
      7. **6. 次のステップ**:
         - Actions for pass/conditional pass
         - Actions for fail
         - Next epic preparation
    </action>
    
    <action>Save {uat_results_file} with generated content</action>
  </step>

  <step n="7" goal="Output completion message">
    <output>**✅ UAT Execution Completed, {user_name}!**

**Execution Summary:**
- Epic: {{epic_number}} ({{epic_title}})
- Total Test Cases: {{total_test_cases}}
- Successful: {{successful_test_cases}}
- Failed: {{failed_test_cases}}
- Not Executed: {{not_executed_test_cases}}
- Success Rate: {{success_rate}}%

**Generated Files:**
- UAT Results: {uat_results_file}

**⚠️ Important Notes:**

1. **Test Results:**
   - All test results have been recorded in {uat_results_file}
   - Failed test cases are documented with error details
   - Performance metrics are included for analysis

2. **Issues Identified:**
   {{#each issues}}
   - **{{issue_name}}**: {{issue_description}} (Impact: {{impact}}, Priority: {{priority}})
   {{/each}}

3. **Acceptance Judgment:**
   - **Result**: {{judgment_result}}
   - **Reason**: {{judgment_reason}}
   - Please review the judgment in {uat_results_file}

4. **Next Steps:**
   {{#if judgment_pass}}
   - ✅ UAT passed. You can proceed to the next epic.
   - Next epic preparation: `@.bmad/bmm/workflows/epic-tech-context`
   {{/if}}
   {{#if judgment_conditional_pass}}
   - ⚠️ UAT conditionally passed. Review identified issues.
   - Address minor issues before proceeding to next epic.
   {{/if}}
   {{#if judgment_fail}}
   - ❌ UAT failed. Fix critical issues before proceeding.
   - Re-run UAT after fixes: `@.bmad-custom/workflows/execute-uat`
   {{/if}}

**Files Created:**
- {uat_results_file}: UAT execution results with test case results, issues, and judgment

**Review:**
Please review the UAT results in {uat_results_file} and take appropriate actions based on the judgment.
    </output>
  </step>

</workflow>
````

