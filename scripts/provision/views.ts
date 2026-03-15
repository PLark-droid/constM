/**
 * View provisioning logic.
 * Creates additional views for all tables (default view is created with each table).
 */
import { LarkClient } from '../../src/lark/index.js';
import { VIEW_DEFINITIONS } from './view-definitions.js';

/**
 * Provision all additional views.
 * Returns count of views created.
 */
export async function provisionViews(
  client: LarkClient,
  appToken: string,
  tableMap: Record<string, string>,
): Promise<number> {
  let count = 0;
  for (const viewDef of VIEW_DEFINITIONS) {
    const tableId = tableMap[viewDef.tableKey];
    if (!tableId) {
      console.error(`    SKIP view "${viewDef.viewName}": table ${viewDef.tableKey} not found`);
      continue;
    }
    console.log(`    ${viewDef.tableKey} / ${viewDef.viewName} (${viewDef.viewType})`);
    await client.createView(appToken, tableId, viewDef.viewName, viewDef.viewType);
    count++;
  }
  return count;
}
