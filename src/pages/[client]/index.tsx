import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Project } from '../../types';
import data from '../../data/data.json';
import styled from '@emotion/styled';
import { IoIosArrowBack } from "react-icons/io";

const TitleContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
  a {
    text-decoration: none;
  }
`
const ProjectTitleItem = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0 25px;

  img {
      padding: 11px 15px;
      border-radius: 50%;
      background: var(--color-white);
  }

  h2 {
    font-size: 26px;
    color: var(--color-main);
  }
`
const DataInfo = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px 0;
  font-weight: 600;
  margin-top: 20px;

  p {
    text-transform: uppercase;
    font-size: 20px;

    span {
      color: var(--color-main);
      font-size: 22px;
      padding-left: 5px;
    }
  }
`
const RouteLink = styled(Link) `
  color: var(--color-white);
  padding: 12px 18px;
  background: var(--color-main);
  transition: all .3s ease-in-out;
  margin-top: 8px;
  border-radius: 8px;
  font-size: 17px;

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

const ClientProjects: React.FC<{ client: string; projects: Project[] }> = ({ client, projects }) => {
  return (
    <TitleContainer>
      <Link href='/' className='back_index'><IoIosArrowBack /> Back</Link>
      <div>
        <div>
          {projects.map(({ client, tvl, loc, img, reports }) => (
            <div key={client}>
              <ProjectTitleItem>
                <img src={img} alt="" />
                <h2>{client}</h2>
              </ProjectTitleItem>
              <DataInfo>
                <p>TVL: <span>${formatNumber(tvl)}</span></p>
                <p>Line of code: <span>{loc}</span></p>
                <p>Reports: <span>{reports}</span></p>
                <RouteLink href={`/${client}/project`}>
                  See Projects
               </RouteLink>
              </DataInfo>
            </div>
          ))}
        </div>
      </div>
    </TitleContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map((project) => ({ params: { client: project.client } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { client } = params as { client: string };
  const projects: Project[] = data.filter((project) => project.client === client);
  return {
    props: {
      client,
      projects,
    },
  };
};

export default ClientProjects;
