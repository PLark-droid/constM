# スキル作成リファレンス

## Frontmatter フィールド一覧

| フィールド | 必須 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `name` | No | ディレクトリ名 | スラッシュコマンド名（kebab-case） |
| `description` | 推奨 | — | スキルの説明とトリガー条件 |
| `argument-hint` | No | — | 引数のヒント表示（例: `[issue-number]`） |
| `disable-model-invocation` | No | `false` | `true`: ユーザーのみ実行可（Claude自動実行不可） |
| `user-invocable` | No | `true` | `false`: Claudeのみ使用（メニュー非表示） |
| `allowed-tools` | No | 全ツール | 許可するツール（カンマ区切り） |
| `model` | No | `inherit` | 使用モデル: `sonnet`, `opus`, `haiku`, `inherit` |
| `context` | No | — | `fork`: サブエージェントとして実行 |
| `agent` | No | — | エージェントタイプ: `Explore`, `Plan`, `general-purpose` |

## 引数プレースホルダー

| プレースホルダー | 説明 |
|-----------------|------|
| `$ARGUMENTS` | 全引数（文字列） |
| `$0`, `$1`, `$2` | 位置引数（0ベース） |
| `${CLAUDE_SESSION_ID}` | 現在のセッションID |

## スキルタイプ別テンプレート

### Task型（ユーザー明示実行）

```yaml
---
name: my-task
description: XXXを実行する。YYYが必要な時に使用。
disable-model-invocation: true
allowed-tools: Bash, Read, Write
---
```

### Reference型（Claude自動参照）

```yaml
---
name: coding-standards
description: コーディング規約。コード生成・レビュー時に自動参照。
user-invocable: false
---
```

### Research型（サブエージェント調査）

```yaml
---
name: deep-research
description: トピックを徹底調査する。
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, WebSearch
---
```

### Orchestrator型（並列エージェント）

```yaml
---
name: full-pipeline
description: 複数エージェントで大規模タスクを実行。
context: fork
agent: general-purpose
---
```

## 配置ルール

| スコープ | パス |
|---------|------|
| プロジェクト限定 | `.claude/skills/{name}/SKILL.md` |
| 全プロジェクト共通 | `~/.claude/skills/{name}/SKILL.md` |
| レガシー（後方互換） | `.claude/commands/{name}.md` |
