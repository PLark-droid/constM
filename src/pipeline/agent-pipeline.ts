import {
  type AgentConfig,
  type AgentResult,
  type PipelineResult,
  AgentType,
  PipelineStatus,
} from '../types.js';

const DEFAULT_AGENTS: AgentConfig[] = [
  { type: AgentType.Issue, enabled: true },
  { type: AgentType.Coordinator, enabled: true },
  { type: AgentType.CodeGen, enabled: true },
  { type: AgentType.Review, enabled: true },
  { type: AgentType.Test, enabled: true },
  { type: AgentType.PR, enabled: true },
  { type: AgentType.Deployment, enabled: true },
];

export class AgentPipeline {
  private agents: AgentConfig[];

  constructor(agents: AgentConfig[] = DEFAULT_AGENTS) {
    this.agents = agents;
  }

  getAgents(): AgentConfig[] {
    return [...this.agents];
  }

  getEnabledAgents(): AgentConfig[] {
    return this.agents.filter((a) => a.enabled);
  }

  async run(issueNumber: number): Promise<PipelineResult> {
    const start = Date.now();
    const results: AgentResult[] = [];

    for (const agent of this.getEnabledAgents()) {
      const agentStart = Date.now();
      try {
        const output = await this.executeAgent(agent, issueNumber);
        results.push({
          agent: agent.type,
          status: PipelineStatus.Success,
          output,
          duration: Date.now() - agentStart,
        });
      } catch (err) {
        results.push({
          agent: agent.type,
          status: PipelineStatus.Failed,
          error: err instanceof Error ? err.message : String(err),
          duration: Date.now() - agentStart,
        });
        break;
      }
    }

    const hasFailure = results.some((r) => r.status === PipelineStatus.Failed);

    return {
      status: hasFailure ? PipelineStatus.Failed : PipelineStatus.Success,
      agents: results,
      duration: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  }

  private async executeAgent(
    agent: AgentConfig,
    issueNumber: number,
  ): Promise<string> {
    return `Agent ${agent.type} processed issue #${issueNumber}`;
  }
}
