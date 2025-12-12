# BMad Custom Workflows リポジトリ管理方式提案

**作成日:** 2025-01-27  
**目的:** bmad-methodセットアップ後に導入するbmad-customのリポジトリ管理方式を決定

---

## 要件

1. **bmad-methodをセットアップした後に導入**: bmad-methodが既にインストールされている前提
2. **拡張として機能**: bmad-methodの機能を拡張する形で動作
3. **他のプロジェクトでも再利用可能**: 複数のプロジェクトで使用できる
4. **バージョン管理**: ワークフローの更新を管理できる
5. **簡単な導入**: セットアップが容易

---

## 方式の比較

### 方式1: Git Submodule（推奨）⭐

**概要**: bmad-custom-extensionsを独立したGitリポジトリとして管理し、プロジェクトにサブモジュールとして追加

**メリット**:
- ✅ バージョン管理が明確（特定のコミット/タグを参照）
- ✅ 更新が容易（`git submodule update`で更新可能）
- ✅ プロジェクト固有の変更と分離
- ✅ 他のプロジェクトでも同じバージョンを共有可能
- ✅ Git標準機能で管理が容易

**デメリット**:
- ⚠️ サブモジュールの概念を理解する必要がある
- ⚠️ 初回クローン時に追加の手順が必要

**セットアップ手順**:
```bash
# 1. bmad-methodが既にセットアップされている前提
# 2. bmad-custom-extensionsリポジトリをサブモジュールとして追加
git submodule add <repository-url> .bmad-custom-extensions

# 3. ワークフローを適切な場所にコピー/リンク
# （インストールスクリプトで自動化）
npm run bmad-custom:install
```

**推奨度**: ⭐⭐⭐⭐⭐

---

### 方式2: 独立リポジトリ + インストールスクリプト

**概要**: bmad-custom-extensionsを独立したGitリポジトリとして管理し、インストールスクリプトでコピー

**メリット**:
- ✅ バージョン管理が明確
- ✅ プロジェクト固有の変更と分離
- ✅ サブモジュールの概念が不要
- ✅ 任意のプロジェクトで使用可能

**デメリット**:
- ⚠️ 更新時に手動で再インストールが必要
- ⚠️ プロジェクト内にコピーされるため、変更が混在する可能性

**セットアップ手順**:
```bash
# 1. bmad-methodが既にセットアップされている前提
# 2. bmad-custom-extensionsをクローン
git clone <repository-url> /tmp/bmad-custom-extensions

# 3. インストールスクリプトを実行
npm run bmad-custom:install -- --source /tmp/bmad-custom-extensions
```

**推奨度**: ⭐⭐⭐⭐

---

### 方式3: NPMパッケージ

**概要**: bmad-custom-extensionsをNPMパッケージとして公開し、`npm install`で導入

**メリット**:
- ✅ 標準的なパッケージ管理
- ✅ バージョン管理が容易（semver）
- ✅ 依存関係の管理が自動

**デメリット**:
- ⚠️ Node.jsプロジェクトに限定される
- ⚠️ NPMレジストリへの公開が必要
- ⚠️ プライベートリポジトリの場合は追加設定が必要

**セットアップ手順**:
```bash
# 1. bmad-methodが既にセットアップされている前提
# 2. NPMパッケージをインストール
npm install @bmad/custom-workflows

# 3. インストールスクリプトを実行
npm run bmad-custom:install
```

**推奨度**: ⭐⭐⭐

---

### 方式4: Git Subtree

**概要**: bmad-custom-extensionsをサブツリーとして管理

**メリット**:
- ✅ サブモジュールより管理が簡単
- ✅ 履歴を保持
- ✅ プロジェクトに統合される

**デメリット**:
- ⚠️ 更新がやや複雑
- ⚠️ プロジェクト固有の変更と混在しやすい

**推奨度**: ⭐⭐

---

## 推奨方式: Git Submodule + インストールスクリプト

### 理由

1. **bmad-methodとの整合性**: bmad-methodもGitリポジトリとして管理されている可能性が高い
2. **バージョン管理**: 特定のバージョンを参照できる
3. **更新の容易さ**: `git submodule update`で簡単に更新可能
4. **プロジェクト間の共有**: 複数のプロジェクトで同じバージョンを共有可能
5. **柔軟性**: プロジェクト固有の拡張も可能

### ディレクトリ構造

```
プロジェクトルート/
├── .cursor/
│   └── rules/
│       ├── bmad/              # bmad-method（既存）
│       └── bmad-custom/       # bmad-custom-extensions（サブモジュールからコピー/リンク）
├── .bmad-custom/              # プロジェクト固有の拡張（既存）
├── .bmad-custom-extensions/   # サブモジュール（新規）
│   ├── workflows/
│   │   ├── validate-mvp-scope/
│   │   ├── hypothesis-validation-checklist/
│   │   ├── technical-spike/
│   │   ├── performance-spike/
│   │   └── llm-integration-pattern-spike/
│   ├── scripts/
│   │   └── install.sh
│   └── README.md
└── package.json
```

### セットアップフロー

```
1. bmad-methodをセットアップ
   ↓
2. bmad-custom-extensionsをサブモジュールとして追加
   ↓
3. インストールスクリプトを実行
   ↓
4. .cursor/rules/bmad-custom/にワークフローを配置
   ↓
5. 使用開始
```

---

## 実装計画

### Phase 1: リポジトリの作成

1. **bmad-custom-extensionsリポジトリを作成**
   - GitHub/GitLabなどで新規リポジトリを作成
   - ワークフローファイルを配置
   - README.mdとLICENSEを追加

### Phase 2: インストールスクリプトの作成

1. **インストールスクリプト（install.sh）を作成**
   - サブモジュールからワークフローをコピー
   - `.cursor/rules/bmad-custom/`に配置
   - 既存ファイルの上書き確認

2. **package.jsonにスクリプトを追加**
   - `bmad-custom:install`スクリプト
   - `bmad-custom:update`スクリプト

### Phase 3: ドキュメントの作成

1. **インストールガイドを作成**
   - セットアップ手順
   - トラブルシューティング
   - 更新手順

---

## 次のステップ

1. **リポジトリ管理方式の決定**: この提案をレビューして決定
2. **リポジトリの作成**: 選択した方式に基づいてリポジトリを作成
3. **インストールスクリプトの実装**: セットアップを自動化
4. **ドキュメントの作成**: インストールガイドを作成
5. **テスト**: 実際のプロジェクトでセットアップをテスト

---

**Document Revision History**

- **Version 1.0 (2025-01-27)**: 初版作成
  - リポジトリ管理方式の比較
  - 推奨方式の提案
  - 実装計画の提示

