# BMad Custom Workflows 統合ガイド

**作成日:** 2025-01-27  
**目的:** BMad Methodの欠点を補完するカスタムワークフローの統合方法と実行順序を説明

---

## 概要

本ガイドは、BMad Methodの振り返りレポートとプロジェクト失敗分析から特定された問題点を解決するために実装されたカスタムワークフローの統合方法を説明します。

### 実装されたワークフロー

1. **hypothesis-validation-checklist**: 仮説検証チェックリスト
2. **validate-mvp-scope**: MVPスコープ検証
3. **technical-spike**: 技術プロトタイピング
4. **performance-spike**: パフォーマンスSpike
5. **llm-integration-pattern-spike**: LLM統合パターン検証
6. **add-story-to-epic**: Epic末尾にStory追加
7. **create-uat-scenario**: UATシナリオ作成
8. **execute-uat**: UAT自動実行

---

## ワークフローの実行タイミング

### Phase 0: Discovery（分析）の後

#### hypothesis-validation-checklist

**タイミング**: Phase 0（Discovery）の後、またはPhase 1（Planning）の開始時

**目的**: 仮説駆動開発（Hypothesis-Driven Development）のマインドセットを促進

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/hypothesis-validation-checklist

# ClaudeCode
/bmad:custom:workflows:hypothesis-validation-checklist

# Codex
/bmad-custom-workflows-hypothesis-validation-checklist
```

**成果物**: `{output_folder}/hypothesis-validation-checklist.md`

**次のステップ**: PRD作成時にチェックリストを参照

---

### Phase 2: Planning（計画）の後

#### validate-mvp-scope

**タイミング**: Phase 2（Planning）の後、Phase 3（Solutioning）の前

**目的**: PRD作成後、MVPスコープが適切か検証

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/validate-mvp-scope

# ClaudeCode
/bmad:custom:workflows:validate-mvp-scope

# Codex
/bmad-custom-workflows-validate-mvp-scope
```

**成果物**: `{output_folder}/mvp-scope-validation-report.md`

**検証結果に応じた次のステップ**:
- **PASS**: Phase 3（Solutioning）に進む
- **CONCERN**: 推奨事項を確認し、必要に応じてスコープを調整してからPhase 3に進む
- **FAIL**: スコープを削減し、再度検証するか、PRDを更新する

---

### Phase 2.5: Technical Prototyping（技術プロトタイピング）

#### technical-spike

**タイミング**: Phase 2.5（PlanningとSolutioningの間）またはPhase 3の前

**目的**: 技術リスクの高い部分を早期に検証

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/technical-spike

# ClaudeCode
/bmad:custom:workflows:technical-spike

# Codex
/bmad-custom-workflows-technical-spike
```

**成果物**: `{output_folder}/technical-spike-report.md`

**次のステップ**: Spike結果に基づいてアーキテクチャ設計に進む

#### performance-spike

**タイミング**: Phase 2（Planning）の後、またはPhase 3（Solutioning）の前

**目的**: NFRで定義したパフォーマンス目標が達成可能か早期に検証

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/performance-spike

# ClaudeCode
/bmad:custom:workflows:performance-spike

# Codex
/bmad-custom-workflows-performance-spike
```

**成果物**: `{output_folder}/performance-spike-report.md`

**次のステップ**: パフォーマンスSpike結果に基づいてアーキテクチャ設計に進む

#### llm-integration-pattern-spike

**タイミング**: Phase 2.5（技術プロトタイピングフェーズ）

**目的**: LLM出力解釈のアーキテクチャパターンを早期に検証

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/llm-integration-pattern-spike

# ClaudeCode
/bmad:custom:workflows:llm-integration-pattern-spike

# Codex
/bmad-custom-workflows-llm-integration-pattern-spike
```

**成果物**: `{output_folder}/llm-integration-pattern-report.md`

**次のステップ**: LLMパターンSpike結果に基づいてアーキテクチャ設計に進む

---

### Phase 3: Solutioning（ソリューション設計）

#### add-story-to-epic

**タイミング**: `create-epics-and-stories`実施後、要件変更・技術的負債対応時

**目的**: 完了したEpicまたは実施中のEpicにStoryを追加

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/add-story-to-epic

# ClaudeCode
/bmad:custom:workflows:add-story-to-epic

# Codex
/bmad-custom-workflows-add-story-to-epic
```

**成果物**: `epics.md`更新、`sprint-status.yaml`更新

**使用タイミング**:
- `create-epics-and-stories`実施後に、要件変更が発生した場合
- 技術的負債対応のStoryを追加する場合
- 完了したEpicまたは実施中のEpicにStoryを追加する場合

**機能**:
- 指定したEpicの末尾に新しいStoryを追加
- Story番号を自動生成（例: Epic 4の最後が4.7なら、4.8を生成）
- `epics.md`のEpic Summaryと合計ストーリー数を自動更新
- `sprint-status.yaml`に新しいStoryを`backlog`状態で追加
- 技術的負債管理番号（TD-XXX）が指定されている場合、Story名の頭に管理番号を付与

