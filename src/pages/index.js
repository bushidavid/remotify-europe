import { Inter } from 'next/font/google';
import JobList from './components/job-list';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <JobList />
    </>
  )
}
