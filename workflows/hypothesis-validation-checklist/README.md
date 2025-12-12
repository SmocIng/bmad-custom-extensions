# Hypothesis Validation Checklist ワークフロー

## 概要

DiscoveryフェーズまたはPlanning開始時に、仮説検証マインドセットを促進するチェックリストを作成するワークフローです。MVPが「何を作りたいか」ではなく「何を検証すべきか」に焦点を当てることを支援します。

## 使用目的

- 仮説駆動開発（Hypothesis-Driven Development）のマインドセット促進
- スコープ過大の防止
- 最小機能セットの特定
- 実装実現可能性の検証
- ユーザーテストアプローチの定義

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:hypothesis-validation-checklist
```

### Cursor
```
@.bmad-custom/workflows/hypothesis-validation-checklist
```

### Codex
```
/bmad-custom-workflows-hypothesis-validation-checklist
```

### GithubCopilot
```
@.bmad-custom/workflows/hypothesis-validation-checklist
```

## 機能

1. **仮説の特定**: 検証したい仮説を1-5個特定
2. **最小機能の特定**: 各仮説を検証するために必要な最小機能セットを特定
3. **実装実現可能性の検証**: すべての仮説を2週間で実装可能か検証
4. **ユーザーテストアプローチの定義**: 各仮説をユーザーテストで検証する方法を定義
5. **ピボット戦略の特定**: 仮説が無効化された場合の代替アプローチを準備
6. **チェックリスト生成**: 仮説検証チェックリストを生成

## 入力

- **Product Briefファイル** (オプション): `{output_folder}/product-brief-*.md`
- **ブレインストーミングファイル** (オプション): `{output_folder}/bmm-brainstorming-session-*.md`
- **検証対象仮説** (必須): ユーザーから取得（1-5個）

## 出力

- `{output_folder}/hypothesis-validation-checklist.md`: 仮説検証チェックリスト

## チェック項目

1. **仮説定義**
   - 各仮説を1文で記述できるか
   - 成功基準が明確か
   - 失敗基準が明確か

2. **機能要件**
   - 各仮説を3つ以下の機能で検証できるか
   - 最小機能セットが特定されているか
   - 不要な機能が除外されているか

3. **実装実現可能性**
   - すべての仮説を2週間で実装可能か
   - 実装時間の見積もりが現実的か
   - 段階的アプローチが必要か

4. **ユーザーテスト**
   - 各仮説をユーザーテストで検証できるか
   - ユーザーテストシナリオが明確か
   - メトリクスとフィードバック方法が定義されているか

5. **ピボット戦略**
   - 各仮説にピボット戦略があるか
   - 代替アプローチが準備されているか
   - 失敗時の対応が明確か

## タイミング

- **実行タイミング**: Phase 0（Discovery）の後、またはPhase 1（Planning）の開始時
- **前提条件**: なし（Product Briefやブレインストーミングファイルがあれば参照）

## 使用例

### Discoveryフェーズ後の仮説検証チェックリスト作成

```
Discoveryフェーズ完了後、仮説検証チェックリストを作成したい
→ Product Briefを参照 → 仮説を特定 → 最小機能を特定 → チェックリストを生成
```

### Planning開始時の仮説検証チェックリスト作成

```
Planning開始時、仮説検証マインドセットを促進したい
→ 仮説を特定 → 最小機能を特定 → チェックリストを生成
```

## 次のステップ

チェックリスト作成後：

1. チェックリスト項目を確認
2. 不足している項目があれば補完
3. PRD作成時にチェックリストを参照
4. `validate-mvp-scope`ワークフローでスコープを検証

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── hypothesis-validation-checklist.mdc

.bmad-custom/workflows/hypothesis-validation-checklist/
  ├── instructions.md
  ├── checklist-template.md
  └── README.md (このファイル)
```

## 関連ワークフロー

- **validate-mvp-scope**: PRD作成後のMVPスコープ検証
- **technical-spike**: 技術リスクの早期検証
- **performance-spike**: パフォーマンス目標の早期検証

