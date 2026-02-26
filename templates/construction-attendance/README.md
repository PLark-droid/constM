# 建設業向け 勤怠・日報テンプレート

Lark Bitable で実現する、中小建設業（100人以下）向けの勤怠管理・日報管理テンプレート。

---

## このテンプレートでできること

- **スマホから出退勤打刻** — 職人が現場でQRコードを読み取り、30秒以内で打刻完了
- **スマホから日報提出** — 作業内容・写真・安全事項を現場から直接報告
- **GPS記録** — 出退勤時の位置情報を自動記録、現場との距離チェック
- **承認フロー** — 班長→現場監督の2段階承認を自動化
- **自動リマインダー** — 毎日18:00に全作業員へリマインド通知（フラグ方式で未提出者限定も可）
- **工数・原価管理** — 案件×作業員×日の粒度で人工数・労務費を自動集計
- **ダッシュボード** — 日次・月次・案件別の可視化をリアルタイムで

## 対象ユーザー

| ロール | 主な操作 | デバイス |
|--------|---------|---------|
| 職人（作業員） | 出退勤打刻、日報提出 | スマホ |
| 班長 | 承認、出勤確認 | スマホ / PC |
| 現場監督 | 最終承認、ダッシュボード確認 | PC / スマホ |
| 管理者 | 設定、マスタ管理、月次集計 | PC |

## テーブル構成（6テーブル）

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  T1: 案件    │◄────│  T4: 出退勤  │────►│  T2: 作業員  │
│  マスタ      │     │  記録       │     │  マスタ      │
└──────┬──────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       │            ┌─────────────┐            │
       └────────────│  T5: 日報   │────────────┘
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐     ┌─────────────┐
                    │  T3: 作業   │     │  T6: 工数   │
                    │  内容マスタ  │     │  集計       │
                    └─────────────┘     └─────────────┘
```

## クイックスタート

### 所要時間: 約3〜4時間

### Step 1: 前提条件の確認
[setup-guide/00-prerequisites.md](setup-guide/00-prerequisites.md) を確認し、Lark環境を準備。

### Step 2: ベース作成
[setup-guide/01-create-base.md](setup-guide/01-create-base.md) に従いBitableベースを作成。

### Step 3: テーブル構築
[setup-guide/02-create-tables.md](setup-guide/02-create-tables.md) に従い6テーブルを作成。

### Step 4: ビュー設定
[setup-guide/03-create-views.md](setup-guide/03-create-views.md) に従いロール別ビューを作成。

### Step 5: フォーム作成
[setup-guide/04-create-forms.md](setup-guide/04-create-forms.md) に従い出勤・退勤・日報フォームを作成。

### Step 6: 自動化設定
[setup-guide/05-create-automations.md](setup-guide/05-create-automations.md) に従い7つの自動化ルールを設定。

### Step 7: ダッシュボード作成
[setup-guide/06-create-dashboards.md](setup-guide/06-create-dashboards.md) に従い3つのダッシュボードを作成。

### Step 8: 初期データ投入
[setup-guide/07-initial-data-setup.md](setup-guide/07-initial-data-setup.md) に従いマスタデータを投入。

## ディレクトリ構成

```
templates/construction-attendance/
├── README.md                              ← このファイル
├── design/                                # 設計ドキュメント
│   ├── 01-table-schema.md                # テーブル設計書（全6テーブル）
│   ├── 02-view-design.md                 # ビュー設計書
│   ├── 03-form-design.md                 # フォーム設計書（スマホUX含む）
│   ├── 04-dashboard-design.md            # ダッシュボード設計書
│   ├── 05-automation-rules.md            # 自動化ルール設計書（7ルール）
│   └── 06-er-diagram.md                  # ER図（Mermaid形式）
├── setup-guide/                           # 構築ステップバイステップ手順
│   ├── 00-prerequisites.md               # 前提条件・環境準備
│   ├── 01-create-base.md                 # ベース作成
│   ├── 02-create-tables.md               # テーブル構築
│   ├── 03-create-views.md                # ビュー設定
│   ├── 04-create-forms.md                # フォーム作成
│   ├── 05-create-automations.md          # 自動化設定
│   ├── 06-create-dashboards.md           # ダッシュボード構築
│   └── 07-initial-data-setup.md          # 初期データ投入
├── manuals/                               # 運用マニュアル
│   ├── user-guide-worker.md              # 職人向け（スマホ操作）
│   ├── user-guide-foreman.md             # 班長・現場監督向け（承認・管理）
│   ├── user-guide-admin.md               # 管理者向け（設定・カスタマイズ）
│   └── troubleshooting.md               # FAQ・トラブルシューティング
└── sample-data/                           # テスト用サンプルデータ
    ├── README.md                         # サンプルデータ説明
    ├── master-projects.csv               # 案件マスタ（3件）
    ├── master-workers.csv                # 作業員マスタ（10名）
    ├── master-work-types.csv             # 作業内容マスタ（20種）
    ├── sample-attendance.csv             # 出退勤記録（2週間分）
    └── sample-daily-reports.csv          # 日報（2週間分）
