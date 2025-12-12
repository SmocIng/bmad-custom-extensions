# BMad Custom Workflows Extensions

BMad Methodの欠点を補完するカスタムワークフローの拡張パッケージです。

## 概要

このリポジトリには、BMad Methodの振り返りレポートとプロジェクト失敗分析から特定された問題点を解決するために実装されたカスタムワークフローが含まれています。

## 含まれるワークフロー

1. **validate-mvp-scope** - MVPスコープ検証ワークフロー
2. **hypothesis-validation-checklist** - 仮説検証チェックリストワークフロー
3. **technical-spike** - 技術プロトタイピングワークフロー
4. **performance-spike** - パフォーマンスSpikeワークフロー
5. **llm-integration-pattern-spike** - LLM統合パターン検証ワークフロー

## 前提条件

- BMad Methodが既にセットアップされていること
- Gitがインストールされていること
- Node.jsとnpmがインストールされていること（インストールスクリプト用）

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
│   ├── performance-spike/
│   └── llm-integration-pattern-spike/
├── scripts/
│   ├── install.sh
│   └── install.js
└── README.md
```

## 更新方法

```bash
# サブモジュールを更新
git submodule update --remote .bmad-custom-extensions

# ワークフローを再インストール
npm run bmad-custom:install
```

## 使用方法

各ワークフローの使用方法は、各ワークフローのREADME.mdを参照してください。

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

---

**Document Revision History**

- **Version 1.0.0 (2025-01-27)**: 初版作成
  - 5つのワークフローの実装
  - インストールスクリプトの作成
  - ドキュメントの整備
