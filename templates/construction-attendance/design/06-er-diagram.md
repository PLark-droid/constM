# ER図（Entity-Relationship Diagram）

建設業向け勤怠・日報テンプレート -- Lark Bitable テーブル間のリレーションを示すER図

本ドキュメントでは、6つのテーブル間の関連性をMermaid形式で視覚化する。
テーブル設計書（01-table-schema.md）で定義された全テーブルとリレーションを網羅している。

---

## ER図

```mermaid
erDiagram
    tbl_projects ||--o{ tbl_attendance : "出勤先案件"
    tbl_projects ||--o{ tbl_daily_reports : "作業案件"
    tbl_projects ||--o{ tbl_monthly_summary : "集計対象案件"
    tbl_projects }o--o{ tbl_workers : "所属案件"

    tbl_workers ||--o{ tbl_attendance : "打刻者"
    tbl_workers ||--o{ tbl_daily_reports : "報告者"
    tbl_workers ||--o{ tbl_monthly_summary : "集計対象作業員"

    tbl_work_types ||--o{ tbl_daily_reports : "作業内容1-3"

    tbl_projects {
        auto_number fld_project_id PK "案件ID (PJ-xxx)"
        text fld_project_name "案件名"
        text fld_site_address "現場住所"
        number fld_site_lat "現場GPS緯度"
        number fld_site_lng "現場GPS経度"
        number fld_gps_radius "GPS許容半径(m)"
        text fld_client "発注者"
        date fld_start_date "工期開始"
        date fld_end_date "工期終了"
        select fld_project_status "ステータス"
        user fld_site_manager "現場監督"
        text fld_project_note "備考"
    }

    tbl_workers {
        auto_number fld_worker_id PK "作業員ID (W-xxx)"
        text fld_worker_name "氏名"
        user fld_lark_account "Larkアカウント"
        select fld_job_type "職種"
        text fld_team "所属班"
        checkbox fld_is_leader "班長フラグ"
        currency fld_daily_rate "日当単価(円)"
        phone fld_contact "連絡先"
        select fld_worker_status "ステータス"
        link fld_assigned_projects FK "所属案件"
    }

    tbl_work_types {
        auto_number fld_work_code PK "作業コード (WT-xxx)"
        select fld_work_category "作業大分類"
        text fld_work_name "作業名"
        number fld_standard_manday "標準人工"
    }

    tbl_attendance {
        auto_number fld_attendance_id PK "打刻ID (ATT-xxxx)"
        link fld_att_worker FK "作業員"
        link fld_att_project FK "対象案件"
        select fld_punch_type "打刻種別"
        date fld_att_date "打刻日"
        datetime fld_clock_in "出勤時刻"
        datetime fld_clock_out "退勤時刻"
        geo fld_gps_in "出勤GPS"
        geo fld_gps_out "退勤GPS"
        number fld_break_hours "休憩時間(h)"
        formula fld_actual_hours "実働時間(h)"
        formula fld_manday "人工数"
        select fld_weather "天候"
        select fld_att_status "出勤ステータス"
        select fld_att_approval "承認状態"
        text fld_att_note "備考"
    }

    tbl_daily_reports {
        auto_number fld_report_id PK "日報ID (DR-xxxx)"
        link fld_reporter FK "報告者"
        link fld_report_project FK "対象案件"
        date fld_report_date "報告日"
        link fld_work1 FK "作業内容1"
        number fld_work1_hours "作業時間1(h)"
        link fld_work2 FK "作業内容2"
        number fld_work2_hours "作業時間2(h)"
        link fld_work3 FK "作業内容3"
        number fld_work3_hours "作業時間3(h)"
        text fld_progress_memo "進捗メモ"
        text fld_safety_note "安全事項"
        text fld_next_plan "明日の予定"
        attachment fld_photos "写真"
        select fld_report_approval "承認状態"
        text fld_approval_comment "承認コメント"
    }

    tbl_monthly_summary {
        auto_number fld_summary_id PK "集計ID (MS-xxx)"
        date fld_target_month "対象年月"
        link fld_summary_worker FK "作業員"
        link fld_summary_project FK "対象案件"
        number fld_work_days "出勤日数"
        number fld_total_hours "総実働時間(h)"
        number fld_total_mandays "総人工数"
        formula fld_total_amount "金額(円)"
    }
```

---

