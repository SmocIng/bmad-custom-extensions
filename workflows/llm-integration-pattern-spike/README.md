# LLM Integration Pattern Spike ワークフロー

## 概要

LLM出力解釈のアーキテクチャパターンを早期に検証するためのLLM統合パターンSpikeワークフローです。構造化出力、意図分類、JSONスキーマ検証などのアプローチを比較し、最適な方法を特定します。

## 使用目的

- LLM出力解釈パターンの早期検証
- 構造化出力ライブラリの選定
- 意図分類アプローチの比較
- JSONスキーマ検証の実装方法の検証
- パフォーマンスと精度のトレードオフの評価

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:llm-integration-pattern-spike
```

### Cursor
```
@.bmad-custom/workflows/llm-integration-pattern-spike
```

### Codex
```
/bmad-custom-workflows-llm-integration-pattern-spike
```

### GithubCopilot
```
@.bmad-custom/workflows/llm-integration-pattern-spike
```

## 機能

1. **LLM統合要件の特定**: PRDからLLM統合要件を特定
2. **アプローチの特定**: 構造化出力、意図分類などのアプローチを特定
3. **Spike計画**: 各パターンに対するSpike計画を作成
4. **Spike実行**: 最小プロトタイプで各アプローチを検証
5. **アプローチ比較**: 異なるアプローチを比較し、最適な方法を特定
6. **LLMパターンレポート生成**: Spike結果をレポートとして出力

## 入力

- **PRDファイル** (必須): `{output_folder}/prd.md`
- **LLM統合パターン** (必須): ユーザーから取得（1-5パターン）

## 出力

- `{output_folder}/llm-integration-pattern-report.md`: LLM統合パターンレポート

## 検証パターン

1. **構造化出力**
   - JSONスキーマ検証（Zod、Pydantic）
   - 構造化出力ライブラリ（Instructor、Outlines）
   - JSON Mode
   - パース成功率とパフォーマンス

2. **意図分類**
   - キーワードベースパターンマッチング
   - LLMセマンティック理解
   - ハイブリッドアプローチ
   - 精度と信頼性

3. **レスポンスフォーマット**
   - JSON形式の出力
   - 構造化出力
   - エラーハンドリング
   - 信頼性

## 評価アプローチ

1. **構造化出力ライブラリ**
   - LangGraph
   - Instructor
   - Outlines
   - その他のライブラリ

2. **JSONスキーマ検証**
   - Zod（TypeScript）
   - Pydantic（Python）
   - JSON Schema

3. **意図分類**
   - キーワードベース
   - LLMセマンティック
   - ハイブリッド

## 比較項目

- **パフォーマンス**: レイテンシ、コスト
- **精度**: 正確性、信頼性
- **複雑性**: 実装の複雑さ、メンテナンス性
- **開発者体験**: 使いやすさ、ドキュメント

## タイミング

- **実行タイミング**: Phase 2.5（技術プロトタイピングフェーズ）
- **前提条件**: PRDが作成され、LLM統合要件が定義されていること

## 使用例

### 構造化出力の検証

```
構造化出力ライブラリを選定したい
→ 構造化出力Spikeを計画 → 各ライブラリをテスト → 比較 → 推奨アプローチを特定
```

### 意図分類の検証

```
意図分類アプローチを比較したい
→ 意図分類Spikeを計画 → 各アプローチをテスト → 精度とパフォーマンスを比較 → 推奨アプローチを特定
```

## 次のステップ

LLMパターンSpike結果に基づいて：

- **推奨アプローチの特定**: 各パターンに最適なアプローチを特定
- **アーキテクチャ設計**: Spike結果を反映したアーキテクチャ設計
- **実装計画**: 推奨アプローチに基づいた実装計画

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── llm-integration-pattern-spike.mdc

.bmad-custom/workflows/llm-integration-pattern-spike/
  ├── instructions.md
  ├── llm-pattern-report-template.md
  └── README.md (このファイル)
```

## 関連ワークフロー

- **validate-mvp-scope**: PRD作成後のMVPスコープ検証
- **technical-spike**: 技術リスクの早期検証（LLM統合パターンを含む）
- **performance-spike**: パフォーマンス目標の早期検証

