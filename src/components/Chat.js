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
    <Flex bg='green.300' borderRadius='lg' direction='column' p='2%' w='70%'>
      <Box direction='column' bg='whiteAlpha.900' borderRadius='lg' h='400px' p='2%' justify='end' align='end' mb='2%' overflowY='auto' css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
        'scrollbar-width': 'none'  /* Firefox */
      }}>
        {messagesList ? messagesList.map((messages, index) => (
          <Flex w='full' align='center' justify={'end'}>
            <Text key={index} bg='blue.100' borderRadius='lg' p='2' m='2'>{messages.message}</Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>{messages.name}</Text>
          </Flex>
        )) : null}
        <div ref={messagesEndRef} />
      </Box>
      <InputGroup bg='whiteAlpha.900' borderRadius='lg'>
        <Input value={message} onChange={(event) => set(event.target.value)} onKeyDown={handleKeyPress} />
        <InputRightAddon>
          <Button onClick={() => send()}>Send</Button>
        </InputRightAddon>
      </InputGroup>
    </Flex>
  )
}

export default Chat