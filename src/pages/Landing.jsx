import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { v4 as uuid } from "uuid";

function Landing() {
  const [roomId,setRoomId] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 7);
    setRoomId(newRoomId);
    navigate(`/room/${newRoomId}`,{state:{roomId: newRoomId}});
  };

  const handleJoinRoom = () => {
    if(roomId) {
      navigate(`/room/${roomId}`,{state:{roomId}});
    }else{
      navigate('/');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="grid justify-items-center">
      <h2 className="mt-4">Welcome</h2>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg mt-6">
  <form>
    <div className="form-group mb-6">
      <label htmlFor="exampleInputRoom1" className="form-label inline-block mb-2 text-gray-700">Enter Room ID</label>
      <input type="text" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputRoom1"
        aria-describedby="RoomIdHelp" onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter room ID"/>
    </div>
    <div className='flex justify-between items-center'>
    <button type="submit" className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" onClick={handleCreateRoom}>Create Room</button>
      <button type="submit" className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" onClick={handleJoinRoom}>Join Room</button>
    </div>  
  </form>
</div>
    </div>
    </>
  )
}

export default Landing