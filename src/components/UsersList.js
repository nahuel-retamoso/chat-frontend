import { Flex, Text } from "@chakra-ui/react"

const UsersList = ({ myId, connected }) => {
    return (
        <Flex p='2%' w='25%' ml='5%' h='fit-content' borderRadius='lg' bg="rgba(0, 0, 0, 0.5)"
        boxShadow="0px 8px 32px rgba(31, 38, 135, 0.37)"
        backdropFilter="blur(5px)"
        webkitBackdropFilter="blur(5px)"
        border="1px solid rgba(255, 255, 255, 0.1)">
            <Flex color='whiteAlpha.900' direction={'column'} boxShadow="0px 8px 32px rgba(31, 38, 135, 0.37)" bg="rgba(255, 255, 255, 0.1)" w='100%' borderRadius='lg' p='5%'>

                {Object.entries(connected).map(([id, name], index) => {
                    if (name) {
                        if (id === myId) {
                            return (
                                <Text key={index} fontWeight={'bold'}>{name} (You)</Text>
                            )
                        } else {
                            return (
                                <Text key={index} fontWeight={'bold'}>{name}</Text>
                            )
                        }
                    }
                })}

            </Flex>
        </Flex>
    )
}

export default UsersList