# BMad Custom Workflows Extensions 使用ガイド

このガイドは、BMad Custom Workflows Extensionsに含まれるカスタムワークフローの使用方法を説明します。

## 目次

- [概要](#概要)
- [AIツール別コマンド実行方法](#aiツール別コマンド実行方法)
- [ワークフローの実行タイミング](#ワークフローの実行タイミング)
  - [Phase 2: Planning（計画）](#phase-2-planning計画)
  - [Phase 2.5: Technical Prototyping（技術プロトタイピング）](#phase-25-technical-prototyping技術プロトタイピング)
  - [Phase 3: Solutioning（ソリューション設計）](#phase-3-solutioningソリューション設計)
  - [Phase 4: Implementation（実装）](#phase-4-implementation実装)
- [ワークフロー詳細](#ワークフロー詳細)
- [実行例](#実行例)

---

## 概要

BMad Custom Workflows Extensionsは、BMad Methodの欠点を補完する8つのカスタムワークフローを提供します。これらのワークフローは、BMad Methodの各フェーズで適切なタイミングで実行することで、プロジェクトの品質向上とリスク低減を支援します。

---

## AIツール別コマンド実行方法

BMad Custom Workflowsのコマンドは、使用するAIツールによって記述形式が異なります。

### コマンド実行方法の違い

| ツール | プレフィックス | 区切り文字 | 実行方法 | 例 |
|--------|--------------|----------|---------|-----|
| **ClaudeCode** | `/bmad:custom:workflows:` | コロン `:` | スラッシュコマンド | `/bmad:custom:workflows:validate-mvp-scope` |
| **Cursor** | `@.bmad-custom/workflows/` | スラッシュ `/` | @参照 | `@.bmad-custom/workflows/validate-mvp-scope` |
| **Codex** | `/bmad-custom-workflows-` | ハイフン `-` | スラッシュコマンド | `/bmad-custom-workflows-validate-mvp-scope` |

### 本ガイドの表記について

本ガイドでは、各ワークフローコマンドを以下の形式で表記します：

```bash
# ClaudeCode
/bmad:custom:workflows:コマンド名

# Cursor
@.bmad-custom/workflows/コマンド名

# Codex
/bmad-custom-workflows-コマンド名
```

---

## ワークフローの実行タイミング

### Phase 2: Planning（計画）

#### 1. 仮説検証チェックリスト

**タイミング**: Phase 1（Discovery）の後、またはPhase 2（Planning）の開始時

| 項目 | 内容 |
|------|------|
| **エージェント** | Analyst または PM |
| **必須度** | 推奨（仮説駆動開発を促進） |
| **成果物** | `hypothesis-validation-checklist.md` |
| **ClaudeCode** | `/bmad:custom:workflows:hypothesis-validation-checklist` |
| **Cursor** | `@.bmad-custom/workflows/hypothesis-validation-checklist` |
| **Codex** | `/bmad-custom-workflows-hypothesis-validation-checklist` |

**目的**: 仮説駆動開発（Hypothesis-Driven Development）のマインドセットを促進し、MVPが「何を作りたいか」ではなく「何を検証すべきか」に焦点を当てることを支援します。

**チェック項目**:
- 検証したい仮説を1文で記述できるか
- 仮説を検証するために必要な最小機能は何か
- 2週間で実装可能か
- ユーザーテストで検証可能か
- 失敗した場合のピボット戦略はあるか

#### 2. MVPスコープ検証

**タイミング**: PRD作成後、Phase 3（Solutioning）の前

| 項目 | 内容 |
|------|------|
| **エージェント** | PM |
| **必須度** | 強く推奨（スコープ過大を防止） |
| **成果物** | `mvp-scope-validation-report.md` |
| **ClaudeCode** | `/bmad:custom:workflows:validate-mvp-scope` |
| **Cursor** | `@.bmad-custom/workflows/validate-mvp-scope` |
| **Codex** | `/bmad-custom-workflows-validate-mvp-scope` |

**目的**: PRD作成後、MVPスコープが適切か検証します。スコープ過大を早期に発見し、仮説検証に焦点を当てたMVP設計を支援します。

**検証項目**:
- MVPスコープが2週間で実装可能か
- 仮説を3つ以下の機能で検証できるか
- 第一原理をより簡単な方法で検証できるか
- ユーザーテストで検証可能か

---

### Phase 2.5: Technical Prototyping（技術プロトタイピング）

#### 1. 技術プロトタイピング（Spike）

**タイミング**: PRD作成後、アーキテクチャ設計前

| 項目 | 内容 |
|------|------|
| **エージェント** | Dev または Architect |
| **必須度** | オプション（技術リスクが高い場合） |
| **成果物** | `technical-spike-report.md` |
| **ClaudeCode** | `/bmad:custom:workflows:technical-spike` |
| **Cursor** | `@.bmad-custom/workflows/technical-spike` |
| **Codex** | `/bmad-custom-workflows-technical-spike` |

**Spike対象**:
- LLM出力解釈パターン（構造化出力、意図分類）
- パフォーマンス目標の達成可能性
- 状態管理フレームワークの選定（LangGraph等）
- 複雑性の早期検証（状態マシンのフェーズ数など）

#### 2. パフォーマンスSpike

**タイミング**: パフォーマンス要件が厳しい場合、アーキテクチャ設計前

| 項目 | 内容 |
|------|------|
| **エージェント** | Architect または Dev |
| **必須度** | オプション（パフォーマンス要件が厳しい場合） |
| **成果物** | `performance-spike-report.md` |
| **ClaudeCode** | `/bmad:custom:workflows:performance-spike` |
| **Cursor** | `@.bmad-custom/workflows/performance-spike` |
| **Codex** | `/bmad-custom-workflows-performance-spike` |

**検証項目**:
- LLM呼び出し回数とレイテンシ
- 並列処理の可能性
- プロンプトサイズの影響
- 目標達成可能性の判定

#### 3. LLM統合パターン検証

**タイミング**: LLMプロジェクトの場合、アーキテクチャ設計前

| 項目 | 内容 |
|------|------|
| **エージェント** | Architect または Dev |
| **必須度** | オプション（LLMプロジェクトの場合） |
| **成果物** | `llm-integration-pattern-report.md` |
| **ClaudeCode** | `/bmad:custom:workflows:llm-integration-pattern-spike` |
| **Cursor** | `@.bmad-custom/workflows/llm-integration-pattern-spike` |
| **Codex** | `/bmad-custom-workflows-llm-integration-pattern-spike` |

**検証項目**:
- 構造化出力ライブラリの選定（LangGraph、Instructor、Outlines等）
- キーワードベース vs LLMセマンティック理解の比較
- JSONスキーマ検証の実装方法
- パフォーマンスと精度のトレードオフ

---

### Phase 3: Solutioning（ソリューション設計）

#### Epic末尾にStory追加

**タイミング**: `create-epics-and-stories`実施後、要件変更・技術的負債対応時

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **必須度** | オプション（要件変更・技術的負債対応時） |
| **成果物** | `epics.md`更新、`sprint-status.yaml`更新 |
| **ClaudeCode** | `/bmad:custom:workflows:add-story-to-epic` |
| **Cursor** | `@.bmad-custom/workflows/add-story-to-epic` |
| **Codex** | `/bmad-custom-workflows-add-story-to-epic` |

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

**入力**:
- Epic番号（必須）
- Story追加の理由（要件変更、技術的負債、バグ修正など）
- Story内容（タイトル、ユーザーストーリー、受入基準、技術ノートなど）
- 技術的負債管理番号（オプション、技術的負債の場合）

**注意事項**:
- **epic-tech-contextの再実行**: 追加されたStoryが技術的に重要な場合（新しい技術スタック、アーキテクチャ変更など）、`epic-tech-context`の再実行を推奨。既存の`tech-spec-epic-{epic_id}.md`に新しいStoryの情報を反映させるため。ただし、技術的負債対応など、既存の技術仕様で十分な場合は再実行不要。
- **validate-epic-tech-contextの再実行**: `epic-tech-context`を再実行した場合、`validate-epic-tech-context`の再実行も推奨。技術仕様の整合性を確認するため。`epic-tech-context`を再実行しない場合は、`validate-epic-tech-context`の再実行も不要。

---

### Phase 4: Implementation（実装）

#### 1. UATシナリオ作成

**タイミング**: Epic完了時、Retrospectiveの前後

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | Epic完了時にUAT計画とユーザー実行可能な検証シナリオを作成 |
| **成果物** | `epic-{epic_number}-uat-plan.md`, `epic-{epic_number}-verification-scenario.md` |
| **ClaudeCode** | `/bmad:custom:workflows:create-uat-scenario` |
| **Cursor** | `@.bmad-custom/workflows/create-uat-scenario` |
| **Codex** | `/bmad-custom-workflows-create-uat-scenario` |

**機能**:
- 既存のUAT計画（`docs/sprint-artifacts/epic-*-uat-plan.md`）を参照して構造を理解
- 既存の検証シナリオ（`docs/sprint-artifacts/epic-*-verification-scenario.md`）を参考にして、ユーザー実行可能なシナリオを作成
- UAT計画と検証シナリオを生成
- 検証シナリオの実施を促す

**成果物**:
- `docs/sprint-artifacts/epic-{epic_number}-uat-plan.md`: UAT計画
- `docs/sprint-artifacts/epic-{epic_number}-verification-scenario.md`: ユーザー実行可能な検証シナリオ

#### 2. UAT自動実行

**タイミング**: `create-uat-scenario`ワークフローの実行後

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | 作成されたUATをオートメーションで実行し、結果を生成 |
| **成果物** | `epic-{epic_number}-uat-results.md` |
| **ClaudeCode** | `/bmad:custom:workflows:execute-uat` |
| **Cursor** | `@.bmad-custom/workflows/execute-uat` |
| **Codex** | `/bmad-custom-workflows-execute-uat` |

**機能**:
- UAT計画と検証シナリオを読み込み
- テストケースを自動実行（APIテスト、UIテスト、統合テスト、パフォーマンステスト）
- テスト結果を記録
- パフォーマンス指標と機能品質指標を収集
- 受け入れ判定を自動生成

**成果物**:
- `docs/sprint-artifacts/epic-{epic_number}-uat-results.md`: UAT実行結果

---

## ワークフロー詳細

各ワークフローの詳細な使用方法は、各ワークフローのREADME.mdを参照してください：

- [validate-mvp-scope](./workflows/validate-mvp-scope/README.md)
- [hypothesis-validation-checklist](./workflows/hypothesis-validation-checklist/README.md)
- [technical-spike](./workflows/technical-spike/README.md)
- [performance-spike](./workflows/performance-spike/README.md)
- [llm-integration-pattern-spike](./workflows/llm-integration-pattern-spike/README.md)
- [add-story-to-epic](./workflows/add-story-to-epic/README.md)
- [create-uat-scenario](./workflows/create-uat-scenario/README.md)
- [execute-uat](./workflows/execute-uat/README.md)

---

## 実行例

### 例1: MVPスコープ検証

```bash
# Cursor
@.bmad-custom/workflows/validate-mvp-scope

# プロンプト例:
# PRDを作成しました。MVPスコープが適切か検証してください。
```

### 例2: 技術プロトタイピング

```bash
# Cursor
@.bmad-custom/workflows/technical-spike

# プロンプト例:
# LLM統合の技術的リスクを検証したいです。
# 特に、構造化出力のパターンと状態管理フレームワークの選定について検証してください。
```

### 例3: Epic末尾にStory追加

```bash
# Cursor
@.bmad-custom/workflows/add-story-to-epic

# プロンプト例:
# Epic 4に技術的負債対応のStoryを追加したいです。
# 技術的負債管理番号: TD-001
# Story内容: 会話状態管理のリファクタリング
```

### 例4: UATシナリオ作成と実行

```bash
# Step 1: UATシナリオ作成
@.bmad-custom/workflows/create-uat-scenario

# プロンプト例:
# Epic 4が完了しました。UAT計画と検証シナリオを作成してください。

# Step 2: UAT自動実行
@.bmad-custom/workflows/execute-uat

# プロンプト例:
# Epic 4のUATを実行してください。
```

---

## 重要な原則

1. **適切なタイミングで実行**: 各ワークフローは、BMad Methodの適切なフェーズで実行してください。
2. **前提条件の確認**: 各ワークフローには前提条件があります。事前に確認してください。
3. **成果物の確認**: 各ワークフローは成果物を生成します。生成された成果物を確認し、必要に応じて修正してください。

---

**Document Revision History**

- **Version 1.1.0 (2025-01-27)**: 初版作成
  - 8つのカスタムワークフローの使用方法を説明
  - 実行タイミングと実行例を追加

