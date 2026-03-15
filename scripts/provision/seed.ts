/**
 * Seed data import script.
 * Imports master data (projects, workers, work types) into Bitable.
 *
 * Usage: npm run provision:seed -- --app-token <TOKEN>
 */
import 'dotenv/config';
import { createLarkClientFromEnv } from '../../src/lark/index.js';
import { PROJECTS_SEED, WORKERS_SEED, WORK_TYPES_SEED } from './seed-data.js';

async function main(): Promise<void> {
  const appToken = process.argv.find((_, i, arr) => arr[i - 1] === '--app-token');
  if (!appToken) {
    console.error('Usage: npm run provision:seed -- --app-token <APP_TOKEN>');
    process.exit(1);
  }

  console.log('=== Seed Data Import Start ===');
  console.log(`App Token: ${appToken}`);
  console.log();

  const client = createLarkClientFromEnv();

  // Get table list to find table IDs
  const tables = await client.listTables(appToken);
  const tableMap = new Map(tables.map((t) => [t.name, t.tableId]));

  // Seed T1: 案件マスタ
  const projectsTableId = tableMap.get('案件マスタ');
  if (projectsTableId) {
    console.log(`[1/3] Seeding 案件マスタ (${PROJECTS_SEED.length} records)...`);
    const result = await client.createRecords(
      appToken,
      projectsTableId,
      PROJECTS_SEED.map((r) => ({ fields: r as Record<string, string | number | boolean> })),
    );
    console.log(`  -> ${result.count} records created`);
  } else {
    console.error('  SKIP: 案件マスタ table not found');
  }

  // Seed T2: 作業員マスタ
  const workersTableId = tableMap.get('作業員マスタ');
  if (workersTableId) {
    console.log(`[2/3] Seeding 作業員マスタ (${WORKERS_SEED.length} records)...`);
    const result = await client.createRecords(
      appToken,
      workersTableId,
      WORKERS_SEED.map((r) => ({ fields: r as Record<string, string | number | boolean> })),
    );
    console.log(`  -> ${result.count} records created`);
  } else {
    console.error('  SKIP: 作業員マスタ table not found');
  }

  // Seed T3: 作業内容マスタ
  const workTypesTableId = tableMap.get('作業内容マスタ');
  if (workTypesTableId) {
    console.log(`[3/3] Seeding 作業内容マスタ (${WORK_TYPES_SEED.length} records)...`);
    const result = await client.createRecords(
      appToken,
      workTypesTableId,
      WORK_TYPES_SEED.map((r) => ({ fields: r as Record<string, string | number | boolean> })),
    );
    console.log(`  -> ${result.count} records created`);
  } else {
    console.error('  SKIP: 作業内容マスタ table not found');
  }

  console.log();
  console.log('=== Seed Data Import Complete ===');
}

main().catch((err) => {
  console.error('Seed import FAILED:', err.message);
  process.exit(1);
});
