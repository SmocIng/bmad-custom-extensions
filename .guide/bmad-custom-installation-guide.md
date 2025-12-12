# BMad Custom Workflows インストールガイド

**作成日:** 2025-01-27  
**目的:** bmad-methodセットアップ後にbmad-custom-extensionsを導入する手順を説明

---

## 前提条件

- ✅ **bmad-methodが既にセットアップされていること**（必須）
- ✅ Gitがインストールされていること
- ✅ Node.jsとnpmがインストールされていること（インストールスクリプト用）

---

## BMad Method本体のインストール

BMad Methodがまだインストールされていない場合、以下の手順でインストールしてください。

### Step 1: BMad Methodリポジトリの確認

BMad MethodのリポジトリURLを確認します。一般的には、以下のような形式です：

```bash
# リポジトリURLの例（実際のURLに置き換えてください）
BMAD_METHOD_REPO_URL="https://github.com/your-org/bmad-method.git"
```

### Step 2: サブモジュールとして追加

```bash
# プロジェクトルートで実行
git submodule add ${BMAD_METHOD_REPO_URL} .bmad-method

# サブモジュールを初期化
git submodule update --init --recursive
```

### Step 3: BMad Methodのセットアップ

BMad MethodのREADME.mdまたはセットアップガイドに従って、セットアップを完了してください。

一般的なセットアップ手順：

```bash
# BMad Methodディレクトリに移動
cd .bmad-method

# セットアップスクリプトを実行（BMad Methodのドキュメントを参照）
# 例: npm install や setup.sh など

# プロジェクトルートに戻る
cd ..
```

### Step 4: セットアップの確認

BMad Methodが正しくセットアップされているか確認します：

```bash
# BMad Methodのワークフローファイルが存在するか確認
ls -la .cursor/rules/bmad/workflows/

# または、BMad Methodのドキュメントに記載されている確認方法を実行
```

BMad Methodのインストールが完了したら、以下の手順でBMad Custom Extensionsをインストールできます。

---

## 推奨方式: Git Submodule + インストールスクリプト

### 概要

bmad-custom-extensionsを独立したGitリポジトリとして管理し、Git Submoduleとしてプロジェクトに追加します。インストールスクリプトでワークフローを適切な場所に配置します。

### メリット

- ✅ バージョン管理が明確（特定のコミット/タグを参照）
- ✅ 更新が容易（`git submodule update`で更新可能）
- ✅ プロジェクト固有の変更と分離
- ✅ 他のプロジェクトでも同じバージョンを共有可能

---

## インストール手順

### Step 1: リポジトリの準備

bmad-custom-extensionsリポジトリが既に存在する場合、そのURLを準備します。

```bash
# リポジトリURLの例
BMAD_CUSTOM_REPO_URL="https://github.com/your-org/bmad-custom-extensions.git"
```

### Step 2: サブモジュールとして追加

```bash
# プロジェクトルートで実行
git submodule add ${BMAD_CUSTOM_REPO_URL} .bmad-custom-extensions

# サブモジュールを初期化
git submodule update --init --recursive
```

### Step 3: インストールスクリプトの実行

```bash
# インストールスクリプトを実行
cd .bmad-custom-extensions
chmod +x scripts/install.sh
./scripts/install.sh

# または、package.jsonのスクリプトを使用（後述）
npm run bmad-custom:install
```

### Step 4: 確認

```bash
# ワークフローが正しく配置されているか確認
ls -la .cursor/rules/bmad-custom/workflows/

# 以下のファイルが存在することを確認
# - validate-mvp-scope.mdc
# - hypothesis-validation-checklist.mdc
# - technical-spike.mdc
# - performance-spike.mdc
# - llm-integration-pattern-spike.mdc
# - add-story-to-epic.mdc
# - create-uat-scenario.mdc
# - execute-uat.mdc
```

---

## 更新手順

### サブモジュールの更新

```bash
# 最新の変更を取得
cd .bmad-custom-extensions
git fetch origin
git checkout <tag-or-branch>  # 例: v1.0.0 または main
cd ..

# サブモジュールの変更をコミット
git add .bmad-custom-extensions
git commit -m "Update bmad-custom-extensions to v1.0.0"
```

### ワークフローの再インストール

```bash
# インストールスクリプトを再実行
npm run bmad-custom:install
```

---

## 代替方式: 独立リポジトリ + インストールスクリプト

Git Submoduleが複雑な場合は、独立リポジトリから直接インストールする方式も選択可能です。

### インストール手順

```bash
# 1. リポジトリを一時的にクローン
git clone ${BMAD_CUSTOM_REPO_URL} /tmp/bmad-custom-extensions

# 2. インストールスクリプトを実行
cd /tmp/bmad-custom-extensions
./scripts/install.sh --target-dir $(pwd)/../../

# 3. 一時ディレクトリを削除
rm -rf /tmp/bmad-custom-extensions
```

---

## package.jsonスクリプトの追加

以下のスクリプトを`package.json`に追加することを推奨します：

```json
{
  "scripts": {
    "bmad-custom:install": "node .bmad-custom-extensions/scripts/install.js",
    "bmad-custom:update": "git submodule update --remote .bmad-custom-extensions && npm run bmad-custom:install"
  }
}
```

---

## トラブルシューティング

### 問題: サブモジュールが空のディレクトリとして表示される

**解決方法**:
```bash
git submodule update --init --recursive
```

### 問題: インストールスクリプトが権限エラーを出す

**解決方法**:
```bash
chmod +x .bmad-custom-extensions/scripts/install.sh
```

### 問題: ワークフローが認識されない

**解決方法**:
1. `.cursor/rules/bmad-custom/workflows/`ディレクトリが存在するか確認
2. `.mdc`ファイルが正しく配置されているか確認
3. Cursor/ClaudeCodeを再起動

---

## ディレクトリ構造

インストール後の構造：

```
プロジェクトルート/
├── .cursor/
│   └── rules/
│       ├── bmad/                    # bmad-method（既存）
│       └── bmad-custom/             # bmad-custom-extensions（インストール後）
│           └── workflows/
│               ├── validate-mvp-scope.mdc
│               ├── hypothesis-validation-checklist.mdc
│               ├── technical-spike.mdc
│               ├── performance-spike.mdc
│               └── llm-integration-pattern-spike.mdc
├── .bmad-custom/                    # プロジェクト固有の拡張（既存）
│   └── workflows/
│       ├── validate-mvp-scope/
│       ├── hypothesis-validation-checklist/
│       └── ...
├── .bmad-custom-extensions/         # サブモジュール（新規）
│   ├── workflows/
│   ├── scripts/
│   └── README.md
└── package.json
```

---

## 次のステップ

インストール完了後：

1. **ワークフローの確認**: 各ワークフローのREADMEを確認
2. **統合ガイドの参照**: [BMad Custom Workflows 統合ガイド](./bmad-custom-workflows-integration.md)を参照
3. **使用開始**: 最初のワークフローを実行してみる

---

## 関連ドキュメント

- [リポジトリ管理方式提案](./repository-management-proposal.md)
- [BMad Custom Workflows 統合ガイド](./bmad-custom-workflows-integration.md)
- [BMad Method拡張ワークフロー実装計画](./bmad-method-extension-plan.md)

---

**Document Revision History**

- **Version 1.0 (2025-01-27)**: 初版作成
  - インストール手順の説明
  - 更新手順の説明
  - トラブルシューティングの追加

