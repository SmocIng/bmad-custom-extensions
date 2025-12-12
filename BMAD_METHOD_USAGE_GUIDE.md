# BMADフルワークフロー完全ガイド

このガイドは、BMad Method本体の使い方を説明します。BMad Custom Extensionsは、このBMad Methodの欠点を補完する拡張ワークフローを提供します。

## 目次
- [概要](#概要)
- [AIツール別コマンド実行方法](#aiツール別コマンド実行方法)
- [3つの開発トラック](#3つの開発トラック)
- [フルワークフローの4つのフェーズ](#フルワークフローの4つのフェーズ)
  - [Phase 1: Analysis（分析）](#phase-1-analysis分析---オプション-)
  - [Phase 2: Planning（計画）](#phase-2-planning計画---必須-)
  - [Phase 2.5: Technical Prototyping（技術プロトタイピング）](#phase-25-technical-prototyping技術プロトタイピング---オプション-)
  - [Phase 3: Solutioning（ソリューション設計）](#phase-3-solutioningソリューション設計---bmad-method必須-)
  - [Phase 4: Implementation（実装）](#phase-4-implementation実装---必須-)
- [実際の使用例](#実際の使用例カスタマーダッシュボード)
- [重要な原則](#重要な原則)
- [Quick Flow vs フルワークフロー比較](#quick-flow-vs-フルワークフロー比較)
- [まとめ](#まとめ)

---

## 概要

BMAD Method (BMM)は、AIエージェントを活用した開発手法で、プロジェクトの複雑さに応じて自動的に適応する**スケールアダプティブシステム**を採用しています。

---

## AIツール別コマンド実行方法

BMADのワークフローコマンドは、使用するAIツールによって記述形式が異なります。

### コマンド実行方法の違い

| ツール | プレフィックス | 区切り文字 | 実行方法 | 例 |
|--------|--------------|----------|---------|-----|
| **ClaudeCode** | `/bmad:` | コロン `:` | スラッシュコマンド | `/bmad:bmm:workflows:prd` |
| **Cursor** | `@.bmad/` | スラッシュ `/` | @参照 | `@.bmad/bmm/workflows/prd` |
| **Codex** | `/bmad-` | ハイフン `-` | スラッシュコマンド | `/bmad-bmm-workflows-prd` |

### 特徴

**ClaudeCode**
- `/` を入力すると自動補完が効く
- Enterで即座にワークフローが実行される
- エージェントは会話中アクティブなまま

**Cursor**
- `@` を入力して参照形式で呼び出す
- Manual型ルール - 明示的に参照時のみロード
- 複数エージェント同時利用可能: `@.bmad/bmm/agents/dev @.bmad/bmm/agents/architect`

**Codex**
- `/` を入力すると自動補完が効く
- ハイフン区切りでシンプル
- エージェントは会話中アクティブなまま

### 本ガイドの表記について

本ガイドでは、各ワークフローコマンドを以下の形式で表記します：

```bash
# ClaudeCode
/bmad:bmm:workflows:コマンド名

# Cursor
@.bmad/bmm/workflows/コマンド名

# Codex
/bmad-bmm-workflows-コマンド名
```

---

## 3つの開発トラック

BMMは3つの開発トラックを提供します：

### 1. Quick Flow（クイックフロー）
- **対象**: バグ修正、小規模な機能追加
- **計画時間**: 数時間〜1日
- **ストーリー数**: 1-15個
- **ドキュメント**: tech-spec.mdのみ
- **特徴**: アーキテクチャ不要、即実装

### 2. BMad Method（推奨・フルワークフロー）⭐
- **対象**: プロダクト、プラットフォーム、複雑な機能
- **計画時間**: 1-3日
- **ストーリー数**: 10-50+個
- **ドキュメント**: PRD + アーキテクチャ + Epic/Stories
- **特徴**: 完全な計画とアーキテクチャ設計

### 3. Enterprise Method
- **対象**: エンタープライズ要件、コンプライアンス対応
- **計画時間**: 3-7日
- **ストーリー数**: 30+個
- **ドキュメント**: BMad Method + セキュリティ/DevOps/テスト戦略
- **特徴**: 拡張された計画とガバナンス

---

# フルワークフローの4つのフェーズ

---

## Phase 1: Analysis（分析）- **オプション** 🔍

### 目的
プロダクトアイデアの検証と戦略的コンテキストの生成

### 実行するワークフロー

#### ブレインストーミング

| 項目 | 内容 |
|------|------|
| **エージェント** | Analyst |
| **成果物** | ソリューション案 + 評価 |
| **ClaudeCode** | `/bmad:bmm:workflows:brainstorm-project` |
| **Cursor** | `@.bmad/bmm/workflows/brainstorm-project` |
| **Codex** | `/bmad-bmm-workflows-brainstorm-project` |

#### リサーチ

| 項目 | 内容 |
|------|------|
| **エージェント** | Analyst |
| **成果物** | 調査レポート |
| **ClaudeCode** | `/bmad:bmm:workflows:research` |
| **Cursor** | `@.bmad/bmm/workflows/research` |
| **Codex** | `/bmad-bmm-workflows-research` |

#### プロダクトブリーフ

| 項目 | 内容 |
|------|------|
| **エージェント** | Analyst |
| **成果物** | Product Brief文書 |
| **ClaudeCode** | `/bmad:bmm:workflows:product-brief` |
| **Cursor** | `@.bmad/bmm/workflows/product-brief` |
| **Codex** | `/bmad-bmm-workflows-product-brief` |

### いつ使うか
- ✅ 新規プロジェクトで要件が不明確
- ✅ 市場検証が必要
- ✅ 複数のアプローチを比較したい

### いつスキップするか
- ❌ 要件が既に明確
- ❌ 既存プロジェクトへの追加機能
- ❌ 厳しい制約で探索の余地がない

#### 仮説検証チェックリスト（カスタムワークフロー）

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

---

## Phase 2: Planning（計画）- **必須** 📝

### 目的
「**何を作るか**」「**なぜ作るか**」を明確に定義

### 実行するワークフロー

#### 1️⃣ プロジェクト初期化 ⭐

| 項目 | 内容 |
|------|------|
| **エージェント** | PM/Analyst |
| **成果物** | `bmm-workflow-status.yaml` |
| **ClaudeCode** | `/bmad:bmm:workflows:workflow-init` |
| **Cursor** | `@.bmad/bmm/workflows/workflow-init` |
| **Codex** | `/bmad-bmm-workflows-workflow-init` |

**実行内容**:
- プロジェクトを説明
- AIが適切なトラックを推奨（Quick/BMad/Enterprise）
- トラックを選択
- **成果物**: `bmm-workflow-status.yaml`（進捗追跡ファイル）

#### 2️⃣ PRD作成（BMad Method/Enterprise）

| 項目 | 内容 |
|------|------|
| **エージェント** | PM |
| **トラック** | BMad/Enterprise |
| **成果物** | `PRD.md` |
| **ClaudeCode** | `/bmad:bmm:workflows:prd` |
| **Cursor** | `@.bmad/bmm/workflows/prd` |
| **Codex** | `/bmad-bmm-workflows-prd` |

**PRDの内容**:
- プロダクトビジョンと目標
- 機能要件(FR-001, FR-002...)
- 非機能要件(NFR-001, NFR-002...)
- 成功基準
- ユーザー体験の考慮事項

#### 3️⃣ UX設計（オプション、UIがある場合）

| 項目 | 内容 |
|------|------|
| **エージェント** | UX Designer |
| **成果物** | `ux-spec.md` |
| **ClaudeCode** | `/bmad:bmm:workflows:create-ux-design` |
| **Cursor** | `@.bmad/bmm/workflows/create-ux-design` |
| **Codex** | `/bmad-bmm-workflows-create-ux-design` |

#### 4️⃣ Tech Spec作成（Quick Flowのみ）

| 項目 | 内容 |
|------|------|
| **エージェント** | PM |
| **トラック** | Quick Flow |
| **成果物** | `tech-spec.md` + story |
| **ClaudeCode** | `/bmad:bmm:workflows:tech-spec` |
| **Cursor** | `@.bmad/bmm/workflows/tech-spec` |
| **Codex** | `/bmad-bmm-workflows-tech-spec` |

#### 4️⃣ MVPスコープ検証（カスタムワークフロー、強く推奨）

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

### ⚠️ 重要な変更点（V6）
**Epic/Storiesの作成はPhase 3に移動しました！**
- アーキテクチャ決定後に作成することで品質向上
- 技術的な依存関係を考慮したストーリー分解が可能

---

## Phase 2.5: Technical Prototyping（技術プロトタイピング）- **オプション** 🔬

### 目的
技術リスクの高い部分（LLM統合、パフォーマンス、状態管理など）を早期に検証し、アーキテクチャ設計前に技術的アプローチの実現可能性を確認します。

### 実行するワークフロー

#### 1️⃣ 技術プロトタイピング（Spike）

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

#### 2️⃣ パフォーマンスSpike（カスタムワークフロー）

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

#### 3️⃣ LLM統合パターン検証（カスタムワークフロー）

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

### いつ使うか
- ✅ LLM統合が必要なプロジェクト
- ✅ パフォーマンス要件が厳しい
- ✅ 技術的リスクが高い
- ✅ 状態管理が複雑

### いつスキップするか
- ❌ 技術的リスクが低い
- ❌ 既存の技術スタックで十分
- ❌ 時間的制約が厳しい

---

## Phase 3: Solutioning（ソリューション設計）- **BMad Method必須** 🏗️

### 目的
「**どう作るか**」の技術設計を明確化し、エージェント間の矛盾を防ぐ

### 実行するワークフロー

#### 1️⃣ アーキテクチャ設計 ⭐

| 項目 | 内容 |
|------|------|
| **エージェント** | Architect |
| **必須度** | BMad/Enterprise必須 |
| **成果物** | `architecture.md` |
| **ClaudeCode** | `/bmad:bmm:workflows:architecture` |
| **Cursor** | `@.bmad/bmm/workflows/architecture` |
| **Codex** | `/bmad-bmm-workflows-architecture` |

**成果物: architecture.md の内容**:
- システムアーキテクチャ概要
- データアーキテクチャ（DB設計、状態管理）
- APIアーキテクチャ（REST/GraphQL、認証）
- セキュリティアーキテクチャ
- デプロイメントアーキテクチャ
- **ADR（Architecture Decision Records）**: 重要な技術決定の記録
- FR/NFR別の技術ガイダンス
- 標準とコーディング規約

#### 2️⃣ Epic/Stories作成（V6の重要な改善）

| 項目 | 内容 |
|------|------|
| **エージェント** | PM |
| **必須度** | BMad/Enterprise必須 |
| **成果物** | `epics.md` + epic files |
| **ClaudeCode** | `/bmad:bmm:workflows:create-epics-and-stories` |
| **Cursor** | `@.bmad/bmm/workflows/create-epics-and-stories` |
| **Codex** | `/bmad-bmm-workflows-create-epics-and-stories` |

**なぜアーキテクチャの後に作成？**
- ✅ アーキテクチャ決定（DB選択、API設計等）がストーリーの複雑さに影響
- ✅ 技術的依存関係が明確になる
- ✅ ストーリーが技術的に妥当な範囲で分割される
- ✅ すべてのストーリーがアーキテクチャパターンに整合

**成果物**:
- `epics.md`: すべてのEpicとストーリー分解
- `epic-1-*.md`, `epic-2-*.md`...: 各Epicファイル
  - Epic目標とスコープ
  - ユーザーストーリーと受け入れ基準
  - ストーリー優先度(P0/P1/P2/P3)
  - 依存関係
  - アーキテクチャ決定への参照

#### 2️⃣-alt Epic末尾にStory追加（カスタムワークフロー）

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

#### 3️⃣ 実装準備チェック（強く推奨）

| 項目 | 内容 |
|------|------|
| **エージェント** | Architect |
| **必須度** | 強く推奨 |
| **成果物** | `implementation-readiness.md` |
| **ClaudeCode** | `/bmad:bmm:workflows:implementation-readiness` |
| **Cursor** | `@.bmad/bmm/workflows/implementation-readiness` |
| **Codex** | `/bmad-bmm-workflows-implementation-readiness` |

**チェック内容**:
- PRD/GDDの完全性
- アーキテクチャの完全性
- Epic/Storiesの完全性
- PRD↔アーキテクチャ↔Epic/Storiesの整合性

**ゲート判定**:
- ✅ **PASS**: Phase 4へ進む
- ⚠️ **CONCERNS**: 注意しながら進む
- ❌ **FAIL**: 問題解決が必要

**Quick Flowの場合**: Phase 3をスキップしてPhase 4へ直行

---

## Phase 4: Implementation（実装）- **必須** 💻

### 目的
Epic単位、Story単位で反復的に実装

### ストーリーライフサイクル
```
TODO → IN PROGRESS → READY FOR REVIEW → DONE
```

### セットアップ（1回のみ）

#### スプリント計画作成

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **成果物** | `sprint-status.yaml` |
| **ClaudeCode** | `/bmad:bmm:workflows:sprint-planning` |
| **Cursor** | `@.bmad/bmm/workflows/sprint-planning` |
| **Codex** | `/bmad-bmm-workflows-sprint-planning` |

---

### Epic毎の作業フロー

#### 1️⃣ Epic技術コンテキスト作成

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | Epicレベルの技術ガイダンスを生成 |
| **ClaudeCode** | `/bmad:bmm:workflows:epic-tech-context` |
| **Cursor** | `@.bmad/bmm/workflows/epic-tech-context` |
| **Codex** | `/bmad-bmm-workflows-epic-tech-context` |

#### 2️⃣ 技術コンテキスト検証（オプション）

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **ClaudeCode** | `/bmad:bmm:workflows:validate-epic-tech-context` |
| **Cursor** | `@.bmad/bmm/workflows/validate-epic-tech-context` |
| **Codex** | `/bmad-bmm-workflows-validate-epic-tech-context` |

---

### Story毎の作業フロー（完了まで繰り返し）

#### 1️⃣ ストーリー作成

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | 次のストーリーマークダウンファイルを生成 |
| **ClaudeCode** | `/bmad:bmm:workflows:create-story` |
| **Cursor** | `@.bmad/bmm/workflows/create-story` |
| **Codex** | `/bmad-bmm-workflows-create-story` |

#### 2️⃣ ストーリー検証（オプション）

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **ClaudeCode** | `/bmad:bmm:workflows:validate-create-story` |
| **Cursor** | `@.bmad/bmm/workflows/validate-create-story` |
| **Codex** | `/bmad-bmm-workflows-validate-create-story` |

#### 3️⃣ ストーリーコンテキスト作成（推奨）

**タイミング**: ストーリーが`drafted`状態の時

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | 動的なストーリーコンテキストXMLを組み立て（最新のドキュメントとコードアーティファクトを収集） |
| **入力** | ストーリーファイル（例: `2-2-adaptive-difficulty-adjustment-logic.md`） |
| **出力** | コンテキストXML（例: `2-2-adaptive-difficulty-adjustment-logic.context.xml`） |
| **ClaudeCode** | `/bmad:bmm:workflows:story-context` |
| **Cursor** | `@.bmad/bmm/workflows/story-context` |
| **Codex** | `/bmad-bmm-workflows-story-context` |

**使用理由**: 
- 複数のエピック、技術仕様、アーキテクチャドキュメントが存在する場合、ストーリー実装時に必要な最新のコンテキストを自動収集
- 依存関係（完了済み機能など）を正確に把握

または、コンテキストなしでストーリーを準備:

#### 3️⃣-alt ストーリー準備完了（必須）

**タイミング**: ストーリーコンテキスト作成後、またはコンテキストなしで直接準備する場合

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | ストーリーを`ready-for-dev`状態に変更し、開発開始可能にする |
| **入力** | ストーリーファイル |
| **出力** | `sprint-status.yaml`の更新（`drafted` → `ready-for-dev`） |
| **ClaudeCode** | `/bmad:bmm:workflows:story-ready` |
| **Cursor** | `@.bmad/bmm/workflows/story-ready` |
| **Codex** | `/bmad-bmm-workflows-story-ready` |

#### 4️⃣ コンテキスト検証（オプション）

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **ClaudeCode** | `/bmad:bmm:workflows:validate-story-context` |
| **Cursor** | `@.bmad/bmm/workflows/validate-story-context` |
| **Codex** | `/bmad-bmm-workflows-validate-story-context` |

#### 5️⃣ ストーリー実装（必須）

**タイミング**: ストーリーが`ready-for-dev`または`in-progress`状態の時

| 項目 | 内容 |
|------|------|
| **エージェント** | DEV |
| **目的** | コード実装、ユニットテスト作成、テスト実行、ストーリーファイル更新 |
| **入力** | ストーリーファイル、コンテキストXML（存在する場合）、技術仕様、アーキテクチャドキュメント |
| **出力** | 実装コード、テスト、更新されたストーリーファイル |
| **ClaudeCode** | `/bmad:bmm:workflows:dev-story` |
| **Cursor** | `@.bmad/bmm/workflows/dev-story` |
| **Codex** | `/bmad-bmm-workflows-dev-story` |

**実装内容**:
- ストーリーファイルの`Tasks / Subtasks`に基づく実装
- クリーンアーキテクチャの層分離を維持（ドメイン層、アプリケーション層、インフラ層）
- ユニットテストと統合テストの作成
- ロギング、エラーハンドリング、オブザーバビリティの実装
- ストーリーファイルの`Dev Agent Record`セクションへの記録

#### 6️⃣ コードレビュー（必須）

**タイミング**: ストーリー実装完了後、`in-progress` → `review`状態に変更

| 項目 | 内容 |
|------|------|
| **エージェント** | DEV |
| **目的** | コード品質検証、基準への適合確認、レビューノートの記録 |
| **入力** | 実装コード、ストーリーファイル、技術仕様、アーキテクチャドキュメント |
| **出力** | ストーリーファイルに追加されるレビューノート、`sprint-status.yaml`の更新（`review`状態） |
| **ClaudeCode** | `/bmad:bmm:workflows:code-review` |
| **Cursor** | `@.bmad/bmm/workflows/code-review` |
| **Codex** | `/bmad-bmm-workflows-code-review` |

**レビュー内容**:
- クリーンアーキテクチャの層分離の遵守
- コード品質ガイドライン（ESLintエラーゼロ、`any`型の回避）
- テストカバレッジ
- アーキテクチャドキュメントとの整合性
- 技術仕様との適合性

#### 7️⃣ ストーリー完了（必須）

**タイミング**: コードレビュー完了後、DoD（Definition of Done）を満たしている場合

| 項目 | 内容 |
|------|------|
| **エージェント** | DEV |
| **目的** | ストーリーを`done`状態に変更し、次のストーリーへ進む準備 |
| **入力** | ストーリーファイル、`sprint-status.yaml` |
| **出力** | `sprint-status.yaml`の更新（`review` → `done`） |
| **ClaudeCode** | `/bmad:bmm:workflows:story-done` |
| **Cursor** | `@.bmad/bmm/workflows/story-done` |
| **Codex** | `/bmad-bmm-workflows-story-done` |

**完了条件（DoD）**:
- すべてのAcceptance Criteriaを満たしている
- すべてのTasks/Subtasksが完了している
- ユニットテストと統合テストが通過している
- コードレビューが完了している
- ESLintエラーがゼロ
- ストーリーファイルの`Dev Agent Record`が記録されている

---

### Epic完了時

#### ユーザー受け入れテスト（UAT）シナリオ作成

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | Epic完了時にUAT計画とユーザー実行可能な検証シナリオを作成 |
| **タイミング** | Epicの最後、Retrospectiveの前後 |
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

#### UAT自動実行（オプション）

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | 作成されたUATをオートメーションで実行し、結果を生成 |
| **タイミング** | `create-uat-scenario`ワークフローの実行後 |
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

#### 振り返り

| 項目 | 内容 |
|------|------|
| **エージェント** | SM |
| **目的** | Epicからの学びを記録 |
| **ClaudeCode** | `/bmad:bmm:workflows:retrospective` |
| **Cursor** | `@.bmad/bmm/workflows/retrospective` |
| **Codex** | `/bmad-bmm-workflows-retrospective` |

**重要: 技術的負債の一元管理**

このプロジェクトでは、技術的負債を一元管理するため、`docs/technical-debt-registry.md`を使用しています。

retrospectiveワークフロー実行時は、以下の手順に従ってください：

1. **BMAD retrospectiveワークフローを実行**してretrospectiveドキュメントを作成
2. **技術的負債レジストリを更新**:
   - `update-technical-debt-registry`ワークフローを実行
   - Retrospectiveドキュメントから技術的負債を抽出
   - 技術的負債レジストリに追加または更新
3. **Retrospectiveドキュメントの技術的負債セクションを参照形式に変更**:
   - 技術的負債レジストリへのリンクを追加
   - 各技術的負債にID（TD-XXX）を付与

**参照ドキュメント:**
- 技術的負債レジストリ更新ワークフロー: `@.bmad-custom/workflows/update-technical-debt-registry`
- 技術的負債レジストリ: `docs/technical-debt-registry.md`

**プロンプト例:**
```bash
# Cursor
@.bmad/bmm/workflows/retrospective を実施してください。

その後、技術的負債レジストリを更新してください:
@.bmad-custom/workflows/update-technical-debt-registry
```

---

### サポートワークフロー

#### ステータス確認

| 項目 | 内容 |
|------|------|
| **エージェント** | 任意 |
| **目的** | 次に何をすべきか確認 |
| **ClaudeCode** | `/bmad:bmm:workflows:workflow-status` |
| **Cursor** | `@.bmad/bmm/workflows/workflow-status` |
| **Codex** | `/bmad-bmm-workflows-workflow-status` |

#### 進路修正（必要に応じて）

**タイミング**: スプリント実行中に大きな変更が必要な場合

| 項目 | 内容 |
|------|------|
| **エージェント** | 任意（通常はSMまたはDEV） |
| **目的** | 変更の影響分析、解決策の提案、実装へのルーティング |
| **ClaudeCode** | `/bmad:bmm:workflows:correct-course` |
| **Cursor** | `@.bmad/bmm/workflows/correct-course` |
| **Codex** | `/bmad-bmm-workflows-correct-course` |

**使用例**:
- 技術仕様の大幅な変更が必要な場合
- アーキテクチャの見直しが必要な場合
- 依存関係の変更が必要な場合

---

## ストーリー実施時の詳細ガイド

### ワークフローコマンドの実行順序（標準フロー）

```
1. story-context (推奨)
   ↓
2. story-ready (必須)
   ↓
3. dev-story (必須)
   ↓
4. code-review (必須)
   ↓
5. story-done (必須)
```

**簡易フロー**（コンテキスト作成をスキップする場合）:
```
1. story-ready (必須)
   ↓
2. dev-story (必須)
   ↓
3. code-review (必須)
   ↓
4. story-done (必須)
```

### ストーリーコンテキスト作成の推奨理由

中規模以上のプロジェクトでは、以下の理由から`story-context`の実行を推奨します：

1. **複数のエピックが存在**: 完了済み、進行中、バックログのエピックが混在
2. **技術仕様が詳細**: 各エピックに技術仕様（`tech-spec-epic-*.md`）が存在
3. **アーキテクチャドキュメントが充実**: `architecture.md`にパターンが定義されている
4. **依存関係の管理**: 完了済み機能を活用する必要がある
5. **学習の記録**: 前のストーリーからの学び（`Learnings from Previous Story`）を活用

### ストーリー実装時の注意点

1. **クリーンアーキテクチャの維持**: 層分離を厳守（ドメイン層、アプリケーション層、インフラ層）
2. **既存機能の活用**: 完了済みの基盤機能（ロギング、エラーハンドリング、リトライロジック）を再利用
3. **テストの実装**: ユニットテストと統合テストの両方を実装
4. **CI環境への配慮**: データベース接続エラー時のテストスキップロジックを実装

### コマンド実行例

#### Cursorでの実行例

```bash
# 1. ストーリー作成
@.bmad/bmm/workflows/create-story

# 1. ストーリーコンテキスト作成
@.bmad/bmm/workflows/story-context

# 2. ストーリー準備完了
@.bmad/bmm/workflows/story-ready

# 3. ストーリー実装
@.bmad/bmm/workflows/dev-story

# 4. コードレビュー
@.bmad/bmm/workflows/code-review

# 5. ストーリー完了
@.bmad/bmm/workflows/story-done
```

#### ClaudeCodeでの実行例

```bash
# 1. ストーリーコンテキスト作成
/bmad:bmm:workflows:story-context

# 2. ストーリー準備完了
/bmad:bmm:workflows:story-ready

# 3. ストーリー実装
/bmad:bmm:workflows:dev-story

# 4. コードレビュー
/bmad:bmm:workflows:code-review

# 5. ストーリー完了
/bmad:bmm:workflows:story-done
```

---

# 実際の使用例：カスタマーダッシュボード

## プロジェクト概要
分析とプリファレンス機能を持つユーザーダッシュボード（中規模プロジェクト）

---

## Phase 1: Analysis（オプション）

### 新しいチャット #1 - プロダクトブリーフ作成

```bash
# ClaudeCode
/bmad:bmm:workflows:product-brief

# Cursor
@.bmad/bmm/workflows/product-brief

# Codex
/bmad-bmm-workflows-product-brief
```

- プロダクトビジョンを定義
- 市場とユーザーニーズを分析

---

## Phase 2: Planning（必須）

### 新しいチャット #2 - プロジェクト初期化

```bash
# ClaudeCode
/bmad:bmm:workflows:workflow-init

# Cursor
@.bmad/bmm/workflows/workflow-init

# Codex
/bmad-bmm-workflows-workflow-init
```

- プロジェクトを説明
- **BMad Method**トラックを選択
- `bmm-workflow-status.yaml`作成

### 新しいチャット #3 - PRD作成

```bash
# ClaudeCode
/bmad:bmm:workflows:prd

# Cursor
@.bmad/bmm/workflows/prd

# Codex
/bmad-bmm-workflows-prd
```

- **FR-001**: ユーザー認証
- **FR-002**: ダッシュボードUI
- **FR-003**: データ分析
- **NFR-001**: パフォーマンス
- **NFR-002**: セキュリティ
- `PRD.md`作成

### 新しいチャット #4 - MVPスコープ検証（カスタムワークフロー）

```bash
# ClaudeCode
/bmad:custom:workflows:validate-mvp-scope

# Cursor
@.bmad-custom/workflows/validate-mvp-scope

# Codex
/bmad-custom-workflows-validate-mvp-scope
```

- MVPスコープが適切か検証
- スコープ過大を防止

### 新しいチャット #5 - UX設計（オプション）

```bash
# ClaudeCode
/bmad:bmm:workflows:create-ux-design

# Cursor
@.bmad/bmm/workflows/create-ux-design

# Codex
/bmad-bmm-workflows-create-ux-design
```

- UIワイヤーフレームと仕様
- `ux-spec.md`作成

---

## Phase 2.5: Technical Prototyping（オプション）

### 新しいチャット #6 - 技術プロトタイピング（カスタムワークフロー）

```bash
# ClaudeCode
/bmad:custom:workflows:technical-spike

# Cursor
@.bmad-custom/workflows/technical-spike

# Codex
/bmad-custom-workflows-technical-spike
```

- 技術的リスクの検証
- アーキテクチャ設計前の実現可能性確認

---

## Phase 3: Solutioning（必須）

### 新しいチャット #7 - アーキテクチャ設計

```bash
# ClaudeCode
/bmad:bmm:workflows:architecture

# Cursor
@.bmad/bmm/workflows/architecture

# Codex
/bmad-bmm-workflows-architecture
```

- Monolith + PostgreSQL + Redis
- Next.js + GraphQL
- **ADR-001**: GraphQL選択の理由
- **ADR-002**: Redis for caching
- `architecture.md`作成

### 新しいチャット #8 - Epic/Stories作成

```bash
# ClaudeCode
/bmad:bmm:workflows:create-epics-and-stories

# Cursor
@.bmad/bmm/workflows/create-epics-and-stories

# Codex
/bmad-bmm-workflows-create-epics-and-stories
```

- **Epic 1**: 認証（3 stories）
- **Epic 2**: ダッシュボードUI（5 stories）
- **Epic 3**: データ分析（4 stories）
- `epics.md` + 各`epic-*.md`作成

### 新しいチャット #9 - 実装準備チェック

```bash
# ClaudeCode
/bmad:bmm:workflows:implementation-readiness

# Cursor
@.bmad/bmm/workflows/implementation-readiness

# Codex
/bmad-bmm-workflows-implementation-readiness
```

- ✅ **PASS** → Phase 4へ進む

---

## Phase 4: Implementation（必須）

### 新しいチャット #10 - スプリント計画（セットアップ）

```bash
# ClaudeCode
/bmad:bmm:workflows:sprint-planning

# Cursor
@.bmad/bmm/workflows/sprint-planning

# Codex
/bmad-bmm-workflows-sprint-planning
```

- `sprint-status.yaml`作成

---

### Epic 1: 認証（3 stories）

#### 新しいチャット #11 - Epic技術コンテキスト

```bash
# ClaudeCode
/bmad:bmm:workflows:epic-tech-context

# Cursor
@.bmad/bmm/workflows/epic-tech-context

# Codex
/bmad-bmm-workflows-epic-tech-context
```

#### Story 1-1: ユーザー登録

**新しいチャット #12 - ストーリー作成**
```bash
# ClaudeCode
/bmad:bmm:workflows:create-story

# Cursor
@.bmad/bmm/workflows/create-story

# Codex
/bmad-bmm-workflows-create-story
```

**新しいチャット #13 - ストーリーコンテキスト**
```bash
# ClaudeCode
/bmad:bmm:workflows:story-context

# Cursor
@.bmad/bmm/workflows/story-context

# Codex
/bmad-bmm-workflows-story-context
```

**新しいチャット #14 - ストーリー実装**
```bash
# ClaudeCode
/bmad:bmm:workflows:dev-story

# Cursor
@.bmad/bmm/workflows/dev-story

# Codex
/bmad-bmm-workflows-dev-story
```

**新しいチャット #15 - コードレビュー**
```bash
# ClaudeCode
/bmad:bmm:workflows:code-review

# Cursor
@.bmad/bmm/workflows/code-review

# Codex
/bmad-bmm-workflows-code-review
```

**新しいチャット #16 - ストーリー完了**
```bash
# ClaudeCode
/bmad:bmm:workflows:story-done

# Cursor
@.bmad/bmm/workflows/story-done

# Codex
/bmad-bmm-workflows-story-done
```

#### Story 1-2, 1-3: 同様に実施

#### Epic 1完了 - UATシナリオ作成

**新しいチャット #XX**
```bash
# ClaudeCode
/bmad:custom:workflows:create-uat-scenario

# Cursor
@.bmad-custom/workflows/create-uat-scenario

# Codex
/bmad-custom-workflows-create-uat-scenario
```

- UAT計画と検証シナリオを生成
- `docs/sprint-artifacts/epic-1-uat-plan.md`作成
- `docs/sprint-artifacts/epic-1-verification-scenario.md`作成

#### Epic 1完了 - UAT自動実行（オプション）

**新しいチャット #XX**
```bash
# ClaudeCode
/bmad:custom:workflows:execute-uat

# Cursor
@.bmad-custom/workflows/execute-uat

# Codex
/bmad-custom-workflows-execute-uat
```

- UATを自動実行
- テスト結果を記録
- `docs/sprint-artifacts/epic-1-uat-results.md`作成

#### Epic 1完了 - 振り返り

**新しいチャット #XX**
```bash
# ClaudeCode
/bmad:bmm:workflows:retrospective

# Cursor
@.bmad/bmm/workflows/retrospective

# Codex
/bmad-bmm-workflows-retrospective
```

**重要:** 技術的負債の一元管理

retrospectiveワークフロー実行後、以下の手順を実行してください：

1. 技術的負債レジストリ更新ワークフローを実行:
```bash
# Cursor
@.bmad-custom/workflows/update-technical-debt-registry
```

2. 技術的負債レジストリ（`docs/technical-debt-registry.md`）を確認・更新

詳細は `update-technical-debt-registry` ワークフローのREADMEを参照してください。

---

### Epic 2: ダッシュボードUI（5 stories）
同様のサイクルで実施...

### Epic 3: データ分析（4 stories）
同様のサイクルで実施...

---

# 重要な原則

## 1. 常に新しいチャットを使用 🆕
各ワークフローは新しいチャットで実行してください。コンテキストの限界とハルシネーションを避けるためです。

## 2. ワンストーリー・アット・ア・タイム 🎯
1つのストーリーの完全なライフサイクルを完了してから次のストーリーに進みます。

## 3. V6の重要な改善 🆕
Epic/Storiesは**アーキテクチャの後**に作成されます。これにより技術的に妥当な分解が可能になります。

## 4. トラッキングは自動 🤖
- `bmm-workflow-status.yaml`: Phase 1-3の進捗
- `sprint-status.yaml`: Phase 4の進捗
- 両方とも自動更新、手動編集不要

---

# Quick Flow vs フルワークフロー比較

| 項目 | Quick Flow | BMad Method | Enterprise |
|------|-----------|------------|------------|
| **Phase 1** | オプション | オプション | 推奨 |
| **Phase 2** | tech-spec | PRD + UX | PRD + UX |
| **Phase 3** | スキップ | Architecture + Epics | Architecture + Sec/DevOps + Epics |
| **Phase 4** | 実装 | 実装 | 実装 |
| **所要時間（計画）** | 数時間〜1日 | 1-3日 | 3-7日 |
| **ストーリー数** | 1-15個 | 10-50+個 | 30+個 |
| **適用対象** | バグ、小規模機能 | プロダクト、複雑機能 | エンタープライズ、コンプライアンス |

---

# まとめ

## BMADの強み

1. **スケールアダプティブ**: プロジェクトの複雑さに自動適応
2. **AIエージェント駆動**: 専門エージェントが各フェーズをガイド
3. **品質保証**: 各フェーズに検証ステップ
4. **柔軟性**: 必要なワークフローのみ実行可能
5. **自動追跡**: 進捗が自動的に記録される

## 成功のカギ

- ✅ 常に新しいチャットを使用
- ✅ `workflow-status`で次のステップを確認
- ✅ トラック選択は慎重に（`workflow-init`の推奨を信頼）
- ✅ V6ではアーキテクチャの後にEpic/Storiesを作成
- ✅ ワンストーリー・アット・ア・タイムの原則を守る

---

## 参考ドキュメント

### BMAD公式ドキュメント

- [quick-start.md](.bmad/bmm/docs/quick-start.md)
- [workflows-analysis.md](.bmad/bmm/docs/workflows-analysis.md)
- [workflows-planning.md](.bmad/bmm/docs/workflows-planning.md)
- [workflows-solutioning.md](.bmad/bmm/docs/workflows-solutioning.md)
- [workflows-implementation.md](.bmad/bmm/docs/workflows-implementation.md)
- [scale-adaptive-system.md](.bmad/bmm/docs/scale-adaptive-system.md)
- [enterprise-agentic-development.md](.bmad/bmm/docs/enterprise-agentic-development.md)

### BMad Custom Extensions

- **カスタムワークフロー使用ガイド**: [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- **ワークフロー統合ガイド**: [.guide/bmad-custom-workflows-integration.md](./.guide/bmad-custom-workflows-integration.md)
- **インストールガイド**: [.guide/bmad-custom-installation-guide.md](./.guide/bmad-custom-installation-guide.md)

---

**最終更新日**: 2025-01-27

