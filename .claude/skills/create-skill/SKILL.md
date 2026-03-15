---
name: create-skill
description: 新しいClaude Codeスキル（カスタムスラッシュコマンド）を対話的に作成する。スキルの雛形生成、SKILL.md作成、ベストプラクティス適用を自動化。
argument-hint: "[skill-name]"
disable-model-invocation: true
allowed-tools: Read, Write, Bash, Glob, Grep, AskUserQuestion
---

# スキル作成ウィザード

新しいClaude Codeスキルを作成します。

## 入力情報

スキル名: $ARGUMENTS

## 手順

### Step 1: スキル情報の収集

$ARGUMENTS が空の場合、AskUserQuestion で以下を確認してください:

1. **スキル名** (小文字ハイフン区切り、例: `code-review`, `deploy-staging`)
2. **スキルの目的** — 何をするスキルか
3. **スキルタイプ** — 以下から選択:
   - **Task型**: ユーザーが明示的に `/skill-name` で実行（デプロイ、テスト、生成系）
   - **Reference型**: Claude が自動的に参照する背景知識（コーディング規約、API仕様）
   - **Research型**: サブエージェントで調査を実行（コード探索、分析）
   - **Orchestrator型**: 複数エージェントを並列実行（大規模タスク分解）

$ARGUMENTS が指定されている場合、スキル名として使い、目的とタイプを AskUserQuestion で確認してください。

### Step 2: 詳細設定の確認

AskUserQuestion で以下を確認:

1. **引数**: スキルに渡す引数はあるか（例: issue番号、ファイルパス）
2. **使用ツール**: どのツールを許可するか（Bash, Read, Write, Grep, Glob, Task, WebSearch 等）
3. **サブエージェント実行**: fork コンテキストで実行するか（重い処理の場合）
4. **エージェントタイプ**: Explore / Plan / general-purpose のいずれか

### Step 3: SKILL.md の生成

収集した情報に基づき、以下のテンプレートで SKILL.md を生成します。

配置先: `.claude/skills/{skill-name}/SKILL.md`

#### テンプレート構造

```markdown
---
name: {skill-name}
description: {description} — {いつこのスキルを使うべきかの説明}
argument-hint: "{引数があれば記載}"
disable-model-invocation: {Task型なら true, Reference型なら false}
user-invocable: {Reference型なら false, それ以外は true}
allowed-tools: {許可ツールのカンマ区切り}
context: {サブエージェント実行なら fork}
agent: {エージェントタイプ}
---

# {スキルタイトル}

{スキルの目的と概要を1-2文で}

## 実行手順

### 1. {最初のステップ}
{具体的な指示}

### 2. {次のステップ}
{具体的な指示}

### 3. {最終ステップ}
{具体的な指示}

## 期待される出力

{スキルが完了したときにユーザーに提示すべき内容}

## エラーハンドリング

{エラーが発生した場合の対処方針}
```

### Step 4: サポートファイルの生成（必要に応じて）

スキルの種類に応じて追加ファイルを作成:

- **Reference型**: `reference.md` — 参照ドキュメント
- **Research型**: `examples.md` — 調査の参考例
- **Orchestrator型**: `agents.md` — 使用するエージェントの定義

### Step 5: 検証と完了

1. 生成されたファイルの内容をユーザーに表示
2. 修正が必要か確認
3. 完了メッセージを表示:

```
スキル作成完了:
  - スキル名: /skill-name
  - 配置場所: .claude/skills/{skill-name}/SKILL.md
  - タイプ: {タイプ}

使い方:
  /{skill-name} {引数の例}

次回の Claude Code セッションから使用可能です。
```

## 重要なルール

- スキル名は必ず小文字ハイフン区切り（kebab-case）
- SKILL.md の description には「いつ使うべきか」のトリガー条件を含める
- Task型スキルは必ず `disable-model-invocation: true` にする
- Reference型スキルは `user-invocable: false` にする
- 1つのスキルは1つの責務に集中させる（単一責任原則）
- SKILL.md は500行以下に収める
- サポートファイルで詳細を分離する
