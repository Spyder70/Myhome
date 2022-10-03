import React,{useState} from 'react'
import Layout from './../components/Layout/Layout';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {getAuth,sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import { async } from '@firebase/util';


const Forgotpassword = () => {
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    
    const onSubmitHandler = async (e) =>{
        e.preventDefault()
        try{
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("Email has sent.")
            navigate("/signin")
        }
        catch(error)
        {
            toast.error("Oops something went wrong!")
        }
    }
  return (
    <Layout>
        <div className='container mt-4'>
        <h1>Reset Your Password</h1>
        <form onSubmit={onSubmitHandler}>
  <div className="container mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="emai1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
   
   <div className='d-flex justify-content-between'>
   <button type="submit" className="btn btn-primary">Submit</button>
   reset
   <Link to='/singin'>Signin</Link>
   </div>
</form>
</div>
       

    </Layout>
  )
}

export default Forgotpassword