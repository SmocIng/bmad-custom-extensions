# Technical Spike - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow creates a technical spike to validate high-risk technical areas before architecture design. It helps identify technical risks early and validate feasibility of technical approaches.</critical>
<critical>DOCUMENT OUTPUT: The spike report will be saved to {spike_report_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, spike_report_template</action>
    <action>Load prd_file: Read {prd_file} completely to understand functional requirements and non-functional requirements</action>
    <action>Load architecture_file: Check if {architecture_file} exists and read if available to understand current architecture decisions</action>
  </step>

  <step n="2" goal="Identify technical risks">
    <action>From {prd_file}, identify technical risks:
      - LLM integration requirements
      - Performance requirements (NFR)
      - State management requirements
      - Complex workflows or state machines
      - Third-party integrations
      - Scalability requirements
      - Security requirements
    </action>
    <action>ELICIT from user: What are the high-risk technical areas you want to validate? (List 1-5 areas)</action>
    <action>For each technical risk area, ELICIT:
      - Risk description
      - Why it's high-risk
      - What needs to be validated
      - Success criteria for validation
    </action>
    <action>Store technical risks for spike planning</action>
  </step>

  <step n="3" goal="Plan spike for each technical risk">
    <action>For each technical risk identified in step 2:
      - ELICIT: What specific technical question needs to be answered?
      - ELICIT: What approach will be tested?
      - ELICIT: What is the success criteria?
      - ELICIT: What is the failure criteria?
    </action>
    <action>For each spike, identify:
      - Spike objective
      - Technical approach to test
      - Implementation scope (minimal prototype)
      - Validation method
      - Estimated time (typically 1-3 days per spike)
    </action>
    <action>Store spike plans</action>
  </step>

  <step n="4" goal="Prioritize spikes">
    <action>Prioritize spikes based on:
      - Risk level (high/medium/low)
      - Impact on architecture decisions
      - Dependencies between spikes
      - Estimated time
    </action>
    <action>ELICIT from user: Which spikes should be executed first? (Recommended: highest risk first)</action>
    <action>Create spike execution order</action>
  </step>

  <step n="5" goal="Execute spike (for each spike)">
    <action>For each spike in execution order:
      - Create minimal prototype to test the technical approach
      - Implement only what's necessary to validate the approach
      - Test the approach against success criteria
      - Document findings, issues, and learnings
    </action>
    <action>For LLM integration spike:
      - Test LLM output parsing patterns
      - Test structured output approaches (JSON schema, Zod, etc.)
      - Test intent classification approaches
      - Measure performance (latency, cost)
      - Document best practices
    </action>
    <action>For performance spike:
      - Test LLM call patterns
      - Test parallel processing possibilities
      - Test prompt size impact
      - Measure against NFR targets
      - Document performance characteristics
    </action>
    <action>For state management spike:
      - Test state machine complexity
      - Test framework options (LangGraph, etc.)
      - Test state persistence approaches
      - Measure complexity metrics
      - Document state management patterns
    </action>
    <action>For each spike, record:
      - Approach tested
      - Results (success/failure/partial)
      - Performance metrics (if applicable)
      - Issues encountered
      - Recommendations
    </action>
  </step>

  <step n="6" goal="Analyze spike results">
    <action>For each spike:
      - Evaluate if approach meets success criteria
      - Identify any blockers or issues
      - Assess if approach is feasible for MVP
      - Identify alternative approaches if needed
    </action>
    <action>If spike fails:
      - Identify root cause
      - Suggest alternative approaches
      - Assess impact on architecture
    </action>
    <action>If spike succeeds:
      - Confirm approach is viable
      - Document best practices
      - Identify any constraints or considerations
    </action>
    <action>Record analysis results</action>
  </step>

  <step n="7" goal="Generate spike report">
    <action>Construct spike_report_file path: "{output_folder}/technical-spike-report.md"</action>
    <action>Check if {spike_report_file} already exists</action>
    <check if="spike_report_file exists">
      <action>ELICIT from user: Spike report file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ Spike report file already exists. Skipping report generation.

Please review the existing file: {spike_report_file}
        </output>
        <action>HALT</action>
      </check>
    </check>
    
    <action>Generate spike report based on:
      - Template: {spike_report_template}
      - Technical risks from step 2
      - Spike plans from step 3
      - Spike results from step 5
      - Analysis results from step 6
    </action>
    
    <action>Create spike report with following sections:
      1. **Header**: Date, Project Name, Status, Spike Type
      2. **1. Executive Summary**:
         - Overall spike results
         - Key findings
         - Critical decisions
      3. **2. Technical Risks Identified**:
         - List of technical risks
         - Risk assessment
         - Spike objectives
      4. **3. Spike Execution**:
         - Spike plans
         - Execution order
         - Results for each spike
      5. **4. Spike Results**:
         - Approach tested
         - Results (success/failure/partial)
         - Performance metrics
         - Issues encountered
      6. **5. Analysis and Recommendations**:
         - Feasibility assessment
         - Best practices identified
         - Alternative approaches (if needed)
         - Architecture impact
      7. **6. Next Steps**:
         - Architecture decisions based on spikes
         - Remaining risks
         - Follow-up spikes (if needed)
    </action>
    
    <action>Write spike report to {spike_report_file}</action>
    <action>Ensure report is in {document_output_language}</action>
  </step>

  <step n="8" goal="Present spike results">
    <action>Summarize spike execution:
      - Number of spikes executed
      - Overall results (all passed / some failed / all failed)
      - Key findings
      - Critical decisions
    </action>
    <action>If any spikes failed:
      - Highlight critical issues
      - Suggest alternative approaches
      - Assess impact on architecture
      - Recommend next steps
    </action>
    <action>If all spikes passed:
      - Confirm technical approaches are viable
      - Recommend proceeding to architecture design
      - Document best practices for implementation
    </action>
    <action>Present results to user in clear format</action>
  </step>

</workflow>
````

