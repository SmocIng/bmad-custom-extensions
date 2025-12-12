# Validate MVP Scope - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow validates MVP scope after PRD creation to ensure it is appropriate for rapid hypothesis validation. It checks if the MVP can be implemented in 2 weeks, validates hypotheses with 3 or fewer features, and ensures user testing is possible.</critical>
<critical>DOCUMENT OUTPUT: The validation report will be saved to {validation_report_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, validation_report_template</action>
    <action>Load prd_file: Read {prd_file} completely to understand functional requirements and non-functional requirements</action>
    <action>Load product_brief_file: Search for {product_brief_file} and read if exists to understand product vision and first principles</action>
    <action>Load hypothesis_validation_checklist: Check if {hypothesis_validation_checklist} exists and read if available</action>
  </step>

  <step n="2" goal="Extract MVP scope information">
    <action>From {prd_file}, extract:
      - All Functional Requirements (FR-001, FR-002, etc.)
      - All Non-Functional Requirements (NFR-001, NFR-002, etc.)
      - Success criteria
      - User experience considerations
    </action>
    <action>From {product_brief_file} (if exists), extract:
      - Product vision
      - First principles (if mentioned)
      - Target users
      - Core value proposition
    </action>
    <action>Count total number of functional requirements</action>
    <action>Identify core features that are essential for MVP</action>
    <action>Store extracted information for validation checks</action>
  </step>

  <step n="3" goal="Identify hypotheses to validate">
    <action>ELICIT from user: What hypotheses do you want to validate with this MVP? (List 1-3 key hypotheses)</action>
    <action>For each hypothesis, ELICIT:
      - Hypothesis statement (one sentence)
      - Minimum features needed to validate
      - Success criteria for validation
      - User testing approach
    </action>
    <action>If {hypothesis_validation_checklist} exists, reference it for hypothesis validation mindset</action>
    <action>Store hypotheses for validation checks</action>
  </step>

  <step n="4" goal="Validate MVP scope - Implementation time">
    <action>Analyze functional requirements and estimate implementation time:
      - Count total FRs
      - Estimate complexity of each FR (simple: 1-2 days, medium: 3-5 days, complex: 6+ days)
      - Calculate total estimated time
    </action>
    <action>Check if total estimated time <= 2 weeks (10 working days):
      - If YES: Mark as PASS
      - If NO: Mark as FAIL and identify scope reduction opportunities
    </action>
    <action>If FAIL, suggest:
      - Which FRs can be deferred to Phase 2
      - Which features can be simplified
      - Minimum viable feature set
    </action>
    <action>Record validation result</action>
  </step>

  <step n="5" goal="Validate MVP scope - Hypothesis validation">
    <action>For each hypothesis identified in step 3:
      - Check if hypothesis can be validated with 3 or fewer features
      - Identify which FRs are essential for each hypothesis
      - Check if there are simpler ways to test the hypothesis
    </action>
    <action>If any hypothesis requires more than 3 features:
      - Mark as CONCERN
      - Suggest simpler validation approaches
      - Identify which features can be combined or simplified
    </action>
    <action>Check if all hypotheses can be validated with the current MVP scope:
      - If YES: Mark as PASS
      - If PARTIAL: Mark as CONCERN
      - If NO: Mark as FAIL
    </action>
    <action>Record validation result</action>
  </step>

  <step n="6" goal="Validate MVP scope - First principles">
    <action>If {product_brief_file} mentions first principles:
      - Extract first principles
      - For each first principle, check if there is a simpler way to validate it
      - Identify if current MVP scope includes unnecessary complexity
    </action>
    <action>If first principles are mentioned:
      - Check if MVP can validate first principles with simpler approach
      - Suggest alternatives if current approach is too complex
    </action>
    <action>Record validation result</action>
  </step>

  <step n="7" goal="Validate MVP scope - User testing">
    <action>Check if MVP scope allows for user testing:
      - Can users interact with the core features?
      - Can users provide feedback on hypothesis validation?
      - Is there a clear user testing scenario?
    </action>
    <action>If user testing is not possible:
      - Mark as CONCERN
      - Suggest how to enable user testing
      - Identify minimum features needed for user testing
    </action>
    <action>Record validation result</action>
  </step>

  <step n="8" goal="Generate validation report">
    <action>Construct validation_report_file path: "{output_folder}/mvp-scope-validation-report.md"</action>
    <action>Check if {validation_report_file} already exists</action>
    <check if="validation_report_file exists">
      <action>ELICIT from user: Validation report file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ Validation report file already exists. Skipping report generation.

Please review the existing file: {validation_report_file}
        </output>
        <action>HALT</action>
      </check>
    </check>
    
    <action>Generate validation report based on:
      - Template: {validation_report_template}
      - Validation results from steps 4-7
      - Extracted MVP scope information from step 2
      - Hypotheses from step 3
    </action>
    
    <action>Create validation report with following sections:
      1. **Header**: Date, Project Name, Status, Validation Type
      2. **1. Executive Summary**:
         - Overall validation result (PASS/CONCERN/FAIL)
         - Key findings
         - Recommendations
      3. **2. MVP Scope Overview**:
         - Functional Requirements count
         - Core features identified
         - Estimated implementation time
      4. **3. Hypothesis Validation Check**:
         - List of hypotheses
         - Features needed for each hypothesis
         - Validation approach
         - Result (PASS/CONCERN/FAIL)
      5. **4. Implementation Time Validation**:
         - Total estimated time
         - Breakdown by feature
         - Result (PASS/FAIL)
         - Recommendations if FAIL
      6. **5. First Principles Validation** (if applicable):
         - First principles identified
         - Simpler validation approaches suggested
         - Result (PASS/CONCERN/FAIL)
      7. **6. User Testing Validation**:
         - User testing feasibility
         - User testing scenario
         - Result (PASS/CONCERN/FAIL)
      8. **7. Recommendations**:
         - Scope reduction suggestions
         - Feature prioritization
         - Next steps
      9. **8. Conclusion**:
         - Overall assessment
         - Go/No-Go recommendation
         - Action items
    </action>
    
    <action>Write validation report to {validation_report_file}</action>
    <action>Ensure report is in {document_output_language}</action>
  </step>

  <step n="9" goal="Present validation results">
    <action>Summarize validation results:
      - Overall status (PASS/CONCERN/FAIL)
      - Key issues identified
      - Recommendations
    </action>
    <action>If status is FAIL or CONCERN:
      - Highlight critical issues
      - Suggest immediate actions
      - Recommend scope reduction before proceeding to Phase 3
    </action>
    <action>If status is PASS:
      - Confirm MVP scope is appropriate
      - Recommend proceeding to Phase 3 (Solutioning)
    </action>
    <action>Present results to user in clear format</action>
  </step>

</workflow>
````

