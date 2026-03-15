import { describe, it, expect } from 'vitest';
import { AgentPipeline } from '../../src/pipeline/agent-pipeline.js';
import { AgentType, PipelineStatus } from '../../src/types.js';

describe('AgentPipeline', () => {
  it('should initialize with default agents', () => {
    const pipeline = new AgentPipeline();
    const agents = pipeline.getAgents();

    expect(agents).toHaveLength(7);
    expect(agents.map((a) => a.type)).toEqual([
      AgentType.Issue,
      AgentType.Coordinator,
      AgentType.CodeGen,
      AgentType.Review,
      AgentType.Test,
      AgentType.PR,
      AgentType.Deployment,
    ]);
  });

  it('should filter enabled agents', () => {
    const pipeline = new AgentPipeline([
      { type: AgentType.Issue, enabled: true },
      { type: AgentType.CodeGen, enabled: false },
      { type: AgentType.Review, enabled: true },
    ]);

    const enabled = pipeline.getEnabledAgents();
    expect(enabled).toHaveLength(2);
    expect(enabled.map((a) => a.type)).toEqual([
      AgentType.Issue,
      AgentType.Review,
    ]);
  });

  it('should run pipeline and return success result', async () => {
    const pipeline = new AgentPipeline([
      { type: AgentType.Issue, enabled: true },
      { type: AgentType.CodeGen, enabled: true },
    ]);

    const result = await pipeline.run(1);

    expect(result.status).toBe(PipelineStatus.Success);
    expect(result.agents).toHaveLength(2);
    expect(result.duration).toBeGreaterThanOrEqual(0);
    expect(result.timestamp).toBeTruthy();
  });

  it('should skip disabled agents during pipeline run', async () => {
    const pipeline = new AgentPipeline([
      { type: AgentType.Issue, enabled: true },
      { type: AgentType.CodeGen, enabled: false },
      { type: AgentType.Review, enabled: true },
    ]);

    const result = await pipeline.run(1);

    expect(result.agents).toHaveLength(2);
    expect(result.agents.map((a) => a.agent)).toEqual([
      AgentType.Issue,
      AgentType.Review,
    ]);
  });

  it('should not mutate original agents array', () => {
    const pipeline = new AgentPipeline();
    const agents1 = pipeline.getAgents();
    const agents2 = pipeline.getAgents();

    expect(agents1).not.toBe(agents2);
    expect(agents1).toEqual(agents2);
  });
});
