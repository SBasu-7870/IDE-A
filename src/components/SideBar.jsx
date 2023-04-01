import React from 'react'
import arrowRight from '../assets/arrow-right-s-line.svg';

function SideBar(props) {
    const users = props.user;
    const open = props.isOpen;
    const changeOpen = props.changeOpen;
    return (
        <div className={`flex`}>
        <div className={`flex flex-col px-4 py-4 ${open? "w-46":"w-20 ml-2"} ${open? "translate-x-0":"-translate-x-1.5"} ease-in-out duration-300 overflow-y-auto`}>
        <button className={`relative cursor-pointer ${open?"left-5 top-0":"left-10 top-0"}  border-white ${open && "origin-center rotate-180"}`} onClick={()=> changeOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="rgba(255,255,255,1)"/></svg>
        </button>
            {open && <h3 className={`text-2xl font-semibold text-center text-blue-800`}>Current Users in Room</h3>}
            <div className="flex flex-col justify-between mt-6">
                <aside>
                    {users && <ul>
                        {users.map(user => (
                            <li key={user.id} style={{color: user.color, marginBottom: "0.5 rem"}}>
                                
                                <div className='inline-block  rounded-full mb-2' style={{ backgroundColor: user.color, color:"white" }}>
                                    <p className='align-middle table-cell text-center text-decoration-none h-10 w-10 text-2xl'>{user.name.charAt(0)}</p>
                                </div>
                                {open && <p className='inline-block align-top ml-4 mt-2'>{user === users[0]?user.name + " (You)": user.name}</p>}
                            </li>
                        ))}
                    </ul>}
                </aside>

            </div>
        </div>
        </div>
    )
}

export default SideBar