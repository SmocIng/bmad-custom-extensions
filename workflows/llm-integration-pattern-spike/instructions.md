# LLM Integration Pattern Spike - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow creates a spike to validate LLM output interpretation architecture patterns. It helps identify the best approach for LLM output parsing, structured output validation, and intent classification.</critical>
<critical>DOCUMENT OUTPUT: The LLM pattern report will be saved to {llm_pattern_report_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, llm_pattern_report_template</action>
    <action>Load prd_file: Read {prd_file} completely to understand LLM integration requirements</action>
  </step>

  <step n="2" goal="Identify LLM integration requirements">
    <action>From {prd_file}, identify LLM integration requirements:
      - LLM output parsing requirements
      - Structured output requirements
      - Intent classification requirements
      - Response format requirements
      - Error handling requirements
    </action>
    <action>ELICIT from user: What LLM integration patterns do you want to validate? (List 1-5 patterns)</action>
    <action>For each pattern, ELICIT:
      - Pattern description
      - Why it's important
      - What needs to be validated
      - Success criteria
    </action>
    <action>Store LLM integration requirements for spike planning</action>
  </step>

  <step n="3" goal="Identify LLM output interpretation approaches">
    <action>Identify common LLM output interpretation approaches:
      - Structured Output Libraries (LangGraph, Instructor, Outlines, etc.)
      - JSON Schema Validation (Zod, Pydantic, etc.)
      - Keyword-based Pattern Matching
      - LLM Semantic Understanding
      - Hybrid Approaches (keyword + semantic)
    </action>
    <action>For each approach, ELICIT:
      - What are the pros and cons?
      - What is the implementation complexity?
      - What is the performance impact?
      - What is the accuracy/ reliability?
    </action>
    <action>Store approaches for comparison</action>
  </step>

  <step n="4" goal="Plan LLM pattern spike">
    <action>For each LLM integration pattern identified in step 2:
      - ELICIT: What specific approach will be tested?
      - ELICIT: What is the minimal prototype needed?
      - ELICIT: What metrics will be measured?
      - ELICIT: What is the success criteria?
    </action>
    <action>For structured output spike:
      - Test JSON schema validation (Zod, Pydantic)
      - Test structured output libraries (Instructor, Outlines)
      - Measure parsing success rate
      - Measure performance impact
    </action>
    <action>For intent classification spike:
      - Test keyword-based pattern matching
      - Test LLM semantic understanding
      - Test hybrid approaches
      - Measure accuracy and reliability
      - Measure performance impact
    </action>
    <action>For response format spike:
      - Test JSON mode
      - Test structured output
      - Test error handling
      - Measure reliability
    </action>
    <action>Store spike plans</action>
  </step>

  <step n="5" goal="Execute LLM pattern spike">
    <action>For each LLM pattern spike:
      - Create minimal prototype
      - Implement pattern approach
      - Test with sample inputs
      - Measure metrics
      - Compare approaches
    </action>
    <action>For structured output spike, measure:
      - Parsing success rate
      - Performance (latency)
      - Error handling effectiveness
      - Developer experience
    </action>
    <action>For intent classification spike, measure:
      - Accuracy (true positive rate)
      - Reliability (consistency)
      - Performance (latency, cost)
      - Maintenance complexity
    </action>
    <action>For each spike, record:
      - Approach tested
      - Results (success/failure/partial)
      - Metrics
      - Issues encountered
      - Recommendations
    </action>
  </step>

  <step n="6" goal="Compare approaches">
    <action>For each LLM integration pattern:
      - Compare different approaches
      - Evaluate pros and cons
      - Assess trade-offs (performance vs accuracy, complexity vs reliability)
      - Identify best approach for each pattern
    </action>
    <action>Create comparison matrix:
      - Approach vs Pattern
      - Performance comparison
      - Accuracy comparison
      - Complexity comparison
      - Recommendation
    </action>
    <action>Record comparison results</action>
  </step>

  <step n="7" goal="Analyze spike results">
    <action>For each LLM integration pattern:
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

  <step n="8" goal="Generate LLM pattern report">
    <action>Construct llm_pattern_report_file path: "{output_folder}/llm-integration-pattern-report.md"</action>
    <action>Check if {llm_pattern_report_file} already exists</action>
    <check if="llm_pattern_report_file exists">
      <action>ELICIT from user: LLM pattern report file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ LLM pattern report file already exists. Skipping report generation.

Please review the existing file: {llm_pattern_report_file}
        </output>
        <action>HALT</action>
      </check>
    </check>
    
    <action>Generate LLM pattern report based on:
      - Template: {llm_pattern_report_template}
      - LLM integration requirements from step 2
      - Approaches identified in step 3
      - Spike results from step 5
      - Comparison results from step 6
      - Analysis results from step 7
    </action>
    
    <action>Create LLM pattern report with following sections:
      1. **Header**: Date, Project Name, Status, LLM Pattern Spike Type
      2. **1. Executive Summary**:
         - Overall spike results
         - Key findings
         - Recommended approaches
      3. **2. LLM Integration Requirements**:
         - Output parsing requirements
         - Structured output requirements
         - Intent classification requirements
      4. **3. Approaches Evaluated**:
         - Structured output libraries
         - JSON schema validation
         - Keyword-based pattern matching
         - LLM semantic understanding
         - Hybrid approaches
      5. **4. Spike Results**:
         - Results for each pattern
         - Approach comparison
         - Performance metrics
         - Accuracy metrics
      6. **5. Approach Comparison**:
         - Comparison matrix
         - Trade-offs analysis
         - Best approach recommendation
      7. **6. Recommendations**:
         - Recommended approach for each pattern
         - Implementation guidance
         - Best practices
         - Architecture considerations
      8. **7. Next Steps**:
         - Architecture decisions based on spikes
         - Implementation plan
         - Follow-up spikes (if needed)
    </action>
    
    <action>Write LLM pattern report to {llm_pattern_report_file}</action>
    <action>Ensure report is in {document_output_language}</action>
  </step>

  <step n="9" goal="Present LLM pattern results">
    <action>Summarize LLM pattern spike execution:
      - Number of patterns tested
      - Overall results (all passed / some failed / all failed)
      - Key findings
      - Recommended approaches
    </action>
    <action>If any spikes failed:
      - Highlight critical issues
      - Suggest alternative approaches
      - Assess impact on architecture
      - Recommend next steps
    </action>
    <action>If all spikes passed:
      - Confirm LLM integration approaches are viable
      - Recommend proceeding to architecture design
      - Document best practices for implementation
    </action>
    <action>Present results to user in clear format</action>
  </step>

</workflow>
````

