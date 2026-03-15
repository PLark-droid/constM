import { writeFileSync, mkdirSync, existsSync } from 'node:fs';

interface DashboardData {
  generated_at: string;
  repository: string;
  project_number: string;
  agents: AgentStatus[];
  workflows: WorkflowStatus[];
  metrics: Metrics;
}

interface AgentStatus {
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
}

interface WorkflowStatus {
  name: string;
  status: 'active' | 'disabled';
}

interface Metrics {
  open_issues: number;
  labels_count: number;
  workflows_count: number;
  agents_count: number;
}

async function fetchGitHubData(): Promise<{
  issues: number;
  labels: number;
  workflows: number;
}> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY ?? 'PLark-droid/constM';

  if (!token) {
    console.warn('GITHUB_TOKEN not set, using placeholder data');
    return { issues: 0, labels: 0, workflows: 14 };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  };

  try {
    const [issuesRes, labelsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}/issues?state=open&per_page=1`, { headers }),
      fetch(`https://api.github.com/repos/${repo}/labels?per_page=100`, { headers }),
    ]);

    const issueCount = parseInt(issuesRes.headers.get('x-total-count') ?? '0', 10) || 1;
    const labels = await labelsRes.json() as unknown[];

    return {
      issues: issueCount,
      labels: labels.length,
      workflows: 14,
    };
  } catch {
    console.warn('Failed to fetch GitHub data, using defaults');
    return { issues: 0, labels: 0, workflows: 14 };
  }
}

async function main() {
  console.log('Generating dashboard data...');

  const ghData = await fetchGitHubData();

  const agents: AgentStatus[] = [
    { name: 'CoordinatorAgent', type: 'coordinator', status: 'active' },
    { name: 'IssueAgent', type: 'issue', status: 'active' },
    { name: 'CodeGenAgent', type: 'codegen', status: 'active' },
    { name: 'ReviewAgent', type: 'review', status: 'active' },
    { name: 'PRAgent', type: 'pr', status: 'active' },
    { name: 'DeploymentAgent', type: 'deployment', status: 'active' },
    { name: 'TestAgent', type: 'test', status: 'active' },
  ];

  const data: DashboardData = {
    generated_at: new Date().toISOString(),
    repository: process.env.GITHUB_REPOSITORY ?? 'PLark-droid/constM',
    project_number: process.env.GITHUB_PROJECT_NUMBER ?? '1',
    agents,
    workflows: [
      { name: 'Issue Opened - Auto Label', status: 'active' },
      { name: 'PR Opened - Auto Review', status: 'active' },
      { name: 'Autonomous Agent Execution', status: 'active' },
      { name: 'Deploy GitHub Pages', status: 'active' },
      { name: 'State Machine Automation', status: 'active' },
      { name: 'Economic Circuit Breaker', status: 'active' },
      { name: 'Webhook Event Handler', status: 'active' },
      { name: 'Webhook Event Router', status: 'active' },
      { name: 'Weekly Report', status: 'active' },
      { name: 'Weekly KPI Report', status: 'active' },
      { name: 'Label Sync', status: 'active' },
      { name: 'Project Sync', status: 'active' },
      { name: 'Auto Add to Project', status: 'active' },
      { name: 'Update Project Status', status: 'active' },
    ],
    metrics: {
      open_issues: ghData.issues,
      labels_count: ghData.labels,
      workflows_count: ghData.workflows,
      agents_count: agents.length,
    },
  };

  const docsDir = 'docs';
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  writeFileSync(`${docsDir}/dashboard-data.json`, JSON.stringify(data, null, 2));
  console.log(`Dashboard data written to ${docsDir}/dashboard-data.json`);
}

main().catch((err) => {
  console.error('Failed to generate dashboard data:', err);
  process.exit(1);
});
