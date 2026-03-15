/**
 * Bitable Provisioning - Main Entry Point
 *
 * Creates a new Bitable Base and orchestrates table/field/view creation.
 *
 * Usage: npm run provision:base
 */
import 'dotenv/config';
import { createLarkClientFromEnv } from '../../src/lark/index.js';
import { provisionTables } from './tables.js';
import { provisionViews } from './views.js';

const BASE_NAME = '建設業 勤怠・日報管理';

export interface ProvisionResult {
  appToken: string;
  url: string;
  tables: Record<string, string>;
  viewCount: number;
}

async function main(): Promise<void> {
  console.log('=== Bitable Provisioning Start ===');
  console.log(`Base name: ${BASE_NAME}`);
  console.log();

  const client = createLarkClientFromEnv();

  // Step 1: Verify auth
  console.log('[1/4] Verifying Lark API authentication...');
  await client.verifyAuth();
  console.log('  Auth OK');

  // Step 2: Create Base
  console.log('[2/4] Creating Bitable Base...');
  const { appToken, url } = await client.createBitableBase(BASE_NAME);
  console.log(`  Base created: appToken=${appToken}`);
  if (url) console.log(`  URL: ${url}`);

  // Step 3: Create tables with fields
  console.log('[3/4] Creating tables and fields...');
  const tables = await provisionTables(client, appToken);

  // Step 4: Create views
  console.log('[4/4] Creating views...');
  const viewCount = await provisionViews(client, appToken, tables);
  console.log(`  ${viewCount} views created`);

  console.log();
  console.log('=== Provisioning Complete ===');
  console.log('App Token:', appToken);
  console.log('Tables:');
  for (const [name, id] of Object.entries(tables)) {
    console.log(`  ${name}: ${id}`);
  }
  console.log(`Views: ${viewCount} additional views (+ 6 default views)`);

  const result: ProvisionResult = { appToken, url, tables, viewCount };
  console.log();
  console.log('Result JSON:');
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error('Provisioning FAILED:', err.message);
  process.exit(1);
});
