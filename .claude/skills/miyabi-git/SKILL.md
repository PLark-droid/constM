---
name: miyabi-git
description: miyabi-mcp-bundleのGit Inspector 19ツールを活用したGitリポジトリ分析・操作。ブランチ分析、差分確認、コンフリクト検出、blame調査が必要な時に使用。
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, AskUserQuestion
---

# Miyabi Git Inspector

miyabi-mcp-bundle の Git Inspector ツール群（19 tools）を活用してGitリポジトリの分析・操作を行います。

## 利用可能なMCPツール

以下の miyabi-mcp-bundle ツールを使用してください:

| ツール | 用途 |
|--------|------|
| `git_status` | 現在のワーキングツリー状態（modified, staged, untracked） |
| `git_branch_list` | 全ブランチ一覧（リモートトラッキング情報付き） |
| `git_current_branch` | 現在のブランチ名 |
| `git_log` | コミット履歴 |
| `git_diff` | 未ステージの差分 |
| `git_staged_diff` | ステージ済みの差分 |
| `git_remote_list` | リモート一覧 |
| `git_branch_ahead_behind` | origin との差分コミット数 |
| `git_file_history` | 特定ファイルのコミット履歴 |
| `git_stash_list` | stash一覧 |
| `git_blame` | 行単位の変更履歴（blame） |
| `git_show` | コミット詳細・差分 |
| `git_tag_list` | タグ一覧（メタデータ付き） |
| `git_contributors` | コントリビューター統計 |
| `git_conflicts` | マージコンフリクト検出 |
| `git_submodule_status` | サブモジュール状態 |
| `git_lfs_status` | Git LFS状態 |
| `git_hooks_list` | Gitフック一覧 |
| `git_worktree_list` | ワークツリー一覧 |

## 実行モード

AskUserQuestion でユーザーに実行モードを確認:

### 1. クイックステータス
`git_status`, `git_current_branch`, `git_branch_ahead_behind` を実行し、現在の状態をサマリー表示。

### 2. ブランチ分析
`git_branch_list`, `git_log`, `git_branch_ahead_behind` でブランチの状況を包括的に分析。

### 3. 差分レビュー
`git_diff`, `git_staged_diff` で変更内容を確認し、レビューコメントを提示。

### 4. コンフリクト検出・解決支援
`git_conflicts` でコンフリクトを検出し、解決方針を提案。

### 5. ファイル調査
`git_blame`, `git_file_history`, `git_show` で特定ファイルの変更経緯を追跡。

### 6. フルレポート
全ツールを実行し、リポジトリの包括的な健康状態レポートを生成。

## 出力形式

結果はMarkdownテーブルで整形し、重要な発見（コンフリクト、未プッシュ変更、古いブランチ等）をハイライト表示する。
