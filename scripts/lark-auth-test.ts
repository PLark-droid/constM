/**
 * Lark API auth test script.
 * Verifies tenant_access_token retrieval and API connectivity.
 *
 * Usage: npm run lark:auth-test
 */
import 'dotenv/config';
import { createLarkClientFromEnv } from '../src/lark/index.js';

async function main() {
  console.log('--- Lark API Authentication Test ---');
  console.log(`LARK_APP_ID: ${process.env['LARK_APP_ID']?.slice(0, 8)}...`);

  const client = createLarkClientFromEnv();
  const token = await client.verifyAuth();

  console.log(`tenant_access_token: ${token.slice(0, 12)}...`);
  console.log('Auth test PASSED');
}

main().catch((err) => {
  console.error('Auth test FAILED:', err.message);
  process.exit(1);
});
