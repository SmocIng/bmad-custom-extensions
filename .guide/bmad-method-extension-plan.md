# BMad Method拡張ワークフロー実装計画

**作成日:** 2025-01-27  
**目的:** BMad Methodの欠点を補完するカスタムワークフローの実装計画

---

## 実装完了状況

### ✅ 実装完了したワークフロー

1. **validate-mvp-scope** - MVPスコープ検証ワークフロー
2. **hypothesis-validation-checklist** - 仮説検証チェックリストワークフロー
3. **technical-spike** - 技術プロトタイピングワークフロー
4. **performance-spike** - パフォーマンスSpikeワークフロー
5. **llm-integration-pattern-spike** - LLM統合パターン検証ワークフロー
6. **add-story-to-epic** - Epic末尾にStory追加ワークフロー
7. **create-uat-scenario** - UATシナリオ作成ワークフロー
8. **execute-uat** - UAT自動実行ワークフロー

### ✅ 実装完了したドキュメント

1. **README.md** - リポジトリの説明
2. **USAGE_GUIDE.md** - ワークフロー使用ガイド
3. **.guide/bmad-custom-workflows-integration.md** - ワークフロー統合ガイド
4. **.guide/bmad-custom-installation-guide.md** - インストールガイド
5. **.guide/bmad-custom-setup-guide.md** - セットアップガイド

### ✅ 検証完了状況

**検証日:** 2025-01-27

すべてのワークフローが正常に実装され、既存のワークフローパターンと整合性が取れていることを確認しました。

**検証結果:**
- ✅ ファイル構造の確認
- ✅ .mdcファイルの検証
- ✅ instructions.mdの検証
- ✅ README.mdの検証
- ✅ テンプレートファイルの検証
- ✅ 一貫性チェック
- ✅ 既存ワークフローとの整合性確認

すべてのワークフローが正常に実装され、既存のワークフローパターンと整合性が取れていることを確認しました。

---

## リポジトリ管理

### リポジトリ管理が必要なファイル

以下のファイルは別リポジトリ（BMad拡張リポジトリ）で管理することを推奨：

#### ワークフロー定義ファイル

- `.cursor/rules/bmad-custom/workflows/validate-mvp-scope.mdc`
- `.cursor/rules/bmad-custom/workflows/hypothesis-validation-checklist.mdc`
- `.cursor/rules/bmad-custom/workflows/technical-spike.mdc`
- `.cursor/rules/bmad-custom/workflows/performance-spike.mdc`
- `.cursor/rules/bmad-custom/workflows/llm-integration-pattern-spike.mdc`

#### ワークフロー実装ファイル

- `.bmad-custom/workflows/validate-mvp-scope/`
  - `instructions.md`
  - `README.md`
  - `validation-report-template.md`
- `.bmad-custom/workflows/hypothesis-validation-checklist/`
  - `instructions.md`
  - `README.md`
  - `checklist-template.md`
- `.bmad-custom/workflows/technical-spike/`
  - `instructions.md`
  - `README.md`
  - `spike-report-template.md`
- `.bmad-custom/workflows/performance-spike/`
  - `instructions.md`
  - `README.md`
  - `performance-report-template.md`
- `.bmad-custom/workflows/llm-integration-pattern-spike/`
  - `instructions.md`
  - `README.md`
  - `llm-pattern-report-template.md`

### リポジトリ管理方法

**推奨: 独立したGitリポジトリ**

```
bmad-custom-extensions/
├── workflows/
│   ├── validate-mvp-scope/
│   │   ├── validate-mvp-scope.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── validation-report-template.md
│   ├── hypothesis-validation-checklist/
│   │   ├── hypothesis-validation-checklist.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── checklist-template.md
│   ├── technical-spike/
│   │   ├── technical-spike.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── spike-report-template.md
│   ├── performance-spike/
│   │   ├── performance-spike.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── performance-report-template.md
│   └── llm-integration-pattern-spike/
│       ├── llm-integration-pattern-spike.mdc
│       ├── instructions.md
│       ├── README.md
│       └── llm-pattern-report-template.md
│   ├── add-story-to-epic/
│   │   ├── add-story-to-epic.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── story-template.md
│   ├── create-uat-scenario/
│   │   ├── create-uat-scenario.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   ├── uat-plan-template.md
│   │   └── verification-scenario-template.md
│   └── execute-uat/
│       ├── execute-uat.mdc
│       ├── instructions.md
│       ├── README.md
│       └── uat-results-template.md
├── README.md
└── LICENSE
```

**理由**:
- 他のプロジェクトでも再利用可能
- バージョン管理が明確
- プロジェクト固有の設定と分離

### プロジェクト固有のファイル

以下のファイルはプロジェクト固有として残す：

- `.guide/bmad-custom-workflows-integration.md` - ワークフロー統合ガイド
- `.guide/bmad-method-extension-plan.md` - 本計画書

---

## 次のステップ

### 短期（次スプリント）

1. **ワークフローのテスト**: 各ワークフローを実際に実行してテスト
2. **ドキュメントの改善**: 使用例やトラブルシューティングを追加
3. **フィードバックの収集**: 実際の使用経験からフィードバックを収集

### 中期（Phase 2 計画時）

1. **リポジトリのセットアップ**: 独立したGitリポジトリを作成
2. **バージョン管理**: ワークフローのバージョン管理を開始
3. **他のプロジェクトでの使用**: 他のプロジェクトでワークフローを試用

### 長期（次プロジェクト）

1. **継続的改善**: 使用経験を基にワークフローを改善
2. **標準化**: ワークフローをBMad Methodの標準として提案
3. **コミュニティへの貢献**: オープンソースとして公開を検討

---

## 参照ドキュメント

- [BMad Custom Workflows 統合ガイド](./bmad-custom-workflows-integration.md)
- [BMad Custom Workflows 使用ガイド](../USAGE_GUIDE.md)
- [BMad Custom Workflows インストールガイド](./bmad-custom-installation-guide.md)

---

**Document Revision History**

- **Version 1.2.0 (2025-01-27)**: ワークフロー追加
  - add-story-to-epic、create-uat-scenario、execute-uatを追加
  - ワークフロー数を5つから8つに更新
  - ドキュメント参照パスを修正
- **Version 1.1.0 (2025-01-27)**: 検証完了状況を追加
  - 検証完了状況セクションを追加
- **Version 1.0.0 (2025-01-27)**: 初版作成
  - 実装計画の作成
  - リポジトリ管理方法の決定
  - 次のステップの提示

