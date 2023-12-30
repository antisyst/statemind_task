import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Project } from '../types';
import data from '../data/data.json';
import styled from '@emotion/styled';

const ProjectsContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 50px;
`
const CompProjectItem = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 3px solid var(--color-main);
  transition: all 0.15s ease-out;
  width: 100%;

  a {
    display: flex;
    padding: 30px 7px;
    flex-direction: row;
    text-decoration: none;
    padding-right: 10px;
    color: var(--color-white);
    align-items: center;
    width: 100%;
    justify-content: space-between;


    img {
      padding: 9px 12px;
      border-radius: 50%;
      background: var(--color-white);
    }
  }

  &:hover {
    background: var(--color-main);

    a {
      color: var(--color-white);

      img {
        background: none;
      }
    }
  }
`

const ItemSection = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0 16px;

  h2 {
    font-weight: bold;
    font-size: 28px;
  }
`
const DataSection = styled.div `
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0 100px;

  h2 {
    font-size: 30px;
    font-weight: 600;
    width: 90px;
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

const Home: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <>
    <main>
      <h1 className='first_content'>Top Projects</h1>
      <ProjectsContainer>
        {projects.map(({ client, img, tvl, loc, reports  }) => (
          <CompProjectItem key={client}>
            <Link href={`/${client}`}>
              <ItemSection>
                <img src={img} alt="" />
               <h2>{client}</h2>
              </ItemSection>
              <DataSection>
                <h2 className='twl'>${formatNumber(tvl)}</h2>
                <h2>{loc}</h2>
                <h2>{reports}</h2>
              </DataSection>
            </Link>
          </CompProjectItem>
        ))}
      </ProjectsContainer>
    </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects: Project[] = data;
  return {
    props: {
      projects,
    },
  };
};

export default Home;
