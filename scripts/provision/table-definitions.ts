/**
 * Table definitions for the construction attendance/daily-report template.
 * Based on: templates/construction-attendance/design/01-table-schema.md
 */
import { FieldType } from '../../src/lark/index.js';

export interface FieldDef {
  field_name: string;
  type: number;
  property?: Record<string, unknown>;
}

export interface TableDef {
  name: string;
  key: string; // internal key for referencing
  fields: FieldDef[];
}

// --- T1: 案件マスタ ---
const T1_PROJECTS: TableDef = {
  name: '案件マスタ',
  key: 'tbl_projects',
  fields: [
    {
      field_name: '案件ID',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'PJ-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 3 }] } },
    },
    { field_name: '案件名', type: FieldType.Text },
    { field_name: '現場住所', type: FieldType.Text },
    { field_name: '現場GPS緯度', type: FieldType.Number, property: { formatter: '0.000000' } },
    { field_name: '現場GPS経度', type: FieldType.Number, property: { formatter: '0.000000' } },
    { field_name: 'GPS許容半径(m)', type: FieldType.Number, property: { formatter: '0' } },
    { field_name: '発注者', type: FieldType.Text },
    { field_name: '工期開始', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd' } },
    { field_name: '工期終了', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd' } },
    {
      field_name: 'ステータス',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: '準備中' },
          { name: '進行中' },
          { name: '完了' },
          { name: '中止' },
        ],
      },
    },
    { field_name: '現場監督', type: FieldType.User, property: { multiple: false } },
    { field_name: '備考', type: FieldType.Text },
  ],
};

// --- T2: 作業員マスタ ---
const T2_WORKERS: TableDef = {
  name: '作業員マスタ',
  key: 'tbl_workers',
  fields: [
    {
      field_name: '作業員ID',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'W-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 3 }] } },
    },
    { field_name: '氏名', type: FieldType.Text },
    { field_name: 'Larkアカウント', type: FieldType.User, property: { multiple: false } },
    {
      field_name: '職種',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: 'とび' },
          { name: '鉄筋工' },
          { name: '型枠大工' },
          { name: '左官' },
          { name: '電気工' },
          { name: '配管工' },
          { name: '塗装工' },
          { name: '解体工' },
          { name: '重機オペレーター' },
          { name: 'その他' },
        ],
      },
    },
    { field_name: '所属班', type: FieldType.Text },
    { field_name: '班長フラグ', type: FieldType.Checkbox },
    { field_name: '日当単価(円)', type: FieldType.Currency, property: { currency_code: 'JPY', formatter: '0' } },
    { field_name: '連絡先', type: FieldType.Phone },
    {
      field_name: 'ステータス',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: '稼働中' },
          { name: '休職中' },
          { name: '退職済' },
        ],
      },
    },
    // T2 field 10 (所属案件: Link to T1) is created after T1 exists — handled in tables.ts
  ],
};

// --- T3: 作業内容マスタ ---
const T3_WORK_TYPES: TableDef = {
  name: '作業内容マスタ',
  key: 'tbl_work_types',
  fields: [
    {
      field_name: '作業コード',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'WT-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 3 }] } },
    },
    {
      field_name: '作業大分類',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: '仮設' },
          { name: '土工' },
          { name: '基礎' },
          { name: '躯体' },
          { name: '仕上' },
          { name: '設備' },
          { name: '外構' },
          { name: 'その他' },
        ],
      },
    },
    { field_name: '作業名', type: FieldType.Text },
    { field_name: '標準人工', type: FieldType.Number, property: { formatter: '0.0' } },
  ],
};

// --- T4: 出退勤記録 ---
const T4_ATTENDANCE: TableDef = {
  name: '出退勤記録',
  key: 'tbl_attendance',
  fields: [
    {
      field_name: '打刻ID',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'ATT-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 4 }] } },
    },
    // Links to T2, T1 — created in tables.ts after those tables exist
    {
      field_name: '打刻種別',
      type: FieldType.SingleSelect,
      property: { options: [{ name: '出勤' }, { name: '退勤' }] },
    },
    { field_name: '打刻日', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd' } },
    { field_name: '出勤時刻', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd HH:mm' } },
    { field_name: '退勤時刻', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd HH:mm' } },
    { field_name: '出勤GPS', type: FieldType.Location },
    { field_name: '退勤GPS', type: FieldType.Location },
    { field_name: '休憩時間(h)', type: FieldType.Number, property: { formatter: '0.0' } },
    // Formula fields (実働時間, 人工数) are created after basic fields
    {
      field_name: '天候',
      type: FieldType.SingleSelect,
      property: { options: [{ name: '晴' }, { name: '曇' }, { name: '雨' }, { name: '雪' }, { name: '強風' }] },
    },
    {
      field_name: '出勤ステータス',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: '通常' },
          { name: '遅刻' },
          { name: '早退' },
          { name: '直行' },
          { name: '直帰' },
          { name: '直行直帰' },
          { name: '欠勤' },
          { name: '休日出勤' },
        ],
      },
    },
    {
      field_name: '承認状態',
      type: FieldType.SingleSelect,
      property: { options: [{ name: '未承認' }, { name: '班長承認' }, { name: '監督承認' }, { name: '差戻し' }] },
    },
    { field_name: '備考', type: FieldType.Text },
  ],
};

