import React, {Fragment, useState} from  'react';

const InputJob = () => {
    
    const [jobTitle, setTitle] = useState("hello");
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body={jobTitle};
            const response = fetch("http://localhost:4000/api/jobs/postjob", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location("/api/jobs");
        } catch (err) {
            console.log(err.message);
        }
    }

    return ( 
        <Fragment>
            <h1 className='text-center mt-5'>Input Job</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type='text' 
                    value={jobTitle} 
                    className='form-control' 
                    onChange={e => setTitle(e.target.value)}/>
                <button className='bt btn-success'>Add</button>
            </form>
        </Fragment>
     );
}
 
export default InputJob;