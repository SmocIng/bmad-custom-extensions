# Epic {{epic_number}}: {{epic_title}} - ユーザー受け入れテスト（UAT）結果

**Date:** {{date}}  
**Epic ID:** {{epic_number}}  
**Status:** {{status}}  
**Tester:** {{tester_name}}

---

## 1. テスト実行サマリー

| テストケースID | テストケース名 | ステータス | 実行日時 | 備考 |
|---------------|--------------|-----------|---------|------|
{{#each test_cases}}
| TC-{{test_case_id}} | {{test_case_name}} | {{status}} | {{execution_time}} | {{remarks}} |
{{/each}}

### 成功率

- **成功数:** {{successful_count}} / {{total_count}}
- **失敗数:** {{failed_count}} / {{total_count}}
- **未実行数:** {{not_executed_count}} / {{total_count}}
- **成功率:** {{success_rate}}%（実行済みテストケースのみ）
- **完全成功率:** {{complete_success_rate}}%（未実行は統合テスト・UIテスト・精度確認など、Epic {{epic_number}}の範囲外または後続Epicで検証予定）

---

## 2. 発見された問題

{{#each issues}}
### 2.{{issue_index}} {{issue_name}}

**問題:** {{problem_description}}  
**影響度:** {{impact}}  
**優先度:** {{priority}}  
**状態:** {{status}}

**詳細:**
{{detailed_description}}

**影響:**
{{impact_description}}

**対応方針:**
{{resolution_plan}}

{{#if fix_applied}}
**修正内容:**
{{fix_description}}
{{/if}}

---

{{/each}}

## 3. パフォーマンス指標

{{#each performance_metrics}}
### 3.{{metric_index}} {{metric_name}}

| 実行回数 | 平均時間 | 95パーセンタイル | 最大時間 | 最小時間 |
|---------|---------|-----------------|---------|---------|
| {{execution_count}} | {{average_time}} | {{p95_time}} | {{max_time}} | {{min_time}} |

**目標:** {{target}}  
**実績:** {{actual}}  
**評価:** {{evaluation}}

{{/each}}

---

## 4. 機能品質指標

{{#each quality_metrics}}
### 4.{{metric_index}} {{metric_name}}

**目標:** {{target}}  
**実績:** {{actual}}  
**評価:** {{evaluation}}

**評価方法:**
{{evaluation_method}}

{{/each}}

---

## 5. 受け入れ判定

### 5.1 判定基準

- ✅ **合格:** すべてのテストケースが成功し、重大な問題がない
- ⚠️ **条件付き合格:** 軽微な問題があるが、次のEpicの実装に支障がない
- ❌ **不合格:** 重大な問題があり、次のEpicの実装に支障がある

### 5.2 判定結果

**判定:** {{judgment_result}}

**判定理由:**
{{judgment_reason}}

**次のEpic実装への影響:**
{{next_epic_impact}}

**承認者:** {{approver_name}}  
**承認日:** {{approval_date}}

---

## 6. 次のステップ

### 6.1 UAT合格時

- 次のEpicの実装を開始する
- 次のEpicの技術コンテキスト作成（`@.bmad/bmm/workflows/epic-tech-context`）を実施

### 6.2 UAT条件付き合格時

- 発見された軽微な問題を修正する
- 修正後に再テストを実施する（必要に応じて）
- 次のEpicの実装を開始する

### 6.3 UAT不合格時

- 発見された重大な問題を修正する
- 修正後に再テストを実施する
- 問題が解決するまで繰り返す
- 再実行: `@.bmad-custom/workflows/execute-uat`

---

**Document Revision History**

- **Version 1.0 ({{date}})**: 初版作成
  - Epic {{epic_number}} UAT結果の記録
  - {{total_count}}のテストケースを実行
  - 発見された問題の記録
  - パフォーマンス指標の記録

