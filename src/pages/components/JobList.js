import {React, Fragment, useEffect, useState} from "react";

const JobList = (props) => {

    const [jobs, setJobs] = useState([]);
    
    const getJobs = async () =>{
        try {
            
            const response = await fetch("http://localhost:4000/api/jobs/alljobs");
            const jsonData = await response.json();
            
            setJobs(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=> {
        getJobs();
    }, []);

    return ( 
        <Fragment>
            <h1 className="text-center mb-10 font-mono">Available Jobs</h1>
            <div className="flex align-center justify-center h-full">    
                <table className="table-auto">
                    <thead>
                    <tr>
                        <th className="font-mono ">Job Title</th>
                        <th>Description</th>
                        <th>Remotly From</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job => (
                                <tr className="hover:shadow-xl hover:bg-slate-50">
                                    <td className="border-x-0 pl-4 border-y-1 border-slate-50">{job.job_title}</td>
                                    <td className="border-x-0 border-y-1 border-slate-50">{job.description}</td>
                                    <td className="border-x-0 border-y-1 border-slate-50">{job.location}</td>
                                    <td className="border-x-0 border-y-1 border-slate-50"><button className="w-24 h-12 rounded-lg bg-cyan-300 hover:bg-cyan-400 hover:shadow-xl text-white">Apply</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>

);
}
 
export default JobList;