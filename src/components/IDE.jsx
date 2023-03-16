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
  const [localStream, setlocalStream] = useState({});
  const [peers,setPeers] = useState([]); // keep track of connected peers
  const location = useLocation();
  const roomId = location.state.roomId;
  
  const editorRef = useRef(null);
  const peerRef = useRef({});
  //Editor->value = YJS Text Value(A text value shared by multiple people)
  // One person deletes text -> Deletes from overall shared text value
  // Handled by YJS (a high performance CRDT(Conflict-Free Replicated Data Type))
  
  useEffect(()=>{
    const createPeer = (peerId) => {
      const peer = new Peer(peerId); // Create new Peer instance
      peer.on('open', () => {
        console.log('Peer connected with ID:', peer.id);
        setPeers([...peers, peer]); // Add new peer instance to state
      });
    };
      peers.forEach((peerId) => {
        createPeer(peerId);
      });
    return () =>{
       peers.forEach((peer)=>{
        peer.destroy();
       })
    }

  },[localStream,peers])


  const handleEditorDidMount = (editor,monaco) => { //editor instance and monaco from the <Editor/> (defined by Monaco Editor) 
    editorRef.current = editor;  //Initialise Yjs
    

     const doc = new Y.Doc(); //collection of shared objects -> Text
     
     //get the audio stream from the user in the room
     navigator.mediaDevices.getUserMedia({audio:true})
     .then((stream)=>{
      setlocalStream(stream);
     })
     .catch((error)=>{
      console.error("Failed to get user media:",error);
     })

     const indexeddbProvider = new IndexeddbPersistence(roomId, doc);
     indexeddbProvider.on('synced', () => {
      console.log('content from the database is loaded')
    })
   
    //  console.log(localStream);
     //Connect to peers (or start connection) with WebRTC
     const provider = new WebrtcProvider(roomId,doc,{
      peerOpts: {
         stream: localStream
      }
    }); //room1, room2
     console.log(provider.awareness);
     const type = doc.getText("monaco"); // doc {"monaco" : "what our IDE is showing"}
      
     //Bind YJS to Monaco 
     const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);//editorRef.current.getModel()-> monaco specific; allows to see changes happening in Monaco
     
    

     // add stream id to awareness state
     provider.awareness.setLocalStateField('mediaStreamId', localStream.id);
  } 
  
  const handleCallButtonClick = () => {
    // initiate call to all connected peers
    Object.keys(peers).forEach(peerId => {
      const peerConnection = peers[peerId];
      const call = peerConnection.call(peerId, localStream);
      call.on('stream', remoteStream => {
        // handle incoming audio stream
        console.log(`Received audio stream from peer ${call.peer}`);
      });
    });
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
      <ul>
        {Object.keys(peers).map(peerId => (
          <li key={peerId}>{peerId}</li>
        ))}
      </ul>
      <Button variant="filled">Call Peers</Button>
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