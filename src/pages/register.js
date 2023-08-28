import React, {useState, useRef, useEffect} from "react";
import Swal from "sweetalert2";
import { redirect } from "next/dist/server/api-utils";



const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isCandidate, setCandidate] = useState(false);
  const [isRecruiter, setRecruiter] = useState(false);



  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);
  const [matchFocus, setMatchFocus] = useState(false);  

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //Modal for success registration
  const [isOpen, setIsOpen] = useState(false);

  // const [name, setName] = useState("");

  useEffect(()=> {
    userRef.current.focus();
  }, []);

  useEffect(()=> {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

    useEffect(()=> {
      const result = PWD_REGEX.test(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
      setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
          setErrMsg("Invalid Entry");
          return;
      }

      const newUser = {"email" : email, "pwd" : pwd, "name" : name, "surname" : surname, "is_candidate" : isCandidate, "is_recruiter" : isRecruiter };

      const res = await fetch('http://localhost:3000/api/register/user', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      console.log(res.status);

      if(res.status === 201){
        
        Swal.fire({
          title: 'Success!',
          text: 'Registration Successful',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        })

      }

    }

    return (

        <section className="flex justify-center h-full w-full items-center bg-slate-200">  
          <form onSubmit={handleSubmit} className="flex flex-col w-96 align-center rounded-md shadow-xl bg-slate-100 ">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p className="self-center py-1.5">Create a new account</p>
              {/*<input type="text" id="name" name="name" className="my-1.5 mx-2" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/> */}
              <div className="flex flex-row w-full">
                <input type="text" className="w-40 my-1.5 mx-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" className="w-40 my-1.5 mx-2" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
              </div>
              <input type="email" ref={userRef} id="email" name="email" className="my-1.5 mx-2" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"}/>
              <input type="password" id="pwd" className="my-1.5 mx-2" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} required aria-invalid={validPwd ? "false" : "true"}/>
              <input type="password" id="match_pwd" className="my-1.5 mx-2" placeholder="Retype password" value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)} required aria-invalid={validMatch ? "false" : "true"}/>
              <label htmlFor="is-candidate-recruiter">Candidate or Recruiter?</label>
              <div className="flex flex-row w-full"><input type="radio" id="is-candidate-recruiter" name="is-candidate-recruiter" className="my-1.5 mx-2" onChange={(e) => {setCandidate(e.target.checked); setRecruiter(false); console.log(isRecruiter + " " + isCandidate);}}/>
                <input type="radio" id="is-recruiter-recruiter" name="is-candidate-recruiter" className="my-1.5 mx-2" onChange={(e) => {setRecruiter(e.target.checked); setCandidate(false); console.log(isRecruiter + " " + isCandidate);}}/>
              </div>
              <button type="submit" className=" hover:shadow-lg mt-2 text-remotify-db hover:bg-blue-800 bg-remotify-lb focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
              

            {/* <p className="self-center py-1.5">Or Sign Up With:</p>
            
            <div className="inline-block flex-row justify-around mx-2">
                <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 font-medium text-white text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{backgroundColor: '#1877f2'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                  <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </button>
              
              <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{backgroundColor: '#ea4335'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </button>

              <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{backgroundColor: '#0077b5'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                  <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </button>

              <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
                  <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </button>
    </div> */}

          </form>
        </section>
  );
}
 
export default Register;