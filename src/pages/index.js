import { Inter } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import JobList from '../components/jobs/job-list';
import Hero from '@/components/hero';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const inter = Inter({ subsets: ['latin'] })

export default function Home({ jobs }) {

  return (
    <>
      <Hero />
      <JobList jobs={jobs} />
    </>
  )
}


export async function getServerSideProps(){
    const jobs = await prisma.job.findMany();

    const data = jobs.map((job) => {
      const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
          ? value.toString() 
          : value;
      };
    
      // Use JSON.parse and JSON.stringify to apply the transformation
      return JSON.parse(JSON.stringify(job, transformBigIntToString));
    });

    return {
      props: {
          jobs: data
      }
    }
}

