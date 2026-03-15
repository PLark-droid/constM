---
name: miyabi-db
description: miyabi-mcp-bundleのDatabase Foundation 6ツールを活用したデータベース操作・診断。DB接続確認、テーブル一覧、スキーマ確認、クエリ実行、パフォーマンス分析が必要な時に使用。
argument-hint: "[connection-string|action]"
disable-model-invocation: true
allowed-tools: Bash, Read, AskUserQuestion
---

# Miyabi Database Foundation

miyabi-mcp-bundle の Database Foundation ツール群（6 tools）を活用してデータベースを操作・診断します。

## 利用可能なMCPツール

| ツール | 用途 | 対応DB |
|--------|------|--------|
| `db_connect` | 接続テスト | SQLite / PostgreSQL / MySQL |
| `db_tables` | テーブル一覧 | 全DB |
| `db_schema` | テーブルスキーマ | 全DB |
| `db_query` | 読み取り専用クエリ（SELECTのみ） | 全DB |
| `db_explain` | クエリ実行計画 | 全DB |
| `db_health` | DB健康状態・統計 | 全DB |

## 実行モード

### 1. DB接続確認
`db_connect` で接続テスト → `db_health` で健康状態を確認。

### 2. スキーマ探索
`db_tables` → `db_schema` でテーブル構造を一覧・詳細確認。ER図的なサマリーを生成。

### 3. データ調査
`db_query` でSELECTクエリを実行。結果をMarkdownテーブルで整形。

### 4. パフォーマンス分析
`db_explain` でクエリ実行計画を確認。インデックス追加の提案。

### 5. DB ヘルスレポート
全ツールで包括的なDB診断レポートを生成。

## 安全ルール

- `db_query` はSELECTのみ（書き込み操作は不可）
- 接続文字列にパスワードが含まれる場合はログに出力しない
- 大量データの取得時はLIMITを自動付与
