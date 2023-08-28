import React from "react";
import {useRef, useState, useEffect} from "react";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const Login = ({ providers }) => {

  const userRef = useRef();
  const errRef = useRef();
  
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState();
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
  }

    return (

      <>
        {providers && Object.values(providers).map(option => (
          <div key={provider.key}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>

      // <section className="flex justify-center h-full w-full items-center bg-slate-200">  
      //   <form onSubmit={handleSubmit} className="flex flex-col w-96 align-center rounded-md shadow-xl bg-slate-100 ">
      //     <p>Sign In with Credentials</p>
      //     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      //       {/*<input type="text" id="name" name="name" className="my-1.5 mx-2" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/> */}
      //       <input type="email" ref={userRef} id="email" name="email" className="my-1.5 mx-2" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={validEmail ? "false" : "true"}/>
      //       <input type="password" id="pwd" className="my-1.5 mx-2" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} required/>
          
      //       <button type="submit" className=" hover:shadow-lg mt-2 text-remotify-db hover:bg-blue-800 bg-remotify-lb focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>

      //     </form>
      // </section>
  );
}

export async function GetServerSideProps(){
  const providers = await getProviders();

  return {props: {providers}}
}
 
export default Login;