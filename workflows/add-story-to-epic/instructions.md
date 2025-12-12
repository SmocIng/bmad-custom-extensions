# Add Story to Epic - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow adds a new story to the end of an existing epic in epics.md and updates sprint-status.yaml. It supports adding stories to both in-progress and completed epics.</critical>
<critical>DOCUMENT OUTPUT: The story will be added to epics.md following the existing story format, and sprint-status.yaml will be updated to track the new story.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: sprint_artifacts, output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: template, instructions</action>
    <action>Load epics_file: Read {epics_file} completely to understand epic structure and existing stories</action>
    <action>Load sprint_status: Read {sprint_status} completely to understand current story tracking</action>
  </step>

  <step n="2" goal="Get epic number and validate epic exists">
    <action>ELICIT from user: {{epic_number}} (required) - The epic number to which the story will be added (e.g., "4" for Epic 4)</action>
    <action>ELICIT from user: {{story_reason}} (required) - Reason for adding the story (e.g., "technical debt", "requirement change", "bug fix")</action>
    <action>ELICIT from user: {{technical_debt_id}} (optional) - If story_reason is "technical debt", ask for the technical debt management number (e.g., "TD-001")</action>
    
    <action>Search {epics_file} for epic section matching "## Epic {{epic_number}}:" or "## Epic {{epic_number}}: " pattern</action>
    <check if="epic not found">
      <output>❌ Epic {{epic_number}} not found in epics.md

