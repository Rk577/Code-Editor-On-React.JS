import React, { useState,  useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from '../pages/Client';
import Editor from '../pages/Editor';
import { initsocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

const EditorsPage = () => {
  const socketRef = useREF(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  
  useEffect(() => {
    const init = async () => {

         socketRef.current = await initsocket();
         socketRef.current.on('connect_error', (err) => handleErrors(err));
         socketRef.current.on('connect_failed', (err) => handleErrors(err));

         function handleErrors(e) {
          console.log('socket error', e);
          toast.error('socket connection is failed, try again later.');
          reactNavigator('/');
         }

         
         socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state.username,
      });

      //Listening for joined event
      socketRef.current.on (ACTIONS.JOINED, ({clients, username, socketId}) => {

        if(username !== location.state.username) {
          toast.success(`$(username) joined the room.`);
          console.log(`${username} joined`);
        }

      }
      );
    };
    init();
  }, []);



  const [clients, setClients] = useState([
    {socketId: 1, username: 'Pratik s'},
    {socketId: 2, username: 'Saurabh m'},
    {socketId: 3, username: 'Naval T'}
]);

  if(!location.state) {
    return <Navigate to="/" />;
  }



  return (
    <div className="mainWrap">
        <div className="aside">
        <div className="insideInner">
          <div className="logo">
            <img className="logoImage" src="/Doodle3.png" alt="logo"/>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {
              clients.map((client => 
              <Client key={client.socketId} username={client.username}/>
              ))}
          </div>
        </div>
        <button className="btn copyBtn">COPY ROOM ID</button>
        <button className="btn leaveBtn">LEAVE</button>
        </div>       
        <div className="editorWrap">
        <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
        </div>
    </div>
  );
};

export default EditorsPage
