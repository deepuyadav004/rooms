import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function Header() {

    const location = useLocation()
    const navigate = useNavigate()
    const [pageState, setPageState] = useState("Sign in")
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign in")
            }
        })
    }, [auth]);

    function pathMatchRoute(route){
        if(route == location.pathname){
            return true
        }
    }

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40' >
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <img src='https://private-user-images.githubusercontent.com/77964981/318258252-85a05592-0556-45d8-ba2a-f0c7a4db15f4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTE4ODE3ODQsIm5iZiI6MTcxMTg4MTQ4NCwicGF0aCI6Ii83Nzk2NDk4MS8zMTgyNTgyNTItODVhMDU1OTItMDU1Ni00NWQ4LWJhMmEtZjBjN2E0ZGIxNWY0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAzMzElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMzMxVDEwMzgwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTllYjRlYzYxNmI3MzU1ZWFhZTk5Y2E0YTllYzYzNzBhOTg2MDhmMjBiOTQ1ODFlODI2NDIxMDhiMjRmMzAxMzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.h2Tj7QPHn5LafAma-GD7eY3_WXPr6NErNq_yyhNFQLw' alt='logo' className='h-10 cursor-pointer' onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className='flex space-x-10' >
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")} >Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("offers")} >Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") ||pathMatchRoute("/profile")) && "text-black border-b-red-500"}`} onClick={()=>navigate("/profile")} >{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Header
