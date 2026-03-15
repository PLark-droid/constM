---
name: miyabi-health
description: miyabi-mcp-bundleのHealth Check + MCP Tool Discovery + Time/Calculator/Generator ツールを活用したシステム総合診断。MCP環境の健全性確認、ツール一覧、ユーティリティ機能が必要な時に使用。
disable-model-invocation: true
allowed-tools: Bash, Read, AskUserQuestion
---

# Miyabi Health & Utilities

miyabi-mcp-bundle の Health Check + ユーティリティツール群を活用してシステム総合診断を実行します。

## Health Check（1 tool）

| ツール | 用途 |
|--------|------|
| `health_check` | システム全体の健全性チェック |

## MCP Tool Discovery（3 tools）

| ツール | 用途 |
|--------|------|
| `mcp_list_tools` | 利用可能なMCPツール一覧 |
| `mcp_tool_info` | ツール詳細情報 |
| `mcp_search_tools` | ツール検索 |

## Time Tools（4 tools）

| ツール | 用途 |
|--------|------|
| `time_now` | 現在時刻 |
| `time_convert` | タイムゾーン変換 |
| `time_diff` | 時間差計算 |
| `time_format` | 日時フォーマット変換 |

## Calculator Tools（3 tools）

| ツール | 用途 |
|--------|------|
| `calc_evaluate` | 数式評価 |
| `calc_convert_units` | 単位変換 |
| `calc_statistics` | 統計計算 |

## Generator Tools（4 tools）

| ツール | 用途 |
|--------|------|
| `gen_uuid` | UUID生成 |
| `gen_password` | パスワード生成 |
| `gen_lorem` | ダミーテキスト生成 |
| `gen_hash` | ハッシュ生成 |

## 実行モード

### 1. フルヘルスチェック
`health_check` でシステム全体を診断。結果をカテゴリ別に表示。

### 2. MCP ツール確認
`mcp_list_tools` で利用可能な全ツールを一覧表示。`mcp_search_tools` で特定機能のツールを検索。

### 3. ユーティリティ
Time / Calculator / Generator ツールを必要に応じて実行。

## Miyabi Doctor との連携

このスキルの `health_check` 結果と、miyabi CLI の `npx miyabi status` を組み合わせて、プロジェクト＋システムの包括的な健康診断を行う。
