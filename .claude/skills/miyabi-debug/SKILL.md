---
name: miyabi-debug
description: miyabi-mcp-bundleのLog Aggregator(7)+File Watcher(10)+Tmux Monitor(10)+Claude Monitor(8)+Sequential Thinking(3)=38ツールを活用したデバッグ・ログ分析。エラー調査、ログ分析、ファイル監視、思考整理が必要な時に使用。
argument-hint: "[error-keyword]"
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, AskUserQuestion
---

# Miyabi Debug & Analysis

miyabi-mcp-bundle のデバッグ関連ツール群（計38 tools）を活用してエラー調査・ログ分析を行います。

## Log Aggregator（7 tools）

| ツール | 用途 |
|--------|------|
| `log_sources` | ログソース一覧 |
| `log_get_recent` | 最新ログエントリ取得 |
| `log_search` | パターンでログ検索 |
| `log_get_errors` | エラーレベルログ |
| `log_get_warnings` | 警告レベルログ |
| `log_tail` | ログファイルtail |
| `log_stats` | ログ統計・分析 |

## File Watcher（10 tools）

| ツール | 用途 |
|--------|------|
| `file_stats` | ファイル/ディレクトリ情報 |
| `file_recent_changes` | 最近変更されたファイル |
| `file_search` | globパターンファイル検索 |
| `file_tree` | ディレクトリツリー |
| `file_compare` | 2ファイル比較 |
| `file_changes_since` | タイムスタンプ以降の変更 |
| `file_read` | 安全なファイル読み取り |
| `file_checksum` | ファイルチェックサム |
| `file_size_summary` | ディレクトリサイズ分析 |
| `file_duplicates` | 重複ファイル検出 |

## Tmux Monitor（10 tools）

| ツール | 用途 |
|--------|------|
| `tmux_list_sessions` | セッション一覧 |
| `tmux_list_windows` | ウィンドウ一覧 |
| `tmux_list_panes` | ペイン一覧 |
| `tmux_send_keys` | ペインにキー送信 |
| `tmux_pane_capture` | ペイン内容キャプチャ |
| `tmux_pane_search` | ペイン内容検索 |
| `tmux_pane_tail` | ペイン末尾N行 |
| `tmux_pane_is_busy` | ペインビジー状態確認 |
| `tmux_pane_current_command` | 実行中コマンド |
| `tmux_session_info` | セッション詳細情報 |

## Claude Monitor（8 tools）

| ツール | 用途 |
|--------|------|
| `claude_config` | Claude Desktop設定 |
| `claude_mcp_status` | MCPサーバー状態 |
| `claude_session_info` | セッション情報 |
| `claude_logs` | Claudeログ |
| `claude_log_search` | Claudeログ検索 |
| `claude_log_files` | ログファイル一覧 |
| `claude_background_shells` | バックグラウンドシェル |
| `claude_status` | Claude包括ステータス |

## Sequential Thinking（3 tools）

| ツール | 用途 |
|--------|------|
| `sequential_thinking` | 段階的思考プロセス |
| `thinking_summary` | 思考サマリー |
| `thinking_reset` | 思考リセット |

## 実行モード

### 1. エラー調査
$ARGUMENTS のキーワードで `log_search` + `log_get_errors` を実行。関連するファイル変更を `file_recent_changes` で確認。`sequential_thinking` で原因分析。

### 2. ログダッシュボード
`log_sources` + `log_stats` + `log_get_errors` + `log_get_warnings` でログの全体像を把握。

### 3. ファイル変更追跡
`file_recent_changes` + `file_changes_since` で最近の変更を追跡。`file_compare` で差分を確認。

### 4. Claude 自己診断
`claude_status` + `claude_mcp_status` + `claude_logs` でClaude Code自体の状態を診断。

### 5. 包括デバッグ
全ツールを組み合わせて問題の全体像を把握し、根本原因を特定。
