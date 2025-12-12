# Add Story to Epic ワークフロー

## 概要

`create-epics-and-stories` ワークフロー実施後に、完了したEpicまたは実施中のEpicの末尾に新しいStoryを追加するワークフローです。

## 使用目的

- 要件変更が発生した場合のStory追加
- 技術的負債対応のStory追加
- バグ修正や改善のためのStory追加
- 完了したEpicへの後続Story追加

## 参照方法

### ClaudeCode
```
/bmad:custom:workflows:add-story-to-epic
```

### Cursor
```
@.bmad-custom/workflows/add-story-to-epic
```

### Codex
```
/bmad-custom-workflows-add-story-to-epic
```

### GithubCopilot
```
@.bmad-custom/workflows/add-story-to-epic
```

## 機能

1. **Epic特定**: 指定されたEpic番号でepics.mdからEpicを検索
2. **Story番号生成**: Epic内の最後のStory番号を取得し、次の番号を自動生成
3. **epics.md更新**: 
   - Epicセクションの末尾に新しいStoryを追加
   - Epic Summaryのストーリー数を更新
   - 合計ストーリー数を更新
   - FR Coverage Map/Matrixを更新（必要に応じて）
4. **sprint-status.yaml更新**: 新しいStoryを`backlog`状態で追加
5. **tech-spec-epic-*.md自動更新** (Epicが`contexted`状態の場合):
   - `tech-spec-epic-{epic_number}.md`が存在する場合、自動的に更新
   - Objectives and ScopeセクションのIn Scopeリストに追加
   - Workflows and Sequencingセクションにワークフローを追加
   - Acceptance Criteriaセクションに受入基準を追加
   - Traceability Mappingセクションにトレーサビリティマッピングを追加（存在する場合）
   - Document Revision Historyセクションを更新（存在する場合）
6. **技術的負債対応**: 技術的負債管理番号（TD-XXX）が指定されている場合、Story名の頭に管理番号を付与

## 入力

- **Epic番号** (必須): 追加先のEpic番号（例: "4"）
- **Story追加の理由** (必須): "technical debt", "requirement change", "bug fix" など
- **技術的負債管理番号** (オプション): 技術的負債の場合、TD-XXX形式（例: "TD-001"）
- **Storyタイトル** (必須)
- **ユーザーストーリー**: role, action, benefit
- **受入基準** (必須)
- **前提条件** (オプション)
- **技術ノート** (オプション)

## 出力

- `epics.md`: 新しいStoryが追加される
- `sprint-status.yaml`: 新しいStoryが`backlog`状態で追加される
- `tech-spec-epic-{epic_number}.md`: Epicが`contexted`状態でファイルが存在する場合、自動的に更新される

## 注意事項

### tech-spec-epic-*.mdの自動更新

- Epicが`contexted`状態で`tech-spec-epic-{epic_number}.md`が存在する場合、自動的に更新されます
- Epicが`backlog`状態の場合、tech-spec更新はスキップされます（`epic-tech-context`ワークフローを先に実行してください）
- tech-specファイルが存在しない場合、更新はスキップされます（`epic-tech-context`ワークフローで作成されます）

### epic-tech-contextの再実行

追加されたStoryが技術的に重要な場合（新しい技術スタック、アーキテクチャ変更など）、`epic-tech-context`の再実行を検討してください。

- **再実行が必要な場合**: 新しい技術スタック、アーキテクチャ変更など
- **再実行不要な場合**: 技術的負債対応など、既存の技術仕様で十分な場合（自動更新で対応済み）

### validate-epic-tech-contextの再実行

`epic-tech-context`を再実行した場合、`validate-epic-tech-context`の再実行も推奨します。

## 使用例

### 技術的負債対応のStory追加

```
Epic 4に技術的負債対応のStoryを追加したい（Epic 4は完了済み、TD-001）
→ Epic 4を特定 → 最後のStory番号(4.7)を取得 → 4.8を生成 → Story名に"TD-001:"を追加
```

### 要件変更対応のStory追加

```
Epic 6に新しい機能要件のStoryを追加したい
→ Epic 6を特定 → 最後のStory番号(6.4)を取得 → 6.5を生成
```

## ファイル構成

```
.cursor/rules/bmad-custom/workflows/
  └── add-story-to-epic.mdc

.bmad-custom/workflows/add-story-to-epic/
  ├── instructions.md
  ├── story-template.md
  ├── VERIFICATION_REPORT.md
  ├── VERIFICATION_SUMMARY.md
  └── README.md (このファイル)
```

## 検証結果

詳細は `VERIFICATION_REPORT.md` および `VERIFICATION_SUMMARY.md` を参照してください。

**検証状態:** ✅ **検証完了 - 実装済み**

すべての検証項目が完了し、問題点は修正されました。ワークフローは使用可能な状態です。



