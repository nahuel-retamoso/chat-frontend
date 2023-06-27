import { Flex, Text } from "@chakra-ui/react"

const UsersList = ({ myId, connected }) => {
    return (
        <Flex bg='green.300' p='1%' w='25%' ml='10%' h='fit-content' borderRadius='lg'>
            <Flex direction={'column'} bg='green.100' w='100%' borderRadius='lg' p='5%'>

                {Object.entries(connected).map(([id, name], index) => {
                    if (name) {
                        if (id === myId) {
                            return (
                                <Text key={index} color='green.800' fontWeight={'bold'}>{name} (You)</Text>
                            )
                        } else {
                            return (
                                <Text key={index} color='blackAlpha.800' fontWeight={'bold'}>{name}</Text>
                            )
                        }
                    }
                })}

            </Flex>
        </Flex>
    )
}

export default UsersList