import { describe, it, expect } from 'vitest';
import { TABLE_DEFINITIONS, LINK_DEFINITIONS, FORMULA_DEFINITIONS } from '../../scripts/provision/table-definitions.js';

describe('TABLE_DEFINITIONS', () => {
  it('should have 6 table definitions', () => {
    expect(TABLE_DEFINITIONS).toHaveLength(6);
  });

  it('should have correct table keys', () => {
    const keys = TABLE_DEFINITIONS.map((t) => t.key);
    expect(keys).toEqual([
      'tbl_projects',
      'tbl_workers',
      'tbl_work_types',
      'tbl_attendance',
      'tbl_daily_reports',
      'tbl_monthly_summary',
    ]);
  });

  it('T1 should have 12 fields', () => {
    const t1 = TABLE_DEFINITIONS.find((t) => t.key === 'tbl_projects')!;
    expect(t1.fields).toHaveLength(12);
  });

  it('T2 should have 9 fields (link added separately)', () => {
    const t2 = TABLE_DEFINITIONS.find((t) => t.key === 'tbl_workers')!;
    expect(t2.fields).toHaveLength(9);
  });

  it('T3 should have 4 fields', () => {
    const t3 = TABLE_DEFINITIONS.find((t) => t.key === 'tbl_work_types')!;
    expect(t3.fields).toHaveLength(4);
  });
});

describe('LINK_DEFINITIONS', () => {
  it('should have 10 link fields', () => {
    expect(LINK_DEFINITIONS).toHaveLength(10);
  });

  it('all source tables should exist in TABLE_DEFINITIONS', () => {
    const keys = TABLE_DEFINITIONS.map((t) => t.key);
    for (const [sourceKey] of LINK_DEFINITIONS) {
      expect(keys).toContain(sourceKey);
    }
  });

  it('all target tables should exist in TABLE_DEFINITIONS', () => {
    const keys = TABLE_DEFINITIONS.map((t) => t.key);
    for (const [, , targetKey] of LINK_DEFINITIONS) {
      expect(keys).toContain(targetKey);
    }
  });
});

describe('FORMULA_DEFINITIONS', () => {
  it('should have 2 formula fields for attendance', () => {
    expect(FORMULA_DEFINITIONS).toHaveLength(2);
    expect(FORMULA_DEFINITIONS.every(([key]) => key === 'tbl_attendance')).toBe(true);
  });
});
