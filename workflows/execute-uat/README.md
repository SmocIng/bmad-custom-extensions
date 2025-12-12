# Execute UAT ワークフロー

## 概要

作成されたUATをオートメーションで実行し、結果を生成するワークフローです。

## 使用目的

- `create-uat-scenario`ワークフローで作成されたUAT計画と検証シナリオを基に、UATを自動実行
- テストケースの実行結果を記録
- パフォーマンス指標と機能品質指標を収集
- 受け入れ判定を自動生成
- 結果を`docs/sprint-artifacts/epic-*-uat-results.md`に記録

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:execute-uat
```

### Cursor
```
@.bmad-custom/workflows/execute-uat
```

### Codex
```
/bmad-custom-workflows-execute-uat
```

### GithubCopilot
```
@.bmad-custom/workflows/execute-uat
```

## 機能

1. **Epic特定**: 指定されたEpic番号でepics.mdからEpicを検索
2. **ファイル検証**: UAT計画ファイルと検証シナリオファイルの存在確認
3. **UAT実行**: 
   - UAT計画からテストケースを読み込み
   - 各テストケースを自動実行（APIテスト、UIテスト、統合テスト、パフォーマンステスト）
   - テスト結果を記録（成功/失敗/未実行）
   - パフォーマンス指標を収集
4. **結果分析**: 
   - 成功率の計算
   - 問題の特定と分類（影響度、優先度）
   - パフォーマンス指標の分析
5. **結果生成**: 
   - `docs/sprint-artifacts/epic-{epic_number}-uat-results.md`を作成
   - テスト実行サマリー、発見された問題、パフォーマンス指標、受け入れ判定を含む

## 入力

- **Epic番号** (必須): UATを実行するEpic番号（例: "4"）

## 前提条件

- `create-uat-scenario`ワークフローが実行済みであること
- UAT計画ファイル（`docs/sprint-artifacts/epic-{epic_number}-uat-plan.md`）が存在すること
- 検証シナリオファイル（`docs/sprint-artifacts/epic-{epic_number}-verification-scenario.md`）が存在すること（推奨）

## 出力

- `docs/sprint-artifacts/epic-{epic_number}-uat-results.md`: UAT実行結果

## 実行内容

### テストケースの実行

1. **APIテストケース**:
   - curlコマンドまたはAPI呼び出しを実行
   - HTTPステータスコードを確認
   - レスポンス構造を検証
   - レスポンス時間を測定

2. **UIテストケース**:
   - UIページのアクセス可能性を確認
   - UI要素の検証
   - 読み込み時間の測定

3. **統合テストケース**:
   - エンドツーエンドフローの実行
   - データ整合性の確認
   - 統合ポイントの検証

4. **パフォーマンステストケース**:
   - 複数リクエストの実行
   - レスポンス時間の測定
   - パーセンタイル（95パーセンタイル）の計算

### 結果分析

- 成功率の計算
- 問題の特定と分類
- パフォーマンス指標の分析
- 受け入れ判定の生成

## 使用例

### Epic 4のUAT実行

```
Epic 4のUATを実行したい
→ Epic 4を特定 → UAT計画と検証シナリオを読み込み → テストケースを実行 → 結果を生成
```

## タイミング

- `create-uat-scenario`ワークフローの実行後
- 検証シナリオの手動実行後（オプション）

## 次のステップ

1. UAT結果をレビュー
2. 受け入れ判定に基づいて次のアクションを決定
   - 合格: 次のEpicに進む
   - 条件付き合格: 軽微な問題を修正してから次のEpicに進む
   - 不合格: 重大な問題を修正してから再実行

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── execute-uat.mdc

.bmad-custom/workflows/execute-uat/
  ├── instructions.md
  ├── uat-results-template.md
  └── README.md (このファイル)
```

## 参照ファイル

- UAT計画: `docs/sprint-artifacts/epic-{epic_number}-uat-plan.md`
- 検証シナリオ: `docs/sprint-artifacts/epic-{epic_number}-verification-scenario.md`
- 既存のUAT結果: `docs/sprint-artifacts/epic-*-uat-results.md`

