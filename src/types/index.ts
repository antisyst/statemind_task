// types/index.ts
export interface Project {
  client: string;
  tvl: number;
  img: string;
  loc: number; 
  audits: Audit[];
  reports: number;
}

export interface Audit {
  audit_name: string;
  private: boolean;
  start_date: string;
  end_date: string;
  details?: {
    loc: number;
    critical_cnt: number;
    high_cnt: number;
    medium_cnt: number;
  };
  desc?: string;
  initial_commit?: string;
  conclusion?: string;
  report_link?: string;
}

export interface ProjectPageProps {
  project: Project;
}
