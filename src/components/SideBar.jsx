import React from 'react'

function SideBar(props) {
    const users = props.user;
    return (
        <div className="flex flex-col w-48 h-screen px-4 py-8 overflow-y-auto border-r">
            <h3 className="text-2xl font-semibold text-center text-blue-800">Current Users in Room</h3>
            <div className="flex flex-col justify-between mt-6">
                <aside>
                    {users && <ul>
                        {users.map(user => (
                            <li key={user.id} style={{ color: user.color }}>
                                {user === users[0] ? user.name + " (You)" : user.name}
                            </li>
                        ))}
                    </ul>}
                </aside>

            </div>
        </div>
    )
}

export default SideBar