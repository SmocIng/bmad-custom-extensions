# BMad Custom Workflows セットアップガイド

**作成日:** 2025-01-27  
**目的:** Git Submodule方式でbmad-custom-extensionsをセットアップする手順を説明

---

## 前提条件

- ✅ bmad-methodが既にセットアップされていること
- ✅ Gitがインストールされていること
- ✅ Node.jsとnpmがインストールされていること

---

## セットアップ手順

### Step 1: リポジトリの作成

まず、bmad-custom-extensions用のGitリポジトリを作成します。

#### GitHubでリポジトリを作成する場合

1. GitHubで新しいリポジトリを作成
   - リポジトリ名: `bmad-custom-extensions`
   - 説明: "BMad Method拡張ワークフロー"
   - 公開/非公開: 任意

2. リポジトリURLを記録
   ```bash
   BMAD_CUSTOM_REPO_URL="https://github.com/your-org/bmad-custom-extensions.git"
   ```

#### 既存のリポジトリを使用する場合

既にリポジトリが存在する場合は、そのURLを使用します。

---

### Step 2: ワークフローファイルの準備

現在のプロジェクトからワークフローファイルをリポジトリにコピーします。

```bash
# 1. リポジトリをクローン（新規作成の場合）
git clone ${BMAD_CUSTOM_REPO_URL} /tmp/bmad-custom-extensions
cd /tmp/bmad-custom-extensions

# 2. ワークフローファイルをコピー
# .cursor/rules/bmad-custom/workflows/ から .mdcファイルをコピー
# .bmad-custom/workflows/ から実装ディレクトリをコピー

# 3. コミットとプッシュ
git add .
git commit -m "Initial commit: Add BMad Custom Workflows"
git push origin main
```

---

### Step 3: サブモジュールとして追加

プロジェクトにサブモジュールとして追加します。

```bash
# プロジェクトルートで実行
cd /path/to/your/project

# サブモジュールとして追加
git submodule add ${BMAD_CUSTOM_REPO_URL} .bmad-custom-extensions

# サブモジュールを初期化
git submodule update --init --recursive
```

---

### Step 4: インストールスクリプトの実行

ワークフローを適切な場所にインストールします。

```bash
# 方法1: シェルスクリプトを使用
cd .bmad-custom-extensions
./scripts/install.sh

# 方法2: Node.jsスクリプトを使用（推奨）
npm run bmad-custom:install
```

---

### Step 5: 確認

インストールが正しく完了したか確認します。

```bash
# ワークフローファイルの確認
ls -la .cursor/rules/bmad-custom/workflows/

# 以下のファイルが存在することを確認
# - validate-mvp-scope.mdc
# - hypothesis-validation-checklist.mdc
# - technical-spike.mdc
# - performance-spike.mdc
# - llm-integration-pattern-spike.mdc

# 実装ディレクトリの確認
ls -la .bmad-custom/workflows/

# 各ワークフローのディレクトリが存在することを確認
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

### 一括更新（package.jsonスクリプトを使用）

```bash
# サブモジュールを更新して再インストール
npm run bmad-custom:update
```

---

## 初回クローン時のセットアップ

他の開発者がプロジェクトをクローンした場合：

```bash
# 1. プロジェクトをクローン
git clone <project-url> your-project
cd your-project

# 2. サブモジュールを初期化
git submodule update --init --recursive

# 3. ワークフローをインストール
npm run bmad-custom:install
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
chmod +x .bmad-custom-extensions/scripts/install.js
```

### 問題: ワークフローが認識されない

**解決方法**:
1. `.cursor/rules/bmad-custom/workflows/`ディレクトリが存在するか確認
2. `.mdc`ファイルが正しく配置されているか確認
3. Cursor/ClaudeCodeを再起動

### 問題: サブモジュールの更新が反映されない

**解決方法**:
```bash
# サブモジュールを強制的に更新
git submodule update --remote --force .bmad-custom-extensions
npm run bmad-custom:install
```

---

## ディレクトリ構造

セットアップ後の構造：

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
│   │   ├── install.sh
│   │   └── install.js
│   └── README.md
├── .gitmodules                      # サブモジュール設定（自動生成）
└── package.json
```

---

## バージョン管理

### タグの使用

リポジトリでタグを使用してバージョンを管理することを推奨します。

```bash
# リポジトリでタグを作成
cd .bmad-custom-extensions
git tag -a v1.0.0 -m "Version 1.0.0: Initial release"
git push origin v1.0.0

# 特定のバージョンを使用
git checkout v1.0.0
cd ..
git add .bmad-custom-extensions
git commit -m "Pin bmad-custom-extensions to v1.0.0"
```

### ブランチの使用

開発中の場合はブランチを使用します。

```bash
# 特定のブランチを使用
cd .bmad-custom-extensions
git checkout develop
cd ..
git add .bmad-custom-extensions
git commit -m "Use develop branch of bmad-custom-extensions"
```

---

## 次のステップ

セットアップ完了後：

1. **ワークフローの確認**: 各ワークフローのREADMEを確認
2. **統合ガイドの参照**: [BMad Custom Workflows 統合ガイド](./bmad-custom-workflows-integration.md)を参照
3. **使用開始**: 最初のワークフローを実行してみる

---

## 関連ドキュメント

- [リポジトリ管理方式提案](../reports/repository-management-proposal.md)
- [BMad Custom Workflows 統合ガイド](./bmad-custom-workflows-integration.md)
- [BMad Custom Workflows インストールガイド](./bmad-custom-installation-guide.md)
- [BMad Method拡張ワークフロー実装計画](../reports/bmad-method-extension-plan.md)

---

**Document Revision History**

- **Version 1.0 (2025-01-27)**: 初版作成
  - Git Submodule方式のセットアップ手順
  - 更新手順の説明
  - トラブルシューティングの追加

