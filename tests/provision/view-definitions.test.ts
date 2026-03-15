import { describe, it, expect } from 'vitest';
import { VIEW_DEFINITIONS } from '../../scripts/provision/view-definitions.js';
import { TABLE_DEFINITIONS } from '../../scripts/provision/table-definitions.js';

describe('VIEW_DEFINITIONS', () => {
  it('should have 14 additional views (20 total - 6 default)', () => {
    expect(VIEW_DEFINITIONS).toHaveLength(14);
  });

  it('all tableKeys should exist in TABLE_DEFINITIONS', () => {
    const validKeys = TABLE_DEFINITIONS.map((t) => t.key);
    for (const view of VIEW_DEFINITIONS) {
      expect(validKeys).toContain(view.tableKey);
    }
  });

  it('should have correct view counts per table', () => {
    const countByTable: Record<string, number> = {};
    for (const v of VIEW_DEFINITIONS) {
      countByTable[v.tableKey] = (countByTable[v.tableKey] ?? 0) + 1;
    }
    // T1: 2 additional (+ 1 default = 3)
    expect(countByTable['tbl_projects']).toBe(2);
    // T2: 2 additional (+ 1 default = 3)
    expect(countByTable['tbl_workers']).toBe(2);
    // T3: 0 additional (1 default only)
    expect(countByTable['tbl_work_types']).toBeUndefined();
    // T4: 5 additional (+ 1 default = 6)
    expect(countByTable['tbl_attendance']).toBe(5);
    // T5: 4 additional (+ 1 default = 5)
    expect(countByTable['tbl_daily_reports']).toBe(4);
    // T6: 1 additional (+ 1 default = 2)
    expect(countByTable['tbl_monthly_summary']).toBe(1);
  });

  it('each view should have a valid viewType', () => {
    const validTypes = ['grid', 'kanban', 'gallery', 'gantt', 'form'];
    for (const v of VIEW_DEFINITIONS) {
      expect(validTypes).toContain(v.viewType);
    }
  });
});