Please verify the epic number and ensure the epic exists in the epics.md file.
      </output>
      <action>HALT</action>
    </check>
    
    <action>Extract epic title and current story count from Epic Summary section (e.g., "Epic 4: Learning State Tracking (7ストーリー)")</action>
    <action>Store epic_title for later use</action>
  </step>

  <step n="3" goal="Find last story number in epic">
    <action>Parse the epic section in {epics_file} to find all story entries</action>
    <action>Story entries follow pattern: "### Story {{epic_num}}.{{story_num}}:" or "### Story {{epic_num}}.{{story_num}}: {{technical_debt_id}}: {{story_title}}"</action>
    <action>Extract all story numbers for epic {{epic_number}} (e.g., for Epic 4: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7)</action>
    <action>Find the highest story number (e.g., if stories are 4.1 through 4.7, last_story_num = 7)</action>
    <action>Calculate next_story_num = last_story_num + 1 (e.g., 4.8)</action>
    <action>Set {{story_id}} = "{{epic_number}}.{{next_story_num}}"</action>
    <action>Verify next_story_num does not already exist in the epic section</action>
  </step>

  <step n="4" goal="Elicit story content from user">
    <action>ELICIT from user: {{story_title}} (required) - The title of the new story</action>
    <action>ELICIT from user: {{story_role}} (required) - The role in the user story (e.g., "開発者", "学習者")</action>
    <action>ELICIT from user: {{story_action}} (required) - The action in the user story (e.g., "Story 4.6とStory 4.7のモック実装を実際の実装に置き換える")</action>
    <action>ELICIT from user: {{story_benefit}} (required) - The benefit in the user story (e.g., "Epic 5のStory 5.1で実装されたチャットUIと統合できる")</action>
    <action>ELICIT from user: {{acceptance_criteria}} (required) - List of acceptance criteria, one per line or numbered list</action>
    <action>ELICIT from user: {{prerequisites}} (optional) - Prerequisites or dependencies (e.g., "Story 4.6, Story 4.7, Story 5.1")</action>
    <action>ELICIT from user: {{technical_notes}} (optional) - Technical notes, implementation guidance, or references</action>
  </step>

  <step n="5" goal="Format story name with technical debt ID if applicable">
    <action>If {{technical_debt_id}} is provided and not empty:
      - Format story name as: "### Story {{story_id}}: {{technical_debt_id}}: {{story_title}}"
      - This follows the pattern seen in technical debt stories (e.g., "Story TD-001: Epic 4への部分依存の統合")
    </action>
    <action>If {{technical_debt_id}} is empty or not provided:
      - Format story name as: "### Story {{story_id}}: {{story_title}}"
      - This follows the standard story naming pattern
    </action>
    <action>Store formatted_story_name for use in epics.md update</action>
  </step>

  <step n="6" goal="Update epics.md">
    <action>Read {epics_file} completely, preserving all content</action>
    <action>Locate the epic section for Epic {{epic_number}}</action>
    <action>Find the last story in the epic section (before the next epic section or end of file)</action>
    <action>Insert new story after the last story, following the existing story format:
      - Story header: Use formatted_story_name from step 5 (includes technical debt ID if applicable)
      - User story format: "As a **{{story_role}}**,\nI want **{{story_action}}**,\nSo that **{{story_benefit}}**。"
      - Acceptance Criteria section: "**Acceptance Criteria:**\n\n{{acceptance_criteria}}"
      - Prerequisites section: "**Prerequisites:** {{prerequisites}}" (include even if empty, or omit if truly not needed)
      - Technical Notes section: "**Technical Notes:**\n{{technical_notes}}" (include even if empty, or omit if truly not needed)
      - Ensure proper markdown formatting with blank lines between sections (one blank line between each section)
      - Follow the exact format seen in existing stories in epics.md
    </action>
    
    <action>Update Epic Summary section:
      - Find line in "### Epic Summary" section matching pattern: "{{epic_number}}. **Epic {{epic_number}}: {{epic_title}}** ({{current_count}}ストーリー)"
      - Note: The pattern includes "**" around epic title and may include description after the story count
      - Extract current_count from the line (number before "ストーリー")
      - Increment story count: {{new_count}} = {{current_count}} + 1
      - Update to: "{{epic_number}}. **Epic {{epic_number}}: {{epic_title}}** ({{new_count}}ストーリー)" (preserve description if present)
      - Example: "4. **Epic 4: Learning State Tracking** (7ストーリー)" → "4. **Epic 4: Learning State Tracking** (8ストーリー)"
    </action>
    
    <action>Update total story count:
      - Find line matching pattern: "**合計: {{total_count}}ストーリー**"
      - Increment total: {{new_total}} = {{total_count}} + 1
      - Update to: "**合計: {{new_total}}ストーリー**"
    </action>
    
    <action>Check if story covers any FRs (Functional Requirements):
      - ELICIT from user: Does this story cover any Functional Requirements (FRs)?
      - If yes, ELICIT which FRs are covered (e.g., "FR-001-1", "FR-002-3")
      - For each covered FR, update FR Coverage Map/Matrix sections:
        * Find the FR entry in "## FR Coverage Map" or "## FR Coverage Matrix" section
        * Update or add entry: "| **FR-XXX-Y** | Description | Epic {{epic_number}} | Story {{story_id}} |"
      - If no FRs are covered, skip this step
    </action>
    
    <action>Save {epics_file} with all updates, preserving formatting and structure</action>
  </step>

  <step n="7" goal="Update sprint-status.yaml">
    <action>Read {sprint_status} completely, preserving all comments and structure</action>
    <action>Generate story_key from story: "{{epic_number}}-{{next_story_num}}-{{story_slug}}"
      - story_slug: Convert story_title to kebab-case
        * For Japanese titles: Use romanized version or key phrase (e.g., "Epic 4への部分依存の統合" → "epic-4-integration")
        * For English titles: Convert to lowercase, replace spaces with hyphens, remove special characters
        * Example: "learning progress tracking" → "learning-progress-tracking"
      - Note: Even for technical debt stories, use the standard pattern "{{epic_number}}-{{next_story_num}}-{{story_slug}}" for consistency
        * This ensures compatibility with existing workflows that expect "number-number-name" pattern
        * Example: For TD-001 story in Epic 4 as story 4.8, use "4-8-epic-4-integration" (not "td-001-epic-4-integration")
    </action>
    
    <action>Find development_status section in {sprint_status}</action>
    <action>Locate epic entry: "epic-{{epic_number}}: {{status}}"</action>
    <action>Store epic_status from the epic entry (e.g., "contexted", "backlog")</action>
    <action>Add new story entry after the last story of the epic:
      - Format: "  {{story_key}}: backlog"
      - Place after last story entry for epic {{epic_number}}
      - Maintain YAML indentation (2 spaces)
    </action>
    
    <action>If epic entry does not exist (completed epic), add it before the story entry:
      - Format: "  epic-{{epic_number}}: contexted" (or maintain existing status if present)
    </action>
    
    <action>Save {sprint_status} with all updates, preserving all comments, STATUS DEFINITIONS, and WORKFLOW NOTES</action>
  </step>

  <step n="8" goal="Update tech-spec-epic-*.md if epic is contexted">
    <check if="epic_status == 'contexted'">
      <action>Construct tech_spec_file path: "{sprint_artifacts}/tech-spec-epic-{{epic_number}}.md"</action>
      <action>Check if {tech_spec_file} exists</action>
      <check if="tech_spec_file exists">
        <action>Read {tech_spec_file} completely, preserving all content</action>
        
        <action>Update "Objectives and Scope" section:
          - Find "## Objectives and Scope" section
          - Locate "- In Scope:" list
          - Add new entry: "- {{story_title}}（Story {{story_id}}）"
          - Place after the last existing story entry in the In Scope list
          - Maintain consistent formatting with existing entries
        </action>
        
        <action>Update "Workflows and Sequencing" section:
          - Find "### Workflows and Sequencing" section
          - Locate the last numbered workflow entry (e.g., "4. **Story 5.4: ...**")
          - Add new numbered entry: "{{next_story_num}}. **Story {{story_id}}: {{story_title}}**"
          - Extract key implementation details from {{acceptance_criteria}} and {{technical_notes}}
          - Format as bullet points under the story entry:
            * Main implementation tasks from acceptance criteria
            * Key technical notes if provided
            * Test requirements if mentioned
          - Maintain consistent formatting with existing workflow entries
        </action>
        
        <action>Update "Acceptance Criteria (Authoritative)" section:
          - Find "## Acceptance Criteria (Authoritative)" section
          - Add new subsection: "### Story {{story_id}}: {{story_title}}"
          - Convert {{acceptance_criteria}} to numbered list format:
            * Each acceptance criterion becomes a numbered item
            * Format: "1. {{criterion_text}}"
            * Preserve "Given/When/Then" format if present
          - Maintain consistent formatting with existing acceptance criteria
        </action>
        
        <action>Update "Traceability Mapping" section (if present):
          - Find "## Traceability Mapping" section
          - Extract acceptance criteria from {{acceptance_criteria}}
          - For each acceptance criterion, add a traceability row:
            * Format: "| Story {{story_id}}-{{criterion_num}} | Workflows and Sequencing | {{component/description}} | {{test_idea}} |"
            * Determine appropriate test idea based on criterion content
            * Place after the last existing traceability row
          - Maintain table formatting
        </action>
        
        <action>Update "Document Revision History" section (if present):
          - Find "## Document Revision History" or "**Document Revision History**" section
          - Add new version entry at the top:
            * Format: "- **Version X.Y ({{date}})**: Story {{story_id}}を追加"
            * Or: "- **Version X.Y ({{date}})**: {{story_title}}を追加"
            * Increment version number appropriately
          - If section does not exist, create it before the final closing section
        </action>
        
        <action>Save {tech_spec_file} with all updates, preserving formatting and structure</action>
      </check>
      <check if="tech_spec_file does not exist">
        <action>Skip tech-spec update (file does not exist yet, will be created by epic-tech-context workflow)</action>
      </check>
    </check>
    <check if="epic_status != 'contexted'">
      <action>Skip tech-spec update (epic is not in 'contexted' state)</action>
    </check>
  </step>

  <step n="9" goal="Output completion message">
    <output>**✅ Story Added Successfully, {user_name}!**

