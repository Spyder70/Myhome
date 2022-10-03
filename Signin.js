import Layout from '../components/Layout/Layout';
import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {BsFillEyeFill} from 'react-icons/bs'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import OAuth from "../components/OAuth"

const Signin = () => {
  const [showPassword,setShowPassword] = useState(false)
const [formData,setFormData] = useState({
  email:'',
  password:'',
})
const {email, password} = formData
const navigate= useNavigate()

const onChange =  (e) =>{
  setFormData(prevState =>({
    ...prevState,
    [e.target.id]: e.target.value,

  }))
}

//loginHander

const loginHandler = async (e) =>{
  e.preventDefault()
  try {
    const auth = getAuth()
    const userCredentials = await signInWithEmailAndPassword(auth,email,password)
    if(userCredentials.user)
    {
      toast.success('Login successfull')
      navigate('/')
      alert('Login successfull.')
    }
  }catch(error){
    console.log(error)
    toast.error("Invalid Email or Password")
  }
}

return (
  <Layout>
   <div className="d-flex align-items-center justify-content-center w-100 mt-4" onSubmit={loginHandler}>
   <form className="bg-light p-4">
    <h4 className="bg-dark p-2 mt-2 text-light text-center">Signin</h4>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onChange} />
  </div>
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={onChange} />
  <span>
    Show password
    <BsFillEyeFill
     className="text-danger ms-2" 
     style={{cursor:"pointer"}}
     onClick={() =>{setShowPassword((prevState) => !prevState);}}
     >
    </BsFillEyeFill>
    </span>
    <Link to='/forgot-password'>Forgotpassword</Link>
</div>

<button type="submit" className="btn btn-primary">Signin</button>
<OAuth />
<div className='mt-2'>
 <span>New User</span>
 <Link to="/signup">Sign up</Link>
</div>
</form>

   </div>
  </Layout>
)
}


export default Signin;