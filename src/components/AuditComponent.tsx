import React from 'react';
import { Audit } from '../types';

interface AuditProps {
  audit: Audit;
}

const AuditComponent: React.FC<AuditProps> = ({ audit }) => {
  const {
    audit_name,
    private: isPrivate,
    start_date,
    end_date,
    details,
    desc,
    initial_commit,
    conclusion,
    report_link,
  } = audit || {};
  const { loc, critical_cnt, high_cnt, medium_cnt } = details || {};

  return (
    <li>
      <h3>{audit_name}</h3>
      <p>Private: {isPrivate ? 'Yes' : 'No'}</p>
      <p>Start Date: {start_date}</p>
      <p>End Date: {end_date}</p>
      {details && (
        <div>
          <p>LOC: {loc ?? 'N/A'}</p>
          <p>Critical Count: {critical_cnt ?? 'N/A'}</p>
          <p>High Count: {high_cnt ?? 'N/A'}</p>
          <p>Medium Count: {medium_cnt ?? 'N/A'}</p>
        </div>
      )}
      {desc && <p>Description: {desc}</p>}
      {initial_commit && <p>Initial Commit: {initial_commit}</p>}
      {conclusion && <p>Conclusion: {conclusion}</p>}
      {report_link && (
        <p>
          Report Link: <a href={report_link}>View Report</a>
        </p>
      )}
    </li>
  );
};

export default AuditComponent;
