import { describe, it, expect } from 'vitest';
import { PROJECTS_SEED, WORKERS_SEED, WORK_TYPES_SEED } from '../../scripts/provision/seed-data.js';

describe('PROJECTS_SEED', () => {
  it('should have 3 projects', () => {
    expect(PROJECTS_SEED).toHaveLength(3);
  });

  it('each project should have required fields', () => {
    for (const p of PROJECTS_SEED) {
      expect(p).toHaveProperty('案件名');
      expect(p).toHaveProperty('現場住所');
      expect(p).toHaveProperty('ステータス');
    }
  });
});

describe('WORKERS_SEED', () => {
  it('should have 10 workers', () => {
    expect(WORKERS_SEED).toHaveLength(10);
  });

  it('should have 2 leaders', () => {
    const leaders = WORKERS_SEED.filter((w) => w.班長フラグ);
    expect(leaders).toHaveLength(2);
  });

  it('each worker should have required fields', () => {
    for (const w of WORKERS_SEED) {
      expect(w).toHaveProperty('氏名');
      expect(w).toHaveProperty('職種');
      expect(w).toHaveProperty('日当単価(円)');
      expect(w).toHaveProperty('ステータス');
    }
  });
});

describe('WORK_TYPES_SEED', () => {
  it('should have 20 work types', () => {
    expect(WORK_TYPES_SEED).toHaveLength(20);
  });

  it('should cover all 8 categories', () => {
    const categories = new Set(WORK_TYPES_SEED.map((w) => w.作業大分類));
    expect(categories.size).toBe(8);
  });
});