---

### Phase 4: Implementation（実装）

#### create-uat-scenario

**タイミング**: Epic完了時、Retrospectiveの前後

**目的**: Epic完了時にUAT計画とユーザー実行可能な検証シナリオを作成

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/create-uat-scenario

# ClaudeCode
/bmad:custom:workflows:create-uat-scenario

# Codex
/bmad-custom-workflows-create-uat-scenario
```

**成果物**: `epic-{epic_number}-uat-plan.md`, `epic-{epic_number}-verification-scenario.md`

**機能**:
- 既存のUAT計画を参照して構造を理解
- 既存の検証シナリオを参考にして、ユーザー実行可能なシナリオを作成
- UAT計画と検証シナリオを生成
- 検証シナリオの実施を促す

#### execute-uat

**タイミング**: `create-uat-scenario`ワークフローの実行後

**目的**: 作成されたUATをオートメーションで実行し、結果を生成

**実行方法**:
```bash
# Cursor
@.bmad-custom/workflows/execute-uat

# ClaudeCode
/bmad:custom:workflows:execute-uat

# Codex
/bmad-custom-workflows-execute-uat
```

**成果物**: `epic-{epic_number}-uat-results.md`

**機能**:
- UAT計画と検証シナリオを読み込み
- テストケースを自動実行（APIテスト、UIテスト、統合テスト、パフォーマンステスト）
- テスト結果を記録
- パフォーマンス指標と機能品質指標を収集
- 受け入れ判定を自動生成

---

## ワークフロー間の依存関係

### 推奨実行順序

```
Phase 0: Discovery
  ↓
hypothesis-validation-checklist (オプション、推奨)
  ↓
Phase 1: Planning
  ↓
PRD作成
  ↓
validate-mvp-scope (強く推奨)
  ↓
Phase 2.5: Technical Prototyping (オプション)
  ├─ technical-spike (技術リスクが高い場合)
  ├─ performance-spike (パフォーマンス要件が厳しい場合)
  └─ llm-integration-pattern-spike (LLMプロジェクトの場合)
  ↓
Phase 3: Solutioning
  ├─ create-epics-and-stories
  └─ add-story-to-epic (要件変更・技術的負債対応時)
  ↓
Phase 4: Implementation
  ├─ Epic実装完了
  ├─ create-uat-scenario (Epic完了時)
  └─ execute-uat (UAT実行)
```

### 依存関係マトリクス

| ワークフロー | 前提条件 | 依存するワークフロー |
|------------|---------|-------------------|
| hypothesis-validation-checklist | Phase 0完了（オプション） | なし |
| validate-mvp-scope | PRD作成完了 | hypothesis-validation-checklist（推奨） |
| technical-spike | PRD作成完了 | validate-mvp-scope（推奨） |
| performance-spike | PRD作成完了、NFR定義 | validate-mvp-scope（推奨） |
| llm-integration-pattern-spike | PRD作成完了、LLM要件 | technical-spike（推奨） |
| add-story-to-epic | create-epics-and-stories完了 | なし |
| create-uat-scenario | Epic実装完了 | なし |
| execute-uat | create-uat-scenario完了 | create-uat-scenario |

---

## 実行順序の推奨パターン

### パターン1: 最小構成（必須ワークフローのみ）

```
1. Phase 0: Discovery
2. Phase 1: Planning
   - PRD作成
3. validate-mvp-scope (強く推奨)
4. Phase 3: Solutioning
```

### パターン2: 標準構成（推奨）

```
1. Phase 0: Discovery
2. hypothesis-validation-checklist (推奨)
3. Phase 1: Planning
   - PRD作成
4. validate-mvp-scope (強く推奨)
5. Phase 3: Solutioning
```

### パターン3: 技術リスクが高い場合

```
1. Phase 0: Discovery
2. hypothesis-validation-checklist (推奨)
3. Phase 1: Planning
   - PRD作成
4. validate-mvp-scope (強く推奨)
5. Phase 2.5: Technical Prototyping
   - technical-spike
   - performance-spike (パフォーマンス要件がある場合)
   - llm-integration-pattern-spike (LLMプロジェクトの場合)
6. Phase 3: Solutioning
```

### パターン4: LLMプロジェクトの場合

```
1. Phase 0: Discovery
2. hypothesis-validation-checklist (推奨)
3. Phase 1: Planning
   - PRD作成
4. validate-mvp-scope (強く推奨)
5. Phase 2.5: Technical Prototyping
   - llm-integration-pattern-spike (必須)
   - technical-spike (推奨)
   - performance-spike (パフォーマンス要件がある場合)
6. Phase 3: Solutioning
   - create-epics-and-stories
   - add-story-to-epic (必要に応じて)
7. Phase 4: Implementation
   - Epic実装完了
   - create-uat-scenario
   - execute-uat
