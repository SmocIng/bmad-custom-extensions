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

### ✅ 実装完了したドキュメント

1. **README_HowToUse_Bmad.md** - 新しいワークフローの説明を追加
2. **docs/guides/bmad-custom-workflows-integration.md** - ワークフロー統合ガイド
3. **docs/reports/workflow-verification-report.md** - ワークフロー検証レポート

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

詳細は [ワークフロー検証レポート](./workflow-verification-report.md) を参照してください。

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
├── README.md
└── LICENSE
```

**理由**:
- 他のプロジェクトでも再利用可能
- バージョン管理が明確
- プロジェクト固有の設定と分離

### プロジェクト固有のファイル

以下のファイルはプロジェクト固有として残す：

- `docs/guides/bmad-custom-workflows-integration.md` - プロジェクト固有の統合ガイド
- `docs/reports/bmad-method-retrospective-2025-12-07.md` - プロジェクト固有の振り返り
- `docs/reports/project-failure-analysis-2025-12-07.md` - プロジェクト固有の失敗分析
- `docs/reports/bmad-method-extension-plan.md` - 本計画書

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

- [BMad Method 振り返りレポート](./bmad-method-retrospective-2025-12-07.md)
- [プロジェクト失敗分析レポート](./project-failure-analysis-2025-12-07.md)
- [BMadフルワークフロー完全ガイド](../README_HowToUse_Bmad.md)
- [ワークフロー統合ガイド](../guides/bmad-custom-workflows-integration.md)
- [ワークフロー検証レポート](./workflow-verification-report.md)

---

**Document Revision History**

- **Version 1.1 (2025-01-27)**: 検証完了状況を追加
  - ワークフロー検証レポートへの参照を追加
  - 検証完了状況セクションを追加
- **Version 1.0 (2025-01-27)**: 初版作成
  - 実装計画の作成
  - リポジトリ管理方法の決定
  - 次のステップの提示

