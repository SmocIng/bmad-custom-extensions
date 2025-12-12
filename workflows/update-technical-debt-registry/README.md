# Update Technical Debt Registry Workflow

技術的負債レジストリを更新するワークフローです。retrospectiveワークフロー実行後、技術的負債を一元管理するレジストリに反映します。

## 概要

このワークフローは、Epic Retrospectiveドキュメントから技術的負債を抽出し、一元管理されている技術的負債レジストリ（`docs/technical-debt-registry.md`）を更新します。また、Retrospectiveドキュメントの技術的負債セクションを参照形式に更新します。

## 実行タイミング

- **タイミング**: `@.bmad/bmm/workflows/retrospective`ワークフロー実行後
- **必須度**: 推奨（技術的負債がある場合）

## 前提条件

- Retrospectiveワークフローが実行済みであること
- Retrospectiveドキュメントが存在すること
- 技術的負債レジストリ（`docs/technical-debt-registry.md`）が存在すること

## 実行方法

### Cursor

```bash
@.bmad-custom/workflows/update-technical-debt-registry
```

### ClaudeCode

```bash
/bmad:custom:workflows:update-technical-debt-registry
```

### Codex

```bash
/bmad-custom-workflows-update-technical-debt-registry
```

## 入力

ワークフロー実行時に以下を入力します：

1. **retrospective_file** (必須): Retrospectiveドキュメントのパス
   - 例: `docs/sprint-artifacts/epic-4-retrospective.md`

2. **epic_number** (必須): Epic番号
   - 例: `4`

3. 各技術的負債について：
   - **td_name**: 技術的負債名
   - **td_description**: 詳細な説明
   - **td_impact**: 影響
   - **td_priority**: 優先度（高/中/低）
   - **td_action_plan**: 対応計画
   - **td_deadline**: 対応期限（オプション）
   - **td_stories**: 関連するStory（オプション）

## 成果物

### 1. 技術的負債レジストリの更新

`docs/technical-debt-registry.md`が更新されます：

- 新しい技術的負債エントリが追加される
- TD-XXX形式のIDが自動付与される
- 優先度別セクションに配置される
- サマリーセクションが更新される

### 2. Retrospectiveドキュメントの更新

Retrospectiveドキュメントの技術的負債セクションが更新されます：

- 技術的負債レジストリへの参照が追加される
- 要約のみが残される
- 各技術的負債にTD-XXX形式のIDが付与される
- レジストリへの直接リンクが追加される

## 優先度の判定基準

### 高
- 次のEpic開始前に解決が必要
- 実装の進行に影響を与える可能性がある

### 中
- 次のEpic開始前または完了後に解決推奨
- 実装の進行に軽微な影響を与える可能性がある

### 低
- Phase 2以降で対応可能
- 現在の実装には影響しない

## 使用例

### 例1: Epic 4のRetrospective後

```bash
# Cursor
@.bmad-custom/workflows/update-technical-debt-registry

# プロンプト例:
# Epic 4のRetrospectiveが完了しました。
# Retrospectiveファイル: docs/sprint-artifacts/epic-4-retrospective.md
# Epic番号: 4
```

### 例2: 技術的負債が複数ある場合

ワークフローは各技術的負債について順次処理します：

1. 最初の技術的負債の情報を入力
2. 次の技術的負債の情報を入力
3. すべての技術的負債が処理されるまで繰り返し

## 注意事項

1. **一元管理の重要性**
   - 技術的負債レジストリが唯一の正式な記録場所
   - Retrospectiveドキュメントには要約のみを記録
   - 詳細は必ずレジストリに記録

2. **TD IDの自動付与**
   - ワークフローが自動的に次のTD IDを割り当てます
   - 既存のTD IDと重複しないように注意

3. **優先度の判定**
   - 優先度の判定基準を参照して適切に設定してください
   - 不明な場合は、ワークフローが判定基準を提示します

4. **更新のタイミング**
   - 各Epicのretrospective完了時に実行
   - 技術的負債が解決された際に手動で更新

## 関連ドキュメント

- [技術的負債レジストリ](../../../../docs/technical-debt-registry.md)
- [Retrospectiveワークフロー拡張](../../../../.bmad-custom/retrospective-workflow-extension.md)

---

**Document Revision History**

- **Version 1.0.0 (2025-01-27)**: 初版作成
  - Retrospectiveワークフロー拡張を完全なワークフローとして実装
  - 技術的負債レジストリの自動更新機能
  - Retrospectiveドキュメントの参照形式への自動変換

