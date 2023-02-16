import {useRef, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as Y from "yjs";
import * as monaco from 'monaco-editor';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import Navbar from './Navbar';


function IDE() {
  const location = useLocation();
  const roomId = location.state.roomId;

  const editorRef = useRef(null);
  const initializedRoomsRef = useRef(new Set());
  //Editor->value = YJS Text Value(A text value shared by multiple people)
  // One person deletes text -> Deletes from overall shared text value
  // Handled by YJS (a high performance CRDT(Conflict-Free Replicated Data Type))


  const handleEditorDidMount = (editor,monaco) => { //editor instance and monaco from the <Editor/> (defined by Monaco Editor) 
    editorRef.current = editor;
     //Initialise Yjs
     if (initializedRoomsRef.current.has(roomId)) {
      return;
    }

     const doc = new Y.Doc(); //collection of shared objects -> Text
     //Connect to peers (or start connection) with WebRTC
     const provider = new WebrtcProvider(roomId,doc); //room1, room2
     console.log(provider.awareness);
     const type = doc.getText("monaco"); // doc {"monaco" : "what our IDE is showing"}
      
      
     const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);//editorRef.current.getModel()-> monaco specific; allows to see changes happening in Monaco
     initializedRoomsRef.current.add(roomId);
     //Bind YJS to Monaco

  }

  
  return (
   <>
   <Navbar/>
   <div className='flex items-stretch'>
    <div className='w-1/2 pl-4'>
       <h1>Hello Coder!</h1>
       Your Current Room Id is : {roomId}
    </div>
    <Editor
      height="100vh"
      width="50vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  </div> 
  </>
)
}

export default IDE