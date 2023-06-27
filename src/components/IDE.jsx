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
import DOUsername from 'do_username';
import "./IDE.css";
import SideBar from './SideBar';
import Console from './Console';
// import {createUseStyles} from 'react-jss'


// const useStyles = createUseStyles({
//   yRemoteSelection: {
//     backgroundColor: 'orange'
//   },
//   yRemoteSelectionHead: {
    
//   }
// })


function IDE() {
  const [users, setUsers] = useState(null); //keep track of users in the room (Yjs)
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const roomId = location.state.roomId;
  
  const editorRef = useRef(null);
  //Editor->value = YJS Text Value(A text value shared by multiple people)
  // One person deletes text -> Deletes from overall shared text value
  // Handled by YJS (a high performance CRDT(Conflict-Free Replicated Data Type))
  const resizableContainerRef = useRef(null);
  const resizerRef = useRef(null);
  const startXRef = useRef(null);
  
  useEffect(()=>{
    console.log(users);
    const resizableContainer = resizableContainerRef.current;
    const resizer = resizerRef.current;

    const handleMouseDown = (event) => {
      startXRef.current = event.clientX;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event) => {
      const diffX = event.clientX - startXRef.current;
      const newWidth = resizableContainer.offsetWidth - diffX;
      resizableContainer.style.width = `${newWidth}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    resizer.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown);
    };
  })



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
  const userName = DOUsername.generate(10);
  
  const codeValue = `
  /**
  * @param {number[]} nums
  * @param {number} target
  * @return {number[]}
  */
 var twoSum = function(nums, target) {
     
 };`


  const handleEditorDidMount = (editor,monaco) => { //editor instance and monaco from the <Editor/> (defined by Monaco Editor) 
    editorRef.current = editor;  //Initialise Yjs

    
  
     const doc = new Y.Doc(); //collection of shared objects -> Text
     const yarray = doc.getArray(roomId);
     
     const indexeddbProvider = new IndexeddbPersistence(roomId, doc);
     indexeddbProvider.on('synced', () => {
      console.log('content from the database is loaded')
    })
   
  
     //Connect to peers (or start connection) with WebRTC
     const provider = new WebrtcProvider(roomId,doc); //room1, room2
    const clientId = provider.awareness.clientID;
    provider.awareness.setLocalStateField('user',{name: userName, color: myColor, id: clientId});
    
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
     
     type.format(0,137,codeValue);
      
     //Bind YJS to Monaco 
     const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);//editorRef.current.getModel()-> monaco specific; allows to see changes happening in Monaco
  } 




  return (
   <>
   <Navbar/>
   <div className='flex'>
   <SideBar 
   user={users}
   isOpen={open}
   changeOpen={setOpen}
   />
    <div className='flex flex-col grow h-screen px-4 bg-code text-white overflow-auto'>
      <div></div>
      <div className='flex justify-center text-white text-2xl mt-5'>Two Sum</div>
      <div className='mx-5'>
         <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to </em><code>target</code>.</p>
         <br/>
         <p>You may assume that each input would have <b><em>exactly</em> one solution</b>, and you may not use the same element <em>twice</em>.</p>
         <br/>
         <p>You can return the answer in any order.</p>
      </div>
      <div className='mt-10'>
        <p><strong>Example 1</strong></p>
        <pre className='mr-4 mt-5'>
         <strong>Input:</strong>  nums = [2,7,11,15], target = 9
         <br/>
         <strong>Output:</strong> [0,1]
         <br/>
         <strong>Explanation:</strong> Because nums[0] + nums[1] == 9,
         <br/>
         we return [0, 1].
        </pre>

        <pre className='mr-4 mt-10'>
         <strong>Input:</strong>  nums = [3,2,4], target = 6
         <br/>
         <strong>Output:</strong> [1,2]
        </pre>



        <strong className='mt-10'>Constraints:</strong>
        <br/>
        <ul className='list-disc'>
          <li className='ml-5 mt-2'><code>{`2 <= nums.length <= 10^4`}</code></li>
          <li className='ml-5 mt-2'><code>{`-10^9 <= nums[i] <= 10^9`}</code></li>
          <li className='ml-5 mt-2'><code>{`10^9 <= target <= 10^9`}</code></li>
          <li className='ml-5 mt-2'><b>Only one valid answer exists.</b></li>
        </ul>

        <p className='mt-5'><b>Follow-up:</b> Can you come up with an algorithm that is less than <code>O(n^2)</code> time complexity?</p>
      </div>
      <Console/>
    </div>
    <div ref={resizerRef} className='resizer flex items-center bg-blue-gray-400 hover:bg-blue-700 w-2'></div>
    <div ref={resizableContainerRef} className='flex grow h-screen overflow-auto'>
    <Editor
      height="100%"
      width="100%"
      theme="vs-dark"
      defaultLanguage='javascript'
      onMount={handleEditorDidMount}
    />
    </div>
  </div>
  </>
)}


export default IDE