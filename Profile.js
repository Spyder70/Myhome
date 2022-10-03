import Layout from '../components/Layout/Layout'
import { getAuth,updateProfile } from 'firebase/auth'
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config'
import {FaEdit} from 'react-icons/fa'
import { MdDoneOutline} from 'react-icons/md'
import {doc,updateDoc} from 'firebase/firestore'


const Profile = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetails,setChangeDetails] = useState(false)
    const [formData,setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
})  
   const {name,email} = formData
   const logoutHandler = () =>
   {
    auth.signOut()
    toast.success('You have logged out successfully.')
    navigate("/")
   } 

   //Onchange Handler
   const onChange = (e) => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value,
    }))
   }

   //Submit Handler
   const onSubmit = async () => {
        try {
               if(auth.currentUser.displayName !== name)
               {
                await updateProfile(auth.currentUser,{
                  displayName:name,
                })
                const userRef = doc(db,'users',auth.currentUser.uid)
                await updateDoc(userRef,{name})
                toast.success("Your information Updated.")
            }
    
        }
            catch(error)
            {
               console.log(error)
               toast('Oops something went wrong!')
            }
   }
  
  return (
    <Layout>
   <div className='container mt-4 w-50 d-flex justify-content-between'>
   <h4>Profile Deatils</h4>
   <button className='btn btn-danger' onClick={logoutHandler}>Logout</button>
   </div>
   
 <div className="container mt-4 card" style={{width: '18rem'}}>
 <div className="card-header">
<div className='d-flex justify-cintent-between'>
<p>User Personal Details</p>
<span style={{cursor:"pointer"  }} onClick={() => {
    changeDetails && onSubmit()
         setChangeDetails(prevState => !prevState)
       }}>
   
    {changeDetails ? (
  <MdDoneOutline color='green'/>   
    ) : (
        <FaEdit color='black'/>
        )}
</span>
  </div>
 </div>
 <div className='card-body'>
<form>
<div className="mt-3 justify-content-between">
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={name} onChange={onChange} disabled={!changeDetails} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onChange} disabled={!changeDetails}/>
     </div>
 
   </form>

 </div>
</div>
  
    </Layout>
  )
}

export default Profile

