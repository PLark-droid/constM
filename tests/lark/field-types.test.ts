import { describe, it, expect } from 'vitest';
import { FieldType } from '../../src/lark/field-types.js';

describe('FieldType', () => {
  it('should have correct type values', () => {
    expect(FieldType.Text).toBe(1);
    expect(FieldType.Number).toBe(2);
    expect(FieldType.SingleSelect).toBe(3);
    expect(FieldType.DateTime).toBe(5);
    expect(FieldType.Checkbox).toBe(7);
    expect(FieldType.User).toBe(11);
    expect(FieldType.Link).toBe(18);
    expect(FieldType.Formula).toBe(20);
    expect(FieldType.AutoNumber).toBe(1005);
    expect(FieldType.Currency).toBe(1022);
    expect(FieldType.Location).toBe(22);
    expect(FieldType.Attachment).toBe(17);
    expect(FieldType.Phone).toBe(13);
  });
});
