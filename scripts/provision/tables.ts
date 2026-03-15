/**
 * Table provisioning logic.
 * Creates tables, fields, link fields, and formula fields in the correct order.
 */
import { LarkClient } from '../../src/lark/index.js';
import { FieldType } from '../../src/lark/field-types.js';
import {
  TABLE_DEFINITIONS,
  LINK_DEFINITIONS,
  FORMULA_DEFINITIONS,
} from './table-definitions.js';

/**
 * Provision all tables and fields in a Bitable Base.
 * Returns a map of table key -> table ID.
 */
export async function provisionTables(
  client: LarkClient,
  appToken: string,
): Promise<Record<string, string>> {
  const tableMap: Record<string, string> = {};

  // Phase 1: Create tables with basic (non-link, non-formula) fields
  console.log('  Phase 1: Creating base tables...');
  for (const tableDef of TABLE_DEFINITIONS) {
    console.log(`    Creating table: ${tableDef.name}`);
    const { tableId } = await client.createTable(appToken, tableDef.name, tableDef.fields);
    tableMap[tableDef.key] = tableId;
    console.log(`    -> ${tableDef.key} = ${tableId}`);
  }

  // Phase 2: Create link fields (require both source and target tables to exist)
  console.log('  Phase 2: Creating link fields...');
  for (const [sourceKey, fieldName, targetKey, multiple] of LINK_DEFINITIONS) {
    const sourceTableId = tableMap[sourceKey];
    const targetTableId = tableMap[targetKey];
    if (!sourceTableId || !targetTableId) {
      console.error(`    SKIP: ${sourceKey}.${fieldName} -> ${targetKey} (table not found)`);
      continue;
    }
    console.log(`    ${sourceKey}.${fieldName} -> ${targetKey}`);
    await client.createField(appToken, sourceTableId, fieldName, FieldType.Link, {
      table_id: targetTableId,
      multiple,
    });
  }

  // Phase 3: Create formula fields (may reference link/lookup fields)
  console.log('  Phase 3: Creating formula fields...');
  for (const [tableKey, fieldName, formula] of FORMULA_DEFINITIONS) {
    const tableId = tableMap[tableKey];
    if (!tableId) {
      console.error(`    SKIP: ${tableKey}.${fieldName} (table not found)`);
      continue;
    }
    console.log(`    ${tableKey}.${fieldName}`);
    await client.createField(appToken, tableId, fieldName, FieldType.Formula, {
      formula_expression: formula,
    });
  }

  return tableMap;
}
