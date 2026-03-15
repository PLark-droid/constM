import * as lark from '@larksuiteoapi/node-sdk';

export interface LarkClientConfig {
  appId: string;
  appSecret: string;
  logLevel?: lark.LoggerLevel;
}

/**
 * Lark API Client wrapper.
 * Uses tenant_access_token for all Bitable operations.
 */
export class LarkClient {
  readonly client: lark.Client;
  private config: LarkClientConfig;

  constructor(config: LarkClientConfig) {
    this.config = config;
    this.client = new lark.Client({
      appId: config.appId,
      appSecret: config.appSecret,
      appType: lark.AppType.SelfBuild,
      loggerLevel: config.logLevel ?? lark.LoggerLevel.warn,
    });
  }

  /**
   * Verify API connectivity by fetching tenant_access_token.
   * Returns the token string on success.
   */
  async verifyAuth(): Promise<string> {
    const resp = await this.client.auth.tenantAccessToken.internal({
      data: {
        app_id: this.config.appId,
        app_secret: this.config.appSecret,
      },
    });
    if (resp.code !== 0) {
      throw new Error(`Lark auth failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return (resp as Record<string, unknown>).tenant_access_token as string;
  }

  /**
   * Create a new Bitable Base (app).
   * Returns the app_token of the created base.
   */
  async createBitableBase(name: string, folderId?: string): Promise<{ appToken: string; url: string }> {
    const resp = await this.client.bitable.app.create({
      data: {
        name,
        folder_token: folderId,
      },
    });
    if (resp.code !== 0) {
      throw new Error(`Create Bitable Base failed: code=${resp.code}, msg=${resp.msg}`);
    }
    const app = resp.data?.app;
    if (!app?.app_token) {
      throw new Error('Create Bitable Base returned no app_token');
    }
    return {
      appToken: app.app_token,
      url: app.url ?? '',
    };
  }

  /**
   * Create a table in a Bitable Base.
   */
  async createTable(
    appToken: string,
    name: string,
    fields: Array<{ field_name: string; type: number; property?: Record<string, unknown> }>,
  ): Promise<{ tableId: string }> {
    const resp = await this.client.bitable.appTable.create({
      path: { app_token: appToken },
      data: {
        table: {
          name,
          default_view_name: `${name}_一覧`,
          fields: fields,
        },
      },
    });
    if (resp.code !== 0) {
      throw new Error(`Create table "${name}" failed: code=${resp.code}, msg=${resp.msg}`);
    }
    const tableId = resp.data?.table_id;
    if (!tableId) {
      throw new Error(`Create table "${name}" returned no table_id`);
    }
    return { tableId };
  }

  /**
   * Create a field in a table.
   */
  async createField(
    appToken: string,
    tableId: string,
    fieldName: string,
    fieldType: number,
    property?: Record<string, unknown>,
  ): Promise<{ fieldId: string }> {
    const resp = await this.client.bitable.appTableField.create({
      path: { app_token: appToken, table_id: tableId },
      data: {
        field_name: fieldName,
        type: fieldType,
        property,
      },
    });
    if (resp.code !== 0) {
      throw new Error(`Create field "${fieldName}" failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return { fieldId: resp.data?.field?.field_id ?? '' };
  }

  /**
   * Create a view for a table.
   */
  async createView(
    appToken: string,
    tableId: string,
    viewName: string,
    viewType: 'grid' | 'kanban' | 'gallery' | 'gantt' | 'form' = 'grid',
  ): Promise<{ viewId: string }> {
    const resp = await this.client.bitable.appTableView.create({
      path: { app_token: appToken, table_id: tableId },
      data: {
        view_name: viewName,
        view_type: viewType,
      },
    });
    if (resp.code !== 0) {
      throw new Error(`Create view "${viewName}" failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return { viewId: resp.data?.view?.view_id ?? '' };
  }

  /**
   * Create records (batch) in a table.
   */
  async createRecords(
    appToken: string,
    tableId: string,
    records: Array<{ fields: Record<string, string | number | boolean> }>,
  ): Promise<{ count: number }> {
    const resp = await this.client.bitable.appTableRecord.batchCreate({
      path: { app_token: appToken, table_id: tableId },
      data: { records },
    });
    if (resp.code !== 0) {
      throw new Error(`Batch create records failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return { count: resp.data?.records?.length ?? 0 };
  }

  /**
   * List all tables in a Base.
   */
  async listTables(appToken: string): Promise<Array<{ tableId: string; name: string }>> {
    const resp = await this.client.bitable.appTable.list({
      path: { app_token: appToken },
    });
    if (resp.code !== 0) {
      throw new Error(`List tables failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return (resp.data?.items ?? []).map((t) => ({
      tableId: t.table_id ?? '',
      name: t.name ?? '',
    }));
  }

  /**
   * List all fields in a table.
   */
  async listFields(
    appToken: string,
    tableId: string,
  ): Promise<Array<{ fieldId: string; fieldName: string; type: number }>> {
    const resp = await this.client.bitable.appTableField.list({
      path: { app_token: appToken, table_id: tableId },
    });
    if (resp.code !== 0) {
      throw new Error(`List fields failed: code=${resp.code}, msg=${resp.msg}`);
    }
    return (resp.data?.items ?? []).map((f) => ({
      fieldId: f.field_id ?? '',
      fieldName: f.field_name ?? '',
      type: f.type ?? 0,
    }));
  }
}

/**
 * Create a LarkClient from environment variables.
 */
export function createLarkClientFromEnv(): LarkClient {
  const appId = process.env['LARK_APP_ID'];
  const appSecret = process.env['LARK_APP_SECRET'];
  if (!appId || !appSecret) {
    throw new Error('Missing LARK_APP_ID or LARK_APP_SECRET in environment variables');
  }
  return new LarkClient({ appId, appSecret });
}
