# Performance Spike - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow creates a performance spike to validate that NFR performance targets are achievable before implementation. It helps identify performance bottlenecks early and validates performance goals.</critical>
<critical>DOCUMENT OUTPUT: The performance report will be saved to {performance_report_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, performance_report_template</action>
    <action>Load prd_file: Read {prd_file} completely to understand non-functional requirements, especially performance requirements</action>
  </step>

  <step n="2" goal="Extract performance requirements">
    <action>From {prd_file}, extract performance requirements (NFR):
      - Response time targets (e.g., question generation < 3 seconds)
      - Throughput targets
      - Latency targets
      - Resource usage targets
      - Scalability requirements
    </action>
    <action>Identify performance-critical operations:
      - LLM API calls
      - Database queries
      - Vector store operations
      - Complex computations
      - Network operations
    </action>
    <action>Store performance requirements for validation</action>
  </step>

  <step n="3" goal="Identify performance test scenarios">
    <action>For each performance requirement, ELICIT:
      - What operation needs to be tested?
      - What is the target performance metric?
      - What is the acceptable range?
      - What are the test conditions?
    </action>
    <action>Create performance test scenarios:
      - Scenario 1: LLM API call latency
      - Scenario 2: Parallel processing performance
      - Scenario 3: Prompt size impact
      - Scenario 4: Database query performance
      - Scenario 5: End-to-end operation performance
    </action>
    <action>Store performance test scenarios</action>
  </step>

  <step n="4" goal="Plan performance spike">
    <action>For each performance test scenario:
      - ELICIT: What approach will be tested?
      - ELICIT: What is the minimal prototype needed?
      - ELICIT: What metrics will be measured?
      - ELICIT: What is the success criteria?
    </action>
    <action>For LLM performance spike:
      - Test LLM API call patterns
      - Measure latency for different prompt sizes
      - Test parallel vs sequential calls
      - Measure cost implications
    </action>
    <action>For parallel processing spike:
      - Test parallel API calls
      - Measure performance improvement
      - Identify bottlenecks
      - Test resource usage
    </action>
    <action>For prompt size spike:
      - Test performance with different prompt sizes
      - Measure latency impact
      - Identify optimal prompt size
      - Test context window limits
    </action>
    <action>Store spike plans</action>
  </step>

  <step n="5" goal="Execute performance spike">
    <action>For each performance test scenario:
      - Create minimal prototype
      - Implement performance measurement
      - Run performance tests
      - Collect metrics
      - Compare against targets
    </action>
    <action>Measure and record:
      - Actual latency/response time
      - Throughput
      - Resource usage (CPU, memory, network)
      - Cost implications (if applicable)
      - Bottlenecks identified
    </action>
    <action>For each scenario, record:
      - Target performance
      - Actual performance
      - Difference
      - Assessment (meets target / close to target / fails target)
    </action>
  </step>

  <step n="6" goal="Analyze performance results">
    <action>For each performance requirement:
      - Compare actual performance against target
      - Identify if target is achievable
      - Identify performance bottlenecks
      - Suggest optimizations if needed
    </action>
    <action>If performance target is not met:
      - Identify root cause
      - Suggest optimization approaches
      - Assess if target is realistic
      - Suggest alternative targets if needed
    </action>
    <action>If performance target is met:
      - Confirm approach is viable
      - Document performance characteristics
      - Identify any constraints
    </action>
    <action>Record analysis results</action>
  </step>

  <step n="7" goal="Generate performance report">
    <action>Construct performance_report_file path: "{output_folder}/performance-spike-report.md"</action>
    <action>Check if {performance_report_file} already exists</action>
    <check if="performance_report_file exists">
      <action>ELICIT from user: Performance report file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ Performance report file already exists. Skipping report generation.

Please review the existing file: {performance_report_file}
        </output>
        <action>HALT</action>
      </check>
    </check>
    
    <action>Generate performance report based on:
      - Template: {performance_report_template}
      - Performance requirements from step 2
      - Test scenarios from step 3
      - Spike results from step 5
      - Analysis results from step 6
    </action>
    
    <action>Create performance report with following sections:
      1. **Header**: Date, Project Name, Status, Performance Spike Type
      2. **1. Executive Summary**:
         - Overall performance assessment
         - Key findings
         - Critical performance decisions
      3. **2. Performance Requirements**:
         - NFR performance targets
         - Performance-critical operations
         - Target metrics
      4. **3. Performance Test Scenarios**:
         - Test scenarios identified
         - Test conditions
         - Success criteria
      5. **4. Performance Spike Results**:
         - Results for each test scenario
         - Actual vs target performance
         - Performance metrics
         - Bottlenecks identified
      6. **5. Performance Analysis**:
         - Feasibility assessment
         - Optimization opportunities
         - Alternative approaches (if needed)
      7. **6. Recommendations**:
         - Performance optimization strategies
         - Target adjustments (if needed)
         - Architecture considerations
      8. **7. Next Steps**:
         - Performance budget allocation
         - Monitoring requirements
         - Follow-up spikes (if needed)
    </action>
    
    <action>Write performance report to {performance_report_file}</action>
    <action>Ensure report is in {document_output_language}</action>
  </step>

  <step n="8" goal="Present performance results">
    <action>Summarize performance spike execution:
      - Number of test scenarios
      - Overall assessment (all targets met / some targets not met / all targets not met)
      - Key findings
      - Critical decisions
    </action>
    <action>If any targets are not met:
      - Highlight performance gaps
      - Suggest optimization approaches
      - Assess if targets are realistic
      - Recommend target adjustments if needed
    </action>
    <action>If all targets are met:
      - Confirm performance approach is viable
      - Document performance characteristics
      - Recommend performance budget allocation
    </action>
    <action>Present results to user in clear format</action>
  </step>

</workflow>
````

