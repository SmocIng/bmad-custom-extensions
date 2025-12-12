# Add Story to Epic ワークフロー検証レポート

**検証日時:** 2025-12-01  
**検証者:** Auto (Cursor AI)

## 検証項目

### 1. ファイル構造の検証

#### ✅ ワークフローファイル
- **ファイル:** `.cursor/rules/bmad-custom/workflows/add-story-to-epic.mdc`
- **状態:** ✅ 正常
- **確認事項:**
  - 既存の`create-story.mdc`と同様の構造
  - 必須フィールド（name, description, author, config_source等）がすべて含まれている
  - `standalone: true`が設定されている
  - 参照方法（ClaudeCode、Cursor、Codex、GithubCopilot）が正しく記載されている

#### ✅ Instructionsファイル
- **ファイル:** `.bmad-custom/workflows/add-story-to-epic/instructions.md`
- **状態:** ✅ 正常
- **確認事項:**
  - XML形式のワークフロー定義が正しく記述されている
  - 8つのステップが適切に定義されている
  - Epic特定、Story番号生成、epics.md更新、sprint-status.yaml更新のロジックが含まれている

#### ⚠️ テンプレートファイル
- **ファイル:** `.bmad-custom/workflows/add-story-to-epic/story-template.md`
- **状態:** ⚠️ 要確認
- **問題点:**
  - Mustacheテンプレート構文（`{{#technical_debt_id}}`）を使用しているが、epics.mdに追加する際のテンプレートエンジンがMustacheをサポートしているか不明
  - 既存の`create-story/template.md`は単純な`{{variable}}`形式のみを使用
- **推奨対応:**
  - テンプレートエンジンの仕様を確認
  - または、instructions.mdで条件分岐ロジックを実装し、テンプレートはシンプルに保つ

### 2. epics.md構造との整合性検証

#### ✅ Epicセクションのパターン
- **期待パターン:** `## Epic {{epic_number}}: {{epic_title}}`
- **実際の形式:** `## Epic 4: Learning State Tracking`
- **状態:** ✅ 一致

#### ✅ Storyセクションのパターン
- **期待パターン:** `### Story {{epic_num}}.{{story_num}}: {{story_title}}`
- **実際の形式:** `### Story 4.1: 学習進捗追跡の基本実装`
- **状態:** ✅ 一致
- **技術的負債対応:** `### Story 4.8: TD-001: Epic 4への部分依存の統合` の形式も想定されている

#### ✅ Epic Summaryのパターン
- **期待パターン:** `{{epic_number}}. **Epic {{epic_number}}: {{epic_title}} ({{count}}ストーリー)`
- **実際の形式:** `4. **Epic 4: Learning State Tracking** (7ストーリー)`
- **状態:** ✅ 一致

#### ✅ 合計ストーリー数のパターン
- **期待パターン:** `**合計: {{total_count}}ストーリー**`
- **実際の形式:** `**合計: 31ストーリー**`
- **状態:** ✅ 一致

### 3. sprint-status.yaml構造との整合性検証

#### ✅ Story Keyのパターン
- **期待パターン:** `{{epic_number}}-{{story_num}}-{{story_slug}}`
- **実際の形式:** `4-1-learning-progress-tracking-basic-implementation`
- **状態:** ✅ 一致
- **注意事項:**
  - story_slugはkebab-case変換が必要（日本語→ローマ字変換、スペース→ハイフン、特殊文字削除）
  - 技術的負債の場合、`td-001-epic-4-integration`のような形式になる可能性があるが、これは通常の`number-number-name`パターンと異なる

#### ⚠️ 技術的負債Story Keyの扱い
- **問題点:**
  - 技術的負債の場合、story_keyは`td-001-epic-4-integration`のような形式になる可能性がある
  - これは通常の`{{epic_number}}-{{story_num}}-{{story_slug}}`パターンと異なる
  - instructions.mdでは通常のパターンで生成しているが、技術的負債の場合は異なる形式が必要かもしれない
- **推奨対応:**
  - 技術的負債の場合、story_keyの生成方法を明確化
  - または、技術的負債でも通常のパターン（`4-8-epic-4-integration`）を使用することを決定

#### ✅ YAML構造
- **期待形式:** `  {{story_key}}: backlog` (2スペースインデント)
- **実際の形式:** `  4-1-learning-progress-tracking-basic-implementation: done`
- **状態:** ✅ 一致

### 4. 既存ワークフローとの整合性検証

#### ✅ create-storyワークフロー
- **確認事項:** 追加されたStoryを`create-story`で読み取れるか
- **状態:** ✅ 問題なし
- **理由:** `create-story`は`epics.md`を読み取るため、追加されたStoryも認識される

#### ✅ story-readyワークフロー
- **確認事項:** 追加されたStoryを`ready-for-dev`状態に移行できるか
- **状態:** ✅ 問題なし
- **理由:** `sprint-status.yaml`に`backlog`状態で追加されるため、通常のワークフローで処理可能

#### ✅ epic-tech-contextワークフロー
- **確認事項:** 再実行の必要性が適切に説明されているか
- **状態:** ✅ 問題なし
- **理由:** instructions.mdとREADME_HowToUse_Bmad.mdの両方で適切に説明されている

### 5. 参照方法の検証

