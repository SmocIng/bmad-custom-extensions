# Validate MVP Scope ワークフロー

## 概要

PRD作成後、MVPスコープが適切か検証するワークフローです。MVPが2週間で実装可能か、仮説を3つ以下の機能で検証できるか、ユーザーテストで検証可能かを確認します。

## 使用目的

- PRD作成後のMVPスコープ検証
- スコープ過大の早期発見と防止
- 仮説検証マインドセットの促進
- 実装時間の現実的な見積もり

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:validate-mvp-scope
```

### Cursor
```
@.bmad-custom/workflows/validate-mvp-scope
```

### Codex
```
/bmad-custom-workflows-validate-mvp-scope
```

### GithubCopilot
```
@.bmad-custom/workflows/validate-mvp-scope
```

## 機能

1. **MVPスコープ情報の抽出**: PRDから機能要件と非機能要件を抽出
2. **仮説の特定**: 検証したい仮説を特定
3. **実装時間検証**: MVPが2週間で実装可能か検証
4. **仮説検証チェック**: 仮説を3つ以下の機能で検証できるか確認
5. **第一原理検証**: より簡単な方法で第一原理を検証できるか確認
6. **ユーザーテスト検証**: ユーザーテストで検証可能か確認
7. **検証レポート生成**: 検証結果をレポートとして出力

## 入力

- **PRDファイル** (必須): `{output_folder}/prd.md`
- **Product Briefファイル** (オプション): `{output_folder}/product-brief-*.md`
- **仮説検証チェックリスト** (オプション): `{output_folder}/hypothesis-validation-checklist.md`
- **検証対象仮説** (必須): ユーザーから取得

## 出力

- `{output_folder}/mvp-scope-validation-report.md`: MVPスコープ検証レポート

## 検証項目

1. **実装時間検証**
   - MVPスコープが2週間（10営業日）で実装可能か
   - 機能別の時間見積もり
   - スコープ削減の提案

2. **仮説検証チェック**
   - 仮説を3つ以下の機能で検証できるか
   - 各仮説に必要な最小機能の特定
   - より簡単な検証方法の提案

3. **第一原理検証**
   - 第一原理をより簡単な方法で検証できるか
   - 不要な複雑性の特定
   - 簡易検証アプローチの提案

4. **ユーザーテスト検証**
   - ユーザーテストで検証可能か
   - ユーザーテストシナリオの作成
   - 最小機能セットの特定

## 検証結果

検証結果は以下の3つのステータスで評価されます：

- **PASS**: MVPスコープは適切。Phase 3（Solutioning）に進むことが推奨されます。
- **CONCERN**: 一部の検証項目で懸念があります。推奨事項を確認し、必要に応じてスコープを調整してください。
- **FAIL**: MVPスコープが過大です。スコープ削減が必要です。Phase 3に進む前にスコープを調整してください。

## タイミング

- **実行タイミング**: Phase 2（Planning）の後、Phase 3（Solutioning）の前
- **前提条件**: PRDが作成されていること

## 使用例

### PRD作成後のMVPスコープ検証

```
PRD作成後、MVPスコープが適切か検証したい
→ PRDを読み込み → 仮説を特定 → 各検証項目をチェック → 検証レポートを生成
```

## 次のステップ

検証結果に応じて：

- **PASS**: Phase 3（Solutioning）に進む
- **CONCERN**: 推奨事項を確認し、必要に応じてスコープを調整してからPhase 3に進む
- **FAIL**: スコープを削減し、再度検証するか、PRDを更新する

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── validate-mvp-scope.mdc

.bmad-custom/workflows/validate-mvp-scope/
  ├── instructions.md
  ├── validation-report-template.md
  └── README.md (このファイル)
```

## 関連ワークフロー

- **hypothesis-validation-checklist**: DiscoveryフェーズまたはPlanning開始時に実行
- **technical-spike**: 技術リスクの早期検証
- **performance-spike**: パフォーマンス目標の早期検証

