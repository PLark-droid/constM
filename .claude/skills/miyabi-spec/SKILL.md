---
name: miyabi-spec
description: miyabi-mcp-bundleのSpec-Kit 9ツールを活用したSpec-Driven Development。仕様書の作成・管理・検証、API仕様のバリデーション、テスト仕様の自動生成が必要な時に使用。
argument-hint: "[spec-name]"
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Grep, AskUserQuestion
---

# Miyabi Spec-Kit - Spec-Driven Development

miyabi-mcp-bundle の Spec-Kit ツール群（9 tools）を活用して仕様駆動開発を実行します。

## 利用可能なMCPツール

| ツール | 用途 |
|--------|------|
| `spec_init` | Specプロジェクト初期化 |
| `spec_create` | 新しいSpec作成 |
| `spec_list` | Spec一覧 |
| `spec_get` | Spec詳細取得 |
| `spec_update` | Spec更新 |
| `spec_validate` | Specバリデーション |
| `spec_generate_tests` | Specからテスト仕様自動生成 |
| `spec_diff` | Spec差分確認 |
| `spec_export` | Specエクスポート |

## 実行モード

### 1. Spec プロジェクト初期化
`spec_init` でSpec管理環境をセットアップ。

### 2. 新規Spec作成
AskUserQuestion で仕様の種類（API / UI / データモデル / ワークフロー）を確認し、`spec_create` でテンプレートから作成。

### 3. Spec レビュー
`spec_list` → `spec_get` → `spec_validate` でSpecの整合性を検証。

### 4. テスト仕様生成
`spec_generate_tests` でSpecからテストケースを自動生成。Vitestテストファイルとして出力。

### 5. Spec 差分確認
`spec_diff` で前バージョンとの変更点を確認。影響範囲を分析。

## Miyabi連携

生成したSpecは `docs/specs/` に保存し、IssueAgent のラベリングと連携する。