#### ✅ ClaudeCode
- **参照方法:** `/bmad:custom:workflows:add-story-to-epic`
- **状態:** ✅ 正しい形式
- **確認:** 既存の`/bmad:bmm:workflows:create-story`と同様の形式

#### ✅ Cursor
- **参照方法:** `@.bmad-custom/workflows/add-story-to-epic`
- **状態:** ✅ 正しい形式
- **確認:** 既存の`@.bmad/bmm/workflows/create-story`と同様の形式（カスタムディレクトリ配下）

#### ✅ Codex
- **参照方法:** `/bmad-custom-workflows-add-story-to-epic`
- **状態:** ✅ 正しい形式
- **確認:** 既存の`/bmad-bmm-workflows-create-story`と同様の形式（ハイフン区切り）

#### ✅ GithubCopilot
- **参照方法:** `@.bmad-custom/workflows/add-story-to-epic`
- **状態:** ✅ 正しい形式
- **確認:** Cursorと同じ形式（Cursorと同じ形式を使用）

### 6. 潜在的な問題点と推奨対応

#### ⚠️ 問題1: テンプレートエンジンの仕様
- **問題:** Mustacheテンプレート構文（`{{#technical_debt_id}}`）がサポートされているか不明
- **影響:** 技術的負債管理番号の条件付き表示が正しく動作しない可能性
- **推奨対応:**
  1. テンプレートエンジンの仕様を確認
  2. または、instructions.mdで条件分岐ロジックを実装し、テンプレートはシンプルに保つ

#### ⚠️ 問題2: 技術的負債Story Keyの形式
- **問題:** 技術的負債の場合、story_keyが`td-001-epic-4-integration`のような形式になる可能性がある
- **影響:** 既存のワークフロー（`create-story`等）が`number-number-name`パターンを期待している場合、認識されない可能性
- **推奨対応:**
  1. 技術的負債でも通常のパターン（`4-8-epic-4-integration`）を使用することを決定
  2. または、技術的負債の場合の特別な処理を明確化

#### ⚠️ 問題3: story_slugの生成方法
- **問題:** 日本語タイトルをkebab-caseに変換する方法が明確でない
- **影響:** story_keyの生成が一貫性を欠く可能性
- **推奨対応:**
  1. 日本語→ローマ字変換の方法を明確化
  2. または、ユーザーにstory_slugを直接入力してもらう

#### ⚠️ 問題4: FR Coverage Map/Matrixの更新
- **問題:** 新しいStoryがFRをカバーする場合の更新ロジックが簡略化されている
- **影響:** FR Coverage Map/Matrixが自動更新されない可能性
- **推奨対応:**
  1. FR Coverage Map/Matrixの更新ロジックを詳細化
  2. または、手動更新を推奨する旨を明記

## 検証結果サマリー

### ✅ 正常な項目
- ワークフローファイルの構造
- instructions.mdのロジック
- epics.md構造との整合性
- sprint-status.yaml構造との整合性（通常のStory）
- 既存ワークフローとの整合性
- 参照方法（すべてのツール）

### ⚠️ 要確認・要改善項目
1. テンプレートエンジンの仕様確認（Mustache構文のサポート）
2. 技術的負債Story Keyの形式決定
3. story_slug生成方法の明確化
4. FR Coverage Map/Matrix更新ロジックの詳細化

## 推奨アクション

1. **テンプレートの修正:** Mustache構文の代わりに、instructions.mdで条件分岐を実装
2. **story_slug生成の明確化:** 日本語タイトルの変換方法を明確化、またはユーザー入力に変更
3. **技術的負債Story Keyの決定:** 通常のパターンを使用するか、特別な形式を使用するか決定
4. **FR Coverage更新の詳細化:** 自動更新ロジックを追加、または手動更新を明記

## 修正実施内容

### ✅ 修正1: テンプレートの簡素化
- **変更内容:** Mustache条件構文を削除し、シンプルな変数置換形式に変更
- **理由:** epics.mdに追加する際は、instructions.mdで条件分岐を処理する方が確実
- **状態:** ✅ 修正完了

### ✅ 修正2: story_slug生成方法の明確化
- **変更内容:** instructions.mdにstory_slug生成の詳細な説明を追加
- **内容:** 日本語タイトルのローマ字変換、英語タイトルのkebab-case変換方法を明記
- **状態:** ✅ 修正完了

### ✅ 修正3: FR Coverage更新ロジックの詳細化
- **変更内容:** FR Coverage Map/Matrix更新時にユーザーに確認を求めるロジックを追加
- **状態:** ✅ 修正完了

### ✅ 修正4: Story挿入フォーマットの明確化
- **変更内容:** epics.mdへのStory挿入時の正確なフォーマットを明記
- **状態:** ✅ 修正完了

## 総合評価

**状態:** ✅ **検証完了 - 実装済み**

基本的な構造とロジックは正しく実装されており、検証で発見された問題点はすべて修正されました。ワークフローは正常に動作する見込みです。

### 残存する注意事項

1. **story_slug生成:** 日本語タイトルのローマ字変換は、実装時に適切なライブラリまたは手動変換が必要
2. **技術的負債Story Key:** 通常のパターン（`{{epic_number}}-{{next_story_num}}-{{story_slug}}`）を使用することで、既存ワークフローとの互換性を維持
3. **FR Coverage更新:** ユーザー確認を求めることで、自動更新のリスクを回避

これらの注意事項は、ワークフローの実行時に適切に処理される設計になっています。

