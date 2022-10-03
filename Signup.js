import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {BsFillEyeFill} from 'react-icons/bs'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import OAuth from "../components/OAuth"

const Signup = () => {
  const [showPassword,setShowPassword] = useState(false)
const [formData,setFormData] = useState({
  email:'',
  name:'',
  password:'',
})
const {name,email, password} = formData;
const navigate= useNavigate()

const onChange =  (e) =>{
  setFormData(prevState =>({
    ...prevState,
    [e.target.id]: e.target.value,

  }))
}

const onSubmitHndler =async (e) => {
  e.preventDefault()
  try {
    const auth = getAuth()
    const userCredntial = await createUserWithEmailAndPassword(auth,email,password)
    const user =  userCredntial.user
    updateProfile(auth.currentUser,{displayName:name})
    const formDataCopy = {...formData}
    delete formDataCopy.password
    formDataCopy.timestamp = serverTimestamp()
    await setDoc(doc(db,'users',user.uid), formDataCopy);
    toast.success("You have Signed up sucessfully.")
    navigate('/')
    alert('You have Signed up sucessfully.')

  }
  catch(error)
  {
     console.log(error)
     toast.error('Oops something went wrong!')
  }

}
  return (
    <Layout>
     <div className="d-flex align-items-center justify-content-center w-100 mt-4">
     <form className="bg-light p-4" onSubmit={onSubmitHndler}>
      <h4 className="bg-dark p-2 mt-2 text-light text-center">Signup</h4>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Enter Name</label>
    <input type="text" className="form-control"  aria-describedby="nameHelp" id="name" onChange={onChange} />
  </div>
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
  </div>

  <button type="submit" className="btn btn-primary">Signup</button>

  <div>
   <h6>Login with google</h6>
   <OAuth />
   <span>Already User</span>
   <Link to="/singin">Login</Link>
  </div>
</form>

     </div>
    </Layout>
  )
}

export default Signup