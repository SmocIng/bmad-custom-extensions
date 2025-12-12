# Performance Spike ワークフロー

## 概要

NFRで定義したパフォーマンス目標が達成可能か早期に検証するためのパフォーマンスSpikeワークフローです。実装前にパフォーマンスボトルネックを特定し、目標の達成可能性を検証します。

## 使用目的

- パフォーマンス目標の早期検証
- パフォーマンスボトルネックの早期発見
- 実装前のパフォーマンス最適化戦略の策定
- パフォーマンス予算の割り当て

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:performance-spike
```

### Cursor
```
@.bmad-custom/workflows/performance-spike
```

### Codex
```
/bmad-custom-workflows-performance-spike
```

### GithubCopilot
```
@.bmad-custom/workflows/performance-spike
```

## 機能

1. **パフォーマンス要件の抽出**: PRDからNFRパフォーマンス要件を抽出
2. **テストシナリオの特定**: パフォーマンスクリティカルな操作を特定
3. **Spike計画**: 各テストシナリオに対するSpike計画を作成
4. **Spike実行**: 最小プロトタイプでパフォーマンスを測定
5. **結果分析**: パフォーマンス結果を分析し、目標達成可能性を評価
6. **パフォーマンスレポート生成**: パフォーマンス結果をレポートとして出力

## 入力

- **PRDファイル** (必須): `{output_folder}/prd.md`
- **パフォーマンステストシナリオ** (必須): ユーザーから取得

## 出力

- `{output_folder}/performance-spike-report.md`: パフォーマンスSpikeレポート

## 検証項目

1. **LLM API呼び出しレイテンシ**
   - 単一API呼び出しのレイテンシ
   - プロンプトサイズの影響
   - 並列処理の効果

2. **並列処理の可能性**
   - 並列API呼び出しのパフォーマンス向上
   - リソース使用量
   - ボトルネックの特定

3. **プロンプトサイズの影響**
   - プロンプトサイズとレイテンシの関係
   - 最適なプロンプトサイズ
   - コンテキストウィンドウの制限

4. **データベースクエリパフォーマンス**
   - クエリ実行時間
   - インデックスの効果
   - クエリ最適化の機会

5. **エンドツーエンド操作パフォーマンス**
   - 完全な操作フローのパフォーマンス
   - ボトルネックの特定
   - 最適化の機会

## タイミング

- **実行タイミング**: Phase 2（Planning）の後、またはPhase 3（Solutioning）の前
- **前提条件**: PRDが作成され、NFRパフォーマンス要件が定義されていること

## 使用例

### LLM API呼び出しのパフォーマンス検証

```
LLM API呼び出しのレイテンシが目標を満たすか検証したい
→ パフォーマンスSpikeを計画 → 最小プロトタイプを作成 → レイテンシを測定 → 結果を記録
```

### 並列処理のパフォーマンス検証

```
並列処理でパフォーマンスが向上するか検証したい
→ 並列処理Spikeを計画 → プロトタイプを作成 → パフォーマンスを測定 → 結果を記録
```

## 次のステップ

パフォーマンスSpike結果に基づいて：

- **目標達成**: アーキテクチャ設計に進む
- **目標未達成**: 最適化戦略を検討し、必要に応じて目標を調整
- **重大な問題**: 技術的アプローチを見直し、代替案を検討

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── performance-spike.mdc

.bmad-custom/workflows/performance-spike/
  ├── instructions.md
  ├── performance-report-template.md
  └── README.md (このファイル)
```

## 関連ワークフロー

- **validate-mvp-scope**: PRD作成後のMVPスコープ検証
- **technical-spike**: 技術リスクの早期検証（パフォーマンスSpikeを含む）
- **llm-integration-pattern-spike**: LLM統合パターン検証