## リレーション説明

### 1. 案件マスタ (tbl_projects) と 作業員マスタ (tbl_workers) -- 多対多

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対多 (M:N) |
| 結合フィールド | `tbl_workers.fld_assigned_projects` → `tbl_projects.fld_project_id` |
| 説明 | 1人の作業員は複数の案件に所属でき、1つの案件には複数の作業員が配属される。Lark Bitableのリンクフィールド（複数選択可）で実現している。 |

### 2. 出退勤記録 (tbl_attendance) と 作業員マスタ (tbl_workers) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_attendance.fld_att_worker` → `tbl_workers.fld_worker_id` |
| 説明 | 各出退勤記録は1人の作業員に紐づく。1人の作業員は複数の出退勤記録を持つ。 |

### 3. 出退勤記録 (tbl_attendance) と 案件マスタ (tbl_projects) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_attendance.fld_att_project` → `tbl_projects.fld_project_id` |
| 説明 | 各出退勤記録は1つの案件に紐づく。1つの案件には複数の出退勤記録が発生する。GPS座標と案件の現場座標を比較し、許容半径内かチェックする。 |

### 4. 日報 (tbl_daily_reports) と 作業員マスタ (tbl_workers) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_daily_reports.fld_reporter` → `tbl_workers.fld_worker_id` |
| 説明 | 各日報は1人の作業員（報告者）に紐づく。1人の作業員は日々日報を提出するため、複数の日報レコードを持つ。 |

### 5. 日報 (tbl_daily_reports) と 案件マスタ (tbl_projects) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_daily_reports.fld_report_project` → `tbl_projects.fld_project_id` |
| 説明 | 各日報は1つの案件に紐づく。1つの案件には複数の日報が蓄積される。 |

### 6. 日報 (tbl_daily_reports) と 作業内容マスタ (tbl_work_types) -- 多対1（3リンク）

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) x 3 |
| 結合フィールド | `tbl_daily_reports.fld_work1` → `tbl_work_types.fld_work_code` |
|  | `tbl_daily_reports.fld_work2` → `tbl_work_types.fld_work_code` |
|  | `tbl_daily_reports.fld_work3` → `tbl_work_types.fld_work_code` |
| 説明 | 各日報は最大3つの作業内容を参照できる。作業内容1は必須、作業内容2・3は任意。同一の作業内容マスタレコードが複数の日報から参照される。 |

### 7. 工数集計 (tbl_monthly_summary) と 作業員マスタ (tbl_workers) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_monthly_summary.fld_summary_worker` → `tbl_workers.fld_worker_id` |
| 説明 | 各工数集計レコードは1人の作業員に紐づく。1人の作業員は月ごと・案件ごとに集計レコードが作成されるため、複数の集計レコードを持つ。 |

### 8. 工数集計 (tbl_monthly_summary) と 案件マスタ (tbl_projects) -- 多対1

| 項目 | 内容 |
|------|------|
| カーディナリティ | 多対1 (N:1) |
| 結合フィールド | `tbl_monthly_summary.fld_summary_project` → `tbl_projects.fld_project_id` |
| 説明 | 各工数集計レコードは1つの案件に紐づく。1つの案件には月ごと・作業員ごとに複数の集計レコードが存在する。金額は「総人工数 x 日当単価（T2からルックアップ）」で算出される。 |

---

## リレーション概要図（テキスト版）

```
                    +-------------------+
                    | T3: 作業内容マスタ |
                    | tbl_work_types    |
                    +--------+----------+
                             |
                             | 作業内容1~3 (N:1 x3)
                             |
+----------------+    +------v-----------+    +------------------+
| T1: 案件マスタ  |<---| T5: 日報          |<---| T2: 作業員マスタ  |
| tbl_projects   |    | tbl_daily_reports |    | tbl_workers      |
+---+------+-----+    +------------------+    +---+---------+----+
    |      |                                      |         |
    |      |    +------------------+              |         |
    |      +----| T4: 出退勤記録    |--------------+         |
    |           | tbl_attendance   |                        |
    |           +------------------+                        |
    |                                                       |
    |           +------------------+                        |
    +-----------| T6: 工数集計      |------------------------+
                | tbl_monthly_     |
                | summary          |
                +------------------+

T1 <--M:N--> T2  (所属案件リンク)
```

---

*最終更新: 2026-02-25*
