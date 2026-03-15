/**
 * View definitions for all 20 views.
 * Based on: templates/construction-attendance/design/02-view-design.md
 *
 * Note: Bitable API can create views with name and type,
 * but filter/sort/group settings must be configured manually in Lark UI.
 */

export interface ViewDef {
  tableKey: string;
  viewName: string;
  viewType: 'grid' | 'kanban' | 'gallery' | 'gantt' | 'form';
}

export const VIEW_DEFINITIONS: ViewDef[] = [
  // T1: 案件マスタ (3 views)
  // Note: default view "案件マスタ_一覧" is auto-created with table
  { tableKey: 'tbl_projects', viewName: '進行中案件', viewType: 'kanban' },
  { tableKey: 'tbl_projects', viewName: '案件カレンダー', viewType: 'gantt' },

  // T2: 作業員マスタ (3 views)
  { tableKey: 'tbl_workers', viewName: '稼働中作業員', viewType: 'grid' },
  { tableKey: 'tbl_workers', viewName: '職種別一覧', viewType: 'grid' },

  // T3: 作業内容マスタ (1 view - default only)
  // Default view "作業内容マスタ_一覧" covers V3-1

  // T4: 出退勤記録 (6 views)
  // Default view covers "本日の出退勤" (V4-1) — rename at table creation
  { tableKey: 'tbl_attendance', viewName: '週次出退勤', viewType: 'grid' },
  { tableKey: 'tbl_attendance', viewName: '未承認一覧', viewType: 'grid' },
  { tableKey: 'tbl_attendance', viewName: '個人別月次', viewType: 'grid' },
  { tableKey: 'tbl_attendance', viewName: '案件別日次', viewType: 'grid' },
  { tableKey: 'tbl_attendance', viewName: '出退勤カレンダー', viewType: 'gantt' },

  // T5: 日報 (5 views)
  // Default view covers "本日の日報" (V5-1)
  { tableKey: 'tbl_daily_reports', viewName: '未提出確認', viewType: 'grid' },
  { tableKey: 'tbl_daily_reports', viewName: '承認待ち', viewType: 'grid' },
  { tableKey: 'tbl_daily_reports', viewName: '案件別日報', viewType: 'grid' },
  { tableKey: 'tbl_daily_reports', viewName: '日報ギャラリー', viewType: 'gallery' },

  // T6: 工数集計 (2 views)
  // Default view covers "月次集計一覧" (V6-1)
  { tableKey: 'tbl_monthly_summary', viewName: '案件別集計', viewType: 'grid' },
];
