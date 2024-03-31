import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
// import Listing from './Listing'

function Home() {

  

  return (
    <div>
       <Slider />
    </div>
  )
}

export default Home
