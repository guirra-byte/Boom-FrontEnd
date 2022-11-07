import Peer from 'peerjs'
import React, { MouseEventHandler, useEffect, useState } from 'react';

export function VideoChat (){
    const peer = new Peer();
    const [localPeerId, setLocalPeerId] = useState<string>('');
    const [remotePeerId, setRemotePeerId] = useState<string>('');

    useEffect(()=>{
      /*  navigator.mediaDevices.getUserMedia({ video:true }).then( stream =>{
            const video = document.createElement('video');
            video.id = 'stream';
            video.srcObject = stream;
            video.onloadedmetadata = ()=> video.play();
            const container = document.getElementById('container');
            container?.appendChild(video);
            
        })*/
       peer.on('open', ()=>{
        setLocalPeerId(peer.id);
        console.log(peer.id);
       })

       peer.on('connection', conn =>{
        conn.on('data', data=>{
            console.log(data);
        })
       })
       
    },[])

    async function connect(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
       const connection = peer.connect(remotePeerId);
       connection.on("open", ()=>{
        connection.send('Hello!!');
       })
       
       console.log('Trying connection');
    }
    
    return(
        <div id='container'>
            <input id='remoteId' onChange={event=> setRemotePeerId(event.target.value) }/>
            <div>
                <video id='video' src=''></video>
                <button onClick={ connect }>BOTAO</button>
            </div>
        </div>
    )
}