**Story Details:**
- Epic: {{epic_number}} ({{epic_title}})
- Story ID: {{story_id}}
- Story Key: {{story_key}}
- Story Title: {{story_title}}
- Status: backlog (added to sprint-status.yaml)

**Files Updated:**
- {epics_file}: Story added to Epic {{epic_number}} section
- {sprint_status}: Story added to backlog
- {tech_spec_file}: Story added to technical specification (if epic is contexted and file exists)

**⚠️ Important Notes:**

1. **tech-spec-epic-*.md Update:**
   - If epic is in 'contexted' state and tech-spec file exists, it has been automatically updated
   - If epic is not 'contexted', tech-spec update was skipped (epic-tech-context workflow should be run first)
   - If tech-spec file does not exist, it will be created when epic-tech-context workflow is run

2. **epic-tech-context Re-execution:**
   - If the added story introduces new technical requirements (new tech stack, architecture changes), consider re-running `epic-tech-context` to regenerate the technical specification
   - If the story is a technical debt resolution using existing patterns, the automatic update to tech-spec should be sufficient
   - Command: `/bmad:bmm:workflows:epic-tech-context` (ClaudeCode) or `@.bmad/bmm/workflows/epic-tech-context` (Cursor)

3. **validate-epic-tech-context Re-execution:**
   - Only needed if `epic-tech-context` was re-executed
   - Command: `/bmad:bmm:workflows:validate-epic-tech-context` (ClaudeCode) or `@.bmad/bmm/workflows/validate-epic-tech-context` (Cursor)

**Next Steps:**

1. Review the added story in {epics_file} (Epic {{epic_number}} section)
2. Use `create-story` workflow to generate the story file: `/bmad:bmm:workflows:create-story` (ClaudeCode) or `@.bmad/bmm/workflows/create-story` (Cursor)
3. Follow standard story workflow: story-ready → dev-story → code-review → story-done
    </output>
  </step>

</workflow>
````

