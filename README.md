# BMad Custom Workflows Extensions

BMad Methodの欠点を補完するカスタムワークフローの拡張パッケージです。

## 概要

このリポジトリには、BMad Methodの振り返りレポートとプロジェクト失敗分析から特定された問題点を解決するために実装されたカスタムワークフローが含まれています。

## 含まれるワークフロー

### Phase 2: Planning（計画）フェーズ

1. **validate-mvp-scope** - MVPスコープ検証ワークフロー
2. **hypothesis-validation-checklist** - 仮説検証チェックリストワークフロー

### Phase 2.5: Technical Prototyping（技術プロトタイピング）フェーズ

3. **technical-spike** - 技術プロトタイピングワークフロー
4. **performance-spike** - パフォーマンスSpikeワークフロー
5. **llm-integration-pattern-spike** - LLM統合パターン検証ワークフロー

### Phase 3: Solutioning（ソリューション設計）フェーズ

6. **add-story-to-epic** - Epic末尾にStory追加ワークフロー

### Phase 4: Implementation（実装）フェーズ

7. **create-uat-scenario** - UATシナリオ作成ワークフロー
8. **execute-uat** - UAT自動実行ワークフロー

## 前提条件

- **BMad Methodが既にセットアップされていること**（必須）
- Gitがインストールされていること
- Node.jsとnpmがインストールされていること（インストールスクリプト用）

### BMad Method本体のインストール

BMad Methodがまだインストールされていない場合、まずBMad Method本体をインストールしてください：

```bash
# プロジェクトルートで実行
# BMad MethodをGit Submoduleとして追加
git submodule add <bmad-method-repository-url> .bmad-method

# サブモジュールを初期化
git submodule update --init --recursive

# BMad Methodのセットアップ手順に従ってセットアップを完了
# （BMad MethodのREADME.mdまたはセットアップガイドを参照）
```

BMad Methodのインストールが完了したら、以下の手順でBMad Custom Extensionsをインストールできます。

## インストール方法

### Git Submoduleとして追加

```bash
# 1. プロジェクトルートで実行
git submodule add https://github.com/SmocIng/bmad-custom-extensions.git .bmad-custom-extensions

# 2. サブモジュールを初期化
git submodule update --init --recursive

# 3. インストールスクリプトを実行
npm run bmad-custom:install
```

### package.jsonにスクリプトを追加

```json
{
  "scripts": {
    "bmad-custom:install": "node .bmad-custom-extensions/scripts/install.js",
    "bmad-custom:update": "git submodule update --remote .bmad-custom-extensions && npm run bmad-custom:install"
  }
}
```

## ディレクトリ構造

```
.bmad-custom-extensions/
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
│   ├── llm-integration-pattern-spike/
│   │   ├── llm-integration-pattern-spike.mdc
│   │   ├── instructions.md
│   │   ├── README.md
│   │   └── llm-pattern-report-template.md
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
├── scripts/
│   ├── install.sh
│   └── install.js
├── .guide/
│   ├── README.md
│   ├── bmad-custom-installation-guide.md
│   ├── bmad-custom-setup-guide.md
│   ├── bmad-custom-workflows-integration.md
│   └── [その他のガイドドキュメント]
├── README.md
└── USAGE_GUIDE.md
```

## 更新方法

```bash
# サブモジュールを更新
git submodule update --remote .bmad-custom-extensions

# ワークフローを再インストール
npm run bmad-custom:install
```

## 使用方法

### クイックスタート

詳細な使用方法は、[USAGE_GUIDE.md](./USAGE_GUIDE.md)を参照してください。

各ワークフローの個別の使用方法は、各ワークフローのREADME.mdを参照してください。

### ガイドドキュメント

詳細なセットアップ、インストール、統合方法については、[.guide/README.md](./.guide/README.md)を参照してください。

`.guide/`ディレクトリには以下のドキュメントが含まれています：
- インストール・セットアップガイド
- ワークフロー統合ガイド
- 拡張計画とレポート

### ワークフローの実行タイミング

- **Phase 2 (Planning)**: `hypothesis-validation-checklist`, `validate-mvp-scope`
- **Phase 2.5 (Technical Prototyping)**: `technical-spike`, `performance-spike`, `llm-integration-pattern-spike`
- **Phase 3 (Solutioning)**: `add-story-to-epic`
- **Phase 4 (Implementation)**: `create-uat-scenario`, `execute-uat`

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

---

**Document Revision History**

- **Version 1.1.0 (2025-01-27)**: 既存ワークフローの追加
  - add-story-to-epic、create-uat-scenario、execute-uatを追加
  - USAGE_GUIDE.mdを追加
  - README.mdを更新

- **Version 1.0.0 (2025-01-27)**: 初版作成
  - 5つのワークフローの実装
  - インストールスクリプトの作成
  - ドキュメントの整備
