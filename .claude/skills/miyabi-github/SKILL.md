---
name: miyabi-github
description: miyabi-mcp-bundleのGitHub Integration 21ツールを活用したIssue/PR/Actions/Release管理。GitHub操作の自動化、Issue分析、PR作成・レビュー、ワークフロー監視が必要な時に使用。
argument-hint: "[action] [target]"
disable-model-invocation: true
allowed-tools: Bash, Read, Write, AskUserQuestion
---

# Miyabi GitHub Integration

miyabi-mcp-bundle の GitHub Integration ツール群（21 tools）を活用してGitHub操作を実行します。

## 利用可能なMCPツール

### Issue管理
| ツール | 用途 |
|--------|------|
| `github_list_issues` | Issue一覧取得 |
| `github_get_issue` | Issue詳細取得 |
| `github_create_issue` | Issue新規作成 |
| `github_update_issue` | Issue更新 |
| `github_add_comment` | Issue/PRにコメント追加 |
| `github_list_labels` | ラベル一覧 |
| `github_add_labels` | ラベル追加 |
| `github_list_milestones` | マイルストーン一覧 |

### PR管理
| ツール | 用途 |
|--------|------|
| `github_list_prs` | PR一覧取得 |
| `github_get_pr` | PR詳細取得 |
| `github_create_pr` | PR作成 |
| `github_merge_pr` | PRマージ |
| `github_list_pr_reviews` | PRレビュー一覧 |
| `github_create_review` | PRレビュー作成 |
| `github_submit_review` | PRレビュー送信 |

### リポジトリ情報
| ツール | 用途 |
|--------|------|
| `github_repo_info` | リポジトリメタデータ・統計 |
| `github_list_releases` | リリース履歴 |
| `github_list_branches` | ブランチ一覧（保護設定付き） |
| `github_compare_commits` | コミット/ブランチ比較 |
| `github_list_workflows` | GitHub Actionsワークフロー一覧 |
| `github_list_workflow_runs` | 最近のワークフロー実行 |

## 実行モード

$ARGUMENTS または AskUserQuestion で操作を決定:

### 1. Issue ダッシュボード
`github_list_issues` + `github_list_labels` + `github_list_milestones` で現在のIssue状況を一覧表示。ラベル別・マイルストーン別に集計。

### 2. PR レビュー
`github_list_prs` + `github_get_pr` + `github_list_pr_reviews` でオープンPRの状態を確認。レビュー待ち、変更要求、承認済みを分類。

### 3. Actions モニター
`github_list_workflows` + `github_list_workflow_runs` で直近のCI/CD状態を監視。失敗ワークフローをハイライト。

### 4. リリース管理
`github_list_releases` + `github_compare_commits` で最新リリースからの変更を分析。次期リリースノートのドラフトを提案。

### 5. リポジトリ概要
全ツールを活用してリポジトリの包括的レポートを生成。

## Miyabi識学ラベル連携

Issue操作時は識学理論ラベル体系（type, priority, state, agent, complexity, phase）を自動適用する。
