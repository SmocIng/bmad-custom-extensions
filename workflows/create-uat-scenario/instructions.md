# Create UAT Scenario - Workflow Instructions

````xml
<critical>The workflow execution engine is governed by: {project_root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>This workflow creates a UAT plan and a user-executable verification scenario for an epic. It should be executed at the end of an epic, before or after retrospective.</critical>
<critical>DOCUMENT OUTPUT: The UAT plan will be saved to {uat_plan_file} and the verification scenario will be saved to {verification_scenario_file}.</critical>

<workflow>

  <step n="1" goal="Load config and initialize">
    <action>Resolve variables from config_source: sprint_artifacts, output_folder, user_name, communication_language.</action>
    <action>Resolve installed component paths from workflow.yaml: instructions, uat_plan_template, verification_scenario_template</action>
    <action>Load epics_file: Read {epics_file} completely to understand epic structure and stories</action>
    <action>Load reference UAT plans: Search for {reference_uat_plans} to understand UAT plan structure</action>
    <action>Load reference verification scenarios: Search for {reference_verification_scenarios} to understand verification scenario structure</action>
  </step>

  <step n="2" goal="Get epic number and validate epic exists">
    <action>ELICIT from user: {{epic_number}} (required) - The epic number for which to create UAT scenario (e.g., "4" for Epic 4)</action>
    
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
      - Story IDs and titles (e.g., "Story 4.1: Learning Progress Tracking")
      - Acceptance criteria from each story
      - Technical notes from each story
    </action>
    <action>Store epic_title, epic_stories, epic_acceptance_criteria for later use</action>
  </step>

  <step n="3" goal="Load reference UAT plans and verification scenarios">
    <action>Search for existing UAT plans: {reference_uat_plans}</action>
    <action>Read at least one reference UAT plan completely to understand structure:
      - UAT概要セクション（目的、対象範囲、受け入れ基準）
      - テストケースセクション（各Storyに対応するテストケース）
      - テスト実行手順セクション（事前準備チェックリスト、テスト実行手順）
      - テスト結果記録セクション（テスト実行サマリー、成功率、問題点）
      - 受け入れ判定セクション（判定基準、判定結果）
    </action>
    
    <action>Search for existing verification scenarios: {reference_verification_scenarios}</action>
    <action>Read at least one reference verification scenario completely to understand structure:
      - シナリオ概要セクション
      - 事前準備チェックリストセクション（環境変数確認、データベース接続確認、サービス起動確認、テストデータ準備）
      - シナリオ1: 基本的な動作確認（各Storyに対応するステップ）
      - シナリオ2: ブラウザでの動作確認（オプション）
      - 確認チェックリストセクション
      - トラブルシューティングセクション
      - 検証結果サマリーセクション
      - 成功基準セクション
    </action>
    
    <action>Extract patterns and structure from reference files for reuse</action>
  </step>

  <step n="4" goal="Generate UAT plan">
    <action>Construct uat_plan_file path: "{sprint_artifacts}/epic-{{epic_number}}-uat-plan.md"</action>
    <action>Check if {uat_plan_file} already exists</action>
    <check if="uat_plan_file exists">
      <action>ELICIT from user: UAT plan file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ UAT plan file already exists. Skipping UAT plan generation.

Please review the existing file: {uat_plan_file}
        </output>
        <action>Skip to step 5</action>
      </check>
    </check>
    
    <action>Generate UAT plan content based on:
      - Epic information from step 2
      - Reference UAT plan structure from step 3
      - Template: {uat_plan_template}
    </action>
    
    <action>Create UAT plan with following sections:
      1. **Header**: Date, Epic ID, Status, UAT Type
      2. **1. UAT概要**:
         - 1.1 目的: Epicの機能要件を満たすことを確認する目的を記載
         - 1.2 対象範囲: Epicで実装されたすべてのStoryをリスト
         - 1.3 受け入れ基準: 各Storyの受け入れ基準を統合
      3. **2. テストケース**: 各Storyに対応するテストケースを作成
         - テストケースID: TC-{epic_number}{story_num}形式（例: TC-401, TC-402）
         - 前提条件、手順、期待結果、実測結果欄を含む
      4. **3. テスト実行手順**:
         - 3.1 事前準備チェックリスト: 環境変数確認、データベース接続確認、開発サーバー起動確認、テストデータ準備
         - 3.2 テスト実行: 個別機能テスト、統合テスト、パフォーマンステストの実行手順
      5. **4. テスト結果記録**:
         - 4.1 テスト実行サマリー: テーブル形式でテストケースID、名前、ステータス、実行日時、備考
         - 4.2 成功率: 成功数、失敗数、成功率
         - 4.3 問題点と改善提案: 発見された問題の記録
      6. **5. 受け入れ判定**:
         - 5.1 判定基準: 合格、条件付き合格、不合格の基準
         - 5.2 判定結果: 判定結果と判定理由
      7. **6. 次のステップ**: UAT合格時/不合格時の対応
    </action>
    
    <action>Save {uat_plan_file} with generated content</action>
  </step>

  <step n="5" goal="Generate verification scenario">
    <action>Construct verification_scenario_file path: "{sprint_artifacts}/epic-{{epic_number}}-verification-scenario.md"</action>
    <action>Check if {verification_scenario_file} already exists</action>
    <check if="verification_scenario_file exists">
      <action>ELICIT from user: Verification scenario file already exists. Do you want to overwrite it? (yes/no)</action>
      <check if="user says no">
        <output>⚠️ Verification scenario file already exists. Skipping verification scenario generation.

Please review the existing file: {verification_scenario_file}
        </output>
        <action>Skip to step 6</action>
      </check>
    </check>
    
    <action>Generate verification scenario content based on:
      - Epic information from step 2
      - Reference verification scenario structure from step 3
      - Template: {verification_scenario_template}
      - UAT plan from step 4 (if generated)
    </action>
    
    <action>Create verification scenario with following sections:
      1. **Header**: Date, 目的
      2. **シナリオ概要**: Epicで実装された機能のリスト
      3. **事前準備チェックリスト**:
         - ✅ ステップ1: 環境変数の確認（.env.localファイルの確認）
         - ✅ ステップ2: データベース接続の確認
         - ✅ ステップ3: サービスの起動確認（Next.js開発サーバー）
         - ✅ ステップ4: テストデータの準備（npm run setup-test-data）
         - ✅ ステップ5: 事前準備完了確認
      4. **シナリオ1: 基本的な動作確認**: 各Storyに対応するステップ
         - 各ステップに目的、手順、期待結果、確認ポイントを含む
         - curlコマンドやブラウザ操作の具体的な手順を含む
      5. **シナリオ2: ブラウザでの動作確認（オプション）**: UI機能の確認
      6. **確認チェックリスト**: 各機能の確認項目
      7. **トラブルシューティング**: よくある問題と対処法
      8. **検証結果サマリー**: 検証実施日、検証者、検証結果概要
      9. **成功基準**: シナリオが成功したと判断する基準
      10. **次のステップ**: 次のEpicへの移行準備
    </action>
    
    <action>Ensure verification scenario is user-executable:
      - Include specific commands (curl, npm, etc.)
      - Include expected outputs
      - Include troubleshooting steps
      - Make it easy for users to follow step-by-step
    </action>
    
    <action>Save {verification_scenario_file} with generated content</action>
  </step>

  <step n="6" goal="Output completion message and guide user to execute verification scenario">
    <output>**✅ UAT Scenario Created Successfully, {user_name}!**

**Generated Files:**
- UAT Plan: {uat_plan_file}
- Verification Scenario: {verification_scenario_file}

**Epic Information:**
- Epic: {{epic_number}} ({{epic_title}})
- Stories: {{epic_stories_count}} stories

**⚠️ Important Notes:**

1. **Verification Scenario Execution:**
   - The verification scenario ({verification_scenario_file}) is ready for execution
   - Please review the scenario and execute it step-by-step
   - The scenario includes:
     - Pre-requisite checklist (environment variables, database connection, service startup, test data)
     - Step-by-step verification procedures for each story
     - Expected results and verification points
     - Troubleshooting guide

2. **Next Steps:**
   - Review the UAT plan: {uat_plan_file}
   - Execute the verification scenario: {verification_scenario_file}
   - After execution, you can use the `execute-uat` workflow to automate UAT execution and generate results
   - Command: `@.bmad-custom/workflows/execute-uat` (Cursor)

3. **Timing:**
   - This workflow should be executed at the end of an epic, before or after retrospective
   - The verification scenario should be executed before moving to the next epic

**Files Created:**
- {uat_plan_file}: UAT plan with test cases and acceptance criteria
- {verification_scenario_file}: User-executable verification scenario with step-by-step instructions

**Next Workflow:**
After executing the verification scenario, you can use:
- `@.bmad-custom/workflows/execute-uat` to automate UAT execution and generate results
    </output>
  </step>

</workflow>
````

