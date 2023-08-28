
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function ViewJob({ job }) {

  const router = useRouter();
  console.log(job);

  return (
    <div className='w-full max-w-4xl place-self-center mt-10 px-4'>
       {
        job ?  (
            <div>
              <h1 className='text-4xl'>{job?.title}</h1>
              <h2>{job?.company}</h2>
              <p>Expiration Date: {job?.expiration_date}</p>
              <p>Remote From {job.country_job_countryTocountry.name}</p>
              <p>Department: {job.department_job_departmentTodepartment.name}</p>
            </div>
            ) : (
              <p>Loading</p>
            )
       }
    </div>
  )
}


export async function getServerSideProps(context){
  
  const { params } = context;
  const jobId = params.jobId;

  try {
    const job = await prisma.job.findUnique({
      where: {
        id : jobId
      },
      include: {
        country_job_countryTocountry: true,
        department_job_departmentTodepartment: true
      }
    });

    
    const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
          ? value.toString() 
          : value;
      }
    
      // Use JSON.parse and JSON.stringify to apply the transformation
    const data = JSON.parse(JSON.stringify(job, transformBigIntToString));
    

    return {
      props: {
          job: data
      }
    }

  } catch (error) {
    console.log(error);
    return {
      props: {
          job: null
      }
    }
  }
  
}

