# Epic {{epic_number}}: {{epic_title}} - ユーザー受け入れテスト（UAT）計画

**Date:** {{date}}  
**Epic ID:** {{epic_number}}  
**Status:** Ready for UAT  
**UAT Type:** Functional Acceptance Test ({{epic_title}}機能の動作確認)

**重要:** このプロジェクトでは環境変数管理に`.env.local`ファイルを使用します。`.env.local`は`.gitignore`に含まれており、Gitリポジトリにはコミットされません。事前準備チェックリスト（3.1節）を必ず確認してください。

---

## 1. UAT概要

### 1.1 目的

Epic {{epic_number}}: {{epic_title}}で実装された機能が、PRDの要件を満たし、{{epic_purpose}}を確認する。

### 1.2 対象範囲

Epic {{epic_number}}で実装された以下の機能：
{{#each stories}}
- {{story_title}}（Story {{story_id}}）
{{/each}}

### 1.3 受け入れ基準

すべてのテストケースが成功し、以下の基準を満たすこと：
{{#each acceptance_criteria}}
- ✅ {{criterion}}
{{/each}}

---

## 2. テストケース

{{#each stories}}
### 2.{{story_index}} {{story_title}}（Story {{story_id}}）

{{#each test_cases}}
#### TC-{{test_case_id}}: {{test_case_name}}
**前提条件:** {{prerequisites}}

**手順:**
{{#each steps}}
{{step_num}}. {{step_description}}
{{/each}}

**期待結果:**
{{#each expected_results}}
- ✅ {{result}}
{{/each}}

**実測結果:** [記録欄]

---

{{/each}}
{{/each}}

## 3. テスト実行手順

### 3.1 事前準備チェックリスト

#### ✅ ステップ1: 環境変数の確認

**重要:** このプロジェクトでは環境変数管理に`.env.local`ファイルを使用します。

1. **`.env.local`ファイルの存在確認**
   ```bash
   # プロジェクトルートで実行
   ls -la .env.local
   ```
   
   **期待結果:** `.env.local`ファイルが存在する

2. **`.env.local`ファイルの内容確認**
   ```bash
   # 環境変数が設定されていることを確認（値は表示されません）
   cat .env.local | grep -E "^(DATABASE_URL|OPENAI_API_KEY|CHROMA_URL)="
   ```
   
   **期待結果:** 以下の環境変数が設定されている
   - `DATABASE_URL`: MongoDB Atlas接続文字列
   - `OPENAI_API_KEY`: OpenAI APIキー
   - `CHROMA_URL`: ChromaベクトルDB接続URL（オプション）

#### ✅ ステップ2: データベース接続の確認

1. **MongoDB接続確認**
   ```bash
   # Prismaクライアントを使用して接続確認
   npx prisma db push --skip-generate
   ```
   
   **期待結果:** 接続成功メッセージが表示される

#### ✅ ステップ3: 開発サーバーの起動確認

1. **Next.js開発サーバーの起動**
   ```bash
   # 別ターミナルで実行
   npm run dev
   ```
   
   **期待結果:** 
   - サーバーが`http://localhost:3000`で起動
   - コンソールにエラーが表示されない

#### ✅ ステップ4: テストデータの準備

1. **テストデータ準備スクリプトの実行**
   ```bash
   # プロジェクトルートで実行
   npm run setup-test-data
   ```
   
   **期待結果:**
   - スクリプトが正常に完了
   - テストデータが作成される

### 3.2 テスト実行

1. **個別機能テストの実行**
   - 各テストケースを順次実行
   - 各テストケースの結果を記録

2. **統合テストの実行**
   - エンドツーエンドのフローを確認

3. **パフォーマンステストの実行**
   - パフォーマンス指標を記録

---

## 4. テスト結果記録

### 4.1 テスト実行サマリー

| テストケースID | テストケース名 | ステータス | 実行日時 | 備考 |
|---------------|--------------|-----------|---------|------|
{{#each test_cases}}
| TC-{{test_case_id}} | {{test_case_name}} | ⬜ 未実行 / ✅ 成功 / ❌ 失敗 | | |
{{/each}}

### 4.2 成功率

- **成功数:** / {{total_test_cases}}
- **失敗数:** / {{total_test_cases}}
- **成功率:** %

### 4.3 問題点と改善提案

#### 発見された問題

1. **問題1:** [問題の説明]
   - **影響度:** 高 / 中 / 低
   - **優先度:** 高 / 中 / 低
   - **対応方針:** [対応方針]

---

## 5. 受け入れ判定

### 5.1 判定基準

- ✅ **合格:** すべてのテストケースが成功し、重大な問題がない
- ⚠️ **条件付き合格:** 軽微な問題があるが、次のEpicの実装に支障がない
- ❌ **不合格:** 重大な問題があり、次のEpicの実装に支障がある

### 5.2 判定結果

**判定:** ⬜ 合格 / ⚠️ 条件付き合格 / ❌ 不合格

**判定理由:**
[判定理由を記録]

**承認者:** [承認者名]  
**承認日:** [承認日]

---

## 6. 次のステップ

### 6.1 UAT合格時

- 次のEpicの実装を開始する
- 次のEpicの技術コンテキスト作成（`@.bmad/bmm/workflows/epic-tech-context`）を実施

### 6.2 UAT不合格時

- 発見された問題を修正する
- 修正後に再テストを実施する
- 問題が解決するまで繰り返す

---

**Document Revision History**

- **Version 1.0 ({{date}})**: 初版作成
  - Epic {{epic_number}} UAT計画の作成
  - {{total_test_cases}}のテストケースを定義
  - テスト実行手順を記載

