import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FcHome } from "react-icons/fc";
import { Link } from 'react-router-dom';
// import { onChange } from 'react-toastify/dist/core/store';

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changedDetail, setChangedDetail] = useState(false)
  
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name, email} = formData
  // console.log(email)
  function onLogout(){
    auth.signOut()
    toast.success("Logged out successfully")
    navigate("/")
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // update the display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        });
      }

      toast.success("Profile details updated")
    } catch (error) {
      toast.error("Could not update profile details")
    }
  }
  
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold' >My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name Input */}
            <input type='text' id='name' value={name} disabled={!changedDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-grey-700 bg-white border border-gray-300 rounded transition ease-in-out  && ${changedDetail && "bg-red-200 focus:bg-red-200"}`} />

            {/* email input */}
            <input type='email' id='email' value={email} disabled className='mb-6 w-full px-4 py-2 text-xl text-grey-700 bg-white border border-gray-300 rounded transition ease-in-out' />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center ' >Do you want to change your name?
                <span onClick={() => {
                  changedDetail && onSubmit();
                  setChangedDetail((prevState) => !prevState)
                }} className={`text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer`} >
                  {changedDetail ? "Apply change" : "Edit"}
                  </span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer' >Sign out</p>
            </div>



          </form>
          <button type='submit' className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' >
            <Link to="/create-listing" className='flex justify-center items-center '>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
              Sell or rent your home
            </Link>
          
          </button>
        </div>
      </section>
    </>
  )
}

export default Profile
