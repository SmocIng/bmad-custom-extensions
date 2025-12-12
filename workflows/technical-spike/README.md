# Technical Spike ワークフロー

## 概要

技術リスクの高い部分（LLM統合、パフォーマンス、状態管理など）を早期に検証するための技術プロトタイピング（Spike）ワークフローです。アーキテクチャ設計前に技術的アプローチの実現可能性を検証します。

## 使用目的

- 技術リスクの早期検証
- アーキテクチャ設計前の技術的アプローチの検証
- 実装前に技術的ブロッカーの特定
- パフォーマンス目標の達成可能性の検証
- 複雑性の早期検証

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:technical-spike
```

### Cursor
```
@.bmad-custom/workflows/technical-spike
```

### Codex
```
/bmad-custom-workflows-technical-spike
```

### GithubCopilot
```
@.bmad-custom/workflows/technical-spike
```

## 機能

1. **技術リスクの特定**: PRDから技術リスクを特定
2. **Spike計画**: 各技術リスクに対するSpike計画を作成
3. **Spike優先順位付け**: リスクレベルに基づいてSpikeを優先順位付け
4. **Spike実行**: 最小プロトタイプを作成して技術的アプローチを検証
5. **結果分析**: Spike結果を分析し、実現可能性を評価
6. **Spikeレポート生成**: Spike結果をレポートとして出力

## 入力

- **PRDファイル** (必須): `{output_folder}/prd.md`
- **アーキテクチャファイル** (オプション): `{output_folder}/architecture.md`
- **技術リスク領域** (必須): ユーザーから取得（1-5領域）

## 出力

- `{output_folder}/technical-spike-report.md`: 技術プロトタイピングレポート

## Spike対象領域

1. **LLM統合**
   - LLM出力解釈パターン（構造化出力、意図分類）
   - JSONスキーマ検証
   - パフォーマンスとコスト

2. **パフォーマンス**
   - LLM呼び出し回数とレイテンシ
   - 並列処理の可能性
   - プロンプトサイズの影響
   - NFR目標の達成可能性

3. **状態管理**
   - 状態マシンの複雑性
   - フレームワーク選定（LangGraph等）
   - 状態の永続化
   - 複雑性メトリクス

4. **その他の技術リスク**
   - サードパーティ統合
   - スケーラビリティ
   - セキュリティ

## Spike実行の原則

1. **最小プロトタイプ**: 検証に必要な最小限の実装のみ
2. **迅速な検証**: 各Spikeは1-3日で完了
3. **明確な成功基準**: 各Spikeに明確な成功基準を設定
4. **文書化**: すべての結果と学びを文書化

## タイミング

- **実行タイミング**: Phase 2.5（PlanningとSolutioningの間）またはPhase 3の前
- **前提条件**: PRDが作成されていること

## 使用例

### LLM統合のSpike

```
LLM出力解釈パターンを検証したい
→ LLM統合Spikeを計画 → 最小プロトタイプを作成 → アプローチを検証 → 結果を記録
```

### パフォーマンスのSpike

```
パフォーマンス目標が達成可能か検証したい
→ パフォーマンスSpikeを計画 → ベンチマークを作成 → 目標を検証 → 結果を記録
```

### 状態管理のSpike

```
状態マシンの複雑性を検証したい
→ 状態管理Spikeを計画 → プロトタイプを作成 → 複雑性を測定 → 結果を記録
```

## 次のステップ

Spike結果に基づいて：

- **すべてのSpikeが成功**: アーキテクチャ設計に進む
- **一部のSpikeが失敗**: 代替アプローチを検討し、必要に応じて追加のSpikeを実行
- **すべてのSpikeが失敗**: 技術的アプローチを見直し、PRDや要件を再検討

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── technical-spike.mdc

.bmad-custom/workflows/technical-spike/
  ├── instructions.md
  ├── spike-report-template.md
  └── README.md (このファイル)
```

## 関連ワークフロー

- **validate-mvp-scope**: PRD作成後のMVPスコープ検証
- **performance-spike**: パフォーマンス目標の早期検証（技術Spikeの特殊版）
- **llm-integration-pattern-spike**: LLM統合パターン検証（技術Spikeの特殊版）

