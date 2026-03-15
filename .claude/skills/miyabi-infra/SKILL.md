---
name: miyabi-infra
description: miyabi-mcp-bundleのResource Monitor(10)+Network Inspector(15)+Process Inspector(14)=39ツールを活用したインフラ監視・診断。CPU/メモリ/ディスク/ネットワーク/プロセスの状態確認、パフォーマンス問題の調査が必要な時に使用。
disable-model-invocation: true
allowed-tools: Bash, Read, AskUserQuestion
---

# Miyabi Infrastructure Monitor

miyabi-mcp-bundle の Resource Monitor + Network Inspector + Process Inspector（計39 tools）を活用してシステムインフラを監視・診断します。

## Resource Monitor（10 tools）

| ツール | 用途 |
|--------|------|
| `resource_cpu` | CPU使用率 |
| `resource_memory` | メモリ使用量 |
| `resource_disk` | ディスク使用量 |
| `resource_load` | システムロードアベレージ |
| `resource_overview` | リソース包括概要 |
| `resource_processes` | リソース消費プロセス一覧 |
| `resource_uptime` | システム稼働時間 |
| `resource_network_stats` | ネットワーク統計 |
| `resource_battery` | バッテリー状態 |
| `resource_temperature` | CPU/GPU温度 |

## Network Inspector（15 tools）

| ツール | 用途 |
|--------|------|
| `network_interfaces` | ネットワークインターフェース一覧 |
| `network_connections` | アクティブ接続一覧 |
| `network_listening_ports` | リスニングポート一覧 |
| `network_stats` | ネットワーク統計 |
| `network_gateway` | デフォルトゲートウェイ |
| `network_ping` | ホストへのping |
| `network_bandwidth` | 帯域幅使用量 |
| `network_overview` | ネットワーク概要 |
| `network_dns_lookup` | DNS検索 |
| `network_port_check` | ポート疎通確認 |
| `network_public_ip` | パブリックIP取得 |
| `network_wifi_info` | WiFi接続情報 |
| `network_route_table` | ルーティングテーブル |
| `network_ssl_check` | SSL証明書確認 |
| `network_traceroute` | トレースルート |

## Process Inspector（14 tools）

| ツール | 用途 |
|--------|------|
| `process_info` | プロセス詳細（PID指定） |
| `process_list` | プロセス一覧 |
| `process_search` | プロセス名検索 |
| `process_tree` | プロセスツリー |
| `process_file_descriptors` | ファイルディスクリプタ |
| `process_environment` | 環境変数 |
| `process_children` | 子プロセス |
| `process_top` | CPU/メモリ上位プロセス |
| `process_kill` | プロセス終了（安全確認付き） |
| `process_ports` | ポート使用プロセス |
| `process_cpu_history` | CPU使用履歴 |
| `process_memory_detail` | メモリ詳細 |
| `process_threads` | スレッド一覧 |
| `process_io_stats` | I/O統計 |

## 実行モード

### 1. システムヘルスチェック
`resource_overview` + `network_overview` でシステム全体の健康状態を確認。

### 2. パフォーマンス診断
`resource_cpu` + `resource_memory` + `process_top` + `resource_load` でボトルネックを特定。

### 3. ネットワーク診断
`network_connections` + `network_listening_ports` + `network_ping` + `network_ssl_check` で接続問題を調査。

### 4. プロセス調査
`process_search` + `process_info` + `process_tree` + `process_memory_detail` で特定プロセスを深掘り。

### 5. フルインフラレポート
全39ツールの結果を統合し、包括的なインフラレポートを生成。

## 出力形式

重要度別に色分けしたサマリーを提示:
- CRITICAL: CPU > 90%, メモリ > 95%, ディスク > 90%
- WARNING: CPU > 70%, メモリ > 80%, ディスク > 80%
- OK: 正常範囲内
