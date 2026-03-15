---
name: miyabi-devops
description: miyabi-mcp-bundleのDocker(10)+Docker Compose(4)+Kubernetes(6)=20ツールを活用したコンテナ・オーケストレーション管理。Docker/K8sの状態確認、コンテナ操作、デプロイ管理が必要な時に使用。
argument-hint: "[docker|k8s] [action]"
disable-model-invocation: true
allowed-tools: Bash, Read, AskUserQuestion
---

# Miyabi DevOps - Container & Orchestration

miyabi-mcp-bundle の Docker + Docker Compose + Kubernetes ツール群（計20 tools）を活用してコンテナ環境を管理します。

## Docker（10 tools）

| ツール | 用途 |
|--------|------|
| `docker_ps` | コンテナ一覧（実行中/全て） |
| `docker_images` | イメージ一覧 |
| `docker_logs` | コンテナログ取得 |
| `docker_inspect` | コンテナ/イメージ詳細 |
| `docker_stats` | リソース使用量（CPU/メモリ） |
| `docker_exec` | コンテナ内コマンド実行 |
| `docker_start` | コンテナ起動 |
| `docker_stop` | コンテナ停止 |
| `docker_restart` | コンテナ再起動 |
| `docker_build` | Dockerイメージビルド |

## Docker Compose（4 tools）

| ツール | 用途 |
|--------|------|
| `compose_ps` | Composeサービス一覧 |
| `compose_logs` | Composeサービスログ |
| `compose_up` | サービス起動 |
| `compose_down` | サービス停止 |

## Kubernetes（6 tools）

| ツール | 用途 |
|--------|------|
| `k8s_get_pods` | Pod一覧 |
| `k8s_get_deployments` | Deployment一覧 |
| `k8s_logs` | Podログ取得 |
| `k8s_describe` | リソース詳細 |
| `k8s_apply` | マニフェスト適用（dry-run対応） |
| `k8s_delete` | リソース削除（dry-run対応） |

## 実行モード

$ARGUMENTS または AskUserQuestion で操作を決定:

### 1. Docker ダッシュボード
`docker_ps` + `docker_images` + `docker_stats` でDocker環境の全体像を表示。

### 2. コンテナデバッグ
`docker_logs` + `docker_inspect` + `docker_exec` で問題のあるコンテナを調査。

### 3. K8s クラスタ状態
`k8s_get_pods` + `k8s_get_deployments` でクラスタの健康状態を確認。

### 4. デプロイ操作
`docker_build` → `k8s_apply`（dry-run）→ 確認後 → `k8s_apply` でデプロイを実行。

## 安全ルール

- `docker_stop`, `docker_restart`, `k8s_delete` 実行前は必ずユーザーに確認
- `k8s_apply`, `k8s_delete` は最初にdry-runで結果を確認してから実行
- 本番環境への操作は二重確認を行う
