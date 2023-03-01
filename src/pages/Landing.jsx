import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import HandCoding from '../assets/HandCoding.svg'
import DialogComponent from '../components/DialogComponent';

function Landing() {
  const [dialog,setDialog] = useState(false);

  const handleOnClick = () => {
    setDialog(!dialog);
  }

  return (
    <>
    <Navbar/>
    <div className="h-screen w-full">
      <div className="flex flex-wrap justify-center justify-items-center mt-16 mb-4 mx-6 p-2">
        <div className="w-1/2 p-4 ">
        <p className="text-7xl font-mono font-bold antialiased ">
          <div className="mt-4 text-orange-500">TEAMWORK</div>
          <div className="mt-4 text-cyan-600">MAKES</div>
          <div className="mt-4 text-orange-500">DREAMWORK</div>
        </p>   
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleOnClick}>Get Started</button>
        </div>
        {dialog && <DialogComponent dialog={dialog} handleChange={handleOnClick}/>}
       <div className='w-1/2 p-10'>
       <img src={HandCoding} alt="logo" style={{height: 500, width:500}}/>
       </div>
      </div> 
    </div>
    </>
  )
}

export default Landing