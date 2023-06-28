import { AspectRatio, Button, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import './App.css';
import Chat from './components/Chat'
import UsersList from './components/UsersList';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000');


function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [myId, setMyId] = useState('')

  useEffect(() => {
    socket.on('your id', (id) => {
      setMyId(id);
    });
  
    return () => {
      socket.off('your id');
    };
  }, []);

  useEffect(() => {
    socket.on('users', (users) => {
      setConnectedUsers(users);
      console.log(users)
    });

    return () => {
      socket.off('users');
    };
  }, [])

  useEffect(() => {
    socket.on("chat messages", (msg) => {
      setMessages([...messages, msg]);
      console.log(messages)
    })

    return () => {
      socket.off("chat messages");
    }
  },[messages])

  useEffect(() => {
    socket.emit('username', name)
  }, [name])
  

    
  const sendMessage = () => {
    const currentMessage = {
      name: name,
      message: message
    }
    socket.emit("chat message", currentMessage);
    setMessage('');
  }

  const handleNameChange = (event) => {
    setInput(event.target.value);
  }

  const handleName = () => {
    setName(input)
  }
    
  return (
    <Flex p='5%' w='full' h='100vh'>

      <Chat send={sendMessage} set={setMessage} message={message} messagesList={messages}/>
      <UsersList myId={myId} connected={connectedUsers}/>

       <Modal isOpen={name === ''} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please enter your name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Your name" value={input} onChange={handleNameChange} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => input !== '' && handleName()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <video 
    autoPlay 
    loop 
    muted 
    style={{
      position: "absolute",
      width: "100%",
      left: "50%",
      top: "50%",
      height: "100%",
      objectFit: "cover",
      transform: "translate(-50%, -50%)",
      zIndex: "-1"
    }}
  >
    <source src="/red-background.mp4" type="video/mp4" />
  </video>
    </Flex>
  );
}

export default App;
