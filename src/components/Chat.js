import { Box, Button, Flex, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const Chat = ({ send, set, message, messagesList }) => {

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      send();
      event.preventDefault();
    }
  }

  return (
    <Flex  borderRadius='lg' direction='column' p='3%' w='70%'  bg="rgba(0, 0, 0, 0.5)"
    boxShadow="0px 8px 32px rgba(31, 38, 135, 0.37)"
    backdropFilter="blur(5px)"
    webkitBackdropFilter="blur(5px)"
    border="1px solid rgba(255, 255, 255, 0.1)">
      <Box direction='column' color='whiteAlpha.900' bg="rgba(255, 255, 255, 0.1)" borderRadius='lg' boxShadow="0px 8px 32px rgba(31, 38, 135, 0.37)"  h='full' p='2%' justify='end' align='end' mb='2%' overflowY='auto' css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',  
        'scrollbar-width': 'none'  
      }}>
        {messagesList ? messagesList.map((messages, index) => (
          <Flex w='full' align='center' justify={'end'}>
            <Text key={index} bg='blue.100' borderRadius='lg' p='2' m='2'>{messages.message}</Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>{messages.name}</Text>
          </Flex>
        )) : null}
        <div ref={messagesEndRef} />
      </Box>
      <InputGroup boxShadow="0px 8px 32px rgba(31, 38, 135, 0.37)" bg="rgba(255, 255, 255, 0.1)" borderRadius='lg'>
        <Input value={message} border={'InactiveBorder'} onChange={(event) => set(event.target.value)} onKeyDown={handleKeyPress} />
        <InputRightAddon p='0px' >
          <Button borderRadius={'none'} onClick={() => send()}>Send</Button>
        </InputRightAddon>
      </InputGroup>
    </Flex>
  )
}

export default Chat