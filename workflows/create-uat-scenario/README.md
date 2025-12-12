# Create UAT Scenario ワークフロー

## 概要

Epicの最後（Retrospectiveの前後）に、ユーザー受け入れテスト（UAT）シナリオを作成するワークフローです。

## 使用目的

- Epic完了時にUAT計画とユーザー実行可能な検証シナリオを作成
- 既存のUAT計画（`docs/sprint-artifacts/epic-*-uat-plan.md`）を参照して構造を理解
- 既存の検証シナリオ（`docs/sprint-artifacts/epic-*-verification-scenario.md`）を参考にして、ユーザーが実施可能なシナリオを作成
- 検証シナリオの実施を促す

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:create-uat-scenario
```

### Cursor
```
@.bmad-custom/workflows/create-uat-scenario
```

### Codex
```
/bmad-custom-workflows-create-uat-scenario
```

### GithubCopilot
```
@.bmad-custom/workflows/create-uat-scenario
```

## 機能

1. **Epic特定**: 指定されたEpic番号でepics.mdからEpicを検索
2. **参照ファイル読み込み**: 既存のUAT計画と検証シナリオを参照して構造を理解
3. **UAT計画生成**: 
   - `docs/sprint-artifacts/epic-{epic_number}-uat-plan.md`を作成
   - UAT概要（目的、対象範囲、受け入れ基準）
   - テストケース（各Storyに対応）
   - テスト実行手順（事前準備チェックリスト、テスト実行）
   - テスト結果記録（テスト実行サマリー、成功率、問題点）
   - 受け入れ判定（判定基準、判定結果）
4. **検証シナリオ生成**: 
   - `docs/sprint-artifacts/epic-{epic_number}-verification-scenario.md`を作成
   - 事前準備チェックリスト（環境変数確認、データベース接続確認、サービス起動確認、テストデータ準備）
   - シナリオ1: 基本的な動作確認（各Storyに対応するステップ）
   - シナリオ2: ブラウザでの動作確認（オプション）
   - 確認チェックリスト
   - トラブルシューティング
   - 検証結果サマリー
   - 成功基準

## 入力

- **Epic番号** (必須): UATシナリオを作成するEpic番号（例: "4"）

## 出力

- `docs/sprint-artifacts/epic-{epic_number}-uat-plan.md`: UAT計画
- `docs/sprint-artifacts/epic-{epic_number}-verification-scenario.md`: ユーザー実行可能な検証シナリオ

## 参照ファイル

- 既存のUAT計画: `docs/sprint-artifacts/epic-*-uat-plan.md`
- 既存の検証シナリオ: `docs/sprint-artifacts/epic-*-verification-scenario.md`

## 使用例

### Epic 4のUATシナリオ作成

```
Epic 4のUATシナリオを作成したい
→ Epic 4を特定 → 既存のUAT計画と検証シナリオを参照 → UAT計画と検証シナリオを生成
```

## タイミング

- Epicの最後、Retrospectiveの前後
- 次のEpicに移行する前に実行

## 次のステップ

1. 生成された検証シナリオを実行
2. `execute-uat`ワークフローを使用してUATをオートメーションで実行し、結果を生成

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── create-uat-scenario.mdc

.bmad-custom/workflows/create-uat-scenario/
  ├── instructions.md
  ├── uat-plan-template.md
  ├── verification-scenario-template.md
  └── README.md (このファイル)
```

