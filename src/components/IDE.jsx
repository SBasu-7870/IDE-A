import {useRef} from 'react'
import Editor from '@monaco-editor/react';
import * as Y from "yjs";
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';



function IDE() {
  const editorRef = useRef(null);
  //Editor->value = YJS Text Value(A text value shared by multiple people)
  // One person deletes text -> Deletes from overall shared text value
  // Handled by YJS (a high performance CRDT(Conflict-Free Replicated Data Type))


  function handleEditorDidMount(editor,monaco) { //editor instance and monaco from the <Editor/> (defined by Monaco Editor) 
     editorRef.current = editor;
     //Initialise Yjs

     const doc = new Y.Doc(); //collection of shared objects -> Text
     //Connect to peers (or start connection) with WebRTC
     const provider = new WebrtcProvider("test-room",doc); //room1, room2
     const type = doc.getText("monaco"); // doc {"monaco" : "what our IDE is showing"}

    
     const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness); //editorRef.current.getModel()-> monaco specific; allows to see changes happening in Monaco
     console.log(provider.awareness);
     //Bind YJS to Monaco

  }
  return (
   <div className='flex justify-center'>
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  </div> 
)
}

export default IDE