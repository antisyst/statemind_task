import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Project } from '../../../types';
import data from '../../../data/data.json';
import FeedbackForm from '../../../components/FeedbackForm';
import styled from '@emotion/styled';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";

const ProjectMainBase = styled.main `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const ProjectCardContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`
const ProjectCardItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
  border-radius: 16px;
  border: 3px solid var(--color-main);
  height: auto;

  p {
    font-weight: 500;
    font-size: 17px;
    margin: 3px 0;
    color: var(--color-main);

    span {
      color: var(--color-white);
    }
  }
`
const LinkRouterItem = styled.a `
  color: var(--color-white);
  padding: 12px 18px;
  background: var(--color-main);
  transition: all .3s ease-in-out;
  margin-top: 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 17px;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`

const formatNumber = (value: number): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else {
    return `${value}`;
  }
};


const ProjectPage: React.FC<{ project: Project }> = ({ project }) => {
  const { client, tvl, loc, audits, reports } = project;

  return (
    <>
      <Head>
        <title>{client} Project - Your Company</title>
        <meta name="description" content={`Details about ${client} project`} />
      </Head>
      <ProjectMainBase>
        <Link href='/' className='back_index'><IoIosArrowBack /> Back</Link>
        <h1>{client} Project</h1>
        <p>TVL: ${formatNumber(tvl)}</p>
        <p>Lines of code: {loc}</p>
        <p>Total Reports: {reports}</p>
        <ProjectCardContainer>
          {audits.map((audit, index) => (
            <ProjectCardItem key={index}>
              <h2>{audit.audit_name}</h2>
              <p>Private: <span>{audit.private ? 'Yes' : 'No'}</span></p>
              <p>Start Date: <span>{audit.start_date}</span></p>
              <p>End Date: <span>{audit.end_date}</span></p>
              {audit.details && (
                <div>
                  <p>LOC: <span>{audit.details.loc}</span></p>
                  <p>Critical Count: <span>{audit.details.critical_cnt}</span></p>
                  <p>High Count: <span>{audit.details.high_cnt}</span></p>
                  <p>Medium Count: <span>{audit.details.medium_cnt}</span></p>
                </div>
              )}
              {audit.desc && <p>Description: <span>{audit.desc}</span></p>}
              {audit.initial_commit && <p>Initial Commit: <span>{audit.initial_commit}</span></p>}
              {audit.conclusion && <p>Conclusion: <span>{audit.conclusion}</span></p>}
              {audit.report_link && (
                <LinkRouterItem href={audit.report_link}>View Report</LinkRouterItem>
              )}
            </ProjectCardItem>
          ))}
        </ProjectCardContainer>
        <FeedbackForm />
      </ProjectMainBase>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { client } = context.params as { client: string };
  const project = data.find((p) => p.client === client);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
};

export default ProjectPage;
