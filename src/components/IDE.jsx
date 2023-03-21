import {useRef, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as Y from "yjs";
import * as monaco from 'monaco-editor';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import Navbar from './Navbar';
import Peer from "peerjs";
import { Button } from "@material-tailwind/react";
import { IndexeddbPersistence } from 'y-indexeddb';



function IDE() {
  const [localStream, setlocalStream] = useState({}); //store localstream
  const [currentPeer, setCurrentPeer] = useState(null);//store the current peer instance
  const [currentPeerId, setCurrentPeerId] = useState(null);//store the current peer id. This is obtained from Yjs and is used to determine the current peer
  const [peers,setPeers] = useState([]); // keep track of connected peers
  const [users, setUsers] = useState(null); //keep track of users in the room (Yjs)
  const location = useLocation();
  const roomId = location.state.roomId;
  
  const editorRef = useRef(null);
  const peerRef = useRef({});
  //Editor->value = YJS Text Value(A text value shared by multiple people)
  // One person deletes text -> Deletes from overall shared text value
  // Handled by YJS (a high performance CRDT(Conflict-Free Replicated Data Type))

  const usercolors = [
    '#30bced',
    '#6eeb83',
    '#ffbc42',
    '#ecd444',
    '#ee6352',
    '#9ac2c9',
    '#8acb88',
    '#1be7ff'
  ]

  const myColor = usercolors[Math.floor(Math.random() * usercolors.length)];

  const handleEditorDidMount = (editor,monaco) => { //editor instance and monaco from the <Editor/> (defined by Monaco Editor) 
    editorRef.current = editor;  //Initialise Yjs
    

     const doc = new Y.Doc(); //collection of shared objects -> Text
     const yarray = doc.getArray(roomId);
     
     const indexeddbProvider = new IndexeddbPersistence(roomId, doc);
     indexeddbProvider.on('synced', () => {
      console.log('content from the database is loaded')
    })
   
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream)=>{
      setlocalStream(stream);
    })
    .catch((err)=>{
      console.log("Error in fetching media stream:",err);
    })
    //  console.log(localStream);
     //Connect to peers (or start connection) with WebRTC
     const provider = new WebrtcProvider(roomId,doc); //room1, room2
    console.log(provider.awareness);
    setCurrentPeerId(provider.awareness.clientID);
    provider.awareness.setLocalStateField('user',{name: "user0", color: myColor, id: provider.awareness.clientID});
    
    // setAwarenessState(provider.awareness);

    provider.awareness.on('update',()=>{
      const strings = [];
    
      provider.awareness.getStates().forEach(state=>{
        if(state.user){
          strings.push({color: state.user.color,name: state.user.name, id: state.user.id});
        }
        
      })
      setUsers(strings);
    })
     const type = doc.getText("monaco"); // doc {"monaco" : "what our IDE is showing"}
      
     //Bind YJS to Monaco 
     const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);//editorRef.current.getModel()-> monaco specific; allows to see changes happening in Monaco
     
  } 

  useEffect(()=>{
    console.log(localStream);
    const peer = new Peer(currentPeerId,{
      key: "peerjs",
      host: "localhost",
		  port: 9000,
		  path: "/",
    });
    peer.on("open", () => {
      setCurrentPeer(peer);
      setPeers((prevPeers)=> [...prevPeers,peer]);
      console.log("MY peerJS id is:", peer.id);
    });

    peer.on("call",incoming=>{
      console.log(incoming);
      incoming.answer(localStream);
      incoming.on('stream',stream=>{
        // console.log(stream);
        const audio = new Audio();
        audio.srcObject = stream;
        audio.play();
      })
    });
    
    peer.on('close',()=>{
      peer.destroy();
    })
  },[currentPeerId,localStream]);

  

  const handleCall = () => {
    if(!users || !currentPeer){
      alert("Please wait");
      return;
    }

      users.forEach((user)=>{
        if(user.id != currentPeerId){
          const peerConnection = new Peer(user.id,{
            key: "peerjs",
            host: "localhost",
		        port: 9000,
		        path: "/",
          });
          peerConnection.on('open',()=>{
            setPeers((prevPeers)=> [...prevPeers,peerConnection]);
            console.log("connected to peer id: "+ peerConnection.id);
          })
          const outgoing = currentPeer.call(peerConnection.id,localStream); //call all the peers present in the room
          console.log(outgoing);
          outgoing.on("open",()=>{
            console.log("Outgoing call");
          })

          
          outgoing.on('stream',(stream)=>{
            console.log(stream);
            const audio = new Audio();
            audio.srcObject = stream;
            audio.play();
          })

          outgoing.on('error',(err)=>{
          console.error(`error in establishing call to ${peerConnection.id} :`,err);
          })
        }
      })
    
  }





  return (
   <>
   <Navbar/>
   <div className='flex items-stretch'>
    <div className='w-1/2 pl-4 bg-white z-0'>
       <h1>Hello Coder!</h1>
       Your Current Room Id is : {roomId}
       <br/>
       <h2 >The users in this room are:</h2>
      {users && <ul>
      {users.map(user => (
      <li key={user.id} style={{ color: user.color }}>
        {user.name}
      </li>
      ))}
      </ul>}
      <Button variant="filled" onClick={handleCall}>Call Peers</Button>
    </div>
    <Editor
      height="100vh"
      width="50vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  </div> 
  </>
)}


export default IDE