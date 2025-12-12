# Update Technical Debt Registry - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow updates the technical debt registry after retrospective workflow execution. It extracts technical debt from retrospective documents, updates the centralized technical debt registry, and updates the retrospective document to reference the registry.</critical>
<critical>DOCUMENT OUTPUT: The technical debt registry will be updated with new entries, and the retrospective document will be updated to reference the registry.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: output_folder, user_name, communication_language, sprint_artifacts.</action>
    <action>Resolve installed component paths from workflow.yaml: technical_debt_entry_template, retrospective_section_template, instructions</action>
    <action>Load technical_debt_registry: Read {technical_debt_registry} completely to understand current technical debt structure and existing entries</action>
    <action>Extract current TD numbers from registry:
      - Search for pattern "#### TD-XXX:" or "#### ~~TD-XXX:" in {technical_debt_registry}
      - Extract all TD numbers (e.g., TD-001, TD-002, ..., TD-018)
      - Find the highest TD number (e.g., if highest is TD-018, next_id = 19)
      - Store next_td_id for new entries
    </action>
  </step>

  <step n="2" goal="Get retrospective file and validate">
    <action>ELICIT from user: {{retrospective_file}} (required) - Path to the retrospective document (e.g., "docs/sprint-artifacts/epic-4-retrospective.md")</action>
    <action>ELICIT from user: {{epic_number}} (required) - Epic number (e.g., "4" for Epic 4)</action>
    
    <action>Check if {retrospective_file} exists</action>
    <check if="retrospective_file not found">
      <output>❌ Retrospective file not found: {retrospective_file}

Please verify the file path and ensure the retrospective document exists.
      </output>
      <action>HALT</action>
    </check>
    
    <action>Load retrospective_file: Read {retrospective_file} completely to understand structure and find technical debt section</action>
    <action>Search for technical debt section in {retrospective_file}:
      - Look for section "### 2.3 技術的負債" or "## 2.3 技術的負債" or similar patterns
      - Extract all technical debt entries from the section
    </action>
    
    <check if="technical debt section not found">
      <output>⚠️ Technical debt section not found in retrospective document.

