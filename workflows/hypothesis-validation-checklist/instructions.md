# Hypothesis Validation Checklist - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow creates a hypothesis validation checklist to promote hypothesis-driven development mindset. It helps ensure MVP focuses on validating hypotheses rather than building features, and identifies minimum features needed for validation.</critical>
<critical>DOCUMENT OUTPUT: The checklist will be saved to {checklist_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, checklist_template</action>
    <action>Load product_brief_file: Search for {product_brief_file} and read if exists to understand product vision</action>
    <action>Load brainstorming_file: Search for {brainstorming_file} and read if exists to understand first principles and ideas</action>
  </step>

  <step n="2" goal="Extract product context">
    <action>From {product_brief_file} (if exists), extract:
      - Product vision
      - Target users
      - Core value proposition
      - First principles (if mentioned)
    </action>
    <action>From {brainstorming_file} (if exists), extract:
      - First principles
      - Key ideas
      - Core concepts
    </action>
    <action>Store extracted information for hypothesis identification</action>
  </step>

  <step n="3" goal="Identify hypotheses to validate">
    <action>ELICIT from user: What are the key hypotheses you want to validate with this MVP? (List 1-5 key hypotheses)</action>
    <action>For each hypothesis, ELICIT:
      - Hypothesis statement (one sentence, clear and testable)
      - What you expect to learn from validation
      - Success criteria for validation
      - Failure criteria (what would invalidate the hypothesis)
    </action>
    <action>If product context is available, suggest hypotheses based on:
      - First principles
      - Core value proposition
      - User needs
    </action>
    <action>Store hypotheses for checklist creation</action>
  </step>

  <step n="4" goal="Identify minimum features for each hypothesis">
    <action>For each hypothesis identified in step 3:
      - ELICIT: What is the minimum set of features needed to validate this hypothesis?
      - ELICIT: Can this hypothesis be validated with 3 or fewer features?
      - If more than 3 features are needed, suggest how to simplify
    </action>
    <action>For each hypothesis, identify:
      - Core features (essential for validation)
      - Nice-to-have features (can be deferred)
      - Dependencies between features
    </action>
    <action>Record minimum feature set for each hypothesis</action>
  </step>

  <step n="5" goal="Validate implementation feasibility">
    <action>For each hypothesis and its minimum feature set:
      - ELICIT: Can this be implemented in 2 weeks (10 working days)?
      - If NO, suggest:
        - Which features can be simplified
        - Which features can be deferred
        - Alternative validation approaches
    </action>
    <action>Estimate total implementation time for all hypotheses:
      - Sum up time for all minimum feature sets
      - Check if total <= 2 weeks
      - If NO, prioritize hypotheses and suggest phased approach
    </action>
    <action>Record feasibility assessment</action>
  </step>

  <step n="6" goal="Validate user testing approach">
    <action>For each hypothesis:
      - ELICIT: Can this hypothesis be validated through user testing?
      - ELICIT: What user testing scenario would validate this hypothesis?
      - ELICIT: What metrics or feedback would indicate success?
    </action>
    <action>If user testing is not possible:
      - Suggest alternative validation methods
      - Identify what would make user testing possible
    </action>
    <action>Record user testing approach for each hypothesis</action>
  </step>

  <step n="7" goal="Identify pivot strategies">
    <action>For each hypothesis:
      - ELICIT: What would you do if this hypothesis is invalidated?
      - ELICIT: What is the pivot strategy?
      - ELICIT: What alternative approaches are available?
    </action>
    <action>Record pivot strategies for each hypothesis</action>
  </step>

  <step n="8" goal="Generate hypothesis validation checklist">
    <action>Construct checklist_file path: "{output_folder}/hypothesis-validation-checklist.md"</action>
    <action>Check if {checklist_file} already exists</action>
    <check if="checklist_file exists">
      <action>ELICIT from user: Checklist file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ Checklist file already exists. Skipping checklist generation.

Please review the existing file: {checklist_file}
        </output>
        <action>HALT</action>
      </check>
    </check>
    
    <action>Generate checklist based on:
      - Template: {checklist_template}
      - Hypotheses from step 3
      - Minimum features from step 4
      - Feasibility assessment from step 5
      - User testing approach from step 6
      - Pivot strategies from step 7
    </action>
    
    <action>Create checklist with following sections:
      1. **Header**: Date, Project Name, Status
      2. **1. Hypothesis Validation Mindset**:
         - Overview of hypothesis-driven development
         - Key principles
         - Benefits
      3. **2. Hypotheses to Validate**:
         - List of hypotheses with statements
         - Success criteria
         - Failure criteria
      4. **3. Minimum Features for Each Hypothesis**:
         - Core features for each hypothesis
         - Nice-to-have features (deferred)
         - Feature dependencies
      5. **4. Implementation Feasibility**:
         - Estimated time for each hypothesis
         - Total estimated time
         - Feasibility assessment
      6. **5. User Testing Approach**:
         - User testing scenario for each hypothesis
         - Metrics and feedback
         - Validation methods
      7. **6. Pivot Strategies**:
         - Pivot strategy for each hypothesis
         - Alternative approaches
      8. **7. Checklist Items**:
         - [ ] Can each hypothesis be stated in one sentence?
         - [ ] Can each hypothesis be validated with 3 or fewer features?
         - [ ] Can all hypotheses be validated in 2 weeks?
         - [ ] Can each hypothesis be validated through user testing?
         - [ ] Is there a pivot strategy for each hypothesis?
      9. **8. Recommendations**:
         - Feature prioritization
         - Phased approach (if needed)
         - Next steps
    </action>
    
    <action>Write checklist to {checklist_file}</action>
    <action>Ensure checklist is in {document_output_language}</action>
  </step>

  <step n="9" goal="Present checklist results">
    <action>Summarize checklist creation:
      - Number of hypotheses identified
      - Overall feasibility assessment
      - Key recommendations
    </action>
    <action>Highlight any concerns:
      - Hypotheses that require too many features
      - Hypotheses that cannot be validated in 2 weeks
      - Hypotheses that cannot be user tested
    </action>
    <action>Present results to user in clear format</action>
  </step>

</workflow>
````

