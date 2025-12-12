# Epic {{epic_number}}: {{epic_title}} - システム動作確認シナリオ

**Date:** {{date}}  
**目的:** Epic {{epic_number}}で実装された{{epic_title}}機能が正常に動作することを確認する

**重要:** このプロジェクトでは環境変数管理に`.env.local`ファイルを使用します。`.env.local`は`.gitignore`に含まれており、Gitリポジトリにはコミットされません。事前準備チェックリストを必ず確認してください。

---

## シナリオ概要

このシナリオでは、Epic {{epic_number}}で実装された以下の機能が正常に動作することを確認します：

{{#each stories}}
{{story_index}}. {{story_title}}（Story {{story_id}}）
{{/each}}

---

## 事前準備チェックリスト

### ✅ ステップ1: 環境変数の確認

**重要:** このプロジェクトでは環境変数管理に`.env.local`ファイルを使用します。`.env.local`は`.gitignore`に含まれており、Gitリポジトリにはコミットされません。

1. **`.env.local`ファイルの存在確認**
   ```bash
   # プロジェクトルートで実行
   ls -la .env.local
   ```
   
   **期待結果:** `.env.local`ファイルが存在する
   
   **ファイルが存在しない場合:**
   ```bash
   # .env.localファイルを作成
   touch .env.local
   # 必要な環境変数を設定（下記参照）
   ```

2. **`.env.local`ファイルの内容確認**
   ```bash
   # 環境変数が設定されていることを確認（値は表示されません）
   cat .env.local | grep -E "^(DATABASE_URL|OPENAI_API_KEY|CHROMA_URL)="
   ```
   
   **期待結果:** 以下の環境変数が設定されている
   - `DATABASE_URL`: MongoDB Atlas接続文字列（必須）
   - `OPENAI_API_KEY`: OpenAI APIキー（必須）
   - `CHROMA_URL`: ChromaベクトルDB接続URL（オプション）

3. **`.env.local`ファイルの形式確認**
   `.env.local`ファイルは以下の形式で記述してください：
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/learning_trainers?retryWrites=true&w=majority"
   
   # LLM
   OPENAI_API_KEY="sk-..."
   
   # Vector DB (オプション)
   CHROMA_URL="http://localhost:8000"
   ```

4. **環境変数の読み込み確認**
   ```bash
   # 環境変数が正しく読み込まれているか確認
   node -e "require('dotenv').config({ path: '.env.local' }); console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ SET' : '❌ NOT SET'); console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ SET' : '❌ NOT SET');"
   ```
   
   **期待結果:** すべての環境変数が`✅ SET`と表示される

### ✅ ステップ2: データベース接続の確認

1. **MongoDB接続確認**
   ```bash
   # Prismaクライアントを使用して接続確認
   npx prisma db push --skip-generate
   ```
   
   **期待結果:** 接続成功メッセージが表示される

### ✅ ステップ3: サービスの起動確認

1. **Next.js開発サーバーの起動**
   ```bash
   # 別ターミナルで実行
   npm run dev
   ```
   
   **期待結果:**
   - サーバーが`http://localhost:3000`で起動
   - コンソールにエラーが表示されない

### ✅ ステップ4: テストデータの準備

1. **テストデータ準備スクリプトの実行**
   ```bash
   # プロジェクトルートで実行
   npm run setup-test-data
   ```
   
   **期待結果:**
   - スクリプトが正常に完了
   - テストデータが作成される

### ✅ ステップ5: 事前準備完了確認

以下のすべてが完了していることを確認してください：

- [ ] `.env.local`ファイルが存在し、必要な環境変数が設定されている
- [ ] データベース接続が正常に動作している
- [ ] Next.js開発サーバーが起動している
- [ ] テストデータ準備スクリプトが正常に完了している

**準備完了後、検証シナリオを開始してください。**

---

## シナリオ1: 基本的な動作確認

{{#each stories}}
### ステップ{{story_index}}: {{story_title}}（Story {{story_id}}）

**目的:** {{story_title}}が正常に動作することを確認

**手順:**

{{#each verification_steps}}
#### {{step_num}}-{{substep_num}}. {{step_name}}

{{step_description}}

```bash
{{command}}
```

**期待結果:**
{{#each expected_results}}
- ✅ {{result}}
{{/each}}

**確認ポイント:**
{{#each verification_points}}
- ✅ {{point}}
{{/each}}

---

{{/each}}
{{/each}}

## シナリオ2: ブラウザでの動作確認（オプション）

### ステップ1: ブラウザでページを開く

**手順:**

1. ブラウザで `http://localhost:3000` を開く
2. 開発者ツール（F12）を開く
3. Networkタブを開く

### ステップ2: UI機能の確認

**手順:**

{{#each ui_verification_steps}}
{{step_num}}. {{step_description}}

**期待結果:**
{{#each expected_results}}
- ✅ {{result}}
{{/each}}

---

{{/each}}

## 確認チェックリスト

### {{epic_title}}機能

{{#each checklists}}
- [ ] {{item}}
{{/each}}

---

## トラブルシューティング

### 問題1: {{common_issue_1}}

**症状:** {{symptom_1}}

**対処法:**
{{#each solutions_1}}
{{solution_num}}. {{solution}}
{{/each}}

---

## 検証結果サマリー

**検証実施日:** {{verification_date}}  
**検証者:** {{verifier_name}}  
**検証環境:** {{verification_environment}}

### 検証結果概要

{{verification_summary}}

---

## 成功基準

このシナリオが成功したと判断する基準：

{{#each success_criteria}}
{{criteria_num}}. ✅ {{criterion}}
{{/each}}

---

## 次のステップ

このシナリオが成功したら：

1. 次のEpicの実装を開始する準備が整いました
2. 次のEpicの技術コンテキスト作成（`@.bmad/bmm/workflows/epic-tech-context`）
3. 次のEpicのStory作成（`@.bmad/bmm/workflows/create-story`）

---

**Document Revision History**

- **Version 1.0 ({{date}})**: 初版作成
  - Epic {{epic_number}}の{{epic_title}}機能確認シナリオを作成
  - 段階的な確認手順を記載
  - トラブルシューティングガイドを追加

