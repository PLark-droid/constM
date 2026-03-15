import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LarkClient, createLarkClientFromEnv } from '../../src/lark/client.js';

describe('LarkClient', () => {
  const config = { appId: 'test_app_id', appSecret: 'test_secret' };

  it('should create a client instance', () => {
    const client = new LarkClient(config);
    expect(client).toBeDefined();
    expect(client.client).toBeDefined();
  });

  describe('verifyAuth', () => {
    it('should return token on success', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 0, msg: 'ok', tenant_access_token: 't-mock-token-123' };
      vi.spyOn(client.client.auth.tenantAccessToken, 'internal').mockResolvedValue(mockResponse as never);

      const token = await client.verifyAuth();
      expect(token).toBe('t-mock-token-123');
    });

    it('should throw on auth failure', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 10003, msg: 'invalid app_id', tenant_access_token: '' };
      vi.spyOn(client.client.auth.tenantAccessToken, 'internal').mockResolvedValue(mockResponse as never);

      await expect(client.verifyAuth()).rejects.toThrow('Lark auth failed');
    });
  });

  describe('createBitableBase', () => {
    it('should return appToken and url', async () => {
      const client = new LarkClient(config);
      const mockResponse = {
        code: 0,
        msg: 'ok',
        data: { app: { app_token: 'bascnXXXX', url: 'https://example.com/base' } },
      };
      vi.spyOn(client.client.bitable.app, 'create').mockResolvedValue(mockResponse as never);

      const result = await client.createBitableBase('Test Base');
      expect(result.appToken).toBe('bascnXXXX');
      expect(result.url).toBe('https://example.com/base');
    });

    it('should throw on API error', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 99999, msg: 'permission denied', data: {} };
      vi.spyOn(client.client.bitable.app, 'create').mockResolvedValue(mockResponse as never);

      await expect(client.createBitableBase('Test')).rejects.toThrow('Create Bitable Base failed');
    });
  });

  describe('createTable', () => {
    it('should return tableId', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 0, msg: 'ok', data: { table_id: 'tblXXXX' } };
      vi.spyOn(client.client.bitable.appTable, 'create').mockResolvedValue(mockResponse as never);

      const result = await client.createTable('bascnXXXX', 'TestTable', []);
      expect(result.tableId).toBe('tblXXXX');
    });
  });

  describe('createField', () => {
    it('should return fieldId', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 0, msg: 'ok', data: { field: { field_id: 'fldXXXX' } } };
      vi.spyOn(client.client.bitable.appTableField, 'create').mockResolvedValue(mockResponse as never);

      const result = await client.createField('bascnXXXX', 'tblXXXX', 'TestField', 1);
      expect(result.fieldId).toBe('fldXXXX');
    });
  });

  describe('createView', () => {
    it('should return viewId', async () => {
      const client = new LarkClient(config);
      const mockResponse = { code: 0, msg: 'ok', data: { view: { view_id: 'viwXXXX' } } };
      vi.spyOn(client.client.bitable.appTableView, 'create').mockResolvedValue(mockResponse as never);

      const result = await client.createView('bascnXXXX', 'tblXXXX', 'TestView');
      expect(result.viewId).toBe('viwXXXX');
    });
  });

  describe('createRecords', () => {
    it('should return record count', async () => {
      const client = new LarkClient(config);
      const mockResponse = {
        code: 0,
        msg: 'ok',
        data: { records: [{ record_id: 'rec1' }, { record_id: 'rec2' }] },
      };
      vi.spyOn(client.client.bitable.appTableRecord, 'batchCreate').mockResolvedValue(mockResponse as never);

      const result = await client.createRecords('bascnXXXX', 'tblXXXX', [
        { fields: { name: 'a' } },
        { fields: { name: 'b' } },
      ]);
      expect(result.count).toBe(2);
    });
  });
});

describe('createLarkClientFromEnv', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('should create client from env vars', () => {
    vi.stubEnv('LARK_APP_ID', 'test_id');
    vi.stubEnv('LARK_APP_SECRET', 'test_secret');

    const client = createLarkClientFromEnv();
    expect(client).toBeInstanceOf(LarkClient);
  });

  it('should throw if env vars missing', () => {
    vi.stubEnv('LARK_APP_ID', '');
    vi.stubEnv('LARK_APP_SECRET', '');

    expect(() => createLarkClientFromEnv()).toThrow('Missing LARK_APP_ID or LARK_APP_SECRET');
  });
});