```

---

## 各ワークフローの詳細

### hypothesis-validation-checklist

**目的**: 仮説駆動開発のマインドセットを促進

**チェック項目**:
- 検証したい仮説を1文で記述できるか
- 仮説を検証するために必要な最小機能は何か
- 2週間で実装可能か
- ユーザーテストで検証可能か
- 失敗した場合のピボット戦略はあるか

**詳細**: [README](.bmad-custom/workflows/hypothesis-validation-checklist/README.md)

### validate-mvp-scope

**目的**: MVPスコープが適切か検証

**検証項目**:
- MVPスコープが2週間で実装可能か
- 仮説を3つ以下の機能で検証できるか
- 第一原理をより簡単な方法で検証できるか
- ユーザーテストで検証可能か

**詳細**: [README](.bmad-custom/workflows/validate-mvp-scope/README.md)

### technical-spike

**目的**: 技術リスクの高い部分を早期に検証

**Spike対象**:
- LLM出力解釈パターン
- パフォーマンス目標の達成可能性
- 状態管理フレームワークの選定
- 複雑性の早期検証

**詳細**: [README](.bmad-custom/workflows/technical-spike/README.md)

### performance-spike

**目的**: パフォーマンス目標が達成可能か早期に検証

**検証項目**:
- LLM呼び出し回数とレイテンシ
- 並列処理の可能性
- プロンプトサイズの影響
- 目標達成可能性の判定

**詳細**: [README](.bmad-custom/workflows/performance-spike/README.md)

### llm-integration-pattern-spike

**目的**: LLM出力解釈のアーキテクチャパターンを早期に検証

**検証項目**:
- 構造化出力ライブラリの選定
- キーワードベース vs LLMセマンティック理解の比較
- JSONスキーマ検証の実装方法
- パフォーマンスと精度のトレードオフ

**詳細**: [README](.bmad-custom/workflows/llm-integration-pattern-spike/README.md)

### add-story-to-epic

**目的**: 完了したEpicまたは実施中のEpicにStoryを追加

**機能**:
- 指定したEpicの末尾に新しいStoryを追加
- Story番号を自動生成
- `epics.md`と`sprint-status.yaml`を自動更新
- 技術的負債管理番号の付与

**詳細**: [README](.bmad-custom/workflows/add-story-to-epic/README.md)

### create-uat-scenario

**目的**: Epic完了時にUAT計画とユーザー実行可能な検証シナリオを作成

**機能**:
- UAT計画の作成
- ユーザー実行可能な検証シナリオの作成
- 既存のUAT計画・シナリオを参考にした構造化

**詳細**: [README](.bmad-custom/workflows/create-uat-scenario/README.md)

### execute-uat

**目的**: 作成されたUATをオートメーションで実行し、結果を生成

**機能**:
- テストケースの自動実行
- テスト結果の記録
- パフォーマンス指標と機能品質指標の収集
- 受け入れ判定の自動生成

**詳細**: [README](.bmad-custom/workflows/execute-uat/README.md)

---

## トラブルシューティング

### 問題: validate-mvp-scopeでFAILが返された

**対処法**:
1. 検証レポートの推奨事項を確認
2. スコープを削減（機能要件の優先順位を再検討）
3. PRDを更新
4. 再度validate-mvp-scopeを実行

### 問題: technical-spikeで技術的アプローチが失敗した

**対処法**:
1. Spikeレポートの分析結果を確認
2. 代替アプローチを検討
3. 必要に応じて追加のSpikeを実行
4. アーキテクチャ設計を見直し

### 問題: performance-spikeで目標が達成できない

**対処法**:
1. パフォーマンスレポートの最適化戦略を確認
2. 目標が現実的か再検討
3. 必要に応じて目標を調整
4. アーキテクチャ設計にパフォーマンス考慮事項を反映

---

## ベストプラクティス

1. **早期実行**: 各ワークフローはできるだけ早く実行する
2. **結果の活用**: ワークフローの結果を次のフェーズで活用する
3. **文書化**: すべての結果を文書化し、後で参照できるようにする
4. **継続的改善**: ワークフローの結果を基にプロセスを改善する

---

## 関連ドキュメント

- [BMad Method拡張ワークフロー実装計画](./bmad-method-extension-plan.md)
- [BMad Custom Workflows 使用ガイド](../USAGE_GUIDE.md)
- [BMad Custom Workflows インストールガイド](./bmad-custom-installation-guide.md)

---

**Document Revision History**

- **Version 1.1.0 (2025-01-27)**: ワークフロー追加
  - add-story-to-epic、create-uat-scenario、execute-uatを追加
  - ワークフロー数を5つから8つに更新
  - 依存関係マトリクスと実行パターンを更新
- **Version 1.0.0 (2025-01-27)**: 初版作成
  - カスタムワークフローの統合ガイド
  - 実行タイミングと依存関係の説明
  - 推奨実行パターンの提示

