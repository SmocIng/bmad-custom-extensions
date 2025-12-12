# BMad Custom Extensions セットアップ手順

このディレクトリは、Git Submoduleとして管理されるリポジトリです。

## リポジトリ情報

- **GitHub URL**: https://github.com/SmocIng/bmad-custom-extensions
- **バージョン**: v1.0.0

## 前提条件

BMad Custom Extensionsをインストールする前に、**BMad Method本体**が既にセットアップされている必要があります。

### BMad Method本体のインストール

BMad Methodがまだインストールされていない場合、以下の手順でインストールしてください：

```bash
# 1. プロジェクトルートで実行
# BMad MethodをGit Submoduleとして追加
git submodule add https://github.com/your-org/bmad-method.git .bmad-method

# 2. サブモジュールを初期化
git submodule update --init --recursive

# 3. BMad Methodのセットアップ手順に従ってセットアップを完了
# （BMad MethodのREADME.mdまたはセットアップガイドを参照）
```

**注意**: BMad MethodのリポジトリURLは、実際のリポジトリURLに置き換えてください。

BMad Methodのインストールが完了したら、以下の手順でBMad Custom Extensionsをインストールできます。

## プロジェクトへの統合手順

### Step 1: サブモジュールとして追加

```bash
# プロジェクトルートで実行
git submodule add https://github.com/SmocIng/bmad-custom-extensions.git .bmad-custom-extensions
```

### Step 2: インストールスクリプトを実行

```bash
npm run bmad-custom:install
```

### Step 3: 確認

```bash
# ワークフローファイルの確認
ls -la .cursor/rules/bmad-custom/workflows/

# 実装ディレクトリの確認
ls -la .bmad-custom/workflows/
```

## 更新手順

```bash
# サブモジュールを更新
git submodule update --remote .bmad-custom-extensions

# ワークフローを再インストール
npm run bmad-custom:install
```

## 注意事項

- リポジトリ作成後、このディレクトリはサブモジュールとして管理されます
- ワークフローファイルは、インストールスクリプトで自動的に配置されます
