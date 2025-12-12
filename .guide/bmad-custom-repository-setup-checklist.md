# BMad Custom Extensions リポジトリセットアップチェックリスト

**作成日:** 2025-01-27  
**目的:** Git Submodule方式でリポジトリをセットアップする際のチェックリスト

---

## セットアップ前の準備

### ✅ ワークフローファイルの確認

- [ ] `.cursor/rules/bmad-custom/workflows/`に8つの`.mdc`ファイルが存在する
  - [ ] `validate-mvp-scope.mdc`
  - [ ] `hypothesis-validation-checklist.mdc`
  - [ ] `technical-spike.mdc`
  - [ ] `performance-spike.mdc`
  - [ ] `llm-integration-pattern-spike.mdc`
  - [ ] `add-story-to-epic.mdc`
  - [ ] `create-uat-scenario.mdc`
  - [ ] `execute-uat.mdc`

- [ ] `.bmad-custom/workflows/`に8つの実装ディレクトリが存在する
  - [ ] `validate-mvp-scope/`
  - [ ] `hypothesis-validation-checklist/`
  - [ ] `technical-spike/`
  - [ ] `performance-spike/`
  - [ ] `llm-integration-pattern-spike/`
  - [ ] `add-story-to-epic/`
  - [ ] `create-uat-scenario/`
  - [ ] `execute-uat/`

### ✅ インストールスクリプトの確認

- [ ] `.bmad-custom-extensions/scripts/install.sh`が存在する
- [ ] `.bmad-custom-extensions/scripts/install.js`が存在する
- [ ] スクリプトに実行権限が付与されている

### ✅ ドキュメントの確認

- [ ] `.bmad-custom-extensions/README.md`が存在する
- [ ] `.bmad-custom-extensions/.gitignore`が存在する

---

## リポジトリ作成手順

### Step 1: リポジトリの初期化

- [ ] `.bmad-custom-extensions`ディレクトリで`git init`を実行
- [ ] すべてのファイルをステージング
- [ ] 初回コミットを作成

### Step 2: リモートリポジトリの作成

- [ ] GitHub/GitLabなどで新規リポジトリを作成
- [ ] リポジトリ名: `bmad-custom-extensions`
- [ ] リポジトリURLを記録

### Step 3: リモートの追加とプッシュ

- [ ] `git remote add origin <repository-url>`を実行
- [ ] `git branch -M main`を実行
- [ ] `git push -u origin main`を実行

### Step 4: タグの作成（オプション）

- [ ] 初回リリース用のタグを作成: `v1.0.0`
- [ ] タグをプッシュ

---

## プロジェクトへの統合

### Step 1: 既存ディレクトリの処理

- [ ] プロジェクト内の`.bmad-custom-extensions`を削除（リポジトリ作成後）
- [ ] または、別の場所にバックアップ

### Step 2: サブモジュールとして追加

- [ ] `git submodule add <repository-url> .bmad-custom-extensions`を実行
- [ ] `.gitmodules`ファイルが作成されたことを確認

### Step 3: インストールスクリプトの実行

- [ ] `npm run bmad-custom:install`を実行
- [ ] ワークフローファイルが正しくコピーされたことを確認

### Step 4: 確認

- [ ] `.cursor/rules/bmad-custom/workflows/`に`.mdc`ファイルが存在する
- [ ] `.bmad-custom/workflows/`に実装ディレクトリが存在する
- [ ] Cursor/ClaudeCodeでワークフローが認識される

---

## コミットとプッシュ

- [ ] `.gitmodules`をコミット
- [ ] `.bmad-custom-extensions`をコミット
- [ ] `package.json`の変更をコミット（スクリプト追加）
- [ ] すべての変更をプッシュ

---

## ドキュメントの更新

- [ ] セットアップガイドを参照して手順を確認
- [ ] 問題があればトラブルシューティングを参照
- [ ] セットアップ完了を記録

---

## 次のステップ

- [ ] ワークフローの動作確認
- [ ] 他の開発者への共有
- [ ] 使用開始

---

**Document Revision History**

- **Version 1.1.0 (2025-01-27)**: ワークフロー数を更新
  - ワークフロー数を5つから8つに更新
  - 新しいワークフロー（add-story-to-epic、create-uat-scenario、execute-uat）を追加
- **Version 1.0.0 (2025-01-27)**: 初版作成
  - セットアップチェックリストの作成
  - 各ステップの確認項目をリスト化

