export enum AgentType {
  Coordinator = 'coordinator',
  Issue = 'issue',
  CodeGen = 'codegen',
  Review = 'review',
  PR = 'pr',
  Deployment = 'deployment',
  Test = 'test',
}

export enum PipelineStatus {
  Pending = 'pending',
  Running = 'running',
  Success = 'success',
  Failed = 'failed',
}

export interface AgentConfig {
  type: AgentType;
  enabled: boolean;
  timeout?: number;
}

export interface PipelineResult {
  status: PipelineStatus;
  agents: AgentResult[];
  duration: number;
  timestamp: string;
}

export interface AgentResult {
  agent: AgentType;
  status: PipelineStatus;
  output?: string;
  error?: string;
  duration: number;
}