// --- T5: 日報 ---
const T5_DAILY_REPORTS: TableDef = {
  name: '日報',
  key: 'tbl_daily_reports',
  fields: [
    {
      field_name: '日報ID',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'DR-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 4 }] } },
    },
    // Links to T2, T1, T3 — created in tables.ts
    { field_name: '報告日', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM/dd' } },
    // work1-3 links and hours — links in tables.ts
    { field_name: '作業時間1(h)', type: FieldType.Number, property: { formatter: '0.0' } },
    { field_name: '作業時間2(h)', type: FieldType.Number, property: { formatter: '0.0' } },
    { field_name: '作業時間3(h)', type: FieldType.Number, property: { formatter: '0.0' } },
    { field_name: '進捗メモ', type: FieldType.Text },
    { field_name: '安全事項', type: FieldType.Text },
    { field_name: '明日の予定', type: FieldType.Text },
    { field_name: '写真', type: FieldType.Attachment },
    {
      field_name: '承認状態',
      type: FieldType.SingleSelect,
      property: {
        options: [
          { name: '未提出' },
          { name: '提出済' },
          { name: '班長承認' },
          { name: '監督承認' },
          { name: '差戻し' },
        ],
      },
    },
    { field_name: '承認コメント', type: FieldType.Text },
  ],
};

// --- T6: 工数集計 ---
const T6_MONTHLY_SUMMARY: TableDef = {
  name: '工数集計',
  key: 'tbl_monthly_summary',
  fields: [
    {
      field_name: '集計ID',
      type: FieldType.AutoNumber,
      property: { auto_serial: { type: 'custom', options: [{ type: 'fixedText', value: 'MS-' }, { type: 'autoNumber', rule: 'increaseNumber', digits: 3 }] } },
    },
    { field_name: '対象年月', type: FieldType.DateTime, property: { date_formatter: 'yyyy/MM' } },
    // Links to T2, T1 — created in tables.ts
    { field_name: '出勤日数', type: FieldType.Number, property: { formatter: '0' } },
    { field_name: '総実働時間(h)', type: FieldType.Number, property: { formatter: '0.0' } },
    { field_name: '総人工数', type: FieldType.Number, property: { formatter: '0.0' } },
    // Formula field (金額) — created in tables.ts after lookup
  ],
};

export const TABLE_DEFINITIONS: TableDef[] = [
  T1_PROJECTS,
  T2_WORKERS,
  T3_WORK_TYPES,
  T4_ATTENDANCE,
  T5_DAILY_REPORTS,
  T6_MONTHLY_SUMMARY,
];

/**
 * Link field definitions — created after all base tables exist.
 * [sourceTableKey, fieldName, targetTableKey, multiple]
 */
export const LINK_DEFINITIONS: Array<[string, string, string, boolean]> = [
  // T2.所属案件 → T1
  ['tbl_workers', '所属案件', 'tbl_projects', true],
  // T4.作業員 → T2
  ['tbl_attendance', '作業員', 'tbl_workers', false],
  // T4.対象案件 → T1
  ['tbl_attendance', '対象案件', 'tbl_projects', false],
  // T5.報告者 → T2
  ['tbl_daily_reports', '報告者', 'tbl_workers', false],
  // T5.対象案件 → T1
  ['tbl_daily_reports', '対象案件', 'tbl_projects', false],
  // T5.作業内容1 → T3
  ['tbl_daily_reports', '作業内容1', 'tbl_work_types', false],
  // T5.作業内容2 → T3
  ['tbl_daily_reports', '作業内容2', 'tbl_work_types', false],
  // T5.作業内容3 → T3
  ['tbl_daily_reports', '作業内容3', 'tbl_work_types', false],
  // T6.作業員 → T2
  ['tbl_monthly_summary', '作業員', 'tbl_workers', false],
  // T6.対象案件 → T1
  ['tbl_monthly_summary', '対象案件', 'tbl_projects', false],
];

/**
 * Formula field definitions — created after link fields exist.
 * [tableKey, fieldName, formula]
 */
export const FORMULA_DEFINITIONS: Array<[string, string, string]> = [
  // T4: 実働時間
  [
    'tbl_attendance',
    '実働時間(h)',
    'IF(AND([出勤時刻],[退勤時刻]),MAX((HOUR([退勤時刻])*60+MINUTE([退勤時刻])-HOUR([出勤時刻])*60-MINUTE([出勤時刻]))/60-[休憩時間(h)],0),0)',
  ],
  // T4: 人工数
  [
    'tbl_attendance',
    '人工数',
    'IF([実働時間(h)]>=7,1.0,IF([実働時間(h)]>=4,0.5,0))',
  ],
];