```

## 自動化ルール一覧

| # | ルール名 | トリガー | 内容 |
|---|---------|---------|------|
| A1 | 退勤データ統合 | 退勤レコード追加 | 出勤レコードに退勤時刻を転記 |
| A2 | 日報未提出リマインダー | 毎日18:00 | 全作業員にリマインド通知（※フラグ方式で未提出者限定も可） |
| A3 | 承認依頼通知 | 日報提出時 | 班長に通知 |
| A4 | 承認フロー進行 | 班長承認時 | 現場監督に通知 |
| A5 | 差戻し通知 | 差戻し時 | 報告者に通知 |
| A6 | 長時間勤務アラート | 実働12h超 | 班長+管理者に警告 |
| A7 | GPS異常検知 | 出勤打刻時 | GPS許容半径超で通知 |

## 人工数の計算ルール

| 実働時間 | 人工数 |
|---------|--------|
| 7時間以上 | 1.0 人工 |
| 4時間以上7時間未満 | 0.5 人工 |
| 4時間未満 | 0 人工 |

※ 閾値は企業ごとにカスタマイズ可能（[管理者ガイド](manuals/user-guide-admin.md)参照）

## カスタマイズのポイント

- **人工数の閾値変更**: 数式フィールドの値を編集
- **GPS許容半径の変更**: 案件マスタのGPS許容半径フィールド
- **承認フローの簡略化**: 2段階→1段階に変更可能
- **作業内容の追加**: 作業内容マスタにレコード追加
- **フィールドの追加**: 残業時間、交通費、資格情報等

## 既存SaaSとの比較

| 項目 | 本テンプレート | ANDPAD等 |
|------|--------------|----------|
| 初期費用 | 0円（Lark利用料のみ） | 数十万円〜 |
| 月額費用 | Larkプラン料金 | 数万円/月〜 |
| 導入期間 | 半日〜1日 | 数週間〜数ヶ月 |
| カスタマイズ | 自由（Bitable） | 制限あり |
| 対象規模 | 〜100人 | 大規模対応 |

## 制限事項

- Bitableの自動化は複雑な条件分岐に制約あり
- GPS距離計算は簡易近似（Haversine公式の完全実装ではない）
- フォームは新規レコード作成のみ（既存レコード編集不可）
- 大規模データ（数万件〜）ではパフォーマンス低下の可能性

## 運用マニュアル

| 対象 | ガイド |
|------|--------|
| 職人（スマホ操作） | [user-guide-worker.md](manuals/user-guide-worker.md) |
| 班長・現場監督 | [user-guide-foreman.md](manuals/user-guide-foreman.md) |
| 管理者 | [user-guide-admin.md](manuals/user-guide-admin.md) |
| トラブル時 | [troubleshooting.md](manuals/troubleshooting.md) |

---

*Built with Lark Bitable | constM Project | 2026-02-25*
