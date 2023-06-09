import React, { useState } from 'react'

function Console() {
  const [open, setOpen] = useState(false);


  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <>
    {/* <div className='flex-flex-col'> */}
      {open && <div className='h-1/2 w-full mr-4 border-2 border-cyan-400 border-solid rounded-xl'>
        <div className='flex flex-row gap-x-3 px-5 py-2 bg-blue-gray-500 rounded-xl'>
          <span>TestCase</span>
          <span>Result</span>
        </div>
        <div className='flex gap-5 px-5 py-3'>
          <span>Case 1</span>
          <span>Case 2</span>
          <span>Case 3</span>
        </div>

        <div className='mt-5 mx-5'>
          nums=
          <br />
          <pre className='w-full pl-5 mt-2'>
            [2,7,11,15]
          </pre>
        </div>
        <div className='mt-5 mx-5'>
          target=
          <br />
          <pre className='w-full pl-5 mt-2'>
            9
          </pre>
        </div>
      </div>}
      <div flex="flex">
        <div className='flex justify-between w-full mt-5 p-2 border-2 border-cyan-400 border-solid rounded-xl'>
          <div className='flex'>Console <button className='cursor-pointer' onClick={handleClick}><svg className={`origin-center ${open ? 'rotate-90': '-rotate-90'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="rgba(255,255,255,1)" /></svg></button></div>
          <div className='flex gap-2'>
            <button className='bg-blue-gray-500 rounded-lg px-2'>Run</button>
            <button className='bg-lime-600 rounded-lg px-2'>Submit</button>
          </div>
        </div>
      </div>
    {/* </div> */}
    </>
  )
}

export default Console