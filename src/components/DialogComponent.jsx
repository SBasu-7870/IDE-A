import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

function DialogComponent(props) {
  const [roomId, setRoomId] = useState("");
  let open = props.dialog;
  const handleOpen = () => {
    props.handleChange();
  };
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 7);
    setRoomId(newRoomId);
    navigate(`/room/${newRoomId}`, { state: { roomId: newRoomId } });
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`, { state: { roomId } });
    } else {
      navigate("/");
    }
  };
  return (
    <Dialog open={open} size={"sm"} handler={handleOpen}>
      <DialogHeader>Get started</DialogHeader>
      <DialogBody divider>
        <div className="w-72">
          <Input label="Enter Room Id" placeholder="Room ID" onChange={(e)=> setRoomId(e.target.value)}/>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="green"
          className="mr-1"
          onClick={handleCreateRoom}
        >
          <span>Create Room</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={handleJoinRoom}>
          <span>Join Room</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DialogComponent;
