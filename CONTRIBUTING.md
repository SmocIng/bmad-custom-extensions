# 貢献ガイドライン

BMad Custom Extensionsへの貢献をありがとうございます！このドキュメントは、プロジェクトへの貢献方法を説明します。

## 目次

- [行動規範](#行動規範)
- [貢献の種類](#貢献の種類)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [ブランチ命名規則](#ブランチ命名規則)
- [コミットメッセージの規約](#コミットメッセージの規約)
- [Pull Requestの作成](#pull-requestの作成)
- [Issueの報告](#issueの報告)
- [コードレビューのプロセス](#コードレビューのプロセス)

---

## 行動規範

このプロジェクトは、オープンで歓迎的で多様性のあるコミュニティを維持することを目指しています。すべての貢献者は、[Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/) に従うことが期待されます。

---

## 貢献の種類

以下のような貢献を歓迎します：

- 🐛 **バグ報告**: 問題を発見した場合は、Issueを作成してください
- 💡 **機能提案**: 新しいワークフローや機能のアイデアを提案してください
- 📝 **ドキュメント改善**: ドキュメントの改善や追加
- 🔧 **コード改善**: 既存のワークフローの改善や最適化
- ✨ **新規ワークフロー**: 新しいワークフローの追加

---

## 開発環境のセットアップ

### 前提条件

- Gitがインストールされていること
- Node.jsとnpmがインストールされていること
- BMad Methodがセットアップされていること

### セットアップ手順

```bash
# 1. リポジトリをフォーク
# GitHub上でフォークボタンをクリック

# 2. リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/bmad-custom-extensions.git
cd bmad-custom-extensions

# 3. リモートリポジトリを追加
git remote add upstream https://github.com/SmocIng/bmad-custom-extensions.git

# 4. 依存関係のインストール（該当する場合）
npm install
```

---

## ブランチ命名規則

新しいブランチを作成する際は、以下の命名規則に従ってください：

### 形式

```
<type>/<short-description>
```

### タイプ

| タイプ | 説明 | 例 |
|--------|------|-----|
| `feature` | 新機能の追加 | `feature/add-new-workflow` |
| `fix` | バグ修正 | `fix/workflow-error-handling` |
| `docs` | ドキュメントのみの変更 | `docs/update-readme` |
| `refactor` | リファクタリング | `refactor/workflow-structure` |
| `test` | テストの追加・修正 | `test/add-workflow-tests` |
| `chore` | ビルドプロセスやツールの変更 | `chore/update-dependencies` |
| `workflow` | ワークフローの改善 | `workflow/enhance-validation` |

### 説明部分の規則

- 小文字を使用
- ハイフン（`-`）で単語を区切る
- 簡潔で明確な説明（20文字以内を推奨）
- 動詞から始める（例: `add`, `fix`, `update`, `remove`）

### 例

```bash
# 良い例
feature/add-uat-workflow
fix/validate-mvp-scope-error
docs/update-installation-guide
workflow/enhance-technical-spike

# 悪い例
new-feature              # タイプがない
Feature/NewWorkflow      # 大文字使用、ハイフンなし
fix/bug                  # 説明が曖昧
```

---

## コミットメッセージの規約

コミットメッセージは、[Conventional Commits](https://www.conventionalcommits.org/) の規約に従ってください。

### コミットメッセージテンプレートの使用

プロジェクトにはコミットメッセージテンプレート（`.gitmessage`）が用意されています。以下のコマンドで設定できます：

```bash
# グローバル設定（すべてのリポジトリに適用）
git config --global commit.template .gitmessage

# ローカル設定（このリポジトリのみに適用）
git config commit.template .gitmessage
```

テンプレートを使用すると、コミット時にエディタにテンプレートが表示され、形式に従って記入しやすくなります。

### 形式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### タイプ

| タイプ | 説明 |
|--------|------|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `style` | コードの動作に影響しない変更（フォーマットなど） |
| `refactor` | リファクタリング |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセスやツールの変更 |
| `workflow` | ワークフローの変更 |

### スコープ（オプション）

ワークフロー名や変更対象を指定します。

例: `feat(validate-mvp-scope)`, `fix(install-script)`, `docs(readme)`

### サブジェクト

- 50文字以内
- 現在形で記述（例: "add" ではなく "adds"）
- 文末にピリオドを付けない
- 大文字で始めない

### 本文（オプション）

変更の理由や詳細を説明します。

### フッター（オプション）

関連するIssue番号を記載します。

例: `Closes #123`, `Fixes #456`

### 例

```bash
# 良い例
feat(validate-mvp-scope): add scope validation logic

Add validation to ensure MVP scope can be completed within 2 weeks.
This helps prevent scope creep and ensures focus on hypothesis validation.

Closes #42

fix(install-script): handle missing directory error

The install script now creates the target directory if it doesn't exist.

Fixes #56

docs(readme): update installation instructions

Add BMad Method installation prerequisites to the README.
```

### テンプレートファイル

- **コミットメッセージテンプレート**: `.gitmessage`
  - プロジェクトルートに配置されています
  - BMADワークフローからも参照可能です

---

## Pull Requestの作成

### 作成前の確認

1. **ブランチが最新であること**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase upstream/main
   ```

2. **テストが通ること**
   - ワークフローが正常に実行できることを確認
   - 既存のワークフローに影響がないことを確認

3. **ドキュメントが更新されていること**
   - 新規ワークフローの場合は、README.mdとUSAGE_GUIDE.mdを更新
   - 変更がある場合は、関連するドキュメントを更新

### PRの作成手順

1. **ブランチをプッシュ**
   ```bash
   git push origin your-branch
   ```

2. **GitHubでPRを作成**
   - PRテンプレート（`.github/pull_request_template.md`）に従って記入
   - 関連するIssueをリンク
   - レビュアーを指定（該当する場合）

3. **チェックリストを確認**
   - PRテンプレートのチェックリストをすべて確認

### PRテンプレート

PRテンプレートは `.github/pull_request_template.md` に配置されています。GitHubでPRを作成すると、自動的にこのテンプレートが表示されます。

BMADワークフローからPRを作成する際も、このテンプレートを参照してください。

### PRのレビュー

- レビュアーのフィードバックに対応
- 変更が必要な場合は、追加のコミットをプッシュ
- 承認後、メンテナーがマージ

---

## Issueの報告

### Issueテンプレートの使用

GitHubでIssueを作成する際は、適切なテンプレートを使用してください。テンプレートは `.github/ISSUE_TEMPLATE/` ディレクトリに配置されています。

### バグレポート

1. **既存のIssueを確認**
   - 同じ問題が既に報告されていないか確認

2. **Issueテンプレートを使用**
   - `.github/ISSUE_TEMPLATE/bug_report.md` を使用
   - GitHub上でIssueを作成すると、自動的にテンプレートが表示されます

3. **必要な情報を提供**
   - 再現手順
   - 期待される動作と実際の動作
   - 環境情報
   - エラーメッセージやログ

### 機能要望

1. **Issueテンプレートを使用**
   - `.github/ISSUE_TEMPLATE/feature_request.md` を使用
   - GitHub上でIssueを作成すると、自動的にテンプレートが表示されます

2. **詳細な説明を提供**
   - 機能の概要と動機
   - 使用例
   - 期待される効果

### 質問

1. **Issueテンプレートを使用**
   - `.github/ISSUE_TEMPLATE/question.md` を使用
   - GitHub上でIssueを作成すると、自動的にテンプレートが表示されます

2. **関連情報を提供**
   - 試したこと
   - 関連するワークフローやドキュメント

### 利用可能なテンプレート

以下のテンプレートが利用可能です：

- **バグレポート**: `.github/ISSUE_TEMPLATE/bug_report.md`
- **機能要望**: `.github/ISSUE_TEMPLATE/feature_request.md`
- **質問**: `.github/ISSUE_TEMPLATE/question.md`
- **Pull Request**: `.github/pull_request_template.md`
- **コミットメッセージ**: `.gitmessage`

BMADワークフローからIssueやPRを作成する際も、これらのテンプレートを参照してください。

---

## コードレビューのプロセス

### レビュアーとして

- 建設的なフィードバックを提供
- コードの品質、可読性、保守性を確認
- テストの適切性を確認
- ドキュメントの更新を確認

### 貢献者として

- レビュアーのフィードバックに真摯に対応
- 質問があれば積極的に質問
- 変更が必要な場合は、追加のコミットをプッシュ

---

## ワークフロー開発ガイドライン

### 新規ワークフローの追加

1. **ワークフローディレクトリの作成**
   ```
   workflows/your-workflow-name/
   ├── your-workflow-name.mdc
   ├── instructions.md
   ├── README.md
   └── template.md (該当する場合)
   ```

2. **.mdcファイルの作成**
   - 適切なメタデータを設定
   - 変数とパスの定義

3. **instructions.mdの作成**
   - ワークフローの実行手順を詳細に記載
   - 入力と出力を明確に定義

4. **README.mdの作成**
   - ワークフローの概要
   - 使用例
   - 前提条件

5. **ドキュメントの更新**
   - README.mdにワークフローを追加
   - USAGE_GUIDE.mdに使用方法を追加
   - .guide/bmad-custom-workflows-integration.mdに統合情報を追加

### 既存ワークフローの改善

1. **変更の影響範囲を確認**
   - 既存の使用方法に影響がないか
   - 破壊的変更がある場合は、バージョン管理を検討

2. **ドキュメントの更新**
   - 変更内容を反映
   - 移行ガイドが必要な場合は作成

---

## 質問やサポート

質問やサポートが必要な場合は、以下を参照してください：

- [README.md](./README.md) - プロジェクトの概要
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - 使用ガイド
- [.guide/README.md](./.guide/README.md) - 詳細なガイドドキュメント

---

## ライセンス

貢献するコードは、プロジェクトのライセンス（MIT License）の下で公開されることに同意したものとみなされます。

---

**貢献をありがとうございます！** 🎉