The retrospective document may not contain technical debt entries, or the section may be named differently.
Please verify the retrospective document structure.
      </output>
      <action>ELICIT from user: Do you want to continue? (yes/no)
        - If yes, proceed to step 3 with empty technical debt list
        - If no, HALT
      </action>
    </check>
  </step>

  <step n="3" goal="Extract technical debt entries from retrospective">
    <action>Parse technical debt section in {retrospective_file}:
      - Extract each technical debt entry
      - For each entry, extract:
        * Technical debt name/title
        * Description (詳細な説明)
        * Impact (影響)
        * Priority (優先度: 高/中/低) - if not specified, ELICIT from user
        * Related Epic/Story information
        * Action plan (対応計画) - if mentioned
    </action>
    
    <action>For each technical debt entry found:
      - ELICIT from user: {{td_name}} - Technical debt name (if not clear from retrospective)
      - ELICIT from user: {{td_description}} - Detailed description (if not clear from retrospective)
      - ELICIT from user: {{td_impact}} - Impact of the technical debt (if not clear from retrospective)
      - ELICIT from user: {{td_priority}} - Priority (高/中/低) - Use priority criteria:
        * 高: 次のEpic開始前に解決が必要。実装の進行に影響を与える可能性がある
        * 中: 次のEpic開始前または完了後に解決推奨。実装の進行に軽微な影響を与える可能性がある
        * 低: Phase 2以降で対応可能。現在の実装には影響しない
      - ELICIT from user: {{td_action_plan}} - Action plan (対応計画) - if not clear from retrospective
      - ELICIT from user: {{td_deadline}} - Deadline (対応期限) - if applicable
      - ELICIT from user: {{td_stories}} - Related stories (e.g., "4.1, 4.2") - if applicable
    </action>
    
    <action>Store all extracted technical debt entries for processing</action>
  </step>

  <step n="4" goal="Assign TD IDs and prepare registry entries">
    <action>For each technical debt entry:
      - Assign TD ID: Use next_td_id from step 1 (e.g., TD-019, TD-020, ...)
      - Increment next_td_id for next entry
      - Format: "TD-XXX" where XXX is zero-padded 3-digit number
      - Store td_id for each entry
    </action>
    
    <action>Prepare registry entry for each technical debt:
      - Use technical_debt_entry_template
      - Format entry according to registry structure:
        * Header: "#### TD-XXX: [技術的負債名]"
        * **記録日:** {current_date}
        * **記録元:** Epic {{epic_number}} Retrospective
        * **Epic:** {{epic_number}}
        * **Story:** {{td_stories}} (if applicable)
        * **状態:** (未解決 - default)
        * **説明:** {{td_description}}
        * **影響:** {{td_impact}}
        * **対応計画:** {{td_action_plan}}
        * **対応期限:** {{td_deadline}} (if applicable)
        * **関連ドキュメント:** {retrospective_file}#技術的負債
    </action>
  </step>

  <step n="5" goal="Update technical debt registry">
    <action>Read {technical_debt_registry} completely, preserving all content and structure</action>
    
    <action>For each technical debt entry (grouped by priority):
      - Locate priority section in registry: "### 優先度: {{td_priority}}"
      - If priority section does not exist, create it after "## 技術的負債一覧" section
      - Insert new entry at the end of the priority section (before next priority section or end of file)
      - Use prepared registry entry from step 4
      - Ensure proper markdown formatting with blank lines between entries
    </action>
    
    <action>Update summary section:
      - Find "## サマリー" section (if exists) or create it
      - Update priority breakdown:
        * Count entries for each priority (高/中/低)
        * Update counts in summary
      - Update Epic breakdown:
        * Find Epic {{epic_number}} entry in Epic breakdown
        * Increment count for Epic {{epic_number}}
        * If Epic entry does not exist, add it
      - Update category breakdown (if applicable):
        * Categorize technical debt (機能統合、パフォーマンス、テスト、など)
        * Update category counts
      - Update total count:
        * Find "**合計:**" or similar pattern
        * Increment total count by number of new entries
    </action>
    
    <action>Update "Last Updated" field at top of document:
      - Find "**Last Updated:**" field
      - Update to: "**Last Updated:** {current_date} (TD-XXX追加)"
    </action>
    
    <action>Save {technical_debt_registry} with all updates, preserving formatting and structure</action>
  </step>

  <step n="6" goal="Update retrospective document to reference registry">
    <action>Read {retrospective_file} completely, preserving all content</action>
    
    <action>Locate technical debt section:
      - Find "### 2.3 技術的負債" or "## 2.3 技術的負債" section
      - If section does not exist, create it after "### 2.2" or appropriate location
    </action>
    
    <action>Replace or update technical debt section using retrospective_section_template:
      - Add notice at the beginning:
        "**注意:** 技術的負債の詳細は、一元管理されている[技術的負債レジストリ](../technical-debt-registry.md)を参照してください。このレジストリが技術的負債の**唯一の正式な記録場所**です。"
      - Add summary subsection: "#### 記録された技術的負債（要約）"
      - For each technical debt entry:
        * Format: "1. **[技術的負債名]** (TD-XXX)"
        * Add brief description (1-2 lines)
        * Add priority and deadline: "**優先度**: {{td_priority}}（{{td_deadline}}）"
      - Add reference links:
        * "**詳細情報:** 各技術的負債の詳細な説明、影響、対応計画については、[技術的負債レジストリ](../technical-debt-registry.md)を参照してください。"
        * "**技術的負債レジストリへの直接リンク:**"
        * Links to registry sections by priority
    </action>
    
    <action>Save {retrospective_file} with all updates, preserving formatting and structure</action>
  </step>

  <step n="7" goal="Verify updates">
    <action>Verify technical debt registry:
      - Check that all new entries are present
      - Check that TD IDs are correctly assigned
      - Check that priority sections are correct
      - Check that summary is updated
    </action>
    
    <action>Verify retrospective document:
      - Check that technical debt section references registry
      - Check that TD IDs are present in summary
      - Check that links to registry are correct
    </action>
    
    <action>Generate summary output:
      - List all new technical debt entries with TD IDs
      - Show priority distribution
      - Confirm registry and retrospective updates
    </action>
  </step>

</workflow>
````

